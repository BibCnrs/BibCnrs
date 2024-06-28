export const SEARCH_PUBLICATION_MOCK = {
	results: [
		{
			id: 1,
			publicationId: "edp1922892",
			issnOnline: [],
			issnPrint: [],
			isbnOnline: ["9781475718607"],
			isbnPrint: ["9780387961293"],
			type: "Book",
			title: "Math!",
			fullTextHoldings: [
				{
					url: "https://inshs.bib.cnrs.fr/login?url=https://doi.org/10.1007/978-1-4757-1860-7",
					name: "Springer Nature eBooks (ISTEX - Licences Nationales)",
					isCurrent: false,
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1985",
							},
							end: {
								month: "12",
								day: "31",
								year: "1985",
							},
						},
					],
				},
			],
			isDiamond: false,
		},
		{
			id: 2,
			publicationId: "edp518391",
			issnOnline: ["19476213"],
			issnPrint: ["10724117"],
			isbnOnline: [],
			isbnPrint: [],
			type: "Journal",
			title: "Math Horizons",
			fullTextHoldings: [
				{
					url: "https://inshs.bib.cnrs.fr/login?url=https://www.jstor.org/journal/mathhorizons",
					name: "JSTOR Archival Journals and Primary Sources Collection",
					isCurrent: true,
					embargo: {
						value: 4,
						unit: "Year",
					},
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1993",
							},
							end: {
								month: "12",
								day: "31",
								year: "9999",
							},
						},
					],
				},
			],
			isDiamond: false,
		},
		{
			id: 3,
			publicationId: "edp1774330",
			issnOnline: [],
			issnPrint: [],
			isbnOnline: ["9781461211082"],
			isbnPrint: ["9780387909738", "9780387944272"],
			type: "Book",
			title: "Why Math?",
			fullTextHoldings: [
				{
					url: "https://inshs.bib.cnrs.fr/login?url=https://doi.org/10.1007/978-1-4612-1108-2",
					name: "Springer Nature eBooks (ISTEX - Licences Nationales)",
					isCurrent: false,
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1984",
							},
							end: {
								month: "12",
								day: "31",
								year: "1984",
							},
						},
					],
				},
			],
			isDiamond: false,
		},
		{
			id: 4,
			publicationId: "edp27201607",
			issnOnline: ["2690036X"],
			issnPrint: [],
			isbnOnline: [],
			isbnPrint: [],
			type: "Journal",
			title: "Journal of Math Circles",
			fullTextHoldings: [
				{
					url: "https://digitalcommons.cwu.edu/mathcirclesjournal/",
					name: "DOAJ: Directory of Open Access Journals",
					isCurrent: true,
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "2019",
							},
							end: {
								month: "12",
								day: "31",
								year: "9999",
							},
						},
					],
				},
			],
			isDiamond: true,
		},
	],
	totalHits: 209,
	currentPage: 1,
	maxPage: 11,
	facets: [
		{
			Id: "SubjectPubDb",
			Label: "",
			AvailableFacetValues: [
				{
					Value: "applied mathematics",
					Count: 2,
					AddAction: "addfacetfilter(SubjectPubDb:applied mathematics)",
				},
				{
					Value: "artificial intelligence",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:artificial intelligence)",
				},
				{
					Value: "astronomy",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:astronomy)",
				},
				{
					Value: "banking, finance & investing",
					Count: 1,
					AddAction:
						"addfacetfilter(SubjectPubDb:banking\\, finance & investing)",
				},
				{
					Value: "biological engineering",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:biological engineering)",
				},
				{
					Value: "business",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:business)",
				},
				{
					Value: "business (general)",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:business \\(general\\))",
				},
				{
					Value: "chemistry",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:chemistry)",
				},
				{
					Value: "computer programming",
					Count: 2,
					AddAction: "addfacetfilter(SubjectPubDb:computer programming)",
				},
				{
					Value: "computer science",
					Count: 6,
					AddAction: "addfacetfilter(SubjectPubDb:computer science)",
				},
				{
					Value: "computer simulation",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:computer simulation)",
				},
				{
					Value: "computer software",
					Count: 2,
					AddAction: "addfacetfilter(SubjectPubDb:computer software)",
				},
				{
					Value: "computers / computer science",
					Count: 1,
					AddAction:
						"addfacetfilter(SubjectPubDb:computers / computer science)",
				},
				{
					Value: "computers / programming / algorithms",
					Count: 1,
					AddAction:
						"addfacetfilter(SubjectPubDb:computers / programming / algorithms)",
				},
				{
					Value: "computers / security / general",
					Count: 1,
					AddAction:
						"addfacetfilter(SubjectPubDb:computers / security / general)",
				},
				{
					Value: "data processing",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:data processing)",
				},
				{
					Value: "demography",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:demography)",
				},
				{
					Value: "earth & atmospheric sciences",
					Count: 1,
					AddAction:
						"addfacetfilter(SubjectPubDb:earth & atmospheric sciences)",
				},
				{
					Value: "economics",
					Count: 2,
					AddAction: "addfacetfilter(SubjectPubDb:economics)",
				},
				{
					Value: "education",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:education)",
				},
				{
					Value: "education (general)",
					Count: 4,
					AddAction: "addfacetfilter(SubjectPubDb:education \\(general\\))",
				},
				{
					Value: "educational methods & theories",
					Count: 1,
					AddAction:
						"addfacetfilter(SubjectPubDb:educational methods & theories)",
				},
				{
					Value: "elementary education",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:elementary education)",
				},
				{
					Value: "engineering",
					Count: 5,
					AddAction: "addfacetfilter(SubjectPubDb:engineering)",
				},
				{
					Value: "geology",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:geology)",
				},
				{
					Value: "health & medicine",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:health & medicine)",
				},
				{
					Value: "hepatology",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:hepatology)",
				},
				{
					Value: "insurance",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:insurance)",
				},
				{
					Value: "life sciences",
					Count: 5,
					AddAction: "addfacetfilter(SubjectPubDb:life sciences)",
				},
				{
					Value: "mathematical biology",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:mathematical biology)",
				},
				{
					Value: "mathematical models",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:mathematical models)",
				},
				{
					Value: "mathematics",
					Count: 124,
					AddAction: "addfacetfilter(SubjectPubDb:mathematics)",
				},
				{
					Value: "mathematics / applied",
					Count: 5,
					AddAction: "addfacetfilter(SubjectPubDb:mathematics / applied)",
				},
				{
					Value: "mathematics / combinatorics",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:mathematics / combinatorics)",
				},
				{
					Value: "mathematics / counting & numeration",
					Count: 1,
					AddAction:
						"addfacetfilter(SubjectPubDb:mathematics / counting & numeration)",
				},
				{
					Value: "mathematics / discrete mathematics",
					Count: 1,
					AddAction:
						"addfacetfilter(SubjectPubDb:mathematics / discrete mathematics)",
				},
				{
					Value: "mathematics / game theory",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:mathematics / game theory)",
				},
				{
					Value: "mathematics / general",
					Count: 6,
					AddAction: "addfacetfilter(SubjectPubDb:mathematics / general)",
				},
				{
					Value: "mathematics / history & philosophy",
					Count: 1,
					AddAction:
						"addfacetfilter(SubjectPubDb:mathematics / history & philosophy)",
				},
				{
					Value: "mathematics / mathematical analysis",
					Count: 2,
					AddAction:
						"addfacetfilter(SubjectPubDb:mathematics / mathematical analysis)",
				},
				{
					Value: "mathematics / number theory",
					Count: 1,
					AddAction: "addfacetfilter(SubjectPubDb:mathematics / number theory)",
				},
				{
					Value: "mathematics / probability & statistics / general",
					Count: 1,
					AddAction:
						"addfacetfilter(SubjectPubDb:mathematics / probability & statistics / general)",
				},
				{
					Value: "mechanics",
					Count: 3,
					AddAction: "addfacetfilter(SubjectPubDb:mechanics)",
				},
				{
					Value: "medical sciences",
					Count: 3,
					AddAction: "addfacetfilter(SubjectPubDb:medical sciences)",
				},
				{
					Value: "physics",
					Count: 10,
					AddAction: "addfacetfilter(SubjectPubDb:physics)",
				},
				{
					Value: "psychology",
					Count: 2,
					AddAction: "addfacetfilter(SubjectPubDb:psychology)",
				},
				{
					Value: "science",
					Count: 2,
					AddAction: "addfacetfilter(SubjectPubDb:science)",
				},
				{
					Value: "science / general",
					Count: 3,
					AddAction: "addfacetfilter(SubjectPubDb:science / general)",
				},
				{
					Value: "teaching & instruction",
					Count: 3,
					AddAction: "addfacetfilter(SubjectPubDb:teaching & instruction)",
				},
				{
					Value: "technology & engineering / electronics / general",
					Count: 2,
					AddAction:
						"addfacetfilter(SubjectPubDb:technology & engineering / electronics / general)",
				},
			],
		},
		{
			Id: "TypePublicationPubD",
			Label: "",
			AvailableFacetValues: [
				{
					Value: "book",
					Count: 55,
					AddAction: "addfacetfilter(TypePublicationPubD:book)",
				},
				{
					Value: "journal",
					Count: 149,
					AddAction: "addfacetfilter(TypePublicationPubD:journal)",
				},
				{
					Value: "report",
					Count: 5,
					AddAction: "addfacetfilter(TypePublicationPubD:report)",
				},
			],
		},
		{
			Id: "PublisherPubDb",
			Label: "",
			AvailableFacetValues: [
				{
					Value: "acm / association for computing machinery",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:acm / association for computing machinery)",
				},
				{
					Value: "aims press",
					Count: 1,
					AddAction: "addfacetfilter(PublisherPubDb:aims press)",
				},
				{
					Value: "american mathematical society",
					Count: 6,
					AddAction:
						"addfacetfilter(PublisherPubDb:american mathematical society)",
				},
				{
					Value: "biomed central",
					Count: 2,
					AddAction: "addfacetfilter(PublisherPubDb:biomed central)",
				},
				{
					Value: "birkhauser boston incorporated",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:birkhauser boston incorporated)",
				},
				{
					Value: "cambridge university press",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:cambridge university press)",
				},
				{
					Value: "comenius university",
					Count: 1,
					AddAction: "addfacetfilter(PublisherPubDb:comenius university)",
				},
				{
					Value: "de gruyter",
					Count: 1,
					AddAction: "addfacetfilter(PublisherPubDb:de gruyter)",
				},
				{
					Value: "edp sciences",
					Count: 2,
					AddAction: "addfacetfilter(PublisherPubDb:edp sciences)",
				},
				{
					Value: "elsevier",
					Count: 15,
					AddAction: "addfacetfilter(PublisherPubDb:elsevier)",
				},
				{
					Value: "elsevier gmbh urban & fischer",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:elsevier gmbh urban & fischer)",
				},
				{
					Value: "elsevier science",
					Count: 3,
					AddAction: "addfacetfilter(PublisherPubDb:elsevier science)",
				},
				{
					Value: "elsevier science limited",
					Count: 1,
					AddAction: "addfacetfilter(PublisherPubDb:elsevier science limited)",
				},
				{
					Value: "ems publishing house",
					Count: 8,
					AddAction: "addfacetfilter(PublisherPubDb:ems publishing house)",
				},
				{
					Value: "global science press ltd.",
					Count: 2,
					AddAction: "addfacetfilter(PublisherPubDb:global science press ltd.)",
				},
				{
					Value: "higher education press",
					Count: 1,
					AddAction: "addfacetfilter(PublisherPubDb:higher education press)",
				},
				{
					Value: "hindawi publishing corporation",
					Count: 5,
					AddAction:
						"addfacetfilter(PublisherPubDb:hindawi publishing corporation)",
				},
				{
					Value: "international press of boston",
					Count: 2,
					AddAction:
						"addfacetfilter(PublisherPubDb:international press of boston)",
				},
				{
					Value: "iop publishing limited",
					Count: 2,
					AddAction: "addfacetfilter(PublisherPubDb:iop publishing limited)",
				},
				{
					Value: "john wiley & sons",
					Count: 3,
					AddAction: "addfacetfilter(PublisherPubDb:john wiley & sons)",
				},
				{
					Value: "john wiley & sons incorporated",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:john wiley & sons incorporated)",
				},
				{
					Value: "john wiley & sons, inc",
					Count: 1,
					AddAction: "addfacetfilter(PublisherPubDb:john wiley & sons\\, inc)",
				},
				{
					Value: "kubon & sagner",
					Count: 1,
					AddAction: "addfacetfilter(PublisherPubDb:kubon & sagner)",
				},
				{
					Value: "mathematical sciences publishers - msp",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:mathematical sciences publishers - msp)",
				},
				{
					Value: "national council of teachers of mathematics",
					Count: 2,
					AddAction:
						"addfacetfilter(PublisherPubDb:national council of teachers of mathematics)",
				},
				{
					Value: "national science teachers association",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:national science teachers association)",
				},
				{
					Value: "newnes",
					Count: 2,
					AddAction: "addfacetfilter(PublisherPubDb:newnes)",
				},
				{
					Value: "oxford university press",
					Count: 11,
					AddAction: "addfacetfilter(PublisherPubDb:oxford university press)",
				},
				{
					Value: "plenum press",
					Count: 1,
					AddAction: "addfacetfilter(PublisherPubDb:plenum press)",
				},
				{
					Value: "post pressed (c/o econtent management pty. ltd)",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:post pressed \\(c/o econtent management pty. ltd\\))",
				},
				{
					Value: "presses de l'academie des sciences",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:presses de l'academie des sciences)",
				},
				{
					Value: "presses universitaires de franche-comte",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:presses universitaires de franche-comte)",
				},
				{
					Value: "princeton university press",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:princeton university press)",
				},
				{
					Value: "proquest umi dissertation publishing",
					Count: 28,
					AddAction:
						"addfacetfilter(PublisherPubDb:proquest umi dissertation publishing)",
				},
				{
					Value: "regional educational laboratory program",
					Count: 1,
					AddAction:
						"addfacetfilter(PublisherPubDb:regional educational laboratory program)",
				},
				{
					Value: "royal society of chemistry",
					Count: 2,
					AddAction:
						"addfacetfilter(PublisherPubDb:royal society of chemistry)",
				},
				{
					Value: "sage publications",
					Count: 1,
					AddAction: "addfacetfilter(PublisherPubDb:sage publications)",
				},
				{
					Value: "society for industrial and applied mathematics",
					Count: 3,
					AddAction:
						"addfacetfilter(PublisherPubDb:society for industrial and applied mathematics)",
				},
				{
					Value: "springer",
					Count: 22,
					AddAction: "addfacetfilter(PublisherPubDb:springer)",
				},
				{
					Value: "springer berlin heidelberg",
					Count: 7,
					AddAction:
						"addfacetfilter(PublisherPubDb:springer berlin heidelberg)",
				},
				{
					Value: "springer international publishing",
					Count: 2,
					AddAction:
						"addfacetfilter(PublisherPubDb:springer international publishing)",
				},
				{
					Value: "springer nature",
					Count: 16,
					AddAction: "addfacetfilter(PublisherPubDb:springer nature)",
				},
				{
					Value: "springer netherlands",
					Count: 2,
					AddAction: "addfacetfilter(PublisherPubDb:springer netherlands)",
				},
				{
					Value: "springer science+business media",
					Count: 3,
					AddAction:
						"addfacetfilter(PublisherPubDb:springer science+business media)",
				},
				{
					Value: "taylor & francis",
					Count: 7,
					AddAction: "addfacetfilter(PublisherPubDb:taylor & francis)",
				},
				{
					Value: "the royal society",
					Count: 2,
					AddAction: "addfacetfilter(PublisherPubDb:the royal society)",
				},
				{
					Value: "u.s. department of education",
					Count: 4,
					AddAction:
						"addfacetfilter(PublisherPubDb:u.s. department of education)",
				},
				{
					Value: "unspecified",
					Count: 6,
					AddAction: "addfacetfilter(PublisherPubDb:unspecified)",
				},
				{
					Value: "wiley",
					Count: 2,
					AddAction: "addfacetfilter(PublisherPubDb:wiley)",
				},
				{
					Value: "wiley-blackwell",
					Count: 3,
					AddAction: "addfacetfilter(PublisherPubDb:wiley-blackwell)",
				},
			],
		},
	],
	activeFacets: {},
	dateRange: {
		min: 1,
		max: 1,
	},
};
