import type { inist_account } from "@prisma/client";

export class CreateInistAccountDto implements Omit<inist_account, "id"> {
	username: string;
	password: string;
	name: string | null;
	firstname: string | null;
	mail: string | null;
	phone: string | null;
	dr: string | null;
	comment: string | null;
	subscription_date: Date | null;
	expiration_date: Date | null;
	main_institute: number | null;
	main_unit: number | null;
	active: boolean;
	last_connexion: Date | null;
	units?: number[];
	institutes?: number[];
	communities?: number[];
}

export class UpdateInistAccountDto extends CreateInistAccountDto {
	id: number;
	main_institute_communities?: [];
	main_unit_communities?: [];
	all_communities?: [];
}
