import type { Common } from "../I18N";

/**
 * English translation
 */
const en: Common = {
	ebsco: {
		facets: {
			SubjectEDS: "Subject",
			SourceType: "Source Type",
			Journal: "Publication",
			Language: "Language",
			CollectionLibrary: "Collection",
			Publisher: "Publisher",
			ContentProvider: "Content Provider",
		},
		limiters: {
			fullText: "Full Text",
			openAccess: "Open Access",
			publicationDate: "Publication Date",
			peerReviewedArticle: "Peer reviewed",
		},
	},
	components: {
		header: {
			login: "Sign in",
			logout: "Logout",
			title: "CNRS documents access",
			questions: "Q&A",
			resources: "Lists of resources",
			licences: "Licences",
			tests: "Tests",
			news: "News",
			user: {
				profile: "Profile",
				history: "My History",
				bookmark: "My Bookmark",
				notifications: "My Alerts",
				legacy: "You are not logged on at the individual level",
				settings: "Settings",
			},
		},
		authentication: {
			title: "Welcome",
			info: "This resource or service is reserved for CNRS rights holders. Please sign in.",
			mode: "Please select your signing-in mode:",
			janus: {
				button: "Connect via Janus",
				tooltip: "Personal account for all CNRS services Agate, Simbad ...",
				ask: "Request a janus account",
			},
			legacy: {
				button: "Unit access code",
				username: "Username",
				password: "Password",
				login: "Connection",
				error:
					"The username/password entered did not allow you to connect to the portal.",
			},
			contact: "Contact us",
		},
		dialog: {
			title: {
				alert: "Alert settings",
				bookmark: "Personal Resource",
			},
			fields: {
				title: "Title",
				url: "URL",
			},
			cancel: "Cancel",
			save: "Save",
		},
		nav: {
			article: "Article",
			database: "Platform",
			publication: "Journal, book",
			researchData: "Research data",
		},
		search: {
			noData: "No result found.",
			noSearch: "Launch a search to find resources.",
			content: {
				failedFetch: "An error occurred during the retrieve.",
				doi: "DOI",
				doiColon: "DOI: ",
				type: "Type",
				publicationYear: "Publication year",
				description: "Description",
				subjects: "Keys words",
				term: "Searched terms",
				domain: "Discipline",
				limiters: "Limits",
				facets: "Facets",
				actions: "Actions",
				nbResult: "Results count:",
				result_one: "result",
				result_other: "results",
				accessNumber: "Accession number",
				dbId: "D&B Key Business Ratios",
				languages: "Language",
				publisherUrl: "Publisher URL",
				noAccess: "No access for this article",
				issnOnline: "eISSN: ",
				issnPrint: "pISSN: ",
				isbnOnline: "eISBN: ",
				isbnPrint: "pISBN: ",
				present: "Present",
				links: 'Access to "{{ title }}" article',
				pdf: "Pdf access",
				seeMore: "See more >",
				seeMoreAbout: "See more about {{ title }}",
				abstract: "Abstract",
				contributors: "Contributors",
				collections: "Collections",
				source: "Source",
				authors: "Authors",
				pageCount: "Page count",
				"Peer Reviewed": "Peer Reviewed",
				"Publication Date": "Publication Date",
				"Document Type": "Document Type",
				Descriptors: "Descriptors",
				"Accession Number": "Accession Number",
				"Original Identifier": "Original Identifier",
				Language: "Language",
				Rights: "Rights",
				"Resource Type": "Resource Type",
				"Publisher Information": "Publisher Information",
				Subjects: "Sujets",
				Author: "Author",
				Category: "Category",
				AccessLink: "Access to the document",
				alert: {
					active: {
						day: "Daily",
						week: "Weekly",
						month: "Monthly",
					},
					disable: "Disable/enable the alert",
				},
			},
		},
		advancedSearch: {
			modalTitle: "Advanced Search",
			add: "Add item below",
			remove: "Remove this item",
			search: "Search",
			operator: "Operator",
			and: "AND",
			or: "OR",
			not: "NOT",
			field: "Field",
			author: "Author",
			doi: "DOI",
			isbn: "ISBN",
			issn: "ISSN",
			keywords: "Keywords",
			abstract: "Abstract",
			title: "Title",
			source: "Source title",
			humanQuery: "How will the query be executed?",
			reset: "Reset",
		},
		facet: {
			title: "Filter",
			text: "Documents type",
			reviewed: "Peer reviewed",
			fullText: "Full Text",
			openAccess: "Open Access",
			date: "Publication Date ({{from}} - {{to}})",
			to: "to",
			source: "Source Type",
			subject: "Subject",
			journal: "Publication",
			language: "Language",
			lexile: "Lexile Range",
			collection: "Collection",
			publisher: "Publisher",
			provider: "Content Provider",
			reset: "Reset your filters",
			type: "Type of publication",
			more: "More filters",
			chips: {
				title: "Title",
				description: "Description",
				subject: "Subject",
				doi: "DOI",
			},
		},
		history: {
			delete: "Delete entry {{ term }}",
			search: "Search for {{ term }}",
			alert: "Add search alert for {{ term }}",
		},
		icon: {
			openAccess: "Free access to the journal's content",
			diamond:
				"Open Access publication, free of charge for authors and readers",
			notComplete: "Partial access to the platform",
		},
		button: {
			favourite: {
				tooltip: "Add {{ title }} to favourites",
			},
		},
		dnd: {
			favourite: {
				open: "Access",
				delete: "Delete",
			},
		},
		news: {
			from: "From ",
			to: " to ",
		},
		pageDate: {
			updateAt: "updated on",
		},
		footer: {
			about: "About",
			contact: "Contact",
			legal: "Legal notice",
			privacy: "Privacy",
			mail: {
				subject: "Request for assistance",
				body: `Hello,
In order to best answer your request, we would be grateful if you could specify your :

 • Name, First name:
 • Unit code (e.g.: UMR 12344):
 • Request, question or problem encountered, suggestion of resource...

Sincerely`,
			},
		},
		domains: {
			INSB: "Biology",
			INC: "Chemistry",
			INEE: "Ecology & Environment",
			INSIS: "Engineering",
			IN2P3: "Nuclei & Particles",
			INSMI: "Mathematics",
			INP: "Physics",
			INSHS: "Humanities & Social Sciences",
			INS2I: "Informatics",
			INSU: "Earth & Space",
			REAXYS: "REAXYS",
		},
		empty: {
			message: "No resource found.",
		},
		searchError: {
			message:
				"An error occurred during the search. Please reset the filters or try again later.",
		},
		openablePaper: {
			open: "Open {{ title }}",
			close: "Close {{ title }}",
		},
		fakeSearchBar: {
			homepage: "< Homepage",
		},
		userPopup: {
			title: "New",
			description: "Configure your preferences",
			configure: "Configure",
		},
	},
	pages: {
		root: {
			title: "Home",
			seeMoreFavourites: "See more favorites",
			seeMoreNews: "See more news",
			emptyFavorites: "Pin your favourite resources to find them easily later.",
		},
		resources: {
			title: "Lists of documentaries resources",
		},
		about: {
			title: "About",
		},
		article: {
			title: "Article",
			searchBar:
				"Search articles, book chapters, DOIs, authors, words from the title abstract, ISSN, ISBN.",
			selectAll: "Select all",
			order: {
				dateAsc: "newest",
				dateDesc: "oldest",
				relevance: "relevance",
			},
		},
		contact: {
			title: "Contact",
		},
		database: {
			title: "Platforms",
			oa: "Open Access",
			anonymousMessage: "Sign in to access all platforms",
			searchDatabase: "Search platforms",
			platform_zero: "No platform found",
			platform_one: "One plateform",
			platform_other: "{{ count }} plateforms",
			filters: {
				title: "Filters",
				default: "",
				document: "Documents",
				content: "Content",
				oa: "Open Access",
				is_text_integral: "Full text",
				is_completed: "Completeness: 100%",
				without_embargo: "Without embargo",
				is_archived: "Archives",
				is_current: "Currents",
				type_news: "Journal",
				type_book: "Book",
				type_database: "Database",
				type_data: "Data",
			},
		},
		publication: {
			title: "Journal, book",
			searchBar: "Search journal titles, book titles...",
		},
		legal: {
			title: "Legal notice",
		},
		researchData: {
			title: "Research data",
			search: {
				bar: "Search",
				chips: {
					by: "By",
				},
			},
		},
		faq: {
			title: "Q&A",
		},
		licences: {
			title: "Licences",
			empty: "No licences was founds.",
			pdf: "PDF link:",
		},
		privacy: {
			title: "Privacy",
			empty: "No privacy policy was found.",
		},
		news: {
			title: "News",
		},
		tests: {
			title: "Tests",
		},
		history: {
			title: "History",
			search: "Search my history",
			buttons: {
				delete: "Delete history",
				disable: "Enable/disable all alert",
			},
			confirm: {
				delete:
					"Do you really want to delete all the history (excluding alerts)?",
			},
			confirmDelete: {
				title: "Delete a history",
				description: "Do you really want to delete this history?",
				cancel: "Cancel",
				confirm: "Confirm",
			},
		},
		alert: {
			title: "Alerts",
		},
		favourite: {
			title: "My Favourites",
			search: "Search my favourites",
			favourites: "Mes Favoris",
			superFavourites: "My pinned favourites",
			sharedFavourites: "Shared favourites",
			add: "Add a personal resource",
			pin: "Pin {{url}}",
			unpin: "Unpin {{url}}",
			delete: "Delete {{url}}",
			emptyFavorites: "No favourites found.",
			article: "Article",
			publication: "Journal, book",
			database: "Plateform",
			metadore: "Research data ",
			personal: "Personal resource",
			shared: "Shared resource",
			reset: "Reset filters",
			confirmDelete: {
				title: "Delete a favourite",
				description: "Do you really want to delete this favourite?",
				cancel: "Cancel",
				confirm: "Confirm",
			},
			filters: {
				title: "Filters",
				article: "Articles ({{ count }})",
				publication: "Journals, books ({{ count }})",
				database: "Plateforms ({{ count }})",
				metadore: "Research data ({{ count }})",
				personal: "Personal resources ({{ count }})",
			},
		},
		userSettings: {
			title: "My preferences",
			homeSection: {
				title: "Home",
				description: "Witch resources do you want to see on the home page?",
				displayFavorites: "Favorites",
				displayTestNews: "News",
			},
			searchSection: {
				title: "Search",
				description:
					"When you start a search, which tab do you want to arrive on?",
				article: "Article",
				journal: "Journal",
				platform: "Platform",
				searchData: "Research data",
				descriptionArticleLinkType:
					"Which kind of article would you like to showcase?",
				oa: "Open Access",
				fullText: "Full Text",
			},
			generalSection: {
				title: "General",
				descriptionLanguage: "What language do you want?",
				auto: "Automatic",
				fr: "French",
				en: "English",
				descriptionTheme: "What theme do you want?",
				light: "Light",
				dark: "Dark",
				systemLang: "System language",
				systemTheme: "System theme",
			},
		},
	},
	error: {
		"404": {
			title: "404 - Page not found",
			message: "The current page as not been found.",
		},
		return: "Go back to home",
		component: "The component {{name}} have encountered an error",
	},
};

export default en;
