import type { resources } from "@prisma/client";

export class CreateResourceDto implements Omit<resources, "id" | "salt"> {
	name_fr: string;
	name_en: string;
	href: string;
	community: string;
	enable: boolean;
}

export class UpdateResourceDto extends CreateResourceDto {
	id: number;
}
