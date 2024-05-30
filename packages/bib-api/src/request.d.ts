import { TokenPayload } from "./ebsco/ebsco-auth/ebsco-auth.type";

export * from "express";

declare module "express" {
	export interface Request {
		user: TokenPayload;
	}
}
