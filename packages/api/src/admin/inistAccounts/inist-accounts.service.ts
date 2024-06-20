import { Injectable } from "@nestjs/common";
import { inist_account } from "@prisma/client";
import {
	selectAdditionalInstituteName,
	selectCommunities,
	selectInstitutes,
	selectMainInstituteCommunities,
	selectMainUnitCommunities,
	selectUnits,
} from "../../inist/accounts/accounts.queries";
import { InistAccountWithDomains } from "../../inist/accounts/accounts.type";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { transformOrderBy } from "../../utils/orderBy";
import { FindAllQueryArgs } from "../admin.type";
import {
	CreateInistAccountDto,
	UpdateInistAccountDto,
} from "./dto/inist-account.dto";
@Injectable()
export class InistAccountsService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");
		return filters
			? transformFilters(filters, [
					{ field: "username", mode: "contains" },
					{ field: "password", mode: "contains" },
					{ field: "name", mode: "contains" },
					{ field: "firstname", mode: "contains" },
					{ field: "mail", mode: "contains" },
					{ field: "main_institute", mode: "equals", excludeMatch: true },
					{ field: "main_unit", mode: "equals", excludeMatch: true },
					{
						field: "inist_account_community.community_id",
						mode: "equals",
						excludeMatch: true,
					},
					{
						field: "inist_account_institute.institute_id",
						mode: "equals",
						excludeMatch: true,
					},
					{
						field: "inist_account_unit.unit_id",
						mode: "equals",
						excludeMatch: true,
					},
					{ field: "subscription_date_lte", mode: "lte", excludeMatch: true },
					{ field: "subscription_date_gte", mode: "gte", excludeMatch: true },
					{ field: "expiration_date_lte", mode: "lte", excludeMatch: true },
					{ field: "expiration_date_gte", mode: "gte", excludeMatch: true },
					{ field: "last_connexion_lte", mode: "lte", excludeMatch: true },
					{ field: "last_connexion_gte", mode: "gte", excludeMatch: true },
					{ field: "active", mode: "equals", excludeMatch: true },
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	private transformData = (inistAccount) => {
		if (inistAccount.expiration_date) {
			inistAccount.expiration_date = new Date(inistAccount.expiration_date);
		}

		if (inistAccount.subscription_date) {
			inistAccount.subscription_date = new Date(inistAccount.subscription_date);
		}

		if (!inistAccount.main_institute) {
			// biome-ignore lint/performance/noDelete: we don't want to return this field
			delete inistAccount.main_institute;
		}

		if (!inistAccount.main_unit) {
			// biome-ignore lint/performance/noDelete: we don't want to return this field
			delete inistAccount.main_unit;
		}

		return inistAccount;
	};

	private addAllCommunities = (inistAccount) => {
		if (!inistAccount) {
			return null;
		}

		const allCommunities = [
			...inistAccount.main_institute_communities,
			...inistAccount.main_unit_communities,
			...inistAccount.communities,
		];

		return {
			...inistAccount,
			all_communities: Array.from(new Set(allCommunities)),
		};
	};

	async findAll(query: FindAllQueryArgs): Promise<{
		data: Partial<
			inist_account & { communities?: number[]; institutes?: number[] }
		>[];
		total: number;
	}> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);
		const orderBy = transformOrderBy(query._sortField, query._sortDir);

		const data = await this.prismaService.inist_account.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy,
			include: {
				inist_account_community: {
					select: {
						community_id: true,
					},
				},
				inist_account_institute: {
					select: {
						institute_id: true,
					},
				},
			},
		});

		for (const account of data as typeof data &
			{ communities?: number[]; institutes?: number[] }[]) {
			account.institutes = account.inist_account_institute.map(
				(institute) => institute.institute_id,
			);
			account.communities = account.inist_account_community.map(
				(community) => community.community_id,
			);
			// biome-ignore lint/performance/noDelete: We don't want to return this field
			delete account.inist_account_institute;
			// biome-ignore lint/performance/noDelete: We don't want to return this field
			delete account.inist_account_community;
		}

		const total = await this.prismaService.inist_account.count({
			where: filters,
		});
		return { data, total };
	}

	async findAllExport() {
		const dataForExport = await this.prismaService.$queryRaw`
			SELECT inist_account.id, inist_account.username, inist_account.password, inist_account.name, 
				inist_account.firstname, inist_account.mail, inist_account.phone, inist_account.dr, inist_account.comment, 
				inist_account.subscription_date, inist_account.expiration_date, inist_account.last_connexion, inist_account.active, 
				institute.name AS main_institute,
				unit.code AS main_unit,
				community.name AS communities,
				ARRAY(${selectAdditionalInstituteName}) AS institutes
			FROM inist_account 
			LEFT JOIN institute ON inist_account.main_institute = institute.id
			LEFT JOIN unit ON inist_account.main_unit = unit.id
			LEFT JOIN inist_account_community ON (inist_account.id = inist_account_community.inist_account_id)
			LEFT JOIN community ON inist_account_community.community_id = community.id`;
		const listForExport = [];
		// Group by communities id
		for (const element of dataForExport as {
			id: number;
			communities?: unknown[];
		}[]) {
			const object = listForExport.find((n) => n.id === element.id);
			if (object) {
				if (element.communities) {
					object.communities.push(element.communities);
				}
			} else {
				if (element.communities) {
					element.communities = [element.communities];
				} else {
					element.communities = [];
				}
				listForExport.push(element);
			}
		}
		return listForExport;
	}

	async findOne(id: number) {
		const inistAccount = await this.prismaService.$queryRaw<
			InistAccountWithDomains[]
		>`
        SELECT 
            *, 
            ARRAY(${selectMainInstituteCommunities}) as main_institute_communities  ,
            ARRAY(${selectMainUnitCommunities}) as main_unit_communities    ,
            ARRAY(${selectCommunities}) AS communities,
            ARRAY(${selectInstitutes}) AS institutes , 
            ARRAY(${selectUnits}) AS units  
        FROM inist_account
        WHERE id = ${id}`;

		return this.addAllCommunities(
			inistAccount.at(0),
		) as InistAccountWithDomains;
	}

	async create(createInistAccountDto: CreateInistAccountDto) {
		const {
			units: inistAccountUnits,
			communities: inistAccountCommunities,
			institutes: inistAccountInstitutes,
			...inistAccountData
		} = createInistAccountDto;

		const createdInistAccount = await this.prismaService.inist_account.create({
			data: this.transformData(inistAccountData),
		});

		if (inistAccountCommunities && inistAccountCommunities.length > 0) {
			await this.prismaService.inist_account_community.createMany({
				data: inistAccountCommunities.map((community) => ({
					inist_account_id: createdInistAccount.id,
					community_id: community,
				})),
			});
		}

		if (inistAccountInstitutes && inistAccountInstitutes.length > 0) {
			await this.prismaService.inist_account_institute.createMany({
				data: inistAccountInstitutes.map((institute) => ({
					inist_account_id: createdInistAccount.id,
					institute_id: institute,
				})),
			});
		}

		if (inistAccountUnits && inistAccountUnits.length > 0) {
			await this.prismaService.inist_account_unit.createMany({
				data: inistAccountUnits.map((unit) => ({
					inist_account_id: createdInistAccount.id,
					unit_id: unit,
				})),
			});
		}

		return this.findOne(createdInistAccount.id);
	}

	async update(id: number, updateInistAccountDto: UpdateInistAccountDto) {
		const {
			id: inistAccountId,
			units: inistAccountUnits,
			communities: inistAccountCommunities,
			institutes: inistAccountInstitutes,
			main_institute_communities,
			main_unit_communities,
			all_communities,
			...inistAccountData
		} = updateInistAccountDto;

		// Update information about the institute
		await this.prismaService.inist_account.update({
			where: { id },
			data: this.transformData(inistAccountData),
		});

		// prepare the delete operations
		const deleteManyCommunityOperation =
			this.prismaService.inist_account_community.deleteMany({
				where: { inist_account_id: id },
			});

		const deleteManyInstituteOperation =
			this.prismaService.inist_account_institute.deleteMany({
				where: { inist_account_id: id },
			});

		const deleteManyUnitOperation =
			this.prismaService.inist_account_unit.deleteMany({
				where: { inist_account_id: id },
			});

		// create an array to hold all operations
		const operations = [
			deleteManyCommunityOperation,
			deleteManyInstituteOperation,
			deleteManyUnitOperation,
		];

		// conditionally add createMany operations based on data existence
		if (inistAccountCommunities && inistAccountCommunities.length > 0) {
			const createManyCommunityOperation =
				this.prismaService.inist_account_community.createMany({
					data: inistAccountCommunities.map((community) => ({
						inist_account_id: id,
						community_id: community,
					})),
				});
			operations.push(createManyCommunityOperation);
		}

		if (inistAccountInstitutes && inistAccountInstitutes.length > 0) {
			const createManyInstituteOperation =
				this.prismaService.inist_account_institute.createMany({
					data: inistAccountInstitutes.map((institute) => ({
						inist_account_id: id,
						institute_id: institute,
					})),
				});
			operations.push(createManyInstituteOperation);
		}

		if (inistAccountUnits && inistAccountUnits.length > 0) {
			const createManyUnitOperation =
				this.prismaService.inist_account_unit.createMany({
					data: inistAccountUnits.map((unit) => ({
						inist_account_id: id,
						unit_id: unit,
					})),
				});
			operations.push(createManyUnitOperation);
		}

		// perform the operations in a transaction
		await this.prismaService.$transaction(operations);

		return this.findOne(id);
	}

	remove(id: number) {
		return this.prismaService.inist_account.delete({ where: { id } });
	}
}
