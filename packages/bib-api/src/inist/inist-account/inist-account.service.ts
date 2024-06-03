import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
	selectCommunities,
	selectDomains,
	selectGroups,
	selectInstitutes,
	selectMainInstituteCommunities,
	selectMainInstituteDomains,
	selectMainInstituteGroups,
	selectMainUnitCommunities,
	selectMainUnitDomains,
	selectMainUnitGroups,
	selectUnits,
} from "./inist-account.queries";
import {
	InistAccountWithCommunities,
	InistAccountWithDomains,
} from "./inist-account.type";

@Injectable()
export class InistAccountService {
	constructor(private prismaService: PrismaService) {}

	private addDomains(inistAccount: InistAccountWithDomains | null) {
		if (!inistAccount) {
			return null;
		}
		return {
			...inistAccount,
			domains: [
				...new Set(
					inistAccount.main_institute_domains
						.concat(inistAccount.main_unit_domains)
						.concat(inistAccount.domains),
				),
			],
			groups: [
				...new Set(
					inistAccount.main_institute_groups
						.concat(inistAccount.main_unit_groups)
						.concat(inistAccount.groups),
				),
			],
		};
	}

	private addAllCommunities(
		inistAccount: Omit<InistAccountWithCommunities, "all_communities"> | null,
	): InistAccountWithCommunities | null {
		if (!inistAccount) {
			return null;
		}

		return {
			...inistAccount,
			all_communities: [
				...new Set(
					inistAccount.main_institute_communities
						.concat(inistAccount.main_unit_communities)
						.concat(inistAccount.communities),
				),
			],
		};
	}

	// WARN: This method is not secure as password MUST BE hashed for security reasons.
	// NOTE: This is not included in the current sprint, but password hashing MUST be considered.
	private async selectOneByUsernameAndPassword(
		username: string,
		password: string,
	) {
		const inistAccounts = await this.prismaService.$queryRaw<
			InistAccountWithDomains[]
		>`
SELECT 
    *, 
    ARRAY(${selectMainInstituteDomains}) as main_institute_domains,
    ARRAY(${selectMainUnitDomains}) as main_unit_domains,
    ARRAY(${selectDomains}) AS domains,
    ARRAY(${selectMainUnitGroups}) as main_unit_groups,
    ARRAY(${selectMainInstituteGroups}) as main_institute_groups,
    ARRAY(${selectGroups}) AS groups
FROM inist_account
WHERE username = ${username} AND password = ${password}`;

		return this.addDomains(inistAccounts.at(0));
	}

	async authenticate(username: string, password: string) {
		const foundInistAccount = await this.selectOneByUsernameAndPassword(
			username,
			password,
		);

		if (
			!foundInistAccount ||
			(foundInistAccount.expiration_date &&
				foundInistAccount.expiration_date.getTime() <= Date.now())
		) {
			return false;
		}

		return foundInistAccount;
	}

	async findOneById(id: number) {
		const inistAccount = await this.prismaService.$queryRaw`
			SELECT 
				*, 
				ARRAY(${selectMainInstituteCommunities}) as main_institute_communities  ,
				ARRAY(${selectMainUnitCommunities}) as main_unit_communities    ,
				ARRAY(${selectCommunities}) AS communities,
				ARRAY(${selectInstitutes}) AS institutes , 
				ARRAY(${selectUnits}) AS units  
			FROM inist_account
			WHERE id = ${id}`;

		return this.addAllCommunities(inistAccount[0]);
	}

	async updateLastConnexion(id: number) {
		return this.prismaService.inist_account.update({
			where: { id },
			data: {
				last_connexion: new Date(),
			},
		});
	}
}
