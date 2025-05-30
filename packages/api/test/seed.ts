import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
	console.log("Seeding test database");
	await prisma.admin_user.createMany({
		data: [
			{
				username: "admin1",
				password: "admin1",
				comment: "admin1",
				salt: "admin1",
			},
			{
				username: "admin2",
				password: "admin2",
				comment: "admin2",
				salt: "admin2",
			},
		],
	});

	// Communities
	await prisma.community.createMany({
		data: [
			{
				name: "INSHS",
				gate: "inshs",
				user_id: "inshs_user_id",
				profile: "wsapi",
				password: "inshs_password",
				ebsco: true,
			},
			{
				name: "INSB",
				gate: "insb",
				user_id: "insb_user_id",
				profile: "wsapi",
				password: "insb_password",
				ebsco: true,
			},
		],
	});

	// Medias
	await prisma.medias.createMany({
		data: [
			{
				id: 1,
				name: "media1",
				file_name: "media1.png",
				file: "/app/packages/api/uploads/2024/1/1/media1.png",
				url: "/2024/1/1/media1.png",
			},
			{
				id: 2,
				name: "media2",
				file_name: "media2.png",
				file: "/app/packages/api/uploads/2024/1/1/media2.png",
				url: "/2024/1/1/media2.png",
			},
			{
				id: 100,
				name: "bib",
				file_name: "bib.pdf",
				file: "/app/packages/api/uploads/2024/1/1/bib.pdf",
				url: "/2024/1/1/bibcnrs.pdf",
			},
			{
				id: 101,
				name: "preprod",
				file_name: "preprod.pdf",
				file: "/app/packages/api/uploads/2024/1/1/preprod.pdf",
				url: "/2024/1/1/preprod.pdf",
			},
			{
				id: 3,
				name: "lodex",
				url: "www.lodex.inist.fr",
				file_name: "",
				file: "",
			},
		],
	});

	// CMS
	await prisma.content_management.createMany({
		data: [
			{
				page: "home",
				enable: true,
				from: new Date("2022-01-01"),
				to: null,
				name_en: "Hello 2",
				name_fr: "Bonjour 2",
				content_en: "Hello! 2",
				content_fr: "Bonjour! 2",
				media_id: 3,
			},
			{
				page: "home",
				enable: true,
				from: new Date("2021-01-01"),
				to: null,
				name_en: "Hello 1",
				name_fr: "Bonjour 1",
				content_en: "Hello! 1",
				content_fr: "Bonjour! 1",
			},
			{
				page: "alertes",
				enable: true,
				from: new Date("2021-01-01"),
				to: null,
				name_en: "bibcnrs",
				name_fr: "bibcnrs",
				content_en:
					'<p>Hello! 1</p><img src="/2024/1/1/media1.png" alt="Media 1">',
				content_fr:
					'<p>Bonjour! 1</p><img src="/2024/1/1/media1.png" alt="Media 1">',
			},
		],
	});

	// Insitute
	await prisma.institute.createMany({
		data: [
			{
				code: "CNRS",
				name: "CNRS",
			},
			{
				code: "INSB",
				name: "INSB",
			},
		],
	});

	await prisma.institute_community.createMany({
		data: [
			{
				institute_id: 1,
				community_id: 1,
			},
			{
				institute_id: 2,
				community_id: 1,
			},
		],
	});

	// Unit
	await prisma.unit.createMany({
		data: [
			{
				code: "A",
			},
			{
				code: "B",
			},
		],
	});

	await prisma.unit_institute.createMany({
		data: [
			{
				institute_id: 1,
				unit_id: 2,
			},
		],
	});

	// Licenses
	await prisma.license.createMany({
		data: [
			{
				name_fr: "Cadre d’utilisation",
				name_en: "Framework of Use",
				content_fr: "<p>Cadre d’utilisation</p>",
				content_en: "<p>Framework of use</p>",
				enable: true,
			},
			{
				name_fr: "Test de licence",
				name_en: "License Test",
				content_fr: "<p>Test de licence</p>",
				content_en: "<p>License Test</p>",
				enable: true,
			},
		],
	});

	await prisma.license_community.createMany({
		data: [
			{
				license_id: 1,
				community_id: 1,
			},
			{
				license_id: 1,
				community_id: 2,
			},
			{
				license_id: 2,
				community_id: 1,
			},
		],
	});

	// Databases
	await prisma.database.createMany({
		data: [
			{
				name_fr: "Wiley",
				text_fr: "Plateforme multidisciplinaire",
				text_en: "Multidisciplinary platform",
				url_fr: "https://onlinelibrary.wiley.com/",
				url_en: "https://onlinelibrary.wiley.com/",
				name_en: "Wiley",
				active: true,
				oa: true,
				use_proxy: true,
			},
			{
				name_fr: "Springer",
				text_fr: "Plateforme multidisciplinaire springer",
				text_en: "Multidisciplinary platform springer",
				url_fr: "https://link.springer.com/",
				url_en: "https://link.springer.com/",
				name_en: "Springer",
				active: true,
				oa: false,
				use_proxy: false,
			},
		],
	});

	await prisma.database_community.createMany({
		data: [
			{
				database_id: 1,
				community_id: 1,
			},
			{
				database_id: 2,
				community_id: 1,
			},
			{
				database_id: 2,
				community_id: 2,
			},
		],
	});

	// Tags
	await prisma.tags.createMany({
		data: [
			{
				id: 1,
				name: "tag1",
			},
			{
				id: 2,
				name: "tag2",
			},
		],
	});

	//tags_medias
	await prisma.tags_medias.createMany({
		data: [
			{
				tags_id: 1,
				medias_id: 1,
			},
			{
				tags_id: 2,
				medias_id: 1,
			},
			{
				tags_id: 2,
				medias_id: 3,
			},
		],
	});

	// Resources
	await prisma.resources.createMany({
		data: [
			{
				name_en: "Bib Preprod",
				name_fr: "Bib Preprod",
				enable: true,
				media_id: 101,
			},
			{
				name_en: "Bib",
				name_fr: "Bib",
				enable: true,
				media_id: 100,
			},
		],
	});

	// News
	await prisma.tests_news.createMany({
		data: [
			{
				page: "news",
				enable: true,
				from: new Date("2022-01-01"),
				to: null,
				name_en: "News 2",
				name_fr: "News 2",
				content_en: "Test News 2",
				content_fr: "Test News 2",
			},
			{
				page: "tests",
				enable: true,
				from: new Date("2021-01-01"),
				to: null,
				name_en: "News 1",
				name_fr: "News 1",
				content_en: "Test News 1",
				content_fr: "Test News 1",
			},
		],
	});

	await prisma.tests_news_community.createMany({
		data: [
			{
				tests_news_id: 1,
				community_id: 1,
			},
			{
				tests_news_id: 2,
				community_id: 1,
			},
			{
				tests_news_id: 2,
				community_id: 2,
			},
		],
	});

	// Revues
	await prisma.revue.createMany({
		data: [
			{
				title: "ACM",
				url: "https://dl.acm.org",
			},
			{
				title: "IEEE",
				url: "https://ieeexplore.ieee.org",
			},
		],
	});

	await prisma.revue_community.createMany({
		data: [
			{
				revue_id: 1,
				community_id: 1,
			},
			{
				revue_id: 2,
				community_id: 1,
			},
			{
				revue_id: 2,
				community_id: 2,
			},
		],
	});

	// Inist account
	await prisma.inist_account.createMany({
		data: [
			{
				username: "INIST",
				password: "INIST",
				active: true,
				mail: "inist@cnrs.fr",
			},
			{
				username: "MARMELAB",
				password: "MARMELAB",
				active: true,
				mail: "marmelab@cnrs.fr",
			},
		],
	});

	// Janus account
	await prisma.janus_account.createMany({
		data: [
			{
				primary_institute: null,
				primary_unit: 1,
				uid: "test.test",
				mail: "test@inist.fr",
				name: "TEST",
				firstname: "test",
				cnrs: true,
				comment: "",
				last_connexion: new Date(),
				favorite_domain: "INSHS",
				first_connexion: new Date(),
				active: true,
				favourite_resources: null,
			},
			{
				primary_institute: null,
				primary_unit: 2,
				uid: "test2.test2",
				mail: "test@inist.fr",
				name: "OTHERTEST",
				firstname: "OTHERTEST",
				cnrs: true,
				comment: "",
				last_connexion: new Date(),
				favorite_domain: "INSB",
				first_connexion: new Date(),
				active: true,
				favourite_resources: null,
			},
		],
	});

	await prisma.history.createMany({
		data: [
			{
				user_id: "1",
				event: { test: "test 1" },
				active: true,
				has_alert: true,
				last_results: [],
				nb_results: 0,
			},
			{
				user_id: "1",
				event: { test: "test 2" },
				active: true,
				has_alert: false,
				last_results: [],
				nb_results: 0,
			},
			{
				user_id: "2",
				event: { test: "test 3" },
				active: true,
				has_alert: true,
				last_results: [],
				nb_results: 0,
			},
			{
				user_id: "4",
				event: { test: "test 4" },
				active: true,
				has_alert: true,
				last_results: [],
				nb_results: 0,
			},
			{
				user_id: "4",
				event: { test: "test 4" },
				active: true,
				has_alert: false,
				last_results: [],
				nb_results: 0,
			},
		],
	});

	await prisma.inist_account_community.createMany({
		data: [
			{
				inist_account_id: 1,
				community_id: 1,
			},
		],
	});

	await prisma.inist_account_unit.createMany({
		data: [
			{
				inist_account_id: 1,
				unit_id: 1,
			},
		],
	});

	// Section CN
	await prisma.section_cn.createMany({
		data: [
			{
				code: "A",
				name: "Section A",
			},
			{
				code: "B",
				name: "Section B",
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
