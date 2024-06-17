import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
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
