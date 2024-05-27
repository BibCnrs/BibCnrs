export type TokenPayload = {
	id: number;
	username: string;
	domains: string[];
	groups: string[];
	origin: string;
	exp: number;
};
