import { janus_account } from "@prisma/client";

export type JanusAccount = janus_account & {
	primary_institute_domains: string[];
	primary_unit_domains: string[];
	domains: string[];
	primary_unit_groups: string[];
	primary_institute_groups: string[];
	additional_units: string[];
	additional_institutes: string[];
	groups: string[];
};
