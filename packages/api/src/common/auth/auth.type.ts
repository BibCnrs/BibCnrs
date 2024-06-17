import { inist_account, janus_account } from "@prisma/client";

export type Origin = "inist" | "janus";

export type TokenPayloadData = {
	inist: {
		id: inist_account["id"];
		username: inist_account["username"];
		groups: string[];
		domains: string[];
	};
	janus: {
		id: janus_account["id"];
		username: string;
		shib: string;
		favorite_domain: janus_account["favorite_domain"];
		domains: string[];
	};
};

export type TokenPayload<O extends Origin> = {
	origin: Origin;
	exp: number;
} & TokenPayloadData[O];
