import type { medias } from "@prisma/client";

export class CreateMediaDto implements Omit<medias, "id"> {
	name: string;
	file_name: string;
	file: string;
	url: string;
}

export class UpdateMediaDto extends CreateMediaDto {
	id: number;
}
