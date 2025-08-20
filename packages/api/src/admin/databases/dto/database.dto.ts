import type { database } from "@prisma/client";

export class CreateDatabaseDto implements Omit<database, "id"> {
	name_fr: string;
	text_fr: string;
	text_en: string;
	url_fr: string;
	url_en: string;
	name_en: string | null;
	active: boolean;
	oa: boolean;
	diamond: boolean;
	use_proxy: boolean;
	communities?: number[];
	domains?: string[];
	is_text_integral: boolean;
	without_embargo: boolean;
	is_completed: boolean;
	is_archived: boolean;
	type: ("database" | "data" | "news" | "book")[];
}

export class UpdateDatabaseDto extends CreateDatabaseDto {
	id: number;
}
