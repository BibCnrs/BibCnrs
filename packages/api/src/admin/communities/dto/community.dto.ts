import type { community } from "@prisma/client";

export class CreateCommunityDto implements Omit<community, "id"> {
	name: string;
	gate: string;
	user_id: string;
	profile: string;
	password: string;
	ebsco: boolean;
}

export class UpdateCommunityDto extends CreateCommunityDto {
	id: number;
}
