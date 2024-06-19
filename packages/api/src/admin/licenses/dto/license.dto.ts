import type { license } from "@prisma/client";

export class CreateLicenseDto implements Omit<license, "id"> {
	name_fr: string;
	name_en: string;
	content_fr: string;
	content_en: string;
	pdf: { title: string; src: string };
	enable: boolean;
	common: boolean;
	license_community: { community_id: number }[];
}

export class UpdateLicenseDto extends CreateLicenseDto {
	id: number;
}
