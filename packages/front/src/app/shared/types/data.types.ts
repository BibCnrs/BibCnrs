import type { UniqueIdentifier } from "@dnd-kit/core";
import type { Institute, Url } from "./types";

export type MetadoreResultTitleType = {
	title: string;
	lang?: string;
};

export type MetadoreResultDescriptionType = {
	descriptionType: string;
	description: string;
	lang?: string;
};

export type MetadoreResultType = {
	id: number;
	doi: string;
	type: string;
	titles: MetadoreResultTitleType[];
	descriptions: MetadoreResultDescriptionType[];
	subjects: string[];
	publicationYear: number;
	url: string;
};

export type MetadoreDataType = {
	results?: MetadoreResultType[];
	totalHits?: number;
	maxPage: number;
	currentPage: number;
};

export type AutoCompleteFragmentType = {
	text: string;
	user: boolean;
};

export type AutoCompleteTermType = {
	term: string;
	fragments: AutoCompleteFragmentType[];
	score: number;
	domain: string;
};

export type AutoCompleteDataType = {
	processingTime: number;
	terms: AutoCompleteTermType[];
};

export type CMSDataType = {
	id: number;
	name_fr: string;
	name_en: string;
	content_fr: string;
	content_en: string;
	page: "faq" | "home" | "legal";
	from: string;
	to: string | null;
	enable: boolean;
};

export type CMSResultDataType = CMSDataType[];

export type TypeDatabaseEnum = "news" | "book" | "database" | "data";

export type DatabaseEntryDataType = {
	id: number;
	name_fr: string;
	name_en: string;
	text_fr: string;
	text_en: string;
	url_fr: string;
	url_en: string;
	active: boolean;
	oa: boolean;
	use_proxy: boolean;
	communities: number[]; // Make a type
	domains: Institute[]; // Make a type
	is_text_integral: boolean;
	without_embargo: boolean;
	is_completed: boolean;
	is_archived: boolean;
	type: TypeDatabaseEnum[];
};

export type DatabaseItemProps = DatabaseEntryDataType & {
	// Pre computed language specific text
	name: string;
	url: string;
	text: string;
};

export type DatabaseDataType = DatabaseEntryDataType[];

export type ResourceDataType = {
	id: number;
	name_fr: string;
	name_en: string;
	href: string;
	enable: boolean;
};

export type ResourcesDataType = ResourceDataType[];

export type FavouriteResourceDataType = {
	id: UniqueIdentifier;
	title: string;
	url: string;
	personal?: boolean;
	isSuperFavorite?: boolean;
};

export type UserSettingsDataType = {
	displayFavorites: boolean;
	displayTestNews: boolean;
	defaultSearchMode: "article" | "journal" | "platform" | "searchData";
	defaultLanguage: "auto" | "fr" | "en";
	defaultTheme: "auto" | "light" | "dark";
};

export type SessionUserDataType = {
	id: number;
	username: string;
	domains: Institute[];
	favorite_domain?: Institute;
	favouriteResources?: FavouriteResourceDataType[];
	origin?: string;
	legacy: boolean;
	settings?: UserSettingsDataType;
};

export type LicenceDataType = {
	id: number;
	name_fr: string;
	name_en: string;
	content_fr: string;
	content_en: string;
	pdf?: {
		src: string;
		title: string;
	};
	enable: boolean;
	common: boolean;
};

export type LicencesDataType = LicenceDataType[];

export type TestNewUrlDataType = Url & {
	proxy: true;
};

export type Media = {
	id: number;
	file_name: string;
	file: string;
	name: string;
	url: string;
};

export type TestNewDataType = {
	id: string;
	name_fr: string;
	name_en: string;
	content_fr: string;
	content_en: string;
	page: string;
	from: string;
	to: string;
	urls: TestNewUrlDataType[];
	enable: boolean;
	media?: Media;
};

export type TestsNewsDataType = TestNewDataType[];

export type HistoryQueriesDataType = {
	boolean: "AND" | "OR";
	term: string;
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	suggestedTerms: any[];
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	field: any | number;
	key: string;
};

export type ArticleFacetsKeyDataType =
	| "CollectionLibrary"
	| "ContentProvider"
	| "Journal"
	| "Language"
	| "Publisher"
	| "RangeLexile"
	| "SourceType"
	| "SubjectEDS";

export type PublicationFacetsKeyDataType =
	| "PublisherPubDb"
	| "SubjectPubDb"
	| "TypePublicationPubD";

export type HistoryEntryFacetsDataType = Record<
	ArticleFacetsKeyDataType,
	string[]
>;

export type HistoryEntryLimiterDataType = {
	fullText: boolean;
	openAccess: boolean;
	publicationDate: {
		from: number | null;
		to: number | null;
	};
	peerReviewed: boolean;
	peerReviewedArticle: boolean;
	publicationId: number | null;
};

export type HistoryEntryDataType = {
	id: number;
	hasAlert: false;
	frequence: "day" | "month" | "week";
	active: boolean;
	nb_results: number;
	event: {
		queries: HistoryQueriesDataType[];
		limiters: HistoryEntryLimiterDataType;
		activeFacets: HistoryEntryFacetsDataType;
		sort: "relevance";
		resultPerPage: number;
		domain: Institute;
		totalHits: number;
	};
};

export type HistoryDataType = {
	histories: HistoryEntryDataType[];
	totalCount: number;
};

export type ArticleLinksDataType = {
	fullTextLinks: Url[];
	pdfLinks: Url[];
	html?: string | null;
	urls: Url[];
};

export type RetrieveItemValueObjectDataType = {
	term: string;
	field: string;
	value: RetrieveItemValueObjectDataType[] | string[] | string;
};

export type RetrieveItemValueDataType = Array<
	| RetrieveItemValueObjectDataType
	| RetrieveItemValueObjectDataType[]
	| string[]
	| string
>;

export type RetrieveItemDataType<V> = {
	name: string;
	label: string;
	value: V[];
};

export type ArticleRetrieveDataType = {
	items: Array<RetrieveItemDataType<RetrieveItemValueDataType>>;
	dbLabel: string;
	dbId: string;
	articleLinks: ArticleLinksDataType;
};

export type ArticleResultDataType = {
	id: number;
	an: string;
	dbId: string;
	articleLinks?: ArticleLinksDataType | null;
	exportLinks?: {
		ris: string;
		bibtex: string;
	} | null;
	doi?: string | null;
	title?: string | null;
	source?: string | null;
	authors?: string[] | null;
	publicationDate?: string | null;
	languages?: string[] | null;
	database: string;
	subjects?: string[] | null;
	publicationType: string;
	abstract?: string | null;
	copyright?: string | null;
	affiliationAuthor?: string[] | null;
	issn?: string[] | null;
};

export type FacetValueDataType = {
	Value: string;
	Count: number;
	AddAction: string;
};

export type FacetDataType<T extends string> = {
	Id: T;
	Label: string;
	AvailableFacetValues: FacetValueDataType[];
};

export type ArticleDataType = {
	results: ArticleResultDataType[];
	totalHits: number;
	currentPage: 1;
	maxPage: number;
	facets: Array<FacetDataType<ArticleFacetsKeyDataType>>;
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	activeFacets: any;
	dateRange: {
		min: number;
		max: number;
	};
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	unparsed: any;
};

export type PublicationCoverageDataType = Array<{
	start: {
		month: string;
		day: string;
		year: string;
	};
	end: {
		month: string;
		day: string;
		year: string;
	};
}>;

export type PublicationHolding = Url & {
	isCurrent: boolean;
	coverage: PublicationCoverageDataType;
	embargo: {
		unit: string;
		value: number;
	};
};

export type PublicationResultDataType = {
	id: number;
	publicationId: string;
	issnOnline: string[] | null;
	issnPrint: string[] | null;
	isbnOnline: string[] | null;
	isbnPrint: string[] | null;
	type: string;
	title: string;
	isDiamond: boolean;
	fullTextHoldings: PublicationHolding[];
};

export type PublicationDataType = {
	results: PublicationResultDataType[];
	totalHits: number;
	currentPage: number;
	maxPage: number;
	facets: Array<FacetDataType<PublicationFacetsKeyDataType>>;
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	activeFacets: any;
	dateRange: {
		min: number;
		max: number;
	};
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	unparsed: any;
};

export type PublicationRetrieveDataType = {
	items: Array<RetrieveItemDataType<string>>;
};
