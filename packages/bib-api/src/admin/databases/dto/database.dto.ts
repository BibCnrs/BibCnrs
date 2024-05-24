import type { database } from "@prisma/client";

export class CreateDatabaseDto implements Omit<database, "id"> {
	name_fr: string;
	text_fr: string;
	text_en: string;
	url_fr: string;
	url_en: string;
	image: string | null;
	name_en: string | null;
	active: boolean;
	oa: boolean;
	use_proxy: boolean;
	communities?: number[];
	domains?: string[];
}

export class UpdateDatabaseDto extends CreateDatabaseDto {
	id: number;
}
