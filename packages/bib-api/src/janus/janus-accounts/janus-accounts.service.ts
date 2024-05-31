import { Injectable } from "@nestjs/common";
import { community } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { JanusAccountUpdateDto } from "./dto/janus-accounts.dto";

@Injectable()
export class JanusAccountService {
	constructor(private readonly prismaService: PrismaService) {}

	async update(id: number, janusAccount: JanusAccountUpdateDto) {
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
								set: janusAccountCommunities.map((communityId) => ({
									janus_account_id_community_id: {
										janus_account_id: id,
										community_id: communityId,
									},
								})),
							}
						: undefined,
					janus_account_institute: janusAccountInstitutes
						? {
								set: janusAccountInstitutes.map((instituteId) => ({
									institute_id_janus_account_id: {
										janus_account_id: id,
										institute_id: instituteId,
									},
								})),
							}
						: undefined,
					janus_account_unit: janusAccountUnits
						? {
								set: janusAccountUnits.map((unitId) => ({
									unit_id_janus_account_id: {
										janus_account_id: id,
										unit_id: unitId,
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
}
