import { Injectable } from "@nestjs/common";
import { janus_account } from "@prisma/client";

import {
	selectAdditionalInstitutes,
	selectAdditionalInstitutesNames,
	selectAdditionalUnits,
	selectCommunities,
	selectCommunitiesNames,
	selectPrimaryInstituteCommunities,
	selectPrimaryInstituteCommunitiesNames,
	selectPrimaryUnitCommunities,
	selectPrimaryUnitCommunitiesNames,
} from "../../janus/accounts/accounts.queries";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { transformOrderBy } from "../../utils/orderBy";
import { FindAllQueryArgs } from "../admin.type";
import {
	CreateJanusAccountDto,
	UpdateJanusAccountDto,
} from "./dto/janus-account.dto";
@Injectable()
export class JanusAccountsService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");
		return filters
			? transformFilters(filters, [
					{ field: "uid", mode: "contains" },
					{ field: "name", mode: "contains" },
					{ field: "firstname", mode: "contains" },
					{ field: "mail", mode: "contains" },
					{ field: "primary_institute", mode: "equals", excludeMatch: true },
					{ field: "primary_unit", mode: "equals", excludeMatch: true },
					{
						field: "janus_account_community.community_id",
						mode: "equals",
						excludeMatch: true,
					},
					{
						field: "janus_account_institute.institute_id",
						mode: "equals",
						excludeMatch: true,
					},
					{
						field: "janus_account_unit.unit_id",
						mode: "equals",
						excludeMatch: true,
					},
					{ field: "subscription_date_lte", mode: "lte", excludeMatch: true },
					{ field: "subscription_date_gte", mode: "gte", excludeMatch: true },
					{ field: "expiration_date_lte", mode: "lte", excludeMatch: true },
					{ field: "expiration_date_gte", mode: "gte", excludeMatch: true },
					{ field: "last_connexion_lte", mode: "lte", excludeMatch: true },
					{ field: "last_connexion_gte", mode: "gte", excludeMatch: true },
					{ field: "first_connexion_lte", mode: "lte", excludeMatch: true },
					{ field: "first_connexion_gte", mode: "gte", excludeMatch: true },
					{ field: "active", mode: "equals", excludeMatch: true },
					{ field: "cnrs", mode: "equals", excludeMatch: true },
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	private addAllCommunities = (janusAccount) => {
		if (!janusAccount) {
			return null;
		}

		const allCommunities = [
			...janusAccount.primary_institute_communities,
			...janusAccount.primary_unit_communities,
			...janusAccount.communities,
		];

		return {
			...janusAccount,
			all_communities: Array.from(new Set(allCommunities)),
		};
	};

	async findAll(query: FindAllQueryArgs): Promise<{
		data: Partial<
			janus_account & {
				additional_institutes?: number[];
				all_communities?: number[];
			}
		>[];
		total: number;
	}> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);
		const orderBy = transformOrderBy(query._sortField, query._sortDir);

		const data = await this.prismaService.janus_account.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy,
			include: {
				janus_account_community: {
					select: {
						community_id: true,
					},
				},
				janus_account_institute: {
					select: {
						institute_id: true,
					},
				},
				institute: {
					include: {
						institute_community: {
							select: {
								community_id: true,
							},
						},
					},
				},
				unit: {
					include: {
						unit_community: {
							select: {
								community_id: true,
							},
						},
					},
				},
			},
		});

		for (const account of data as typeof data &
			{ all_communities?: number[]; additional_institutes?: number[] }[]) {
			account.additional_institutes = account.janus_account_institute.map(
				(institute) => institute.institute_id,
			);
			const janusCommunities = account.janus_account_community.map(
				(community) => community.community_id,
			);

			const instituteCommunities = account.institute
				? account.institute.institute_community.map(
						(community) => community.community_id,
					)
				: [];

			const unitCommunities = account.unit
				? account.unit.unit_community.map((community) => community.community_id)
				: [];

			account.all_communities = [
				...new Set([
					...janusCommunities,
					...instituteCommunities,
					...unitCommunities,
				]),
			];

			// biome-ignore lint/performance/noDelete: NoDelete
			delete account.janus_account_institute;
			// biome-ignore lint/performance/noDelete: NoDelete
			delete account.janus_account_community;
			// biome-ignore lint/performance/noDelete: NoDelete
			delete account.institute;
			// biome-ignore lint/performance/noDelete: NoDelete
			delete account.unit;
		}

		const total = await this.prismaService.janus_account.count({
			where: filters,
		});
		return { data, total };
	}

	async findAllExport() {
		const dataForExport = await this.prismaService.$queryRaw`SELECT janus_account.id, janus_account.uid, janus_account.name, janus_account.firstname,
                  janus_account.mail, janus_account.cnrs, janus_account.comment, 
                  janus_account.last_connexion, janus_account.first_connexion, janus_account.active, 
                  institute.name AS primary_institute,
                  unit.code AS primary_unit,
                  unit2.code AS additional_units,
                  ARRAY((${selectAdditionalInstitutesNames})) AS additional_institutes,
                  ARRAY((${selectCommunitiesNames})) AS communities,
                  ARRAY(
                    (${selectPrimaryInstituteCommunitiesNames})
                    UNION
                    (${selectPrimaryUnitCommunitiesNames})
                    UNION
                    (${selectCommunitiesNames})
                  ) AS all_communities 
                  FROM janus_account 
                  LEFT JOIN institute ON janus_account.primary_institute = institute.id
                  LEFT JOIN unit ON janus_account.primary_unit = unit.id
                  LEFT JOIN janus_account_unit ON (janus_account.id = janus_account_unit.janus_account_id)
                  LEFT JOIN unit AS unit2 ON (janus_account_unit.unit_id = unit2.id)`;
		const listForExport = [];
		for (const element of dataForExport as {
			id: number;
			additional_units?: unknown[];
		}[]) {
			const object = listForExport.find((n) => n.id === element.id);
			if (object) {
				if (element.additional_units) {
					object.additional_units.push(element.additional_units);
				}
			} else {
				if (element.additional_units) {
					element.additional_units = [element.additional_units];
				} else {
					element.additional_units = [];
				}
				listForExport.push(element);
			}
		}

		return listForExport;
	}

	async findOne(id: number) {
		const janusAccount = await this.prismaService.$queryRaw`
        SELECT janus_account.id, janus_account.uid, janus_account.name, janus_account.firstname,
            janus_account.mail, janus_account.cnrs, janus_account.comment, 
            janus_account.last_connexion, janus_account.first_connexion, janus_account.active, 
            janus_account.favorite_domain,janus_account.favourite_resources, 
            institute.id AS primary_institute,
            unit.id AS primary_unit,
            ARRAY((${selectAdditionalUnits})) AS additional_units,
            ARRAY((${selectAdditionalInstitutes})) AS additional_institutes,
            ARRAY((${selectCommunities})) AS communities,
            ARRAY((${selectPrimaryInstituteCommunities})) AS primary_institute_communities,
            ARRAY((${selectPrimaryUnitCommunities})) AS primary_unit_communities
        FROM janus_account 
        LEFT JOIN institute ON janus_account.primary_institute = institute.id
        LEFT JOIN unit ON janus_account.primary_unit = unit.id
        LEFT JOIN janus_account_unit ON (janus_account.id = janus_account_unit.janus_account_id)
        LEFT JOIN unit AS unit2 ON (janus_account_unit.unit_id = unit2.id)
        WHERE janus_account.id = ${id}`;

		return this.addAllCommunities(janusAccount[0]);
	}

	async create(createJanusAccountDto: CreateJanusAccountDto) {
		const {
			additional_units: janusAccountAdditionalUnits,
			communities: janusAccountCommunities,
			additional_institutes: janusAccountAdditionnalInstitutes,
			...janusAccountData
		} = createJanusAccountDto;
		const createdJanusAccount = await this.prismaService.janus_account.create({
			data: janusAccountData,
		});

		if (janusAccountCommunities && janusAccountCommunities.length > 0) {
			await this.prismaService.janus_account_community.createMany({
				data: janusAccountCommunities.map((community) => ({
					janus_account_id: createdJanusAccount.id,
					community_id: community,
				})),
			});
		}

		if (
			janusAccountAdditionnalInstitutes &&
			janusAccountAdditionnalInstitutes.length > 0
		) {
			await this.prismaService.janus_account_institute.createMany({
				data: janusAccountAdditionnalInstitutes.map((institute) => ({
					janus_account_id: createdJanusAccount.id,
					institute_id: institute,
				})),
			});
		}
		if (janusAccountAdditionalUnits && janusAccountAdditionalUnits.length > 0) {
			await this.prismaService.janus_account_unit.createMany({
				data: janusAccountAdditionalUnits.map((unit) => ({
					janus_account_id: createdJanusAccount.id,
					unit_id: unit,
				})),
			});
		}
		return this.findOne(createdJanusAccount.id);
	}

	async update(id: number, updateJanusAccountDto: UpdateJanusAccountDto) {
		const {
			id: janusAccountId,
			communities: janusAccountCommunities,
			additional_institutes: janusAccountInstitutes,
			additional_units: janusAccountUnits,
			primary_institute_communities,
			primary_unit_communities,
			all_communities,
			...janusAccountData
		} = updateJanusAccountDto;

		// Update information about the institute
		await this.prismaService.janus_account.update({
			where: { id },
			data: janusAccountData,
		});

		// prepare the delete operations
		const deleteManyCommunityOperation =
			this.prismaService.janus_account_community.deleteMany({
				where: { janus_account_id: id },
			});
		const deleteManyInstituteOperation =
			this.prismaService.janus_account_institute.deleteMany({
				where: { janus_account_id: id },
			});
		const deleteManyUnitOperation =
			this.prismaService.janus_account_unit.deleteMany({
				where: { janus_account_id: id },
			});
		// create an array to hold all operations
		const operations = [
			deleteManyCommunityOperation,
			deleteManyInstituteOperation,
			deleteManyUnitOperation,
		];
		// conditionally add createMany operations based on data existence
		if (janusAccountCommunities && janusAccountCommunities.length > 0) {
			const createManyCommunityOperation =
				this.prismaService.janus_account_community.createMany({
					data: janusAccountCommunities.map((community) => ({
						janus_account_id: id,
						community_id: community,
					})),
				});
			operations.push(createManyCommunityOperation);
		}
		if (janusAccountInstitutes && janusAccountInstitutes.length > 0) {
			const createManyInstituteOperation =
				this.prismaService.janus_account_institute.createMany({
					data: janusAccountInstitutes.map((institute) => ({
						janus_account_id: id,
						institute_id: institute,
					})),
				});
			operations.push(createManyInstituteOperation);
		}
		if (janusAccountUnits && janusAccountUnits.length > 0) {
			const createManyUnitOperation =
				this.prismaService.janus_account_unit.createMany({
					data: janusAccountUnits.map((unit) => ({
						janus_account_id: id,
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
		return this.prismaService.$transaction([
			this.prismaService.history.deleteMany({
				where: { user_id: id.toString() },
			}),
			this.prismaService.janus_account.delete({
				where: { id },
			}),
		]);
	}
}
