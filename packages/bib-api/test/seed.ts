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

	// Resources
	await prisma.resources.createMany({
		data: [
			{
				community: "INSHS",
				name_en: "Bib Preprod",
				name_fr: "Bib Preprod",
				href: "https://bib-preprod.inist.fr/",
				enable: true,
			},
			{
				community: "INSHS",
				name_en: "Bib",
				name_fr: "Bib",
				href: "https://bib.cnrs.fr/",
				enable: true,
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
