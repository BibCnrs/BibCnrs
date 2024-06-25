import type { Common } from "../I18N";

/**
 * French translation
 */
const fr: Common = {
	ebsco: {
		facets: {
			SubjectEDS: "Mot clé",
			SourceType: "Type de ressource",
			Journal: "Titre de publication",
			Language: "Langue",
			RangeLexile: "Lexile Range",
			CollectionLibrary: "Collection",
			Publisher: "Editeur",
			ContentProvider: "Fournisseur de contenu",
		},
		limiters: {
			fullText: "Texte intégral",
			openAccess: "Accès ouvert",
			publicationDate: "Date de publication",
			peerReviewedArticle: "Relu par un comité",
		},
	},
	components: {
		header: {
			login: "Connexion",
			logout: "Déconnexion",
			title: "Accès aux ressources documentaires du CNRS",
			questions: "FAQ",
			resources: "Listes des ressources",
			licences: "Licences",
			tests: "Tests",
			news: "Actualités",
			user: {
				history: "Mon Historique",
				bookmark: "Mes Favoris",
				notifications: "Mes Alertes",
				legacy: "Vous n'êtes pas connecté au niveau individuel",
				settings: "Paramètres",
			},
		},
		authentication: {
			title: "Identifiez-vous",
			info: "La ressource ou le service souhaité est réservé aux ayants droit du CNRS. Pour y accéder il est nécessaire de s'identifier.",
			mode: "Veuillez sélectionner votre mode de connexion :",
			janus: {
				button: "Via le gestionnaire d'identité janus",
				tooltip:
					"Compte personnel pour l'ensemble des services du CNRS : Agate, Simbad...",
				ask: "Demander un compte janus",
			},
			legacy: {
				button: "Via le code d'accès de votre unité",
				username: "Indentifiant",
				password: "Mot de passe",
				login: "Connexion",
				error:
					"L'identifiant/mot de passe saisi n'a pas permis de vous connecter au portail.",
			},
			contact: "Nous contacter",
		},
		dialog: {
			title: {
				alert: "Réglages Alerte",
				bookmark: "Ressource personnelle",
			},
			fields: {
				title: "Titre",
				url: "URL",
			},
			cancel: "Annuler",
			save: "Enregistrer",
		},
		nav: {
			article: "Article",
			database: "Plateformes",
			publication: "Revue, ouvrage",
			researchData: "Données de recherche",
		},
		table: {
			noData: "Aucun résultat trouvé.",
			content: {
				doi: "DOI",
				doiColon: "DOI : ",
				type: "Type",
				publicationYear: "Année de publication",
				description: "Description",
				subjects: "Mots clés",
				term: "Terme recherchés",
				domain: "Domaine",
				limiters: "Limites",
				facets: "Facettes",
				actions: "Actions",
				nbResult: "Nombre de résultats : ",
				result_one: "résultat",
				result_other: "résultats",
				accessNumber: "Numéro d'accès",
				dbId: "D&B Key Business Ratios",
				languages: "Langue",
				publisherUrl: "Publisher URL",
				noAccess: "Pas d'accès pour cet article",
				issnOnline: "eISSN : ",
				issnPrint: "pISSN : ",
				isbnOnline: "eISBN : ",
				isbnPrint: "pISBN : ",
				present: "Présent",
				links: "Accès à l'article",
				pdf: "Accès au pdf",
				alert: {
					active: {
						day: "Quotidenne",
						week: "Hebdomadaire",
						month: "Mensuelle",
					},
					disable: "Désactiver/réactiver l'alerte",
				},
			},
		},
		facet: {
			title: "Filtrer",
			text: "Type de documents",
			reviewed: "Relu par un comité de lecture",
			fullText: "Texte intégral",
			openAccess: "Accès ouvert",
			date: "Date de publication",
			to: "à",
			source: "Type de ressource",
			subject: "Mot clé",
			journal: "Titre de publication",
			language: "Langue",
			lexile: "Lexile Range",
			collection: "Collection",
			publisher: "Editeur",
			provider: "Fournisseur de contenu",
			reset: "Réinitialiser vos filtres",
			type: "Type de publication",
			chips: {
				title: "Titre",
				description: "Description",
				subject: "Sujet",
				doi: "DOI",
			},
		},
		icon: {
			openAccess: "Accès gratuit au contenu de la revue",
			notComplete: "Accès à la platforme partiel",
			diamond:
				"Publication en Accès Ouvert gratuit pour les auteurs et les lecteurs",
		},
		button: {
			favourite: {
				tooltip: "Ajouter aux favoris",
			},
		},
		dnd: {
			favourite: {
				open: "Accéder",
				delete: "Supprimer",
			},
		},
		news: {
			from: "Du ",
			to: " au ",
		},
		pageDate: {
			updateAt: "mise à jour le",
		},
		footer: {
			about: "A propos",
			contact: "Contact",
			legal: "Mentions légales",
			mail: {
				subject: "Demande d’assistance",
				body: `Bonjour,
Afin de répondre au mieux à votre demande, nous vous remercions de bien vouloir préciser votre :

 • Nom, Prénom :
 • Code unité (ex :UMR 12344) :
 • Demande, question ou problème rencontré, suggestion de ressource, …

Cordialement`,
			},
		},
		domains: {
			INSB: "Biologie",
			INC: "Chimie",
			INEE: "Ecologie & Environnement",
			INSIS: "Ingénierie",
			IN2P3: "Nucléaire & Particules",
			INSMI: "Mathématiques",
			INP: "Physique",
			INSHS: "Sciences Humaines & Sociales",
			INS2I: "Sciences Informatiques",
			INSU: "Terre & Univers",
			REAXYS: "REAXYS",
		},
		empty: {
			message: "Aucune ressource trouvée.",
		},
		searchError: {
			message:
				"Une erreur est survenue lors de la recherche. Veuillez réinitialiser les filtres ou réessayer plus tard.",
		},
	},
	pages: {
		root: {
			title: "Accueil",
			seeMore: "Voir plus",
			emptyFavorites:
				"Epingler des favoris dans la page des favoris (lien) pour les voir apparaitre ici.",
		},
		resources: {
			title: "Listes des ressources documentaires",
		},
		about: {
			title: "A propos",
		},
		article: {
			title: "Article",
			searchBar:
				"Rechercher des articles, des chapitres de livre, des DOIs, des auteurs, des mots du résumé du titre, ISSN, ISBN.",
			selectAll: "Tout sélectionner",
			order: {
				dateAsc: "+ récent",
				dateDesc: "+ ancien",
				relevance: "pertinence",
			},
		},
		contact: {
			title: "Contact",
		},
		database: {
			title: "Plateformes",
			oa: "Accès Ouvert",
			anonymousMessage: "Connectez-vous pour accéder à toutes les plateformes.",
			searchDatabase: "Rechercher une plateforme",
			platform_one: "plateforme",
			platform_other: "plateformes",
			filters: {
				title: "Filtres",
				default: "",
				document: "Documents",
				content: "Contenu",
				oa: "Accès Ouvert",
				is_text_integral: "Texte intégral",
				is_completed: "Complétude: 100%",
				without_embargo: "Sans embargo",
				is_archived: "Archives",
				is_current: "Courants",
				type_news: "Revue",
				type_book: "Livre",
				type_database: "Base de données",
				type_data: "Données de recherche",
			},
		},
		publication: {
			title: "Revue, ouvrage",
			searchBar: "Rechercher des titres de revues, de livres...",
		},
		legal: {
			title: "Mentions légales",
		},
		researchData: {
			title: "Données de recherche",
			search: {
				bar: "Recherche",
				chips: {
					by: "Par",
				},
			},
		},
		faq: {
			title: "FAQ",
		},
		licences: {
			title: "Licences",
			empty: "Aucune licence trouvée.",
			pdf: "Lien PDF :",
		},
		news: {
			title: "Actualités",
		},
		tests: {
			title: "Tests",
		},
		history: {
			title: "Historique",
			buttons: {
				delete: "Supprimer l'historique",
				disable: "Activer/Désactiver toutes les alertes",
			},
			confirm: {
				delete:
					"Voulez vous vraiment supprimer tout l'historique (hors alertes) ?",
			},
		},
		alert: {
			title: "Alerte",
		},
		favourite: {
			title: "Mes Favoris",
			superFavourites: "Mes favoris épinglés",
			add: "Ajouter une ressource personnelle",
			pin: "Épingler {{url}}",
			unpin: "Désépingler {{url}}",
			delete: "Supprimer {{url}}",
		},
		userSettings: {
			title: "Mes préférences",
			homeSection: {
				title: "Accueil",
				description: "Quelles sections souhaitez-vous voir sur l'accueil ?",
				displayFavorites: "Favoris",
				displayTestNews: "Actualités",
			},
			searchSection: {
				title: "Recherche",
				description:
					"Lorsque vous commencez une recherche, sur quel onglet souhaitez-vous arriver ?",
				article: "Article",
				journal: "Revue",
				platform: "Plateforme",
				searchData: "Données de recherche",
			},
			generalSection: {
				title: "Général",
				descriptionLanguage: "Quelle langue souhaitez-vous ?",
				auto: "Automatique",
				fr: "Français",
				en: "Anglais",
				descriptionTheme: "Quel thème souhaitez-vous ?",
				light: "Clair",
				dark: "Sombre",
			},
		},
	},
	error: {
		"404": {
			title: "404 - Page non trouvée",
			message: "La page acutelle n'a pas étais trouvé.",
		},
		return: "Retourner à l’accueil ",
		component: "Le composant {{name}} a rencontré une erreur",
	},
};

export default fr;
