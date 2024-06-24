import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
	await prisma.institute.createMany({
		data: [
			{
				code: "INS2I",
				name: "Sciences Informatiques",
			},
			{
				code: "INSHS",
				name: "Sciences Humaines & Sociales",
			},
			{
				code: "INSMI",
				name: "Mathématiques",
			},
			{
				code: "INSB",
				name: "Biologie",
			},
		],
	});

	await prisma.unit.createMany({
		data: [
			{
				code: "CONRS",
				name: "	Comité National de la Recherche Scientifique",
				main_institute: 4,
			},
			{
				code: "GDR3072",
				name: "Robotique",
				main_institute: 1,
			},
			{
				code: "UMR7503",
				name: "Laboratoire lorrain de recherche en informatique et ses applications (LORIA)",
				main_institute: 1,
			},
		],
	});

	await prisma.unit_institute.createMany({
		data: [
			{
				institute_id: 1,
				unit_id: 2,
			},
			{
				institute_id: 1,
				unit_id: 3,
			},
			{
				institute_id: 4,
				unit_id: 1,
			},
		],
	});

	await prisma.janus_account.createMany({
		data: [
			{
				active: true,
				cnrs: true,
				firstname: "Developer",
				name: "Marmelab",
				uid: "tester.10",
				mail: "developer@marmelab.com",
				primary_institute: 1,
				primary_unit: 3,
				favorite_domain: "INS2I",
				favourite_resources: [
					{
						id: "019049a7-8a51-72d6-bd71-4367589e762a",
						title: "BIB CNRS",
						url: "https://bib.cnrs.fr/",
						isSuperFavorite: true,
					},
					{
						id: "019049a8-1a03-7d5c-b0b0-21346ec5abec",
						title: "INS2I",
						url: "https://www.ins2i.cnrs.fr/fr",
						isSuperFavorite: true,
					},
					{
						id: "019049a7-4670-7b88-8883-0c4f977faf17",
						title: "CNRS",
						url: "https://www.cnrs.fr/",
						isSuperFavorite: false,
					},
				],
			},
		],
	});

	await prisma.database.createMany({
		data: [
			{
				name_fr: "HAL",
				name_en: "HAL",
				url_fr: "https://https://hal.science/",
				url_en: "https://hal.science/",
				text_fr: "HAL description (FR)",
				text_en: "HAL description (EN)",
				active: true,
				oa: true,
				is_completed: true,
				is_archived: false,
				is_text_integral: true,
				without_embargo: true,
				use_proxy: false,
			},
			{
				name_fr: "Open Dissertations",
				name_en: "Open Dissertations",
				url_fr: "https://opendissertations.org/",
				url_en: "https://opendissertations.org/",
				text_fr: "Ebsco description (FR)",
				text_en: "Ebsco description (EN)",
				active: true,
				oa: true,
				is_completed: false,
				is_archived: false,
				is_text_integral: true,
				without_embargo: false,
				use_proxy: false,
			},
			{
				name_fr: "ADS / NASA (Harvard)",
				name_en: "ADS / NASA (Harvard)",
				url_fr: "https://ui.adsabs.harvard.edu/",
				url_en: "https://ui.adsabs.harvard.edu/",
				text_fr: "ADS / NASA (Harvard) description (FR)",
				text_en: "ADS / NASA (Harvard) description (EN)",
				active: true,
				oa: true,
				is_completed: false,
				is_archived: false,
				is_text_integral: true,
				without_embargo: false,
				use_proxy: false,
			},
		],
	});
})()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
