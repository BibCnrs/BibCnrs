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
			CollectionLibrary: "Collection",
			Publisher: "Editeur",
			ContentProvider: "Fournisseur de contenu",
			PublicationType: "Type de publication",
			affiliation: "Affiliation",
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
			skipToContent: "Aller au contenu principal",
			skipToNav: "Aller à la navigation",
			title: "Accès aux ressources documentaires du CNRS",
			questions: "FAQ",
			resources: "Listes des ressources",
			licences: "Licences",
			tests: "Tests",
			news: "Actualités",
			user: {
				profile: "Profil",
				history: "Mon Historique",
				bookmark: "Mes Favoris",
				notifications: "Mes Alertes",
				legacy: "Vous n'êtes pas connecté au niveau individuel",
				settings: "Mes Paramètres",
			},
		},
		authentication: {
			title: "Bienvenue",
			info: "La ressource ou le service souhaité est réservé aux ayants droit du CNRS. Pour y accéder il est nécessaire de s'identifier.",
			mode: "Veuillez sélectionner votre mode de connexion :",
			janus: {
				button: "Connectez-vous via janus",
				tooltip:
					"Compte personnel pour l'ensemble des services du CNRS : Agate, Simbad...",
				ask: "Demander un compte janus",
			},
			legacy: {
				button: "Code d'accès de votre unité",
				username: "Identifiant",
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
				invalidTitle: "Le titre est requis",
				invalidUrl:
					"L'URL est requise et doit commencer par http:// ou https://",
			},
			cancel: "Annuler",
			save: "Enregistrer",
		},
		nav: {
			article: "Articles",
			database: "Plateformes",
			publication: "Revues, ouvrages",
			researchData: "Données de recherche",
		},
		search: {
			noData: "Aucun résultat trouvé.",
			noSearch: "Veuillez effectuer une recherche pour découvrir les résultats",
			content: {
				failedFetch: "Une erreur est survenue lors de la récupération.",
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
				links: 'Accès à l\'article"{{ title }}"',
				pdf: "Accès au pdf",
				seeMore: "En savoir plus >",
				seeMoreAbout: "En savoir plus sur {{ title }}",
				abstract: "Résumé",
				contributors: "Contributeurs",
				collections: "Collections",
				source: "Source",
				authors: "Auteurs",
				pageCount: "Nombre de pages",
				"Peer Reviewed": "Relu par un comité",
				"Publication Date": "Date de publication",
				"Document Type": "Type de document",
				Descriptors: "Descripteurs",
				"Accession Number": "Numéro d'accès",
				"Original Identifier": "Identifiant original",
				Language: "Langue",
				Rights: "Droits",
				"Resource Type": "Type de ressource",
				"Publisher Information": "Informations de l'éditeur",
				Subjects: "Sujets",
				Author: "Auteur",
				Category: "Catégorie",
				AccessLink: "Accès au document",
				affiliation: "Affiliation auteurs",
				publisher: "Editeur",
				alert: {
					active: {
						day: "Quotidienne",
						week: "Hebdomadaire",
						month: "Mensuelle",
					},
					disable: "Désactiver/réactiver l'alerte",
				},
			},
		},
		advancedSearch: {
			modalTitle: "Recherche avancée",
			add: "Ajouter un élément",
			addGroup: "Ajouter un groupe",
			remove: "Retirer cet élément",
			removeGroup: "Retirer ce groupe",
			search: "Rechercher",
			operator: "Operateur",
			and: "ET",
			or: "OU",
			not: "SAUF",
			field: "Champs",
			author: "Auteur",
			doi: "DOI",
			isbn: "ISBN",
			issn: "ISSN",
			keywords: "Mots-clés",
			abstract: "Résumé",
			title: "Titre",
			source: "Titre revue",
			humanQuery: "Comment sera exécutée la requête ?",
			reset: "Réinitialiser",
			affiliation: "Affiliation auteur",
			publication_date: "Date de publication",
			language: "Langue",
			fr: "Français",
			en: "Anglais",
			es: "Espagnol",
		},
		facet: {
			title: "Filtrer",
			text: "Type de documents",
			reviewed: "Relu par un comité de lecture",
			fullText: "Texte intégral",
			openAccess: "Accès ouvert",
			date: "Date de publication ({{from}} - {{to}})",
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
			publicationType: "Type de publication",
			more: "Plus de filtres",
			less: "Moins de filtres",
			chips: {
				title: "Titre",
				description: "Description",
				subject: "Sujet",
				doi: "DOI",
			},
			affiliation: "Affiliation",
		},
		history: {
			delete: "Supprimer l'entrée {{ term }}",
			search: "Lancer la recherche {{ term }}",
			alert: "Ajouter une alerte pour la recherche {{ term }}",
		},
		icon: {
			openAccess: "Plateforme en accès ouvert intégral",
			complete: "Accès à 100% du contenu de la plateforme",
			diamond:
				"Publication en Accès Ouvert gratuit pour les auteurs et les lecteurs",
			withEmbargo:
				"Présence d'un embargo pour la majorité des titres de la plateforme (en général 1 an)",
			tooltip: {
				complete: "100%",
				diamond: "diamant",
				openAccess: "cadenas",
				withEmbargo: "horloge",
			},
		},
		button: {
			favourite: {
				tooltip: "Ajouter {{ title }} aux favoris",
			},
		},
		dnd: {
			favourite: {
				open: "Accéder",
				delete: "Supprimer",
			},
			handler: "Déplacer {{ title }}",
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
			privacy: "Politique de confidentialité",
			accessibility: "Accessibilité",
			plan: "Plan du site",
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
			VERIF: "Verif",
		},
		empty: {
			message: "Aucune ressource trouvée.",
		},
		searchError: {
			message:
				"Une erreur est survenue lors de la recherche. Veuillez réinitialiser les filtres ou réessayer plus tard.",
		},
		openablePaper: {
			open: "Déplier {{ title }}",
			close: "Replier {{ title }}",
		},
		fakeSearchBar: {
			homepage: "< Accueil",
		},
		userPopup: {
			title: "Nouveau",
			description: "Personnalisez les paramètres de votre compte",
			configure: "Paramétrer",
		},
	},
	pages: {
		root: {
			title: "Accueil",
			seeMoreFavourites: "Voir plus de favoris",
			seeMoreNews: "Voir plus d'actualités",
			emptyFavorites:
				"Epingler des favoris dans la page des favoris pour les voir apparaitre ici.",
		},
		resources: {
			title: "Listes des ressources documentaires",
		},
		about: {
			title: "A propos",
		},
		accessibility: {
			title: "Accessibilité",
		},
		plan: {
			title: "Plan du site",
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
			name: "Nom",
			oa: "Accès Ouvert",
			is_completed: "Complétude",
			embargo: "Embargo",
			anonymousMessage: "Connectez-vous pour accéder à toutes les plateformes.",
			searchDatabase: "Rechercher une plateforme",
			platform_zero: "Aucune plateforme",
			platform_one: "Une plateforme",
			platform_other: "{{ count }} plateformes",
			noResult: "Pas de résultat pour cette recherche",
			errorMessage: "une erreur est survenue lors du chargement de la page.",
			filters: {
				title: "Accès",
				default: "",
				document: "Antériorité",
				content: "Contenu",
				oa: "Ouvert",
				is_text_integral: "Texte intégral",
				is_completed: "Complet",
				without_embargo: "Sans embargo",
				is_archived: "Archives",
				is_current: "Année en cours",
				type_news: "Revues",
				type_book: "Livres",
				type_database: "Bases de données",
				type_data: "Données de recherche",
			},
		},
		publication: {
			title: "Revues, ouvrages",
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
		privacy: {
			title: "Politique de confidentialité",
			empty: "Aucune politique de confidentialité trouvée",
		},
		news: {
			title: "Actualités",
		},
		tests: {
			title: "Tests",
		},
		history: {
			title: "Historique",
			search: "Rechercher dans l'historique",
			buttons: {
				delete: "Supprimer l'historique",
				enableAlerts: "Activer toutes les alertes",
				disableAlerts: "Désactiver toutes les alertes",
			},
			confirm: {
				delete:
					"Voulez vous vraiment supprimer tout l'historique (hors alertes) ?",
			},
			tooltip: {
				delete:
					"Cette action supprimera tout votre historique, à l'exception de vos alertes",
			},
			confirmDelete: {
				title: "Supprimer une entrée",
				description: "Etês-vous sûr de vouloir supprimer cette entrée ?",
				cancel: "Annuler",
				confirm: "Confirmer",
			},
		},
		alert: {
			title: "Alertes",
		},
		favourite: {
			title: "Mes Favoris",
			search: "Rechercher dans mes favoris",
			favourites: "Mes Favoris",
			superFavourites: "Mes favoris épinglés",
			sharedFavourites: "Favoris épinglés",
			add: "Ajouter une ressource personnelle",
			pin: "Épingler {{url}}",
			unpin: "Désépingler {{url}}",
			delete: "Supprimer {{url}}",
			article: "Article",
			publication: "Revue, ouvrage",
			database: "Plateforme",
			metadore: "Données de recherche",
			personal: "Ressource personnelle",
			shared: "Ressource partagée",
			reset: "Réinitialiser la recherche",
			unknown: "Ressource favorite",
			emptyFavorites: "Aucun favoris n'a été trouvé pour cette catégorie.",
			confirmDelete: {
				title: "Supprimer un favori",
				description: "Etês-vous sûr de vouloir supprimer ce favori ?",
				cancel: "Annuler",
				confirm: "Confirmer",
			},
			filters: {
				title: "Filtres",
				article: "Articles ({{ count }})",
				publication: "Revues, ouvrages ({{ count }})",
				database: "Plateformes ({{ count }})",
				metadore: "Données de recherche ({{ count }})",
				personal: "Ressources personnelles ({{ count }})",
				noSource: "Ressources favorites ({{ count }})",
			},
		},
		userSettings: {
			title: "Mes paramètres",
			homeSection: {
				title: "Accueil",
				description: "Quelles sections souhaitez-vous voir sur l'accueil ?",
				displayFavorites: "Favoris épinglés",
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
				descriptionArticleLinkType:
					"Quel lien souhaitez-vous mettre en avant par résultat ?",
				oa: "Accès ouvert",
				fullText: "Éditeur",
				platformView: "Affichage de la page plateformes",
				platformViewCard: "Vignettes",
				platformViewList: "Liste",
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
				system: "Détection automatique",
			},
		},
	},
	error: {
		"404": {
			title: "404 - Page non trouvée",
			message: "La page actuelle n'a pas été trouvée.",
		},
		return: "Retourner à l’accueil ",
		component: "Le composant {{name}} a rencontré une erreur",
	},
	consent: {
		accept: "Accepter",
		learnMore: "En savoir plus",
		consent:
			"En poursuivant votre navigation sans modifier vos paramètres, vous acceptez l'utilisation de cookies destinés à mesurer de façon anonymisée la fréquentation du site.",
	},
};

export default fr;
