import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
	selectDomains,
	selectGroups,
	selectMainInstituteDomains,
	selectMainInstituteGroups,
	selectMainUnitDomains,
	selectMainUnitGroups,
} from "./inist-account.queries";
import { InistAccount } from "./inist-account.type";

@Injectable()
export class InistAccountService {
	constructor(private prismaService: PrismaService) {}

	private addDomains(inistAccount: InistAccount | null) {
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

	// WARN: This method is not secure as password MUST BE hashed for security reasons.
	// NOTE: This is not included in the current sprint, but password hashing MUST be considered.
	private async selectOneByUsernameAndPassword(
		username: string,
		password: string,
	) {
		const inistAccounts = await this.prismaService.$queryRaw<InistAccount[]>`
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

	async updateLastConnexion(id: number) {
		return this.prismaService.inist_account.update({
			where: { id },
			data: {
				last_connexion: new Date(),
			},
		});
	}
}
