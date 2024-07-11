import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, useTranslation } from "react-i18next";
import type { SupportedLanguages, TFunction } from "../types/types";
import en from "./common/en";
import fr from "./common/fr";

/**
 * Type use to a localized error message
 */
type Error = {
	title: string;
	message: string;
};

/**
 * Type use to define the data use to localize the application
 */
export type Common = {
	ebsco: {
		facets: {
			SubjectEDS: string;
			SourceType: string;
			Journal: string;
			Language: string;
			CollectionLibrary: string;
			Publisher: string;
			ContentProvider: string;
		};
		limiters: {
			fullText: string;
			openAccess: string;
			peerReviewedArticle: string;
			publicationDate: string;
		};
	};
	components: {
		header: {
			title: string;
			login: string;
			logout: string;
			questions: string;
			resources: string;
			licences: string;
			tests: string;
			news: string;
			user: {
				profile: string;
				history: string;
				bookmark: string;
				notifications: string;
				legacy: string;
				settings: string;
			};
		};
		authentication: {
			title: string;
			info: string;
			mode: string;
			janus: {
				button: string;
				tooltip: string;
				ask: string;
			};
			legacy: {
				button: string;
				username: string;
				password: string;
				login: string;
				error: string;
			};
			contact: string;
		};
		dialog: {
			title: {
				alert: string;
				bookmark: string;
			};
			fields: {
				title: string;
				url: string;
			};
			cancel: string;
			save: string;
		};
		nav: {
			article: string;
			publication: string;
			database: string;
			researchData: string;
		};
		search: {
			noData: string;
			noSearch: string;
			content: {
				failedFetch: string;
				doi: string;
				doiColon: string;
				type: string;
				publicationYear: string;
				description: string;
				subjects: string;
				term: string;
				domain: string;
				limiters: string;
				facets: string;
				actions: string;
				nbResult: string;
				result_one: string;
				result_other: string;
				noAccess: string;
				publisherUrl: string;
				languages: string;
				accessNumber: string;
				dbId: string;
				issnOnline: string;
				issnPrint: string;
				isbnOnline: string;
				isbnPrint: string;
				present: string;
				links: string;
				pdf: string;
				seeMore: string;
				seeMoreAbout: string;
				abstract: string;
				contributors: string;
				collections: string;
				source: string;
				authors: string;
				pageCount: string;
				"Peer Reviewed": string;
				"Publication Date": string;
				"Document Type": string;
				Descriptors: string;
				"Accession Number": string;
				"Original Identifier": string;
				Language: string;
				Rights: string;
				"Resource Type": string;
				"Publisher Information": string;
				Subjects: string;
				Author: string;
				Category: string;
				AccessLink: string;
				alert: {
					active: {
						day: string;
						week: string;
						month: string;
					};
					disable: string;
				};
			};
		};
		advancedSearch: {
			modalTitle: string;
			add: string;
			remove: string;
			search: string;
			operator: string;
			and: string;
			or: string;
			not: string;
			field: string;
			author: string;
			doi: string;
			isbn: string;
			issn: string;
			keywords: string;
			abstract: string;
			title: string;
			source: string;
			humanQuery: string;
			reset: string;
		};
		facet: {
			title: string;
			text: string;
			reviewed: string;
			fullText: string;
			openAccess: string;
			date: string;
			to: string;
			source: string;
			subject: string;
			journal: string;
			language: string;
			lexile: string;
			collection: string;
			publisher: string;
			provider: string;
			reset: string;
			type: string;
			more: string;
			chips: {
				title: string;
				description: string;
				subject: string;
				doi: string;
			};
		};
		history: {
			delete: string;
			search: string;
			alert: string;
		};
		icon: {
			openAccess: string;
			notComplete: string;
			diamond: string;
		};
		button: {
			favourite: {
				tooltip: string;
			};
		};
		dnd: {
			favourite: {
				open: string;
				delete: string;
			};
		};
		news: {
			from: string;
			to: string;
		};
		pageDate: {
			updateAt: string;
		};
		footer: {
			about: string;
			contact: string;
			legal: string;
			privacy: string;
			mail: {
				subject: string;
				body: string;
			};
		};
		domains: {
			INSB: string;
			INC: string;
			INEE: string;
			INSIS: string;
			IN2P3: string;
			INSMI: string;
			INP: string;
			INSHS: string;
			INS2I: string;
			INSU: string;
			REAXYS: string;
		};
		empty: {
			message: string;
		};
		searchError: {
			message: string;
		};
		openablePaper: {
			open: string;
			close: string;
		};
		fakeSearchBar: {
			homepage: string;
		};
		userPopup: {
			title: string;
			description: string;
			configure: string;
		};
	};
	pages: {
		root: {
			title: string;
			seeMoreFavourites: string;
			seeMoreNews: string;
			emptyFavorites: string;
		};
		article: {
			title: string;
			searchBar: string;
			selectAll: string;
			order: {
				dateAsc: string;
				dateDesc: string;
				relevance: string;
			};
		};
		publication: {
			title: string;
			searchBar: string;
		};
		database: {
			title: string;
			oa: string;
			anonymousMessage: string;
			searchDatabase: string;
			platform_zero: string;
			platform_one: string;
			platform_other: string;
			filters: {
				title: string;
				default: string;
				document: string;
				content: string;
				oa: string;
				is_text_integral: string;
				is_completed: string;
				without_embargo: string;
				is_archived: string;
				is_current: string;
				type_news: string;
				type_book: string;
				type_database: string;
				type_data: string;
			};
		};
		researchData: {
			title: string;
			search: {
				bar: string;
				chips: {
					by: string;
				};
			};
		};
		licences: {
			title: string;
			empty: string;
			pdf: string;
		};
		privacy: {
			title: string;
			empty: string;
		};
		news: {
			title: string;
		};
		tests: {
			title: string;
		};
		history: {
			title: string;
			search: string;
			buttons: {
				delete: string;
				disable: string;
			};
			confirm: {
				delete: string;
			};
			confirmDelete: {
				title: string;
				description: string;
				cancel: string;
				confirm: string;
			};
		};
		alert: {
			title: string;
		};
		favourite: {
			title: string;
			search: string;
			favourites: string;
			superFavourites: string;
			add: string;
			pin: string;
			unpin: string;
			delete: string;
			emptyFavorites: string;
			article: string;
			publication: string;
			database: string;
			metadore: string;
			personal: string;
			reset: string;
			confirmDelete: {
				title: string;
				description: string;
				cancel: string;
				confirm: string;
			};
			filters: {
				title: string;
				article: string;
				publication: string;
				database: string;
				metadore: string;
				personal: string;
			};
		};
		faq: {
			title: string;
		};
		resources: {
			title: string;
		};
		about: {
			title: string;
		};
		contact: {
			title: string;
		};
		legal: {
			title: string;
		};
		userSettings: {
			title: string;
			homeSection: {
				title: string;
				description: string;
				displayFavorites: string;
				displayTestNews: string;
			};
			searchSection: {
				title: string;
				description: string;
				article: string;
				journal: string;
				platform: string;
				searchData: string;
			};
			generalSection: {
				title: string;
				descriptionLanguage: string;
				auto: string;
				fr: string;
				en: string;
				descriptionTheme: string;
				light: string;
				dark: string;
				systemLang: string;
				systemTheme: string;
			};
		};
	};
	error: {
		return: string;
		"404": Error;
		component: string;
	};
};

i18next
	.use(I18nextBrowserLanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "fr",
		debug: false,
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: {
				common: en,
			},
			fr: {
				common: fr,
			},
		},
	});

/**
 * export the translation function and the i18n system
 */
export const useFullTranslator = () => {
	return useTranslation("common");
};

/**
 * export the translation function
 */
export const useTranslator = (): TFunction => {
	const { t } = useFullTranslator();
	return t;
};

export const useLanguageKey = (): string => {
	const { i18n } = useFullTranslator();
	return i18n.language;
};

export const supportedLanguages: SupportedLanguages = [
	{ key: "fr", label: "FR - Français" },
	{ key: "en", label: "EN - English" },
];

export default i18next;
