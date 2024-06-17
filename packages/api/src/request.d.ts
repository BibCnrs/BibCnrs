import { TokenPayload } from "./common/auth/auth.type";
import { EbscoToken } from "./ebsco/token/token.type";

export * from "express";

declare module "express" {
	export interface Request {
		user: TokenPayload<"inist"> | TokenPayload<"janus">;
		ebscoToken: EbscoToken;
	}
}
