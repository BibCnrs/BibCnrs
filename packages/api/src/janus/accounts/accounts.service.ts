import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import uniqBy from "lodash.uniqby";
import { PrismaService } from "../../prisma/prisma.service";
import {
	selectAdditionalInstitutes,
	selectAdditionalUnits,
	selectDomains,
	selectGroups,
	selectPrimaryInstituteDomains,
	selectPrimaryInstituteGroups,
	selectPrimaryUnitDomains,
	selectPrimaryUnitGroups,
} from "./accounts.queries";
import { JanusAccount } from "./accounts.type";
import { JanusAccountUpdateDto } from "./dto/janus-accounts.dto";

@Injectable()
export class JanusAccountService {
	constructor(private readonly prismaService: PrismaService) {}

	private addDomains(account: JanusAccount | null) {
		if (!account) {
			return null;
		}

		return {
			...account,
			domains: [
				...new Set(
					account.primary_institute_domains
						.concat(account.primary_unit_domains)
						.concat(account.domains),
				),
			],
			groups: [
				...new Set(
					account.primary_institute_groups
						.concat(account.primary_unit_groups)
						.concat(account.groups),
				),
			],
		};
	}

	async findOneByUid(uid: string) {
		const janusAccount = await this.prismaService.$queryRaw<
			JanusAccount[]
		>`SELECT *,
        ARRAY(${selectPrimaryInstituteDomains}) as primary_institute_domains,
        ARRAY(${selectPrimaryUnitDomains}) as primary_unit_domains,
        ARRAY(${selectDomains}) AS domains,
        ARRAY(${selectPrimaryInstituteGroups}) as primary_institute_groups,
        ARRAY(${selectPrimaryUnitGroups}) as primary_unit_groups,
        ARRAY((${selectAdditionalUnits})) AS additional_units,
        ARRAY((${selectAdditionalInstitutes})) AS additional_institutes,
        ARRAY(${selectGroups}) AS groups
        FROM janus_account
        WHERE uid LIKE ${uid.toString()}`;
		return this.addDomains(janusAccount.at(0));
	}

	async findOneById(id: number) {
		const janusAccount = await this.prismaService.$queryRaw<
			JanusAccount[]
		>`SELECT *,
        ARRAY(${selectPrimaryInstituteDomains}) as primary_institute_domains,
        ARRAY(${selectPrimaryUnitDomains}) as primary_unit_domains,
        ARRAY(${selectDomains}) AS domains,
        ARRAY(${selectPrimaryInstituteGroups}) as primary_institute_groups,
        ARRAY(${selectPrimaryUnitGroups}) as primary_unit_groups,
        ARRAY((${selectAdditionalUnits})) AS additional_units,
        ARRAY((${selectAdditionalInstitutes})) AS additional_institutes,
        ARRAY(${selectGroups}) AS groups
        FROM janus_account
        WHERE id = ${id}`;
		return this.addDomains(janusAccount.at(0));
	}

	async update(id: number, janusAccount: Partial<JanusAccountUpdateDto>) {
		const {
			communities: janusAccountCommunities,
			additional_institutes: janusAccountInstitutes,
			additional_units: janusAccountUnits,
			primary_institute_communities,
			primary_unit_communities,
			all_communities,
			...data
		} = janusAccount;

		if (!data.primary_institute) {
			// biome-ignore lint/performance/noDelete: <explanation>
			delete data.primary_institute;
		}

		if (!data.primary_unit) {
			// biome-ignore lint/performance/noDelete: <explanation>
			delete data.primary_unit;
		}

		return this.prismaService.janus_account
			.update({
				where: { id },
				include: {
					janus_account_community: {
						include: {
							community: true,
						},
					},
					janus_account_institute: {
						include: {
							institute: true,
						},
					},
					janus_account_unit: {
						include: {
							unit: true,
						},
					},
				},
				data: {
					...data,
					janus_account_community: janusAccountCommunities
						? {
								deleteMany: {},
								create: janusAccountCommunities.map((id) => ({
									community: {
										connect: {
											id,
										},
									},
								})),
							}
						: undefined,
					janus_account_institute: janusAccountInstitutes
						? {
								deleteMany: {},
								create: janusAccountInstitutes.map((id) => ({
									institute: {
										connect: {
											id,
										},
									},
								})),
							}
						: undefined,
					janus_account_unit: janusAccountUnits
						? {
								deleteMany: {},
								create: janusAccountUnits.map((id) => ({
									unit: {
										connect: {
											id,
										},
									},
								})),
							}
						: undefined,
				},
			})
			.then(
				({
					janus_account_community,
					janus_account_institute,
					janus_account_unit,
					...profile
				}) => ({
					...profile,
					communities: janus_account_community.map(
						({ community }) => community,
					),
					additional_institutes: janus_account_institute.map(
						({ institute }) => institute,
					),
					additional_units: janus_account_unit.map(({ unit }) => unit),
				}),
			);
	}

	async getSimilarAccount(uid: string, name: string, firstname: string) {
		const user = await this.findOneByUid(uid);
		if (user) {
			return [];
		}
		return this.prismaService.janus_account.findMany({
			where: {
				name,
				firstname,
			},
			orderBy: {
				uid: "desc",
			},
		});
	}

	async create(janusAccount: Partial<JanusAccountUpdateDto>) {
		const {
			communities: janusAccountCommunities,
			additional_institutes: janusAccountInstitutes,
			additional_units: janusAccountUnits,
			primary_institute_communities,
			primary_unit_communities,
			all_communities,
			...data
		} = janusAccount;

		const createdAccount = await this.prismaService.janus_account.create({
			data,
		});

		return this.update(createdAccount.id, janusAccount);
	}

	async upsertOneByUid(janusAccount: Partial<JanusAccountUpdateDto>) {
		const existingJanusAccount = await this.findOneByUid(janusAccount.uid);

		if (existingJanusAccount) {
			return this.update(existingJanusAccount.id, janusAccount);
		}

		return this.create(janusAccount);
	}

	async getFavouriteResources(id: number) {
		return this.prismaService.janus_account
			.findUnique({
				where: {
					id,
				},
				select: {
					favourite_resources: true,
				},
			})
			.then(({ favourite_resources }) => favourite_resources ?? []);
	}

	async getRevuesByDomains(domains: string[]) {
		if (!domains || !domains.length) {
			return [];
		}

		const revues = await this.prismaService.$queryRaw<
			{
				title: string;
				url: string;
				gate: string;
			}[]
		>(Prisma.sql`
			SELECT title, url, community.gate as gate
			FROM revue
				JOIN revue_community ON (revue.id = revue_community.revue_id)
				JOIN community ON (revue_community.community_id = community.id)
			WHERE community.name IN (${Prisma.join(domains)})
			ORDER BY community.id ASC`);

		return uniqBy(revues, ({ title }) => title).map(({ title, url, gate }) => {
			return {
				title,
				url: `http://${gate}.bib.cnrs.fr/login?url=${url}`,
			};
		});
	}
}
