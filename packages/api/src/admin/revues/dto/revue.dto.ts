import type { revue } from "@prisma/client";

export class CreateRevueDto implements Omit<revue, "id"> {
	title: string;
	url: string;
	domains?: string[];
	communities?: number[];
}

export class UpdateRevueDto extends CreateRevueDto {
	id: number;
}
