import type { medias } from "@prisma/client";

export class CreateMediaDto implements Omit<medias, "id"> {
	name: string;
	file_name: string;
	file: string;
	is_used: boolean;
	url: string;
	created_at: Date;
}

export class UpdateMediaDto extends CreateMediaDto {
	id: number;
}
