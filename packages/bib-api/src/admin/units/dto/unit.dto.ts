import type { unit } from "@prisma/client";

export class CreateUnitDto implements Omit<unit, "id"> {
	code: string;
	comment: string | null;
	name: string | null;
	implantation: string | null;
	building: string | null;
	street: string | null;
	post_office_box: string | null;
	postal_code: string | null;
	town: string | null;
	country: string | null;
	unit_dr: string | null;
	nb_researcher_cnrs: number | null;
	nb_researcher_nocnrs: number | null;
	nb_doctorant: number | null;
	nb_post_doctorant: number | null;
	director_name: string | null;
	director_firstname: string | null;
	director_mail: string | null;
	correspondant_documentaire: string | null;
	cd_phone: string | null;
	cd_mail: string | null;
	correspondant_informatique: string | null;
	ci_phone: string | null;
	ci_mail: string | null;
	main_institute: number | null;
	body: string | null;
	active: boolean;

	communities?: number[];
	institutes?: number[];
	sections_cn?: number[];
}

export class UpdateUnitDto extends CreateUnitDto {
	id: number;

	nb_inist_account?: number;
	nb_janus_account?: number;
}
