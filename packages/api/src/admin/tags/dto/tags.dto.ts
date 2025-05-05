import { tags } from "@prisma/client";

export class CreateTagDto implements Omit<tags, "id"> {
	name: string;
}

export class UpdateTagDto extends CreateTagDto {
	id: number;
}
