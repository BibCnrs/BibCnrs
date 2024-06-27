import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
	await prisma.community.createMany({
		data: [
			{
				name: "INS2I",
				gate: "INS2I",
				user_id: "ABC",
				password: "CDE",
				profile: "wsapi",
			},
			{
				name: "INSHS",
				gate: "INSHS",
				user_id: "ABC",
				password: "CDE",
				profile: "wsapi",
			},
		],
	});

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

	await prisma.resources.createMany({
		data: [
			{
				name_fr:
					"Ressources disponibles pour le domaine Ecologie & Environnement",
				name_en: "Resources available for the Ecology & Environment domain",
				href: "https://localhost:3000/files/2024/6/14/BibCNRS_INEE_ListeTitres.xlsx",
				enable: true,
			},
			{
				name_fr: "Ressources disponibles pour le domaine Chimie",
				name_en: "Resources available for the Chemistry domain",
				href: "https://localhost:3000/files/2024/6/14/BibCNRS_INC2_ListeTitres.xlsx",
				enable: true,
			},
		],
	});

	// Home
	await prisma.content_management.createMany({
		data: [
			{
				page: "home",
				name_en: "Welcome to BIB CNRS",
				name_fr: "Bienvenue sur la plateforme BIB CNRS",
				content_en:
					"Praesent dapibus at tellus a laoreet. Sed id nisi eget est pretium efficitur. Etiam libero urna, vehicula vitae vehicula sed, tempus vel dolor. Morbi sed velit finibus nulla scelerisque eleifend eu vel nunc.",
				content_fr:
					"Mauris nec quam faucibus, dignissim ex non, posuere lectus. Etiam in mauris accumsan, aliquet justo sit amet, convallis felis. Vivamus diam dui, pulvinar sed consequat ut, iaculis eu lectus.",
				from: "2023-04-18T00:00:00.000Z",
				enable: true,
			},
			{
				page: "alert",
				name_en: "Alert",
				name_fr: "Alerte",
				content_en:
					"Cras magna tortor, accumsan sit amet mauris sit amet, hendrerit lobortis arcu.",
				content_fr:
					"Proin lacinia felis eu lacus lacinia, vel pretium ipsum tincidunt.",
				from: "2023-04-18T00:00:00.000Z",
				enable: true,
			},
		],
	});

	// Legal
	await prisma.content_management.createMany({
		data: [
			{
				page: "legal",
				name_en: "Legal Notice",
				name_fr: "Mentions légales",
				content_en:
					"Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla aliquet enim arcu, ut maximus enim semper id. In suscipit mauris a leo dapibus, quis porta leo ullamcorper.",
				content_fr:
					"Etiam vitae pretium turpis. Maecenas tempor velit eget lorem molestie consectetur. Proin elementum consectetur sem, vel hendrerit dui iaculis eu. Sed id odio vitae neque aliquam rutrum sed quis leo.",
				from: "2023-04-18T00:00:00.000Z",
				enable: true,
			},
			{
				page: "about",
				name_en: "About",
				name_fr: "À propos",
				content_en:
					"Maecenas ut mi mauris. Pellentesque eget arcu luctus, egestas dolor at, elementum felis. Aliquam pretium, orci ac dapibus sollicitudin, arcu leo placerat felis, eget volutpat risus arcu at mi.",
				content_fr:
					"Aliquam ullamcorper varius dui in rhoncus. Etiam et est eget quam ultricies maximus iaculis eget est. Integer at augue volutpat, condimentum ex ut, cursus nisl. ",
				from: "2023-04-18T00:00:00.000Z",
				enable: true,
			},
		],
	});

	// FAQ
	await prisma.content_management.createMany({
		data: [
			{
				page: "faq",
				name_en: "More about Unpaywall?",
				name_fr: "En savoir plus sur Unpaywall ?",
				content_en:
					"Open database of over <b>46 million free scientific articles from the Our Research project</b>, a non-profit organization that creates tools to make academic research more open.",
				content_fr:
					"Une base de données ouverte de plus de <b>46 millions d’articles scientifiques gratuits issue du projet de Our Research</b>, organisme à but non lucratif qui crée des outils pour rendre la recherche universitaire plus ouverte.",
				from: "2023-04-18T00:00:00.000Z",
				to: null,
			},
			{
				page: "faq",
				name_en: "How to search for a publication?",
				name_fr: "Comment rechercher une publication ?",
				content_en: "Example of search",
				content_fr: "Exemple de recherche",
				from: "2023-04-18T00:00:00.000Z",
				to: null,
			},
			{
				page: "faq",
				name_en: "Test past",
				name_fr: "Test passé",
				content_en: "",
				content_fr: "",
				from: "2019-04-18T00:00:00.000Z",
				to: "2020-04-18T00:00:00.000Z",
			},
		],
	});

	// News
	await prisma.tests_news.createMany({
		data: [
			{
				page: "home",
				name_en: "First News",
				name_fr: "Première actualité",
				content_en:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh augue, blandit at massa feugiat, congue blandit mi. Nam tristique diam facilisis, varius tortor ornare, ullamcorper turpis.",
				content_fr:
					"Aenean et arcu nec orci sollicitudin ornare. Ut mollis velit ligula, facilisis egestas orci ultricies sagittis. Praesent egestas facilisis laoreet. Phasellus id tortor eros. Nulla ullamcorper nec mauris ac laoreet.",
				from: "2023-04-18T00:00:00.000Z",
				to: null,
			},
			{
				page: "home",
				name_en: "Second News",
				name_fr: "Deuxième actualité",
				content_en:
					"uis sit amet porttitor lacus. Cras tincidunt ultricies eros, non mattis tellus tempus sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
				content_fr:
					"Nam hendrerit, ipsum sit amet luctus sagittis, nisi dui semper tortor, id sodales nisi turpis vel odio. Nam ut efficitur sapien. Suspendisse justo libero, dapibus in erat vel, ultrices condimentum nisl. Vivamus semper porttitor gravida.",
				from: "2023-04-18T00:00:00.000Z",
				to: null,
			},
		],
	});

	await prisma.tests_news_community.createMany({
		data: [
			{
				community_id: 1,
				tests_news_id: 1,
			},
			{
				community_id: 1,
				tests_news_id: 2,
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

	await prisma.janus_account_community.createMany({
		data: [
			{
				community_id: 1,
				janus_account_id: 1,
			},
		],
	});
	await prisma.janus_account_unit.createMany({
		data: [
			{
				unit_id: 3,
				janus_account_id: 1,
			},
		],
	});

	await prisma.inist_account.createMany({
		data: [
			{
				username: "Marmelab",
				password: "M4rm3l4b",
				mail: "developer@marmelab.com",
				active: true,
				main_institute: 1,
				main_unit: 3,
			},
		],
	});

	await prisma.inist_account_community.createMany({
		data: [
			{
				community_id: 1,
				inist_account_id: 1,
			},
		],
	});

	await prisma.inist_account_unit.createMany({
		data: [
			{
				unit_id: 3,
				inist_account_id: 1,
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
