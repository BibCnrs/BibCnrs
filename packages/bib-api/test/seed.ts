import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
	console.log("Seedig test database");
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
})()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
