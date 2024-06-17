import type { section_cn } from "@prisma/client";

export class CreateSectionCNDto implements Omit<section_cn, "id"> {
	code: string;
	name: string;
	comment: string | null;

	primary_institutes?: number[];
	secondary_institutes?: number[];
}

export class UpdateSectionCNDto extends CreateSectionCNDto {
	id: number;
}
