import type { Prisma, tests_news } from "@prisma/client";

export class CreateTestNewsDto implements Omit<tests_news, "id"> {
	name_fr: string;
	name_en: string;
	content_fr: string;
	content_en: string;
	page: string;
	from: Date;
	to: Date | null;
	urls: Prisma.JsonValue | null;
	domains: Prisma.JsonValue | null;
	enable: boolean;
}

export class UpdateTestNewsDto extends CreateTestNewsDto {
	id: number;
}
