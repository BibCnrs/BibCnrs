import { TokenPayload } from "./common/common-auth/common-auth.type";

export * from "express";

declare module "express" {
	export interface Request {
		user: TokenPayload;
	}
}
