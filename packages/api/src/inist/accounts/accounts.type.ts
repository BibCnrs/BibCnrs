import { inist_account } from "@prisma/client";

export type InistAccountWithDomains = inist_account & {
	main_institute_domains: string[];
	main_unit_domains: string[];
	domains: string[];
	main_unit_groups: string[];
	main_institute_groups: string[];
	groups: string[];
};

export type InistAccountWithCommunities = inist_account & {
	main_institute_communities: string[];
	main_unit_communities: string[];
	communities: string[];
	institutes: string[];
	units: string[];

	all_communities: string[];
};
