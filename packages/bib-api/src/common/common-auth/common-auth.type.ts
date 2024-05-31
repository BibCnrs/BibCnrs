import { inist_account, janus_account } from "@prisma/client";

export type Origin = "inist" | "janus";

export type TokenPayload = (
	| {
			origin: "inist";
			id: inist_account["id"];
			username: inist_account["username"];
			groups: string[];
			favorite_domain?: undefined;
			shib?: undefined;
	  }
	| {
			origin: "janus";
			id: janus_account["id"];
			shib: string;
			username: string;
			favorite_domain: janus_account["favorite_domain"];
			groups?: undefined;
	  }
) & { origin: Origin; exp: number; domains: string[] };
