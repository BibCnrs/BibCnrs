import { TokenPayload } from "./common/common-auth/common-auth.type";
import { EbscoToken } from "./ebsco/ebsco-token/ebsco-token.type";

export * from "express";

declare module "express" {
	export interface Request {
		user: TokenPayload<"inist"> | TokenPayload<"janus">;
		ebscoToken: EbscoToken;
	}
}
