import type { content_management } from "@prisma/client";

export class CreateContentManagementDto
	implements Omit<content_management, "id">
{
	name_fr: string;
	name_en: string;
	content_fr: string;
	content_en: string;
	page: string;
	from: Date;
	to: Date | null;
	enable: boolean;
	info: boolean;
	order: number | null;
	media_id: number | null;
}

export class UpdateContentManagementDto extends CreateContentManagementDto {
	id: number;
}
