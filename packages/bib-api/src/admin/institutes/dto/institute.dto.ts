import type { institute } from "@prisma/client";

export class CreateInstituteDto implements Omit<institute, "id"> {
	code: string;
	name: string;
	communities?: number[];
}

export class UpdateInstituteDto extends CreateInstituteDto {
	id: number;
}
