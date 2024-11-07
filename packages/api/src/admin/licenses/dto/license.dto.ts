import type { license } from "@prisma/client";

export class CreateLicenseDto implements Omit<license, "id"> {
	name_fr: string;
	name_en: string;
	content_fr: string;
	content_en: string;
	enable: boolean;
	common: boolean;
	license_community: { community_id: number }[];
	media_id: number | null;
	media?: {
		name: string;
		url: string;
		file: string;
	};
}

export class UpdateLicenseDto extends CreateLicenseDto {
	id: number;
}
