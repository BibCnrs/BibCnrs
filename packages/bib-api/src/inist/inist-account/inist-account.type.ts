import { inist_account } from "@prisma/client";

export type InistAccount = inist_account & {
	main_institute_domains: string[];
	main_unit_domains: string[];
	domains: string[];
	main_unit_groups: string[];
	main_institute_groups: string[];
	groups: string[];
};
