import type { Prisma, resources } from "@prisma/client";

export class CreateResourceDto implements Omit<resources, "id" | "salt"> {
	name_fr: string;
	name_en: string;
	enable: boolean;
	media_id: number | null;
	media: Prisma.JsonValue | null;
}

export class UpdateResourceDto extends CreateResourceDto {
	id: number;
}
