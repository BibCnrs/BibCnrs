import { database } from "@prisma/client";

export type DatabaseWithCommunities = database & {
	communities: { community: { name: string; id: number } }[];
};

export type DatabaseWithDomains = database & {
	domains?: string[];
	communities?: number[];
};
