const configFunction = () => ({
	mailer: {
		host: process.env.MAIL_SERVER_HOST,
		port: Number.parseInt(process.env.MAIL_SERVER_PORT, 10),
		from: process.env.MAIL_FROM,
		to: process.env.MAIL_TO,
	},
	auth: {
		cookieSecret: process.env.cookie_secret,
		headerSecret: process.env.header_secret,
		adminSecret: process.env.admin_secret,
		expiresIn: 10 * 3600, // 10 hours
	},
	services: {
		apiEndpoint: process.env.BIBAPI_HOST,
		bibadmin: process.env.bib_admin_host,
		contentDelivery: process.env.BIB_CONTENT_DELIVERY_HOST,
	},
	metadore: {
		url: process.env.METADORE_URL,
		apiKey: process.env.METADORE_API_KEY,
	},
	renater: {
		fakeLogin: process.env.RENATER_FAKE_LOGIN === "true",
	},
	ebsco: {
		host: process.env.ebsco_host,
		port: process.env.ebsco_port,
		proxy: process.env.http_proxy,
		allowedLimiters: ["FT", "DT1", "RV", "RV3", "AU", "SO", "TI", "LA99"],
		doajUrl: process.env.DOAJ_URL || "https://doaj.org/api/",
		crossref: process.env.crossref || "http://api.crossref.org/works/",
		apiEndpoint: process.env.BIBAPI_HOST,
		ezUnpaywallKey: process.env.EZ_UNPAYWALL_KEY,
		ezUnpaywallUrl: process.env.EZ_UNPAYWALL_URL,
	},
	redis: {
		host: process.env.REDIS_HOST,
		port: Number.parseInt(process.env.REDIS_PORT || "6379", 10),
	},
	ezProxy: {
		ticketSecret: process.env.ticket_secret,
	},
	history: {
		maxSearchHistoryAgeInMonths: Number.parseInt(
			process.env.MAX_SEARCH_HISTORY_AGE_IN_MONTHS || "2",
			10,
		),
	},
});

export type Config = ReturnType<typeof configFunction>;

export default configFunction;