import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
	console.log("Seedig test database");
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
	await prisma.community.createMany({
		data: [
			{
				name: "community1",
				gate: "gate1",
				user_id: "user_id1",
				password: "password1",
				profile: "profile1",
				ebsco: true,
			},
			{
				name: "community2",
				gate: "gate2",
				user_id: "user_id2",
				password: "password2",
				profile: "profile2",
				ebsco: false,
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
