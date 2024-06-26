export const AIDS_RESULTS_INPUT = {
	SearchRequest: {
		SearchCriteria: {
			Queries: [
				{
					BooleanOperator: "AND",
					Term: "aids child",
				},
			],
			SearchMode: "all",
			IncludeFacets: "y",
			FacetFilters: [
				{
					FilterId: 2,
					FacetValues: [
						{
							Id: "Language",
							Value: "french",
						},
					],
				},
				{
					FilterId: 3,
					FacetValues: [
						{
							Id: "SourceType",
							Value: "Non-Print Resources",
						},
					],
				},
			],
			Limiters: [
				{
					Id: "FT",
					Values: ["y"],
				},
			],
			Sort: "relevance",
		},
		RetrievalCriteria: {
			View: "detailed",
			ResultsPerPage: 20,
			PageNumber: 1,
			Highlight: "n",
		},
		SearchCriteriaWithActions: {
			QueriesWithAction: [
				{
					Query: {
						BooleanOperator: "AND",
						Term: "aids child",
					},
					RemoveAction: "removequery(1)",
				},
			],
			FacetFiltersWithAction: [
				{
					FilterId: 2,
					FacetValuesWithAction: [
						{
							FacetValue: {
								Id: "Language",
								Value: "french",
							},
							RemoveAction: "removefacetfiltervalue(2,Language:french)",
						},
					],
					RemoveAction: "removefacetfilter(2)",
				},
				{
					FilterId: 3,
					FacetValuesWithAction: [
						{
							FacetValue: {
								Id: "SourceType",
								Value: "Non-Print Resources",
							},
							RemoveAction:
								"removefacetfiltervalue(3,SourceType:Non-Print Resources)",
						},
					],
					RemoveAction: "removefacetfilter(3)",
				},
			],
			LimitersWithAction: [
				{
					Id: "FT",
					LimiterValuesWithAction: [
						{
							Value: "y",
							RemoveAction: "removelimitervalue(FT:y)",
						},
					],
					RemoveAction: "removelimiter(FT)",
				},
			],
		},
	},
	SearchResult: {
		Statistics: {
			TotalHits: 46405,
			TotalSearchTime: 699,
			Databases: [
				{
					Id: "eric",
					Label: "ERIC",
					Status: "0",
					Hits: 2838,
				},
				{
					Id: "cmedm",
					Label: "MEDLINE",
					Status: "0",
					Hits: 8159,
				},
				{
					Id: "lxh",
					Label: "Library, Information Science & Technology Abstracts",
					Status: "0",
					Hits: 669,
				},
				{
					Id: "mnh",
					Label: "MEDLINE with Full Text",
					Status: "0",
					Hits: 8155,
				},
				{
					Id: "8gh",
					Label: "GreenFILE",
					Status: "0",
					Hits: 35,
				},
				{
					Id: "edsnbk",
					Label: "NewsBank",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edslns",
					Label: "LexisNexis U.S. Serial Set Digital Collection",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsbl",
					Label:
						"British Library Document Supply Centre Inside Serials & Conference Proceedings",
					Status: "0",
					Hits: 1133,
				},
				{
					Id: "edsnba",
					Label: "NewsBank - Archives",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsgpr",
					Label: "Government Printing Office Catalog",
					Status: "0",
					Hits: 101,
				},
				{
					Id: "edspvh",
					Label: "PsycCRITIQUES",
					Status: "0",
					Hits: 40,
				},
				{
					Id: "edspdh",
					Label: "PsycARTICLES",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edspzh",
					Label: "PsycBOOKS",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edspia",
					Label: "DBPIA",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsoai",
					Label: "OAIster",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsoso",
					Label: "Oxford Scholarship Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsoho",
					Label: "Oxford Handbooks Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsarx",
					Label: "arXiv",
					Status: "0",
					Hits: 1,
				},
				{
					Id: "edsibc",
					Label: "Informit Business Collection",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsiec",
					Label: "Informit Engineering Collection",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsihc",
					Label: "Informit Health Collection",
					Status: "0",
					Hits: 4,
				},
				{
					Id: "edsihs",
					Label: "Informit Humanities & Social Sciences Collection",
					Status: "0",
					Hits: 3,
				},
				{
					Id: "edsmer",
					Label: "Mergent Annual Reports Collection",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsman",
					Label: "Manuscriptorium Digital Library",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edskis",
					Label: "Korean Studies Information Service System (KISS)",
					Status: "0",
					Hits: 1,
				},
				{
					Id: "edsaan",
					Label: "Accessible Archives",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edscrc",
					Label: "Credo Reference Collections",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edszbw",
					Label: "ECONIS",
					Status: "0",
					Hits: 20,
				},
				{
					Id: "nsm",
					Label: "Newswires",
					Status: "0",
					Hits: 567,
				},
				{
					Id: "edshvr",
					Label: "Hoover's Company Profiles",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsilc",
					Label: "Informit Literature & Culture Collection",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsind",
					Label: "Informit Indigenous Collection",
					Status: "0",
					Hits: 2,
				},
				{
					Id: "edslex",
					Label: "LexisNexis Academic: Law Reviews",
					Status: "0",
					Hits: 104,
				},
				{
					Id: "edsasp",
					Label: "Alexander Street Press",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edo",
					Label: "",
					Status: "0",
					Hits: 1434,
				},
				{
					Id: "bsx",
					Label: "",
					Status: "0",
					Hits: 1030,
				},
				{
					Id: "edb",
					Label: "",
					Status: "0",
					Hits: 6891,
				},
				{
					Id: "edsjpi",
					Label: "Japanese Periodical Index - 雑誌記事索引",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjst",
					Label: "J-STAGE",
					Status: "0",
					Hits: 8,
				},
				{
					Id: "edsoao",
					Label: "Grove Art Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsoad",
					Label: "American National Biography Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsomo",
					Label: "Grove Music Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edselp",
					Label: "ScienceDirect",
					Status: "0",
					Hits: 2359,
				},
				{
					Id: "edsupe",
					Label: "Archive of European Integration",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsupi",
					Label: "Industry Studies Working Papers",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsuph",
					Label: "Minority Health Archive",
					Status: "0",
					Hits: 1,
				},
				{
					Id: "edsupa",
					Label: "Aphasiology Archive",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsupp",
					Label: "PhilSci Archive",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edshlc",
					Label: "Harvard Library Bibliographic Dataset",
					Status: "0",
					Hits: 11,
				},
				{
					Id: "edsebo",
					Label: "Britannica Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsdoj",
					Label: "Directory of Open Access Journals",
					Status: "0",
					Hits: 236,
				},
				{
					Id: "edsper",
					Label: "Persée",
					Status: "0",
					Hits: 11,
				},
				{
					Id: "edspio",
					Label: "Public Information Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsffr",
					Label: "Freedonia Focus Reports",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsers",
					Label: "eArticle",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsabc",
					Label: "ABC-CLIO Social Studies Databases, School Edition",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsaca",
					Label: "ABC-CLIO Social Studies Databases, Academic Edition",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsssb",
					Label: "Books24x7",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edshol",
					Label: "HeinOnline",
					Status: "0",
					Hits: 6,
				},
				{
					Id: "edsgsf",
					Label: "SOFIS - Sozialwissenschaftliche Forschungsinformationen",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsgsl",
					Label: "SOLIS - Sozialwissenschaftliche Literatur",
					Status: "0",
					Hits: 9,
				},
				{
					Id: "edsoap",
					Label: "OAPEN Library",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsocd",
					Label: "China/Asia On Demand",
					Status: "0",
					Hits: 2,
				},
				{
					Id: "edsble",
					Label: "British Library EThOS",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edswbo",
					Label: "World Book",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsarl",
					Label: "Airiti Library eBooks & Journals - 華藝線上圖書館",
					Status: "0",
					Hits: 14,
				},
				{
					Id: "edsbre",
					Label: "Bridgeman Education",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsmbo",
					Label: "Marquis Biographies Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edshld",
					Label: "Digital Access to Scholarship at Harvard (DASH)",
					Status: "0",
					Hits: 20,
				},
				{
					Id: "edsgso",
					Label: "SSOAR – Social Science Open Access Repository",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjbp",
					Label: "JSTOR 19th Century British Pamphlets",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsluc",
					Label: "LUNA Commons",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edshst",
					Label: "Henry Stewart Talks",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsnew",
					Label: "Newnonmun – 뉴논문",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsnzl",
					Label: "Publications New Zealand Metadata",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsodb",
					Label: "Oxford Dictionary of National Biography",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsups",
					Label: "University Press Scholarship Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsbio",
					Label: "BioOne Online Journals",
					Status: "0",
					Hits: 9,
				},
				{
					Id: "edscog",
					Label: "CogPrints",
					Status: "0",
					Hits: 4,
				},
				{
					Id: "edsmaa",
					Label: "AccessAnesthesiology",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsnmj",
					Label: "Naxos Music Library Jazz",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsasu",
					Label: "AccessSurgery",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsnol",
					Label: "Naxos Music Library",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsnsw",
					Label: "Naxos Spoken Word Library",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsnvl",
					Label: "Naxos Video Library",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsrec",
					Label: "RECERCAT",
					Status: "0",
					Hits: 1,
				},
				{
					Id: "edsace",
					Label: "AccessEngineering",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsacl",
					Label: "ACLS Humanities E-Book",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsacm",
					Label: "AccessMedicine",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsaem",
					Label: "AccessEmergency Medicine",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsapa",
					Label: "AccessPharmacy",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsape",
					Label: "AccessPediatrics",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsasc",
					Label: "AccessScience",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsvox",
					Label: "ScholarVox",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edscrl",
					Label: "Center for Research Libraries",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsbvb",
					Label: "Bibliotheksverbund Bayern",
					Status: "0",
					Hits: 1,
				},
				{
					Id: "edsrca",
					Label: "RCAAP",
					Status: "0",
					Hits: 703,
				},
				{
					Id: "edsecd",
					Label: "Energy Citations Database",
					Status: "0",
					Hits: 5,
				},
				{
					Id: "edslan",
					Label: "Lan Publishing",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsmor",
					Label: "Mintel Oxygen Reports",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsoro",
					Label: "Oxford Reference",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edshyr",
					Label: "HyRead Journal",
					Status: "0",
					Hits: 1,
				},
				{
					Id: "edscrn",
					Label: "Cairn.info",
					Status: "0",
					Hits: 19,
				},
				{
					Id: "edsswe",
					Label: "SwePub",
					Status: "0",
					Hits: 42,
				},
				{
					Id: "edsrac",
					Label: "RACO",
					Status: "0",
					Hits: 3,
				},
				{
					Id: "edstdx",
					Label: "TDX",
					Status: "0",
					Hits: 10,
				},
				{
					Id: "edsram",
					Label: "RAMBI",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edssci",
					Label: "SciELO",
					Status: "0",
					Hits: 515,
				},
				{
					Id: "edsoio",
					Label: "Oxford Islamic Studies Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsobo",
					Label: "Oxford Biblical Studies Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsrdl",
					Label: "R2 Digital Library",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsbsi",
					Label: "British Standards Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edspgr",
					Label: "USPTO Patent Grants",
					Status: "0",
					Hits: 38,
				},
				{
					Id: "edspap",
					Label: "USPTO Patent Applications",
					Status: "0",
					Hits: 27,
				},
				{
					Id: "edsebk",
					Label: "",
					Status: "0",
					Hits: 2,
				},
				{
					Id: "edsijc",
					Label: "IndianJournals.com",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edscqv",
					Label: "China Science & Technology Journal Database",
					Status: "0",
					Hits: 7,
				},
				{
					Id: "edsgao",
					Label: "Academic OneFile",
					Status: "0",
					Hits: 6333,
				},
				{
					Id: "edsggo",
					Label: "General OneFile",
					Status: "0",
					Hits: 4507,
				},
				{
					Id: "edsagr",
					Label: "AGRIS",
					Status: "0",
					Hits: 139,
				},
				{
					Id: "edslib",
					Label: "Swedish National Bibliography",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edspmu",
					Label: "Project MUSE",
					Status: "0",
					Hits: 33,
				},
				{
					Id: "edsgvr",
					Label: "Gale Virtual Reference Library",
					Status: "0",
					Hits: 1,
				},
				{
					Id: "ers",
					Label: "Research Starters",
					Status: "0",
					Hits: 677,
				},
				{
					Id: "edsoww",
					Label: "Oxford's Who's Who & Who Was Who",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsmeo",
					Label: "Oxford Medicine Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsulo",
					Label:
						"Университетская библиотека онлайн - University Library Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsibu",
					Label: "Ibuk.pl",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsoaa",
					Label: "Oxford African American Studies Center",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsbbd",
					Label: "BiblioBoard",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edscru",
					Label: "CRUSH Reports",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsriv",
					Label: "Rivisteweb",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsamd",
					Label: "Adam Matthew Digital",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsglt",
					Label: "InfoTrac LegalTrac",
					Status: "0",
					Hits: 116,
				},
				{
					Id: "edsgea",
					Label: "Expanded Academic ASAP",
					Status: "0",
					Hits: 4097,
				},
				{
					Id: "edsrbp",
					Label: "Rock's Backpages",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsglr",
					Label: "Literature Resource Center",
					Status: "0",
					Hits: 32,
				},
				{
					Id: "edsgov",
					Label: "Opposing Viewpoints in Context",
					Status: "0",
					Hits: 119,
				},
				{
					Id: "edsgbe",
					Label: "Business Insights: Essentials",
					Status: "0",
					Hits: 125,
				},
				{
					Id: "edschh",
					Label: "Cochrane Database of Systematic Reviews",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edskyo",
					Label: "KyoboScholar",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsmed",
					Label: "Media Archive",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsobb",
					Label: "Oxford Bibliographies",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsose",
					Label: "Oxford Scholarly Editions Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsgig",
					Label: "Gigaom Research",
					Status: "0",
					Hits: 6,
				},
				{
					Id: "edsgin",
					Label: "InfoTrac Newsstand",
					Status: "0",
					Hits: 236,
				},
				{
					Id: "edsdps",
					Label:
						"Data-Planet Statistical Datasets & Statistical Ready Reference",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjbk",
					Label: "Books at JSTOR",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsrge",
					Label: "Roubini Global Economics",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsgii",
					Label: "InfoTrac Informe!",
					Status: "0",
					Hits: 64,
				},
				{
					Id: "edspvi",
					Label: "PsycheVisual",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsgih",
					Label: "InfoTrac Health Reference Center Academic",
					Status: "0",
					Hits: 3559,
				},
				{
					Id: "edsjsr",
					Label: "JSTOR Journals",
					Status: "0",
					Hits: 965,
				},
				{
					Id: "edssrf",
					Label: "STAT!Ref",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsnkt",
					Label: "NBC Learn K-12",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsnhe",
					Label: "NBC Learn Higher Ed",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsgic",
					Label: "InfoTrac Computer Database",
					Status: "0",
					Hits: 33,
				},
				{
					Id: "edsgij",
					Label: "InfoTrac Junior Edition",
					Status: "0",
					Hits: 66,
				},
				{
					Id: "edsgis",
					Label: "InfoTrac Student Edition",
					Status: "0",
					Hits: 1812,
				},
				{
					Id: "edsmzn",
					Label: "Maruzen eBook Library",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsdzs",
					Label: "DigiZeitschriften",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsggr",
					Label: "General Reference Center Gold",
					Status: "0",
					Hits: 2467,
				},
				{
					Id: "edsghw",
					Label: "Health & Wellness Resource Center",
					Status: "0",
					Hits: 1885,
				},
				{
					Id: "edsjdc",
					Label:
						"Jane's Defence Equipment & Technology (JDET) - C4ISR & Mission Systems",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjmm",
					Label:
						"Jane's Military & Security Assessments (JMSA) - Military Capabilities",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjda",
					Label: "Jane's Defence Equipment & Technology (JDET) - Air & Space",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjcb",
					Label:
						"Jane's Chemical, Biological, Radiological & Nuclear Assessments (JCBRN) - Intelligence Centre",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjds",
					Label: "Jane's Defence Equipment & Technology (JDET) – Sea",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjte",
					Label:
						"Jane’s Terrorism & Insurgency Centre (JTIC) - Terrorism Events",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjdn",
					Label: "Jane's Defence Equipment & Technology (JDET) – News",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjmn",
					Label: "Jane's Military & Security Assessments (JMSA) – News",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjmc",
					Label: "Jane's Military & Security Assessments (JMSA) - Country Risk",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjdl",
					Label: "Jane's Defence Equipment & Technology (JDET) – Land",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjdi",
					Label: "Jane's Defence Industry & Markets (JDIM) - Defense Industry",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edssas",
					Label: "SA ePublications Service",
					Status: "0",
					Hits: 52,
				},
				{
					Id: "edseru",
					Label: "Erudit",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsjkn",
					Label: "JapanKnowledge",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsgsc",
					Label: "Science In Context",
					Status: "0",
					Hits: 218,
				},
				{
					Id: "edsgcc",
					Label: "Canada In Context",
					Status: "0",
					Hits: 397,
				},
				{
					Id: "edsgus",
					Label: "U.S. History in Context",
					Status: "0",
					Hits: 93,
				},
				{
					Id: "edsgwh",
					Label: "World History in Context",
					Status: "0",
					Hits: 76,
				},
				{
					Id: "edsgsr",
					Label: "Student Resources in Context",
					Status: "0",
					Hits: 565,
				},
				{
					Id: "edsgbc",
					Label: "Biography in Context",
					Status: "0",
					Hits: 320,
				},
				{
					Id: "edskey",
					Label: "Key Note Market Research Reports",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsbaz",
					Label: "BazEkon",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edspac",
					Label: "CQ Press Public Affairs Collection",
					Status: "0",
					Hits: 1,
				},
				{
					Id: "edsscc",
					Label: "CQ Press Supreme Court Collection",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsvec",
					Label: "CQ Press Voting & Elections Collection",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edscoc",
					Label: "CQ Press Congress Collection",
					Status: "0",
					Hits: 8,
				},
				{
					Id: "edsspo",
					Label: "SpringerProtocols",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edssmt",
					Label: "SpringerMaterials",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edseag",
					Label: "CQ Press Encyclopedia of American Government",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsvlx",
					Label: "vLex",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsknv",
					Label: "Knovel",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsdun",
					Label: "Idunn.no",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsnar",
					Label: "Narcis",
					Status: "0",
					Hits: 185,
				},
				{
					Id: "edsmib",
					Label: "Minha Biblioteca",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edstox",
					Label: "TOXNET TOXLINE",
					Status: "0",
					Hits: 26,
				},
				{
					Id: "edsibw",
					Label: "IBISWorld",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsmgh",
					Label: "McGraw-Hill",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsrev",
					Label: "Openedition.org",
					Status: "0",
					Hits: 2,
				},
				{
					Id: "edsnac",
					Label: "Academia",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsinz",
					Label: "Index New Zealand",
					Status: "0",
					Hits: 44,
				},
				{
					Id: "edsbao",
					Label: "Business Archives Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edswbe",
					Label: "World Bank eLibrary",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsdnt",
					Label: "DieselNet Technology Guide",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edspso",
					Label: "Prefectural Statistics Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsclc",
					Label: "Children's Literature Comprehensive Database",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsdom",
					Label: "Dazai Osamu Manuscripts Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsndl",
					Label: "Networked Digital Library of Theses & Dissertations",
					Status: "0",
					Hits: 1422,
				},
				{
					Id: "edsamb",
					Label: "Ambrose Digital",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edscel",
					Label: "Canadian Electronic Library",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsfod",
					Label: "Films on Demand",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edstor",
					Label: "Torrossa",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edslxp",
					Label: "LearningExpress Library",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsgsb",
					Label: "Small Business Resource Center",
					Status: "0",
					Hits: 3,
				},
				{
					Id: "edsaul",
					Label:
						"Air University Library Index to Military Periodicals (AULIMP)",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsgal",
					Label: "Gallica Bibliothèque numérique",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsscb",
					Label: "SciELO Books",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsgml",
					Label: "Making of Modern Law",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edshbo",
					Label: "HBO Kennisbank",
					Status: "0",
					Hits: 2,
				},
				{
					Id: "edsgtx",
					Label: "TOXNET: GENETOX (Genetic Toxicology Data Bank)",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edssol",
					Label: "Sustainable Organization Library (SOL)",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsoec",
					Label: "OECD iLibrary",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edskot",
					Label: "Kotar Digital Library",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edselr",
					Label: "ELibrary.RU",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edskst",
					Label: "KoreaScience",
					Status: "0",
					Hits: 2,
				},
				{
					Id: "edsstc",
					Label: "SciTech Connect",
					Status: "0",
					Hits: 5,
				},
				{
					Id: "edseur",
					Label: "Europeana",
					Status: "0",
					Hits: 31,
				},
				{
					Id: "edsdar",
					Label: "Darwin Books",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsvle",
					Label: "VLeBooks",
					Status: "0",
					Hits: 17,
				},
				{
					Id: "edsibo",
					Label: "Ibooks.ru",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsfit",
					Label: "FT.com",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsley",
					Label: "Leyex",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsatl",
					Label: "Ambientalex",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsafa",
					Label: "ASM Failure Analysis Database",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edstoy",
					Label: "Toyo Keizai Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edsaho",
					Label: "ASM Handbooks Online",
					Status: "0",
					Hits: 0,
				},
				{
					Id: "edseub",
					Label: "EU Bookshop",
					Status: "0",
					Hits: 5,
				},
			],
		},
		Data: {
			RecordFormat: "EP Display",
			Records: [
				{
					ResultId: 1,
					Header: {
						DbId: "edssas",
						DbLabel: "SA ePublications Service",
						An: "edssas.ajrh.v19.n1.a7",
						RelevancyScore: "2115",
						PubType: "Periodical",
						PubTypeId: "serialPeriodical",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edssas&AN=edssas.ajrh.v19.n1.a7",
					FullText: {
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:edssas&genre=article&issn=11184841&ISBN=&volume=19&issue=1&date=20150301&spage=63&pages=63-72&title=African Journal of Reproductive Health&atitle=%22Over%20my%20dead%20body%22%20%3A%20knowledge%20and%20attitude%20of%20children%20towards%20HIV%20and%20AIDS%20in%20the%20Cape%20Coast%20Metropolis%20of%20Ghana%20%3A%20original%20research%20article&aulast=Owusu%2C%20Samuel%20Asiedu&id=DOI:",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "&quot;Over my dead body&quot; : knowledge and attitude of children towards HIV and AIDS in the Cape Coast Metropolis of Ghana : original research article",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Owusu%2C+Samuel+Asiedu%22&quot;&gt;Owusu, Samuel Asiedu&lt;/searchLink&gt;&lt;relatesTo&gt;1&lt;/relatesTo&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "African Journal of Reproductive Health, Mar 2015, Vol 19, Issue 1, p. 63-72.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Children%22&quot;&gt;Children&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Perception%22&quot;&gt;Perception&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22HIV+and+AIDS%22&quot;&gt;HIV and AIDS&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Cape+Coast%22&quot;&gt;Cape Coast&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Ghana%22&quot;&gt;Ghana&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Enfants%22&quot;&gt;Enfants&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22La+perception%22&quot;&gt;La perception&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Le+VIH+et+le+SIDA%22&quot;&gt;Le VIH et le SIDA&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description",
							Group: "Ab",
							Data: "In Ghana, it was estimated in 2013 that some 34,557 children were living with HIV and AIDS. Researches on children&#39;s perception of risk, knowledge and support services for infected persons have been rarely undertaken. This paper is based on responses obtained from 120 in-school children aged 9-13 years drawn from three schools in the Cape Coast Metropolis of Ghana. The respondents provided qualitative data through essays and quantitative data through questionnaires. All the respondents have had some knowledge on HIV and AIDS and knew of where to access HIV and AIDS information. More than seventy per cent of them were not willing to purchase fresh vegetables from AIDS vendors nor were willing to allow AIDS infected female teachers to continue teaching them. It was recommended that children should be targeted with behavioural change communication messages especially by teachers to enable them live harmoniously with people infected and affected with AIDS.&lt;br /&gt;Au Ghana, il a �t� estim� en 2013 que quelques 34 557 enfants vivaient avec le VIH et le SIDA. Les recherches sur la perception du risque pour les enfants, des services de connaissances et de soutien pour les personnes infect�es ont rarement �t� entrepris. Cet article est bas� sur les r�ponses obtenues � partir de 120 enfants � l&#39;�cole �g�s de 9-13 ans tir�es de trois �coles dans les m�tropoles du Cape Coast au Ghana. Les interview�s ont fourni des donn�es qualitatives � travers des essais et des donn�es quantitatives au moyen de questionnaires. Tous les interview�s avaient une certaine connaissance sur le VIH et le sida et savaient o� aller pour avoir acc�s � l&#39;information sur le VIH et le sida. Plus de soixante-dix pour cent d&#39;entre eux n&#39;�taient pas pr�ts � acheter des l�gumes frais de la part vendeurs s�ropositifs et n&#39;�taient dispos�s � permettre que les enseignantes s�ropositives continuer � les enseigner. Nous avons pr�conis� que les enfants soient cibl�s avec des messages de communication pour le changement de comportement surtout par les enseignants pour leur permettre de vivre en harmonie avec des personnes infect�es et affect�es par le sida.",
						},
						{
							Name: "URL",
							Label: "Availability",
							Group: "URL",
							Data: "http://hdl.handle.net/10520/EJC168622",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "10",
										StartPage: "63",
									},
								},
								Subjects: [
									{
										SubjectFull: "Children",
										Type: "general",
									},
									{
										SubjectFull: "Perception",
										Type: "general",
									},
									{
										SubjectFull: "HIV and AIDS",
										Type: "general",
									},
									{
										SubjectFull: "Cape Coast",
										Type: "general",
									},
									{
										SubjectFull: "Ghana",
										Type: "general",
									},
									{
										SubjectFull: "Enfants",
										Type: "general",
									},
									{
										SubjectFull: "La perception",
										Type: "general",
									},
									{
										SubjectFull: "Le VIH et le SIDA",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											'"Over my dead body" : knowledge and attitude of children towards HIV and AIDS in the Cape Coast Metropolis of Ghana : original research article',
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Owusu, Samuel Asiedu",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "03",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "11184841",
												},
												{
													Type: "issn-print",
													Value: "21413606",
												},
												{
													Type: "issn-locals",
													Value: "edssas.B69B4BF6",
												},
												{
													Type: "issn-locals",
													Value: "edssas.CD1A5173",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "19",
												},
												{
													Type: "issue",
													Value: "1",
												},
											],
											Titles: [
												{
													TitleFull: "African Journal of Reproductive Health",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 2,
					Header: {
						DbId: "eric",
						DbLabel: "ERIC",
						An: "ED560858",
						RelevancyScore: "2083",
						PubType: "Report",
						PubTypeId: "report",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=eric&AN=ED560858",
					FullText: {
						Text: {
							Availability: "0",
						},
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Integrating Children&#39;s Literature in Elementary Mathematics",
						},
						{
							Name: "Author",
							Label: "Author(s)",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Thomas%2C+Lynsey%22&quot;&gt;Thomas, Lynsey&lt;/searchLink&gt;; &lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Feng%2C+Jay%22&quot;&gt;Feng, Jay&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "&lt;searchLink fieldCode=&quot;JN&quot; term=&quot;%22Online+Submission%22&quot;&gt;Online Submission&lt;/searchLink&gt;, Paper presented at the Annual Meeting of the Georgia Educational Research Association (Savannah, GA, Oct 16-17, 2015). 27 pp.",
						},
						{
							Name: "PeerReviewed",
							Label: "Peer Reviewed",
							Group: "SrcInfo",
							Data: "N/A",
						},
						{
							Name: "SubjectThesaurus",
							Label: "Descriptors",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Elementary+School+Mathematics%22&quot;&gt;Elementary School Mathematics&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Mathematics+Instruction%22&quot;&gt;Mathematics Instruction&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Faculty+Development%22&quot;&gt;Faculty Development&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Childrens+Literature%22&quot;&gt;Childrens Literature&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Interdisciplinary+Approach%22&quot;&gt;Interdisciplinary Approach&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Elementary+School+Teachers%22&quot;&gt;Elementary School Teachers&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Teaching+Methods%22&quot;&gt;Teaching Methods&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Manipulative+Materials%22&quot;&gt;Manipulative Materials&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Visual+Aids%22&quot;&gt;Visual Aids&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Instructional+Materials%22&quot;&gt;Instructional Materials&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Instructional+Effectiveness%22&quot;&gt;Instructional Effectiveness&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Teacher+Surveys%22&quot;&gt;Teacher Surveys&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Video+Technology%22&quot;&gt;Video Technology&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Pretests+Posttests%22&quot;&gt;Pretests Posttests&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Elementary+Education%22&quot;&gt;Elementary Education&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Abstract",
							Group: "Ab",
							Data: "The purpose of this professional development project was to train teachers in using children&#39;s literature for math instruction and to also examine its effect on student math learning at an elementary school. Teachers were taught how to use children&#39;s literature to instruct and enhance their math curriculum through the use of literature pieces, manipulatives, and graphic organizers. For two weeks twelve fourth-grade students were taught long division using explicit teacher instruction without integrating children&#39;s literature, and at the end took an end of unit test on long division. Then, the students were taught long division using selected children&#39;s literature for two weeks and took the end of unit test again. Results indicate that using children&#39;s literature in math helps students understand and retain concepts more effectively. Selected quality children&#39;s literature can be effectively integrated in elementary math instruction to improve student math achievement.",
						},
						{
							Name: "AbstractInfo",
							Label: "Abstractor",
							Group: "Ab",
							Data: "As Provided",
						},
						{
							Name: "TypePub",
							Label: "Publication Type",
							Group: "TypPub",
							Data: "Reports - Research; Speeches/Meeting Papers",
						},
						{
							Name: "CodeSource",
							Label: "Journal Code",
							Group: "SrcInfo",
							Data: "&lt;searchLink fieldCode=&quot;JC&quot; term=&quot;%22DEC2015%22&quot;&gt;DEC2015&lt;/searchLink&gt;",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Code: "eng",
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "27",
									},
								},
								Subjects: [
									{
										SubjectFull: "Elementary School Mathematics",
										Type: "general",
									},
									{
										SubjectFull: "Mathematics Instruction",
										Type: "general",
									},
									{
										SubjectFull: "Faculty Development",
										Type: "general",
									},
									{
										SubjectFull: "Childrens Literature",
										Type: "general",
									},
									{
										SubjectFull: "Interdisciplinary Approach",
										Type: "general",
									},
									{
										SubjectFull: "Elementary School Teachers",
										Type: "general",
									},
									{
										SubjectFull: "Teaching Methods",
										Type: "general",
									},
									{
										SubjectFull: "Manipulative Materials",
										Type: "general",
									},
									{
										SubjectFull: "Visual Aids",
										Type: "general",
									},
									{
										SubjectFull: "Instructional Materials",
										Type: "general",
									},
									{
										SubjectFull: "Instructional Effectiveness",
										Type: "general",
									},
									{
										SubjectFull: "Teacher Surveys",
										Type: "general",
									},
									{
										SubjectFull: "Video Technology",
										Type: "general",
									},
									{
										SubjectFull: "Pretests Posttests",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Integrating Children's Literature in Elementary Mathematics",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Thomas, Lynsey",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Feng, Jay",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "10",
													Text: "20151001",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "ERICRIE0",
												},
											],
											Titles: [
												{
													TitleFull: "Online Submission",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 3,
					Header: {
						DbId: "edsgao",
						DbLabel: "Academic OneFile",
						An: "edsgcl.434414429",
						RelevancyScore: "2081",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edsgao&AN=edsgcl.434414429",
					FullText: {
						Links: [
							{
								Type: "pdflink",
								Url: "http://content.ebscohost.com/ContentServer.asp?EbscoContent=dGJyMNLe80SeqK84yNfsOLCmr06eprdSr6u4TbSWxWXS&ContentCustomer=dGJyMOzpsE2yrLBPuePfgeyx43zx1%2B6B9N%2Fj&T=P&P=AN&S=R&D=a9h&K=109002134",
							},
						],
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:edsgao&genre=article&issn=10924388&ISBN=&volume=58&issue=5&date=20151001&spage=1611&pages=1611-1625&title=Journal of Speech, Language, and Hearing Research&atitle=The%20influence%20of%20hearing%20aid%20use%20on%20outcomes%20of%20children%20with%20mild%20hearing%20loss&aulast=Walker%2C%20Elizabeth%20A.&id=DOI:",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "The influence of hearing aid use on outcomes of children with mild hearing loss",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Walker%2C+Elizabeth+A%2E%22&quot;&gt;Walker, Elizabeth A.&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Holte%2C+Lenore%22&quot;&gt;Holte, Lenore&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22McCreery%2C+Ryan+W%2E%22&quot;&gt;McCreery, Ryan W.&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Spratford%2C+Meredith%22&quot;&gt;Spratford, Meredith&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Page%2C+Thomas%22&quot;&gt;Page, Thomas&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Moeller%2C+Mary+Pat%22&quot;&gt;Moeller, Mary Pat&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "Journal of Speech, Language, and Hearing Research. Oct 2015, Vol. 58 Issue 5, p1611, 15 p.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Hearing+disorders+in+children+--+Care+and+treatment%22&quot;&gt;Hearing disorders in children -- Care and treatment&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Hearing+disorders+in+children+--+Research%22&quot;&gt;Hearing disorders in children -- Research&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Hearing+aids+--+Research%22&quot;&gt;Hearing aids -- Research&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Language+acquisition+--+Research%22&quot;&gt;Language acquisition -- Research&lt;/searchLink&gt;",
						},
						{
							Name: "Subject",
							Label: "Subject Geographic",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22United+States%22&quot;&gt;United States&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description",
							Group: "Ab",
							Data: "With the advent of universal newborn hearing screening (NHS) programs, it is now possible to identify hearing loss (HL) at birth and provide early intervention for children with mild HL. [...]&lt;br /&gt;Purpose: This study examined the effects of consistent hearing aid (HA) use on outcomes in children with mild hearing loss (HL). Method: Five- or 7-year-old children with mild HL were separated into 3 groups on the basis of patterns of daily HA use. Using analyses of variance, we compared outcomes between groups on speech and language tests and a speech perception in noise task. Regression models were used to investigate the influence of cumulative auditory experience (audibility, early intervention, HA use) on outcomes. Results: Full-time HA users demonstrated significantly higher scores on vocabulary and grammar measures compared with nonusers. There were no significant differences between the 3 groups on articulation or speech perception measures. After controlling for the variance in age at confirmation of HL, level of audibility, and enrollment in early intervention, only amount of daily Ha use was a significant predictor of grammar and vocabulary. Conclusions: The current results provide evidence that children&#39;s language development benefits from consistent HA use. Nonusers are at risk in areas such as vocabulary and grammar compared with other children with mild HL who wear HAs regularly. Service providers should work collaboratively to encourage consistent HA use.",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "15",
										StartPage: "1611",
									},
								},
								Subjects: [
									{
										SubjectFull:
											"Hearing disorders in children -- Care and treatment",
										Type: "general",
									},
									{
										SubjectFull: "Hearing disorders in children -- Research",
										Type: "general",
									},
									{
										SubjectFull: "Hearing aids -- Research",
										Type: "general",
									},
									{
										SubjectFull: "Language acquisition -- Research",
										Type: "general",
									},
									{
										SubjectFull: "United States",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"The influence of hearing aid use on outcomes of children with mild hearing loss",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Walker, Elizabeth A.",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Holte, Lenore",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "McCreery, Ryan W.",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Spratford, Meredith",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Page, Thomas",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Moeller, Mary Pat",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "10",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "10924388",
												},
												{
													Type: "issn-locals",
													Value: "edsgao",
												},
												{
													Type: "issn-locals",
													Value: "edsgea",
												},
												{
													Type: "issn-locals",
													Value: "edsggo",
												},
												{
													Type: "issn-locals",
													Value: "edsghw",
												},
												{
													Type: "issn-locals",
													Value: "edsgih",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "58",
												},
												{
													Type: "issue",
													Value: "5",
												},
											],
											Titles: [
												{
													TitleFull:
														"Journal of Speech, Language, and Hearing Research",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 4,
					Header: {
						DbId: "edspac",
						DbLabel: "CQ Press Public Affairs Collection",
						An: "hsdc99.0000038544",
						RelevancyScore: "2069",
						PubType: "Primary Source",
						PubTypeId: "primarySource",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edspac&AN=hsdc99.0000038544",
					FullText: {
						Text: {
							Availability: "0",
						},
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Speech by C. Bellamy, Executive Director of the United Nations Children&#39;s Fund (UNICEF) on Spread of AIDS and HIV in Africa, Lusaka, Zambia",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "&lt;i&gt;Historic Documents of 1999&lt;/i&gt;.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22AIDS+%26+HIV%22&quot;&gt;AIDS &amp; HIV&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Health%22&quot;&gt;Health&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Research+%26+Advocacy%22&quot;&gt;Research &amp; Advocacy&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22International+Affairs%22&quot;&gt;International Affairs&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Regional+Political+Affairs%22&quot;&gt;Regional Political Affairs&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Africa%22&quot;&gt;Africa&lt;/searchLink&gt;",
						},
						{
							Name: "URL",
							Label: "Availability",
							Group: "URL",
							Data: "http://library.cqpress.com/cqpac/document.php?id=hsdc99-0000038544",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Subjects: [
									{
										SubjectFull: "AIDS & HIV",
										Type: "general",
									},
									{
										SubjectFull: "Health",
										Type: "general",
									},
									{
										SubjectFull: "Research & Advocacy",
										Type: "general",
									},
									{
										SubjectFull: "International Affairs",
										Type: "general",
									},
									{
										SubjectFull: "Regional Political Affairs",
										Type: "general",
									},
									{
										SubjectFull: "Africa",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Speech by C. Bellamy, Executive Director of the United Nations Children's Fund (UNICEF) on Spread of AIDS and HIV in Africa, Lusaka, Zambia",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "01",
													Type: "published",
													Y: "2000",
												},
											],
											Identifiers: [
												{
													Type: "isbn-print",
													Value: "1568024894",
												},
												{
													Type: "issn-locals",
													Value: "EDSPAC",
												},
											],
											Titles: [
												{
													TitleFull: "Historic Documents of 1999",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 5,
					Header: {
						DbId: "eric",
						DbLabel: "ERIC",
						An: "EJ1081258",
						RelevancyScore: "2068",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=eric&AN=EJ1081258",
					FullText: {
						Text: {
							Availability: "0",
						},
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Teaching Aids a Special Pedagogy Tool of Brain Development in School Children, Interest and Academic Achievement to Enhance Future Technology",
						},
						{
							Name: "Author",
							Label: "Author(s)",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Ohwojero%2C+Chamberlain+Joseph%22&quot;&gt;Ohwojero, Chamberlain Joseph&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "&lt;searchLink fieldCode=&quot;JN&quot; term=&quot;%22Journal+of+Education+and+Practice%22&quot;&gt;Journal of Education and Practice&lt;/searchLink&gt;, v6 n29 p92-101 2015. 10 pp.",
						},
						{
							Name: "PeerReviewed",
							Label: "Peer Reviewed",
							Group: "SrcInfo",
							Data: "Yes",
						},
						{
							Name: "SubjectThesaurus",
							Label: "Descriptors",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Brain%22&quot;&gt;Brain&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Child+Development%22&quot;&gt;Child Development&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Teaching+Methods%22&quot;&gt;Teaching Methods&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Control+Groups%22&quot;&gt;Control Groups&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Experimental+Groups%22&quot;&gt;Experimental Groups&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Hypothesis+Testing%22&quot;&gt;Hypothesis Testing&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Academic+Achievement%22&quot;&gt;Academic Achievement&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Elementary+School+Students%22&quot;&gt;Elementary School Students&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Quasiexperimental+Design%22&quot;&gt;Quasiexperimental Design&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Young+Children%22&quot;&gt;Young Children&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Foreign+Countries%22&quot;&gt;Foreign Countries&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Achievement+Tests%22&quot;&gt;Achievement Tests&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Student+Interests%22&quot;&gt;Student Interests&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Pretests+Posttests%22&quot;&gt;Pretests Posttests&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Questionnaires%22&quot;&gt;Questionnaires&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Statistical+Analysis%22&quot;&gt;Statistical Analysis&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Comparative+Analysis%22&quot;&gt;Comparative Analysis&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Educational+Technology%22&quot;&gt;Educational Technology&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Elementary+Education%22&quot;&gt;Elementary Education&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Abstract",
							Group: "Ab",
							Data: "The school system is an institution where teachers adopt different teaching methods to impact knowledge and skills. The teaching method adopted by a class teacher has a great effect on children interest, academic achievement and brain development of a child. To support this fact the researcher used two groups of children from ten schools to carry out a study. Five schools where used as control groups while another five schools was used as experimental groups. Both groups have a population of 400 pupils in the ten schools that were selected for the study. In carrying out this research, two research questions were raised to guide the study; with two hypotheses formulated and tested at 0.05 significant levels. Findings were discussed based on observations, and recommendations were made to guide the class teachers, parents, government and children on the importance of teaching aids in the teaching and learning of child development.",
						},
						{
							Name: "AbstractInfo",
							Label: "Abstractor",
							Group: "Ab",
							Data: "As Provided",
						},
						{
							Name: "TypePub",
							Label: "Publication Type",
							Group: "TypPub",
							Data: "Journal Articles; Reports - Research",
						},
						{
							Name: "CodeSource",
							Label: "Journal Code",
							Group: "SrcInfo",
							Data: "&lt;searchLink fieldCode=&quot;JC&quot; term=&quot;%22DEC2015%22&quot;&gt;DEC2015&lt;/searchLink&gt;",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Code: "eng",
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "10",
										StartPage: "92",
									},
								},
								Subjects: [
									{
										SubjectFull: "Brain",
										Type: "general",
									},
									{
										SubjectFull: "Child Development",
										Type: "general",
									},
									{
										SubjectFull: "Teaching Methods",
										Type: "general",
									},
									{
										SubjectFull: "Control Groups",
										Type: "general",
									},
									{
										SubjectFull: "Experimental Groups",
										Type: "general",
									},
									{
										SubjectFull: "Hypothesis Testing",
										Type: "general",
									},
									{
										SubjectFull: "Academic Achievement",
										Type: "general",
									},
									{
										SubjectFull: "Elementary School Students",
										Type: "general",
									},
									{
										SubjectFull: "Quasiexperimental Design",
										Type: "general",
									},
									{
										SubjectFull: "Young Children",
										Type: "general",
									},
									{
										SubjectFull: "Foreign Countries",
										Type: "general",
									},
									{
										SubjectFull: "Achievement Tests",
										Type: "general",
									},
									{
										SubjectFull: "Student Interests",
										Type: "general",
									},
									{
										SubjectFull: "Pretests Posttests",
										Type: "general",
									},
									{
										SubjectFull: "Questionnaires",
										Type: "general",
									},
									{
										SubjectFull: "Statistical Analysis",
										Type: "general",
									},
									{
										SubjectFull: "Comparative Analysis",
										Type: "general",
									},
									{
										SubjectFull: "Educational Technology",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Teaching Aids a Special Pedagogy Tool of Brain Development in School Children, Interest and Academic Achievement to Enhance Future Technology",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Ohwojero, Chamberlain Joseph",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "01",
													Text: "20150101",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "22221735",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "6",
												},
												{
													Type: "issue",
													Value: "29",
												},
											],
											Titles: [
												{
													TitleFull: "Journal of Education and Practice",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 6,
					Header: {
						DbId: "edsgao",
						DbLabel: "Academic OneFile",
						An: "edsgcl.424276601",
						RelevancyScore: "2059",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edsgao&AN=edsgcl.424276601",
					FullText: {
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:edsgao&genre=article&issn=10907165&ISBN=&volume=19&issue=8&date=20150801&spage=1408&pages=1408-1414&title=AIDS and Behavior&atitle=Family%20Functioning%20and%20Child%20Behavioral%20Problems%20in%20Households%20Affected%20by%20HIV%20and%20AIDS%20in%20Kenya&aulast=Thurman%2C%20Tonya%20R.&id=DOI:",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Family Functioning and Child Behavioral Problems in Households Affected by HIV and AIDS in Kenya",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Thurman%2C+Tonya+R%2E%22&quot;&gt;Thurman, Tonya R.&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Kidman%2C+Rachel%22&quot;&gt;Kidman, Rachel&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Nice%2C+Johanna%22&quot;&gt;Nice, Johanna&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Ikamari%2C+Lawrence%22&quot;&gt;Ikamari, Lawrence&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "AIDS and Behavior. August 2015, Vol. 19 Issue 8, p1408, 7 p.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Children+--+Behavior%22&quot;&gt;Children -- Behavior&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Children+--+Analysis%22&quot;&gt;Children -- Analysis&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22HIV+patients+--+Research%22&quot;&gt;HIV patients -- Research&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22HIV+patients+--+Health+aspects%22&quot;&gt;HIV patients -- Health aspects&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Epidemiology+--+Research%22&quot;&gt;Epidemiology -- Research&lt;/searchLink&gt;",
						},
						{
							Name: "Subject",
							Label: "Subject Geographic",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Kenya%22&quot;&gt;Kenya&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description",
							Group: "Ab",
							Data: "HIV places acute stressors on affected children and families especially in resource limited contexts like sub-Saharan Africa. Despite their importance, the epidemic&#39;s potential consequences for family dynamics and children&#39;s psychological health are understudied. Using a population-based sample of 2,487 caregivers and 3,423 children aged 8--14 years from the Central Province of Kenya, analyses were conducted to examine whether parental illness and loss were associated with family functioning and children&#39;s externalizing behaviors. After controlling for demographics, a significant relationship between parental illness and externalizing behaviors was found among children of both genders. Orphan status was associated with behavioral problems among only girls. Regardless of gender, children experiencing both parental loss and illness fared the worst. Family functioning measured from the perspective of both caregivers and children also had an independent and important relationship with behavioral problems. Findings suggest that psychological and behavioral health needs may be elevated in households coping with serious illness and reiterate the importance of a family-centered approach for HIV-affected children.",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "7",
										StartPage: "1408",
									},
								},
								Subjects: [
									{
										SubjectFull: "Children -- Behavior",
										Type: "general",
									},
									{
										SubjectFull: "Children -- Analysis",
										Type: "general",
									},
									{
										SubjectFull: "HIV patients -- Research",
										Type: "general",
									},
									{
										SubjectFull: "HIV patients -- Health aspects",
										Type: "general",
									},
									{
										SubjectFull: "Epidemiology -- Research",
										Type: "general",
									},
									{
										SubjectFull: "Kenya",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Family Functioning and Child Behavioral Problems in Households Affected by HIV and AIDS in Kenya",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Thurman, Tonya R.",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Kidman, Rachel",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Nice, Johanna",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Ikamari, Lawrence",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "08",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "10907165",
												},
												{
													Type: "issn-locals",
													Value: "edsgaoNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsgihNFT",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "19",
												},
												{
													Type: "issue",
													Value: "8",
												},
											],
											Titles: [
												{
													TitleFull: "AIDS and Behavior",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 7,
					Header: {
						DbId: "edsgao",
						DbLabel: "Academic OneFile",
						An: "edsgcl.423817541",
						RelevancyScore: "2056",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edsgao&AN=edsgcl.423817541",
					FullText: {
						Text: {
							Availability: "0",
						},
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Sociodemographic profile and health status of children living with HIV-AIDS attached to an NGO (ADHAR) of Ahmedabad city",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Thakor%2C+Nilesh%22&quot;&gt;Thakor, Nilesh&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Gadhavi%2C+Rajendra+N%2E%22&quot;&gt;Gadhavi, Rajendra N.&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Damor%2C+Pradip%22&quot;&gt;Damor, Pradip&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Baranda%2C+Ushma%22&quot;&gt;Baranda, Ushma&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Bhagora%2C+Samir%22&quot;&gt;Bhagora, Samir&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Patel%2C+Nisarg%22&quot;&gt;Patel, Nisarg&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "International Journal of Medical Science and Public Health. June 2015, Vol. 4 Issue 6, p773, 4 p.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Disease+transmission+--+Research%22&quot;&gt;Disease transmission -- Research&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22HIV+infection+in+children+--+Distribution%22&quot;&gt;HIV infection in children -- Distribution&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22HIV+infection+in+children+--+Demographic+aspects%22&quot;&gt;HIV infection in children -- Demographic aspects&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Pediatric+research%22&quot;&gt;Pediatric research&lt;/searchLink&gt;",
						},
						{
							Name: "Subject",
							Label: "Subject Geographic",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22India%22&quot;&gt;India&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description",
							Group: "Ab",
							Data: "Abstract Background: Acquired immunodeficiency syndrome (AIDS) has emerged as one of the most serious public health problems in India. Objectives: This study was conducted (1) to study the sociodemographic profile [...]",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "4",
										StartPage: "773",
									},
								},
								Subjects: [
									{
										SubjectFull: "Disease transmission -- Research",
										Type: "general",
									},
									{
										SubjectFull: "HIV infection in children -- Distribution",
										Type: "general",
									},
									{
										SubjectFull:
											"HIV infection in children -- Demographic aspects",
										Type: "general",
									},
									{
										SubjectFull: "Pediatric research",
										Type: "general",
									},
									{
										SubjectFull: "India",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Sociodemographic profile and health status of children living with HIV-AIDS attached to an NGO (ADHAR) of Ahmedabad city",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Thakor, Nilesh",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Gadhavi, Rajendra N.",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Damor, Pradip",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Baranda, Ushma",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Bhagora, Samir",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Patel, Nisarg",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "06",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "23204664",
												},
												{
													Type: "issn-locals",
													Value: "edsgao",
												},
												{
													Type: "issn-locals",
													Value: "edsghw",
												},
												{
													Type: "issn-locals",
													Value: "edsgih",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "4",
												},
												{
													Type: "issue",
													Value: "6",
												},
											],
											Titles: [
												{
													TitleFull:
														"International Journal of Medical Science and Public Health",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 8,
					Header: {
						DbId: "edssci",
						DbLabel: "SciELO",
						An: "edssci.S1808.86942015000200148",
						RelevancyScore: "2052",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edssci&AN=edssci.S1808.86942015000200148",
					FullText: {
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://www.scielo.br/scielo.php?script=sci_arttext&pid=S1808-86942015000200148&lng=en&tlng=en#?",
								Name: "EDS - SciELO",
								Category: "fullText",
								Text: "Voir le texte intégral en SciELO",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Auditory and language skills of children using hearing aids / Habilidades lingu&#237;sticas e auditivas de crian&#231;as usu&#225;rias de aparelho auditivo",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Leticia+Macedo%2C+Penna%22&quot;&gt;Leticia Macedo, Penna&lt;/searchLink&gt;&lt;relatesTo&gt;AFF1&lt;/relatesTo&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Stela+Maris+Aguiar%2C+Lemos%22&quot;&gt;Stela Maris Aguiar, Lemos&lt;/searchLink&gt;&lt;relatesTo&gt;AFF1&lt;/relatesTo&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Cl&#225;udia+Regina+Lindgren%2C+Alves%22&quot;&gt;Cl&#225;udia Regina Lindgren, Alves&lt;/searchLink&gt;&lt;relatesTo&gt;AFF1&lt;/relatesTo&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "&lt;i&gt;Brazilian Journal of Otorhinolaryngology&lt;/i&gt;. Apr 2015 81(2):148-157",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Hearing+loss%22&quot;&gt;Hearing loss&lt;/searchLink&gt; / &lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Perda+auditiva%22&quot;&gt;Perda auditiva&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Child+language%22&quot;&gt;Child language&lt;/searchLink&gt; / &lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Linguagem+infantil%22&quot;&gt;Linguagem infantil&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Hearing+aids%22&quot;&gt;Hearing aids&lt;/searchLink&gt; / &lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Auxiliares+de+audi&#231;&#227;o%22&quot;&gt;Auxiliares de audi&#231;&#227;o&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Auditory+perception%22&quot;&gt;Auditory perception&lt;/searchLink&gt; / &lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Percep&#231;&#227;o+auditiva%22&quot;&gt;Percep&#231;&#227;o auditiva&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Correction+of+hearing+impairment%22&quot;&gt;Correction of hearing impairment&lt;/searchLink&gt; / &lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Corre&#231;&#227;o+de+defici&#234;ncia+auditiva%22&quot;&gt;Corre&#231;&#227;o de defici&#234;ncia auditiva&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22OTORHINOLARYNGOLOGY%22&quot;&gt;OTORHINOLARYNGOLOGY&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description",
							Group: "Ab",
							Data: "INTRODUCTION: Hearing loss may impair the development of a child. The rehabilitation process for individuals with hearing loss depends on effective interventions. OBJECTIVE: To describe the linguistic profile and the hearing skills of children using hearing aids, to characterize the rehabilitation process and to analyze its association with the children&#39;s degree of hearing loss. METHODS: Cross-sectional study with a non-probabilistic sample of 110 children using hearing aids (6-10 years of age) for mild to profound hearing loss. Tests of language, speech perception, phonemic discrimination, and school performance were performed. The associations were verified by the following tests: chi-squared for linear trend and Kruskal-Wallis. RESULTS: About 65% of the children had altered vocabulary, whereas 89% and 94% had altered phonology and inferior school performance, respectively. The degree of hearing loss was associated with differences in the median age of diagnosis; the age at which the hearing aids were adapted and at which speech therapy was started; and the performance on auditory tests and the type of communication used. CONCLUSION: The diagnosis of hearing loss and the clinical interventions occurred late, contributing to impairments in auditory and language development.&lt;br /&gt;INTRODU&#199;&#195;O: A defici&#234;ncia auditiva pode comprometer o desenvolvimento infantil. O processo de reabilita&#231;&#227;o dos indiv&#237;duos com perda auditiva depende de interven&#231;&#245;es eficientes. OBJETIVO: Descrever o perfil lingu&#237;stico e as habilidades auditivas de usu&#225;rios de Aparelho de Amplifica&#231;&#227;o Sonora Individual (AASI), caracterizar o processo de interven&#231;&#227;o fonoaudiol&#243;gica e analisar sua rela&#231;&#227;o com o grau da perda auditiva das crian&#231;as. M&#201;TODO: Estudo transversal com amostra n&#227;o-probabil&#237;stica composta por 110 crian&#231;as de 6 a 10 anos de idade, com perda auditiva de grau leve a profundo, usu&#225;rias de AASI. Foram realizados testes de linguagem, percep&#231;&#227;o de fala, discrimina&#231;&#227;o fon&#234;mica e desempenho escolar. As associa&#231;&#245;es foram verificadas pelos testes x2 de tend&#234;ncia linear e Kruskal-Wallis. RESULTADOS: Cerca de 65% das crian&#231;as apresentavam altera&#231;&#227;o do vocabul&#225;rio, 89% de fonologia e 94% tiveram desempenho escolar considerado inferior. O grau da perda auditiva mostrou-se associado a diferen&#231;as nas medianas das idades de diagn&#243;stico, de adapta&#231;&#227;o do AASI e de in&#237;cio da fonoterapia; do tempo entre diagn&#243;stico e adapta&#231;&#227;o do aparelho auditivo; ao resultado dos testes auditivos e ao tipo de comunica&#231;&#227;o utilizada. CONCLUS&#195;O: Independentemente do grau de perda auditiva, o diagn&#243;stico e as interven&#231;&#245;es necess&#225;rias ocorreram tardiamente, com preju&#237;zo das habilidades lingu&#237;sticas e auditivas destas crian&#231;as.",
						},
						{
							Name: "URL",
							Label: "Access URL",
							Group: "URL",
							Data: "&lt;link linkTarget=&quot;URL&quot; linkTerm=&quot;http://www.scielo.br/scielo.php?script=sci_arttext&amp;pid=S1808-86942015000200148&amp;lng=en&amp;tlng=en&quot; linkWindow=&quot;_blank&quot;&gt;http://www.scielo.br/scielo.php?script=sci_arttext&amp;pid=S1808-86942015000200148&amp;lng=en&amp;tlng=en&lt;/link&gt;",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Identifiers: [
									{
										Type: "doi",
										Value: "10.1016/j.bjorl.2014.05.034",
									},
								],
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										StartPage: "148",
									},
								},
								Subjects: [
									{
										SubjectFull: "Hearing loss / Perda auditiva",
										Type: "general",
									},
									{
										SubjectFull: "Child language / Linguagem infantil",
										Type: "general",
									},
									{
										SubjectFull: "Hearing aids / Auxiliares de audição",
										Type: "general",
									},
									{
										SubjectFull: "Auditory perception / Percepção auditiva",
										Type: "general",
									},
									{
										SubjectFull:
											"Correction of hearing impairment / Correção de deficiência auditiva",
										Type: "general",
									},
									{
										SubjectFull: "OTORHINOLARYNGOLOGY",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Auditory and language skills of children using hearing aids / Habilidades linguísticas e auditivas de crianças usuárias de aparelho auditivo",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Leticia Macedo, Penna",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Stela Maris Aguiar, Lemos",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Cláudia Regina Lindgren, Alves",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "04",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "18088686",
												},
												{
													Type: "issn-locals",
													Value: "SciELO Brazil",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "81",
												},
												{
													Type: "issue",
													Value: "2",
												},
											],
											Titles: [
												{
													TitleFull: "Brazilian Journal of Otorhinolaryngology",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 9,
					Header: {
						DbId: "eric",
						DbLabel: "ERIC",
						An: "ED560022",
						RelevancyScore: "2046",
						PubType: "",
						PubTypeId: "unknown",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=eric&AN=ED560022",
					FullText: {
						Text: {
							Availability: "0",
						},
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Reimagine the Future: Innovation for Every Child. The State of the World&#39;s Children 2015. Executive Summary",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "&lt;searchLink fieldCode=&quot;JN&quot; term=&quot;%22UNICEF%22&quot;&gt;UNICEF&lt;/searchLink&gt;. 124 pp.",
						},
						{
							Name: "PeerReviewed",
							Label: "Peer Reviewed",
							Group: "SrcInfo",
							Data: "N/A",
						},
						{
							Name: "SubjectThesaurus",
							Label: "Descriptors",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Children%22&quot;&gt;Children&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Disadvantaged+Youth%22&quot;&gt;Disadvantaged Youth&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Childrens+Rights%22&quot;&gt;Childrens Rights&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22World+Problems%22&quot;&gt;World Problems&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22International+Law%22&quot;&gt;International Law&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Treaties%22&quot;&gt;Treaties&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Foreign+Countries%22&quot;&gt;Foreign Countries&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Innovation%22&quot;&gt;Innovation&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Social+Justice%22&quot;&gt;Social Justice&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Personal+Narratives%22&quot;&gt;Personal Narratives&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Video+Technology%22&quot;&gt;Video Technology&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Social+Change%22&quot;&gt;Social Change&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Mortality+Rate%22&quot;&gt;Mortality Rate&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Regional+Characteristics%22&quot;&gt;Regional Characteristics&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Nutrition%22&quot;&gt;Nutrition&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Child+Health%22&quot;&gt;Child Health&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Acquired+Immunodeficiency+Syndrome+%28AIDS%29%22&quot;&gt;Acquired Immunodeficiency Syndrome (AIDS)&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Access+to+Education%22&quot;&gt;Access to Education&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Preschool+Education%22&quot;&gt;Preschool Education&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Elementary+Education%22&quot;&gt;Elementary Education&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Secondary+Education%22&quot;&gt;Secondary Education&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Literacy%22&quot;&gt;Literacy&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Birth+Rate%22&quot;&gt;Birth Rate&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Demography%22&quot;&gt;Demography&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Economic+Climate%22&quot;&gt;Economic Climate&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Females%22&quot;&gt;Females&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Adult+Literacy%22&quot;&gt;Adult Literacy&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Womens+Education%22&quot;&gt;Womens Education&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Mothers%22&quot;&gt;Mothers&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Contraception%22&quot;&gt;Contraception&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Child+Labor%22&quot;&gt;Child Labor&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Marriage%22&quot;&gt;Marriage&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Child+Abuse%22&quot;&gt;Child Abuse&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Family+Violence%22&quot;&gt;Family Violence&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Discipline%22&quot;&gt;Discipline&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Adolescents%22&quot;&gt;Adolescents&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Mass+Media+Use%22&quot;&gt;Mass Media Use&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Enrollment%22&quot;&gt;Enrollment&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Early+Parenthood%22&quot;&gt;Early Parenthood&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Rural+Urban+Differences%22&quot;&gt;Rural Urban Differences&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Family+Income%22&quot;&gt;Family Income&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Early+Childhood+Education%22&quot;&gt;Early Childhood Education&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Child+Development%22&quot;&gt;Child Development&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Child+Care%22&quot;&gt;Child Care&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Tables+%28Data%29%22&quot;&gt;Tables (Data)&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Preschool+Education%22&quot;&gt;Preschool Education&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Early+Childhood+Education%22&quot;&gt;Early Childhood Education&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Elementary+Education%22&quot;&gt;Elementary Education&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Secondary+Education%22&quot;&gt;Secondary Education&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Abstract",
							Group: "Ab",
							Data: "To mark the 25th anniversary of the Convention on the Rights of the Child, this edition of &quot;The State of the World&#39;s Children&quot; calls for brave and fresh thinking to address age-old problems that still affect the world&#39;s most disadvantaged children. The report is inspired by the work of innovators around the world--who are pushing boundaries and crafting solutions for local problems that reflect urgent global needs--towards a future in which all children can enjoy their rights. The digital report is a crowd-sourced compilation of stories and videos. It includes an interactive platform that maps innovations in countries all over the world, and invites users to put their own ideas &quot;on the map.&quot; It is available at http://sowc2015.unicef.org/. This Executive Summary provides an overview of the digital report and the context of UNICEF&#39;s call for innovation for equity. It also presents key statistics on child survival, development and protection for the world&#39;s countries, areas and regions.",
						},
						{
							Name: "AbstractInfo",
							Label: "Abstractor",
							Group: "Ab",
							Data: "As Provided",
						},
						{
							Name: "Author",
							Label: "Corporate Source",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;IN&quot; term=&quot;%22United+Nations+Children&#39;s+Fund+%28UNICEF%29%22&quot;&gt;United Nations Children&#39;s Fund (UNICEF)&lt;/searchLink&gt;",
						},
						{
							Name: "TypePub",
							Label: "Publication Type",
							Group: "TypPub",
							Data: "Numerical/Quantitative Data; Reports - Descriptive",
						},
						{
							Name: "CodeSource",
							Label: "Journal Code",
							Group: "SrcInfo",
							Data: "&lt;searchLink fieldCode=&quot;JC&quot; term=&quot;%22DEC2015%22&quot;&gt;DEC2015&lt;/searchLink&gt;",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Code: "eng",
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "124",
									},
								},
								Subjects: [
									{
										SubjectFull: "Children",
										Type: "general",
									},
									{
										SubjectFull: "Disadvantaged Youth",
										Type: "general",
									},
									{
										SubjectFull: "Childrens Rights",
										Type: "general",
									},
									{
										SubjectFull: "World Problems",
										Type: "general",
									},
									{
										SubjectFull: "International Law",
										Type: "general",
									},
									{
										SubjectFull: "Treaties",
										Type: "general",
									},
									{
										SubjectFull: "Foreign Countries",
										Type: "general",
									},
									{
										SubjectFull: "Innovation",
										Type: "general",
									},
									{
										SubjectFull: "Social Justice",
										Type: "general",
									},
									{
										SubjectFull: "Personal Narratives",
										Type: "general",
									},
									{
										SubjectFull: "Video Technology",
										Type: "general",
									},
									{
										SubjectFull: "Social Change",
										Type: "general",
									},
									{
										SubjectFull: "Mortality Rate",
										Type: "general",
									},
									{
										SubjectFull: "Regional Characteristics",
										Type: "general",
									},
									{
										SubjectFull: "Nutrition",
										Type: "general",
									},
									{
										SubjectFull: "Child Health",
										Type: "general",
									},
									{
										SubjectFull: "Acquired Immunodeficiency Syndrome (AIDS)",
										Type: "general",
									},
									{
										SubjectFull: "Access to Education",
										Type: "general",
									},
									{
										SubjectFull: "Preschool Education",
										Type: "general",
									},
									{
										SubjectFull: "Elementary Education",
										Type: "general",
									},
									{
										SubjectFull: "Secondary Education",
										Type: "general",
									},
									{
										SubjectFull: "Literacy",
										Type: "general",
									},
									{
										SubjectFull: "Birth Rate",
										Type: "general",
									},
									{
										SubjectFull: "Demography",
										Type: "general",
									},
									{
										SubjectFull: "Economic Climate",
										Type: "general",
									},
									{
										SubjectFull: "Females",
										Type: "general",
									},
									{
										SubjectFull: "Adult Literacy",
										Type: "general",
									},
									{
										SubjectFull: "Womens Education",
										Type: "general",
									},
									{
										SubjectFull: "Mothers",
										Type: "general",
									},
									{
										SubjectFull: "Contraception",
										Type: "general",
									},
									{
										SubjectFull: "Child Labor",
										Type: "general",
									},
									{
										SubjectFull: "Marriage",
										Type: "general",
									},
									{
										SubjectFull: "Child Abuse",
										Type: "general",
									},
									{
										SubjectFull: "Family Violence",
										Type: "general",
									},
									{
										SubjectFull: "Discipline",
										Type: "general",
									},
									{
										SubjectFull: "Adolescents",
										Type: "general",
									},
									{
										SubjectFull: "Mass Media Use",
										Type: "general",
									},
									{
										SubjectFull: "Enrollment",
										Type: "general",
									},
									{
										SubjectFull: "Early Parenthood",
										Type: "general",
									},
									{
										SubjectFull: "Rural Urban Differences",
										Type: "general",
									},
									{
										SubjectFull: "Family Income",
										Type: "general",
									},
									{
										SubjectFull: "Early Childhood Education",
										Type: "general",
									},
									{
										SubjectFull: "Child Development",
										Type: "general",
									},
									{
										SubjectFull: "Child Care",
										Type: "general",
									},
									{
										SubjectFull: "Tables (Data)",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Reimagine the Future: Innovation for Every Child. The State of the World's Children 2015. Executive Summary",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "United Nations Children's Fund (UNICEF)",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "11",
													Text: "20141101",
													Type: "published",
													Y: "2014",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "ERICRIE0",
												},
											],
											Titles: [
												{
													TitleFull: "UNICEF",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 10,
					Header: {
						DbId: "edsgao",
						DbLabel: "Academic OneFile",
						An: "edsgcl.405415368",
						RelevancyScore: "2045",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edsgao&AN=edsgcl.405415368",
					FullText: {
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:edsgao&genre=article&issn=01655876&ISBN=&volume=79&issue=4&date=20150401&spage=541&pages=541-545&title=International Journal of Pediatric Otorhinolaryngology&atitle=Nasalance%20and%20nasality%20in%20children%20with%20cochlear%20implants%20and%20children%20with%20hearing%20aids&aulast=Baudonck%2C%20N.&id=DOI:10.1016/j.ijporl.2015.01.025",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Nasalance and nasality in children with cochlear implants and children with hearing aids",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Baudonck%2C+N%2E%22&quot;&gt;Baudonck, N.&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Van+Lierde%2C+K%2E%22&quot;&gt;Van Lierde, K.&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22D&#39;Haeseleer%2C+E%2E%22&quot;&gt;D&#39;Haeseleer, E.&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Dhooge%2C+I%2E%22&quot;&gt;Dhooge, I.&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "International Journal of Pediatric Otorhinolaryngology. April 2015, Vol. 79 Issue 4, p541, 5 p.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Speech+therapists%22&quot;&gt;Speech therapists&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Implants%2C+Artificial%22&quot;&gt;Implants, Artificial&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Prosthesis%22&quot;&gt;Prosthesis&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Children%22&quot;&gt;Children&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description",
							Group: "Ab",
							Data: "In prelingually deaf children, many speech production aspects including resonance, are known to be problematic. This study aimed to investigate nasality and nasalance in two groups of prelingually hearing impaired children, namely deaf children with a cochlear implant (CI) and moderate-to-severely hearing impaired hearing aid (HA) users. The results of both groups are compared with the results of normal hearing children. Besides, the impact of the degree of hearing loss was determined. Methodology: 36 CI children (mean age: 9;0y), 25 HA children (mean age: 9;1y) and 26 NH children (mean age: 9;3y) were assessed using objective assessment techniques and perceptual evaluations in order to investigate the nasal resonance of the three groups. Ten HA children had thresholds above 70dB (range: 91dB-105dB) and fifteen below 70dB (range: 58dB-68dB). The Nasometer was used for registration of the nasalance values and nasality was perceptually evaluated by two experienced speech therapists using a nominal rating scale (consensus evaluation).",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Identifiers: [
									{
										Type: "doi",
										Value: "10.1016/j.ijporl.2015.01.025",
									},
								],
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "5",
										StartPage: "541",
									},
								},
								Subjects: [
									{
										SubjectFull: "Speech therapists",
										Type: "general",
									},
									{
										SubjectFull: "Implants, Artificial",
										Type: "general",
									},
									{
										SubjectFull: "Prosthesis",
										Type: "general",
									},
									{
										SubjectFull: "Children",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Nasalance and nasality in children with cochlear implants and children with hearing aids",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Baudonck, N.",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Van Lierde, K.",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "D'Haeseleer, E.",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Dhooge, I.",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "04",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "01655876",
												},
												{
													Type: "issn-locals",
													Value: "edsgaoNFT",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "79",
												},
												{
													Type: "issue",
													Value: "4",
												},
											],
											Titles: [
												{
													TitleFull:
														"International Journal of Pediatric Otorhinolaryngology",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 11,
					Header: {
						DbId: "edsarl",
						DbLabel: "Airiti Library eBooks & Journals - 華藝線上圖書館",
						An: "edsarl.21608814.201403.201407300020.201407300020.27.37",
						RelevancyScore: "2042",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edsarl&AN=edsarl.21608814.201403.201407300020.201407300020.27.37",
					FullText: {
						Text: {
							Availability: "0",
						},
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "A Public Health Model and Framework to Mitigate the Impact of Orphans and Vulnerable Children Due to HIV/AIDS in Cameroon",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Dickson+Shey+Nsagha%22&quot;&gt;Dickson Shey Nsagha&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Ngowe+Ngowe+Marcelin%22&quot;&gt;Ngowe Ngowe Marcelin&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Jules+Clement+Nguedia+Assob%22&quot;&gt;Jules Clement Nguedia Assob&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Anna+Longdoh+Njundah%22&quot;&gt;Anna Longdoh Njundah&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "World Journal of AIDS. Vol. 4 Issue 1, p27-37. 11 p.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Orphans%22&quot;&gt;Orphans&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Vulnerable%22&quot;&gt;Vulnerable&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Children%22&quot;&gt;Children&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22HIV%22&quot;&gt;HIV&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22AIDS%22&quot;&gt;AIDS&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Public+Health+Model%22&quot;&gt;Public Health Model&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Cameroon%22&quot;&gt;Cameroon&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description (Translated)",
							Group: "Ab",
							Data: "UNICEF, UNAIDS and USAID developed a global strategic framework to guide responses to care and protect orphans and other vulnerable children in the context of HIV/AIDS. In the developing world, about 132 million people have lost one or both parents due to the AIDS pandemic and 25 million children have been orphaned by HIV/AIDS in 2010. The HIV prevalence in Cameroon is estimated at 5.1%. As of 2010, there were 304,000 deaths due to AIDS in Cameroon. Out of 1,200,000 orphans and vulnerable children in Cameroon in 2010, 300,000 were AIDS orphans. The HIV/AIDS burden impacts child survival, growth and development in the traditional African setting. With so many orphans in the population, along with many vulnerable children, strategies must be developed to respond more effectively to their critical needs. This study provides a model for OVC care and support in Cameroon. The model was developed out of extensive work using a participatory approach involving traditional, administrative and health stakeholders on OVC in Yaounde I and Yaounde VI Councils, Nanga Eboko Health District, Isangelle, Ekondo Titi, and Bafaka-Balue communities in Cameroon. Consultancy services with PLAN Cameroon, the Pan African Institute for Development-West Africa coupled with facilitation of many training workshops on OVC with Save the orphans Foundation, the Ministry of Social Affairs, and the Ministry of Public Health and work- ing with the National AIDS Control Committee. The essential components of a holistic framework for the care of OVC have been identified. A public health model for the care of OVC and a mechanism for their identification and a referral system for testing OVC for HIV are proposed. Through this model, a mechanism for the effective holistic care of OVC and collaboration is enhanced.",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Text: "英文",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "11",
										StartPage: "27",
									},
								},
								Subjects: [
									{
										SubjectFull: "Orphans",
										Type: "general",
									},
									{
										SubjectFull: "Vulnerable",
										Type: "general",
									},
									{
										SubjectFull: "Children",
										Type: "general",
									},
									{
										SubjectFull: "HIV",
										Type: "general",
									},
									{
										SubjectFull: "AIDS",
										Type: "general",
									},
									{
										SubjectFull: "Public Health Model",
										Type: "general",
									},
									{
										SubjectFull: "Cameroon",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"A Public Health Model and Framework to Mitigate the Impact of Orphans and Vulnerable Children Due to HIV/AIDS in Cameroon",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Dickson Shey Nsagha",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Ngowe Ngowe Marcelin",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Jules Clement Nguedia Assob",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Anna Longdoh Njundah",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "03",
													Type: "published",
													Y: "2014",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "21608814",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "4",
												},
												{
													Type: "issue",
													Value: "1",
												},
											],
											Titles: [
												{
													TitleFull: "World Journal of AIDS",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 12,
					Header: {
						DbId: "edsgao",
						DbLabel: "Academic OneFile",
						An: "edsgcl.419735188",
						RelevancyScore: "2042",
						PubType: "Periodical",
						PubTypeId: "serialPeriodical",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edsgao&AN=edsgcl.419735188",
					FullText: {
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:edsgao&genre=article&issn=10553290&ISBN=&volume=26&issue=4&date=20150701&spage=432&pages=432-442&title=Journal of the Association of Nurses in AIDS Care&atitle=Children%20Seeking%20Refuge%3A%20A%20Review%20of%20the%20Escalating%20Humanitarian%20Crisis%20of%20Child%20Sexual%20Abuse%20and%20HIV%2FAIDS%20in%20Latin%20America&aulast=Thornton%2C%20Clifton%20P.&id=DOI:",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Children Seeking Refuge: A Review of the Escalating Humanitarian Crisis of Child Sexual Abuse and HIV/AIDS in Latin America",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Thornton%2C+Clifton+P%2E%22&quot;&gt;Thornton, Clifton P.&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Veenema%2C+Tener+Goodwin%22&quot;&gt;Veenema, Tener Goodwin&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "Journal of the Association of Nurses in AIDS Care. July-August, 2015, Vol. 26 Issue 4, p432, 11 p.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Child+sexual+abuse%22&quot;&gt;Child sexual abuse&lt;/searchLink&gt;",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "11",
										StartPage: "432",
									},
								},
								Subjects: [
									{
										SubjectFull: "Child sexual abuse",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Children Seeking Refuge: A Review of the Escalating Humanitarian Crisis of Child Sexual Abuse and HIV/AIDS in Latin America",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Thornton, Clifton P.",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Veenema, Tener Goodwin",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "07",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "10553290",
												},
												{
													Type: "issn-locals",
													Value: "edsgaoNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsgeaNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsggoNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsggrNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsghwNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsgihNFT",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "26",
												},
												{
													Type: "issue",
													Value: "4",
												},
											],
											Titles: [
												{
													TitleFull:
														"Journal of the Association of Nurses in AIDS Care",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 13,
					Header: {
						DbId: "edsgao",
						DbLabel: "Academic OneFile",
						An: "edsgcl.432319252",
						RelevancyScore: "2041",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edsgao&AN=edsgcl.432319252",
					FullText: {
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:edsgao&genre=article&issn=0305750X&ISBN=&volume=76&issue=&date=20151201&spage=344&pages=344-358&title=World Development&atitle=Aid%20Fragmentation%20or%20Aid%20Pluralism%3F%20The%20Effect%20of%20Multiple%20Donors%20on%20Child%20Survival%20in%20Developing%20Countries%2C%201990-2010&aulast=Han%2C%20Lu&id=DOI:10.1016/j.worlddev.2015.07.014",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Aid Fragmentation or Aid Pluralism? The Effect of Multiple Donors on Child Survival in Developing Countries, 1990-2010",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Han%2C+Lu%22&quot;&gt;Han, Lu&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Koenig-Archibugi%2C+Mathias%22&quot;&gt;Koenig-Archibugi, Mathias&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "World Development. Dec 2015, Vol. 76, p344, 15 p.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Developing+countries+--+Analysis%22&quot;&gt;Developing countries -- Analysis&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description",
							Group: "Ab",
							Data: "While most policy-makers and researchers stress the negative impact of &#39;aid fragmentation&#39; on development outcomes in recipient countries, we argue that the greater diversity of perspectives entailed by higher multiplicity of donors can help select better policies. We hypothesize a U-shaped relationship: countries with a moderate number of donors fare better than countries with either few or many donors. The hypothesis is supported by a generalized method of moments (GMM) analysis of the relationship between health aid donors and child survival in 110 low- and middle-income countries during 1990-2010.",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Identifiers: [
									{
										Type: "doi",
										Value: "10.1016/j.worlddev.2015.07.014",
									},
								],
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "15",
										StartPage: "344",
									},
								},
								Subjects: [
									{
										SubjectFull: "Developing countries -- Analysis",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Aid Fragmentation or Aid Pluralism? The Effect of Multiple Donors on Child Survival in Developing Countries, 1990-2010",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Han, Lu",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Koenig-Archibugi, Mathias",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "12",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "0305750X",
												},
												{
													Type: "issn-locals",
													Value: "edsgaoNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsgeaNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsggoNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsggrNFT",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "76",
												},
											],
											Titles: [
												{
													TitleFull: "World Development",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 14,
					Header: {
						DbId: "edssci",
						DbLabel: "SciELO",
						An: "edssci.S1981.86372015000100007",
						RelevancyScore: "2039",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edssci&AN=edssci.S1981.86372015000100007",
					FullText: {
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://www.scielo.br/scielo.php?script=sci_arttext&pid=S1981-86372015000100007&lng=en&tlng=en#?",
								Name: "EDS - SciELO",
								Category: "fullText",
								Text: "Voir le texte intégral en SciELO",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Prevalence of Candida yeasts in oral samples from children with AIDS and children exposed and not exposed to HIV served by SUS in the state of Bahia, Brazil / Preval&#234;ncia de leveduras do g&#234;nero Candida em amostras bucais de crian&#231;as com AIDS, expostas e n&#227;o-expostas ao HIV atendidas pelo SUS no interior da Bahia-Brasil",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Francine+Cristina%2C+SILVA%22&quot;&gt;Francine Cristina, SILVA&lt;/searchLink&gt;&lt;relatesTo&gt;AFF1&lt;/relatesTo&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Vivian+Oliveira%2C+VIANA%22&quot;&gt;Vivian Oliveira, VIANA&lt;/searchLink&gt;&lt;relatesTo&gt;AFF2&lt;/relatesTo&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Bruno+Pereira+de%2C+ARA&#218;JO%22&quot;&gt;Bruno Pereira de, ARA&#218;JO&lt;/searchLink&gt;&lt;relatesTo&gt;AFF2&lt;/relatesTo&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22La&#237;ze+Aparecida+Nunes+Lopes%2C+CAMPOS%22&quot;&gt;La&#237;ze Aparecida Nunes Lopes, CAMPOS&lt;/searchLink&gt;&lt;relatesTo&gt;AFF2&lt;/relatesTo&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Luciano+Pereira%2C+ROSA%22&quot;&gt;Luciano Pereira, ROSA&lt;/searchLink&gt;&lt;relatesTo&gt;AFF2&lt;/relatesTo&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "&lt;i&gt;RGO - Revista Ga&#250;cha de Odontologia&lt;/i&gt;. Mar 2015 63(1):07-12",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Acquired+Immunodeficiency+Syndrome%22&quot;&gt;Acquired Immunodeficiency Syndrome&lt;/searchLink&gt; / &lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Candida%22&quot;&gt;Candida&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Candida%22&quot;&gt;Candida&lt;/searchLink&gt; / &lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Crian&#231;a%22&quot;&gt;Crian&#231;a&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Child%22&quot;&gt;Child&lt;/searchLink&gt; / &lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22S&#237;ndrome+da+Imunodefici&#234;ncia+adquirida%22&quot;&gt;S&#237;ndrome da Imunodefici&#234;ncia adquirida&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Prevalence%22&quot;&gt;Prevalence&lt;/searchLink&gt; / &lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Preval&#234;ncia%22&quot;&gt;Preval&#234;ncia&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22DENTISTRY%2C+ORAL+SURGERY+%26+MEDICINE%22&quot;&gt;DENTISTRY, ORAL SURGERY &amp; MEDICINE&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description",
							Group: "Ab",
							Data: "OBJECTIVE: This study aimed to determine the prevalence of Candida albicans and non-albicans yeast species isolated from oral samples of children with AIDS and of children exposed and not exposed to HIVduring pregnancy and served by the public health system in a county located in the interior of the state of Bahia, Brazil. METHODS: Saliva samples from 50 children aged between 2 and 12 years treated by SUS (group I = control group, group II = group exposed to HIV without seroconversion, and group III = AIDS carriers) were collected, seeded in Sabouraud dextrose agar with chloramphenicol, and fungal cultures were grown at 35 &#177; 2&#176; C for 24 hours. Three isolated colonies were randomly selected from each individual plaque for identification using the API20 AUX Biomerieux&#174; method. RESULTS: The most frequent fungal species in samples from children not exposed to HIV, exposed to HIV, and AIDS carriers was Candida albicans (48.80%, 25.64%, and 58.13%, respectively). Species of Candida non-albicans were also isolated from all groups studied. CONCLUSIONS: Despite the higher prevalence of Candida albicans in these groups, non-albicans species represented a significant percentage of Candida isolates.&lt;br /&gt;OBJETIVO: Verificar a preval&#234;ncia de leveduras do g&#234;nero Candida albicans e n&#227;o-albicans isoladas de amostras bucais de crian&#231;as com AIDS, expostas ao HIV durante o per&#237;odo gestacional e n&#227;o-expostas ao HIV atendidas pelo sistema &#250;nico de sa&#250;de em um munic&#237;pio do interior da Bahia- Brasil. M&#201;TODOS: Para a realiza&#231;&#227;o do estudo foram coletadas amostras de saliva de 50 crian&#231;as entre 2 e 12 anos atendidas pelo SUS (grupo I = controle; grupo II = expostas ao HIV, sem soroconvers&#227;o e grupo III = portadoras da AIDS),que ap&#243;s semeadas em &#225;gar Sabouraud dextrose com cloranfenicol, foram incubadas a 35&#176;C&#177;2/ 24h para verifica&#231;&#227;o de crescimento de col&#244;nias. Dessas foram selecionadas aleatoriamente 3 cepas, de cada indiv&#237;duo, para identifica&#231;&#227;o pelo m&#233;todo API 20 AUX da Biomerieux&#174;. RESULTADOS: A esp&#233;cie mais isolada nas amostras coletadas para os grupos de crian&#231;as n&#227;o expostas ao HIV, expostas ao HIV e portadoras da AIDS foi a Candida albicans (48,8%; 25,64% e 58,13% respectivamente). Foram tamb&#233;m isoladas esp&#233;cies de Candida n&#227;o-albicans em todos os grupos estudados. CONCLUS&#213;ES: Observou-se que apesar de haver uma preval&#234;ncia de esp&#233;cies de Candida albicans isoladas, as esp&#233;cies n&#227;o-albicans perfizeram um percentual significativo dos isolados dessa esp&#233;cie.",
						},
						{
							Name: "URL",
							Label: "Access URL",
							Group: "URL",
							Data: "&lt;link linkTarget=&quot;URL&quot; linkTerm=&quot;http://www.scielo.br/scielo.php?script=sci_arttext&amp;pid=S1981-86372015000100007&amp;lng=en&amp;tlng=en&quot; linkWindow=&quot;_blank&quot;&gt;http://www.scielo.br/scielo.php?script=sci_arttext&amp;pid=S1981-86372015000100007&amp;lng=en&amp;tlng=en&lt;/link&gt;",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Identifiers: [
									{
										Type: "doi",
										Value: "10.1590/1981-863720150001000012820",
									},
								],
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										StartPage: "07",
									},
								},
								Subjects: [
									{
										SubjectFull: "Acquired Immunodeficiency Syndrome / Candida",
										Type: "general",
									},
									{
										SubjectFull: "Candida / Criança",
										Type: "general",
									},
									{
										SubjectFull:
											"Child / Síndrome da Imunodeficiência adquirida",
										Type: "general",
									},
									{
										SubjectFull: "Prevalence / Prevalência",
										Type: "general",
									},
									{
										SubjectFull: "DENTISTRY, ORAL SURGERY & MEDICINE",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Prevalence of Candida yeasts in oral samples from children with AIDS and children exposed and not exposed to HIV served by SUS in the state of Bahia, Brazil / Prevalência de leveduras do gênero Candida em amostras bucais de crianças com AIDS, expostas e não-expostas ao HIV atendidas pelo SUS no interior da Bahia-Brasil",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Francine Cristina, SILVA",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Vivian Oliveira, VIANA",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Bruno Pereira de, ARAÚJO",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Laíze Aparecida Nunes Lopes, CAMPOS",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Luciano Pereira, ROSA",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "03",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "19818637",
												},
												{
													Type: "issn-locals",
													Value: "SciELO Brazil",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "63",
												},
												{
													Type: "issue",
													Value: "1",
												},
											],
											Titles: [
												{
													TitleFull: "RGO - Revista Gaúcha de Odontologia",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 15,
					Header: {
						DbId: "edsgao",
						DbLabel: "Academic OneFile",
						An: "edsgcl.431091257",
						RelevancyScore: "2036",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edsgao&AN=edsgcl.431091257",
					FullText: {
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:edsgao&genre=article&issn=10907165&ISBN=&volume=19&issue=11&date=20151101&spage=2130&pages=2130-2139&title=AIDS and Behavior&atitle=Parenting%20mediates%20the%20impact%20of%20caregivers%27%20distress%20on%20children%27s%20well-being%20in%20families%20affected%20by%20HIV%2FAIDS&aulast=Chi%2C%20Peilian&id=DOI:",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Parenting mediates the impact of caregivers&#39; distress on children&#39;s well-being in families affected by HIV/AIDS",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Chi%2C+Peilian%22&quot;&gt;Chi, Peilian&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Li%2C+Xiaoming%22&quot;&gt;Li, Xiaoming&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Tam%2C+Cheuk+Chi%22&quot;&gt;Tam, Cheuk Chi&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Du%2C+Hongfei%22&quot;&gt;Du, Hongfei&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Zhao%2C+Guoxiang%22&quot;&gt;Zhao, Guoxiang&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Zhao%2C+Junfeng%22&quot;&gt;Zhao, Junfeng&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "AIDS and Behavior. Nov 2015, Vol. 19 Issue 11, p2130, 10 p.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Caregivers+--+Research%22&quot;&gt;Caregivers -- Research&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Caregivers+--+Health+aspects%22&quot;&gt;Caregivers -- Health aspects&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Caregivers+--+Psychological+aspects%22&quot;&gt;Caregivers -- Psychological aspects&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22HIV+infection+--+Research%22&quot;&gt;HIV infection -- Research&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22HIV+infection+--+Care+and+treatment%22&quot;&gt;HIV infection -- Care and treatment&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22HIV+infection+--+Complications+and+side+effects%22&quot;&gt;HIV infection -- Complications and side effects&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Parenting+--+Analysis%22&quot;&gt;Parenting -- Analysis&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Stress+%28Psychology%29+--+Research%22&quot;&gt;Stress (Psychology) -- Research&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Stress+%28Psychology%29+--+Health+aspects%22&quot;&gt;Stress (Psychology) -- Health aspects&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description",
							Group: "Ab",
							Data: "Parental illness imposes great challenges to children&#39;s life and mental health. Having a parent infected by HIV may further challenge children&#39;s psychological well-being. Existing studies have demonstrated a negative impact of caregiver&#39;s distress on children&#39;s well-being. Limited studies examined the potential pathways of the link. This study aims to examine whether parenting stress, parenting competence and parental responsiveness can explain the relationship between caregivers&#39; distress and children&#39;s well-being. A community sample of children of parents living with HIV and their current caregivers (n = 754 dyads) was recruited in rural central China. Children completed the measures on their psychological well-being and perceived parental responsiveness of their caregivers. Caregivers reported on their psychological well-being, parenting stress, and parenting competence. Structural equation modeling analysis showed that caregivers&#39; distress indirectly affect children&#39;s well-being through parenting stress, parenting competence and parental responsiveness. Parenting stress explained the impact of caregiver&#39;s distress on parental responsiveness and showed pervasive effects on parenting competence. Our findings lend credence to family-based intervention for children affected by HIV and affirm the importance of incorporating the cognitive, emotional and behavioral components of parenting practices in such intervention.",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "10",
										StartPage: "2130",
									},
								},
								Subjects: [
									{
										SubjectFull: "Caregivers -- Research",
										Type: "general",
									},
									{
										SubjectFull: "Caregivers -- Health aspects",
										Type: "general",
									},
									{
										SubjectFull: "Caregivers -- Psychological aspects",
										Type: "general",
									},
									{
										SubjectFull: "HIV infection -- Research",
										Type: "general",
									},
									{
										SubjectFull: "HIV infection -- Care and treatment",
										Type: "general",
									},
									{
										SubjectFull:
											"HIV infection -- Complications and side effects",
										Type: "general",
									},
									{
										SubjectFull: "Parenting -- Analysis",
										Type: "general",
									},
									{
										SubjectFull: "Stress (Psychology) -- Research",
										Type: "general",
									},
									{
										SubjectFull: "Stress (Psychology) -- Health aspects",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Parenting mediates the impact of caregivers' distress on children's well-being in families affected by HIV/AIDS",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Chi, Peilian",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Li, Xiaoming",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Tam, Cheuk Chi",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Du, Hongfei",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Zhao, Guoxiang",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Zhao, Junfeng",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "11",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "10907165",
												},
												{
													Type: "issn-locals",
													Value: "edsgaoNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsgihNFT",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "19",
												},
												{
													Type: "issue",
													Value: "11",
												},
											],
											Titles: [
												{
													TitleFull: "AIDS and Behavior",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 16,
					Header: {
						DbId: "mnh",
						DbLabel: "MEDLINE with Full Text",
						An: "26506365",
						RelevancyScore: "2034",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=mnh&AN=26506365",
					FullText: {
						Links: [
							{
								Type: "pdflink",
							},
						],
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:mnh&genre=article&issn=16604601&ISBN=&volume=12&issue=10&date=20151021&spage=13224&pages=13224-39&title=International Journal Of Environmental Research And Public Health&atitle=Elimination%20of%20Mother-To-Child%20Transmission%20of%20HIV%20Infection%3A%20The%20Drug%20Resource%20Enhancement%20against%20AIDS%20and%20Malnutrition%20Model.&aulast=Liotta%20G&id=DOI:10.3390/ijerph121013224",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Elimination of Mother-To-Child Transmission of HIV Infection: The Drug Resource Enhancement against AIDS and Malnutrition Model.",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Liotta+G%22&quot;&gt;Liotta G&lt;/searchLink&gt;; University of Tor Vergata, 18-00173 Rome, Italy. giuseppeliotta@hotmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Marazzi+MC%22&quot;&gt;Marazzi MC&lt;/searchLink&gt;; LUMSA University, 18-00173 Rome, Italy. mcmarazzi@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Mothibi+KE%22&quot;&gt;Mothibi KE&lt;/searchLink&gt;; Health Services Cluster, Cit&#233; du Djou&#233;, P.O. Box 06 Brazzaville, South Africa. eula.mothibi@khethimpilo.org.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Zimba+I%22&quot;&gt;Zimba I&lt;/searchLink&gt;; Community of S.Egidio-DREAM program, Avenida de Julho 7, Maputo, Mozambique. ineszimba@dream.org.mz.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Amangoua+EE%22&quot;&gt;Amangoua EE&lt;/searchLink&gt;; Minist&#232;re de la Sant&#233; et de la lutte contre le SIDA, B.P. 2091, Abidjan, Ivory Coast. evaehua@yahoo.fr.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Bonje+EK%22&quot;&gt;Bonje EK&lt;/searchLink&gt;; Cameroon Baptist Convention Health Services, P.O. Box 1 Bamenda, Cameroon. kunibonje@yahoo.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Bossiky+BN%22&quot;&gt;Bossiky BN&lt;/searchLink&gt;; Programme National Multisectoriel de Lutte contre le Sida, Blvd Triomphal and 24 Novembre Kinshasa, Congo (RDC). bernardbossiky@yahoo.fr.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Robinson+PA%22&quot;&gt;Robinson PA&lt;/searchLink&gt;; National Department of Health, Private Bag X9070, South Africa. robinsonprecious@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Scarcella+P%22&quot;&gt;Scarcella P&lt;/searchLink&gt;; University of Tor Vergata, 18-00173 Rome, Italy. paola.scarcella@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Musokotwane+K%22&quot;&gt;Musokotwane K&lt;/searchLink&gt;; Ministry of Health, Ndeke House, P.O. Box 30205, Lusaka, Zambia.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Palombi+L%22&quot;&gt;Palombi L&lt;/searchLink&gt;; University of Tor Vergata, 18-00173 Rome, Italy. leonardo.palombi@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Germano+P%22&quot;&gt;Germano P&lt;/searchLink&gt;; INMI L. Spallanzani, 00149 Rome, Italy. paolagermano1@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Narciso+P%22&quot;&gt;Narciso P&lt;/searchLink&gt;; INMI L. Spallanzani, 00149 Rome, Italy. pasquale.narciso@inmi.it.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22de+Luca+A%22&quot;&gt;de Luca A&lt;/searchLink&gt;; Division of Infectious Diseases, Department of Medical Biotechnologies, University of Siena, Siena University Hospital, Siena 53100, Italy. andrea.deluca@unisi.it.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Alumando+E%22&quot;&gt;Alumando E&lt;/searchLink&gt;; Community of S.Egidio-DREAM program, P.O. Box 30355, Blantyre, Malawi. eladarmando@yahoo.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Mamary+SH%22&quot;&gt;Mamary SH&lt;/searchLink&gt;; Community of S.Egidio-DREAM program, P.O. Box 30355, Blantyre, Malawi. drsangarehawa@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Magid+NA%22&quot;&gt;Magid NA&lt;/searchLink&gt;; Community of S.Egidio-DREAM program, Avenida de Julho 7, Maputo, Mozambique. nurjamajid@yahoo.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Guidotti+G%22&quot;&gt;Guidotti G&lt;/searchLink&gt;; Community of S.Egidio-DREAM program, Rome 00153, Italy. gianniguidotti1@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Mancinelli+S%22&quot;&gt;Mancinelli S&lt;/searchLink&gt;; University of Tor Vergata, 18-00173 Rome, Italy. sandro.mancinelli@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Orlando+S%22&quot;&gt;Orlando S&lt;/searchLink&gt;; Community of S.Egidio-DREAM program, Rome 00153, Italy. stefano.orlando@dreameurope.org.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Peroni+M%22&quot;&gt;Peroni M&lt;/searchLink&gt;; Community of S.Egidio-DREAM program, Rome 00153, Italy. peronimarco@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Buonomo+E%22&quot;&gt;Buonomo E&lt;/searchLink&gt;; University of Tor Vergata, 18-00173 Rome, Italy. ersiliabuonomo@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Nielsen-Saines+K%22&quot;&gt;Nielsen-Saines K&lt;/searchLink&gt;; David Geffen School of Medicine, University of California at Los Angeles, Los Angeles, CA 90095, USA. knielsen@mednet.ucla.edu.",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "&lt;searchLink fieldCode=&quot;JN&quot; term=&quot;%22International+journal+of+environmental+research+and+public+health+[electronic+resource]+[Int+J+Environ+Res+Public+Health]+NLMUID%3A+101238455%22&quot;&gt;International Journal Of Environmental Research And Public Health&lt;/searchLink&gt; [Int J Environ Res Public Health] 2015 Oct 21; Vol. 12 (10), pp. 13224-39. &lt;i&gt;Date of Electronic Publication: &lt;/i&gt;2015 Oct 21.",
						},
						{
							Name: "TypePub",
							Label: "Publication Type",
							Group: "TypPub",
							Data: "Journal Article; Review",
						},
						{
							Name: "TitleSource",
							Label: "Journal Info",
							Group: "Src",
							Data: "&lt;i&gt;Publisher: &lt;/i&gt;&lt;searchLink fieldCode=&quot;PB&quot; term=&quot;%22MDPI%22&quot;&gt;MDPI &lt;/searchLink&gt;&lt;i&gt;Country of Publication: &lt;/i&gt;Switzerland &lt;i&gt;NLM ID: &lt;/i&gt;101238455 &lt;i&gt;Publication Model: &lt;/i&gt;Electronic &lt;i&gt;Cited Medium: &lt;/i&gt;Internet &lt;i&gt;ISSN: &lt;/i&gt;1660-4601 (Electronic) &lt;i&gt;Linking ISSN: &lt;/i&gt;&lt;searchLink fieldCode=&quot;IS&quot; term=&quot;%2216604601%22&quot;&gt;16604601 &lt;/searchLink&gt;&lt;i&gt;NLM ISO Abbreviation: &lt;/i&gt;Int J Environ Res Public Health &lt;i&gt;Subsets: &lt;/i&gt;In Process; MEDLINE",
						},
						{
							Name: "Abstract",
							Label: "Abstract",
							Group: "Ab",
							Data: "The Drug Resource Enhancement against AIDS and Malnutrition Program (DREAM) gathered professionals in the field of Elimination of HIV-Mother-To-Child Transmission (EMTCT) in Maputo in 2013 to discuss obstacles and solutions for the elimination of HIV vertical transmission in sub-Saharan Africa. During this workshop, the benefits of administrating combined antiretroviral therapy (cART) to HIV positive women from pregnancy throughout breastfeeding were reviewed. cART is capable of reducing vertical transmission to less than 5% at 24 months of age, as well as maternal mortality and infant mortality in both HIV infected and exposed populations to levels similar to those of uninfected individuals. The challenge for programs targeting eMTCT in developing countries is retention in care and treatment adherence. Both are intrinsically related to the model of care. The drop-out from eMTCT programs before cART initiation ranges from 33%-88% while retention rates at 18-24 months are less than 50%. Comprehensive strategies including peer-to-peer education, social support and laboratory monitoring can reduce refusals to less than 5% and attain retention rates approaching 90%. Several components of the model of care for reduction of HIV-1 MTCT are feasible and implementable in scale-up strategies. A review of this model of care for HIV eMTCT is provided.",
						},
						{
							Name: "SubjectMinor",
							Label: "Contributed Indexing",
							Group: "Su",
							Data: "&lt;i&gt;Keywords: &lt;/i&gt;DREAM program; elimination of HIV MTCT",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Identifiers: [
									{
										Type: "doi",
										Value: "10.3390/ijerph121013224",
									},
								],
								Languages: [
									{
										Code: "eng",
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										StartPage: "13224",
									},
								},
								Titles: [
									{
										TitleFull:
											"Elimination of Mother-To-Child Transmission of HIV Infection: The Drug Resource Enhancement against AIDS and Malnutrition Model.",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Liotta G",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Marazzi MC",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Mothibi KE",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Zimba I",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Amangoua EE",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Bonje EK",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Bossiky BN",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Robinson PA",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Scarcella P",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Musokotwane K",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Palombi L",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Germano P",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Narciso P",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "de Luca A",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Alumando E",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Mamary SH",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Magid NA",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Guidotti G",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Mancinelli S",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Orlando S",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Peroni M",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Buonomo E",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Nielsen-Saines K",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "21",
													M: "10",
													Text: "2015 Oct 21",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-electronic",
													Value: "1660-4601",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "12",
												},
												{
													Type: "issue",
													Value: "10",
												},
											],
											Titles: [
												{
													TitleFull:
														"International Journal Of Environmental Research And Public Health",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 17,
					Header: {
						DbId: "eric",
						DbLabel: "ERIC",
						An: "ED560012",
						RelevancyScore: "2023",
						PubType: "",
						PubTypeId: "unknown",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=eric&AN=ED560012",
					FullText: {
						Text: {
							Availability: "0",
						},
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Children in Africa: Key Statistics on Child Survival, Protection and Development",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "&lt;searchLink fieldCode=&quot;JN&quot; term=&quot;%22UNICEF%22&quot;&gt;UNICEF&lt;/searchLink&gt;. 8 pp.",
						},
						{
							Name: "PeerReviewed",
							Label: "Peer Reviewed",
							Group: "SrcInfo",
							Data: "N/A",
						},
						{
							Name: "SubjectThesaurus",
							Label: "Descriptors",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Foreign+Countries%22&quot;&gt;Foreign Countries&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Statistical+Data%22&quot;&gt;Statistical Data&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Child+Health%22&quot;&gt;Child Health&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Nutrition%22&quot;&gt;Nutrition&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Acquired+Immunodeficiency+Syndrome+%28AIDS%29%22&quot;&gt;Acquired Immunodeficiency Syndrome (AIDS)&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Communicable+Diseases%22&quot;&gt;Communicable Diseases&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Children%22&quot;&gt;Children&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Marriage%22&quot;&gt;Marriage&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Birth+Rate%22&quot;&gt;Birth Rate&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Sexuality%22&quot;&gt;Sexuality&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Violence%22&quot;&gt;Violence&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Child+Abuse%22&quot;&gt;Child Abuse&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Mortality+Rate%22&quot;&gt;Mortality Rate&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Out+of+School+Youth%22&quot;&gt;Out of School Youth&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Enrollment%22&quot;&gt;Enrollment&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Gender+Differences%22&quot;&gt;Gender Differences&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Water+Quality%22&quot;&gt;Water Quality&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Sanitation%22&quot;&gt;Sanitation&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Mothers%22&quot;&gt;Mothers&lt;/searchLink&gt;, &lt;searchLink fieldCode=&quot;SU&quot; term=&quot;%22Child+Safety%22&quot;&gt;Child Safety&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Abstract",
							Group: "Ab",
							Data: "This report presents key statistics relating to: (1) child malnutrition in Africa; (2) HIV/AIDS and Malaria in Africa; (3) child marriage, birth registration and Female Genital Mutilation/Cutting (FGM/C); (4) education in Africa; (5) child mortality in Africa; (6) Drinking water and sanitation in Africa; and (7) maternal health in Africa. Highlighted statistics include: (1) In Africa, mortality rates among children under five decreased by 45 per cent between 1990 and 2012, but still half of the world&#39;s 6.6 million under-five deaths occur in Africa; (2) Pneumonia, malaria and diarrhoea account for 40% of all under-five deaths in Africa; (3) At least 1 in 3 children under five in Africa were stunted in 2011; (4) In 2012, there were an estimated 2.9 million children under 15 years living with HIV in Sub-Saharan Africa; (5) Over half of the world&#39;s out-of-school children (33 million) live in Africa; (6) The population in Africa with access to an improved drinking source more than doubled from 1990 to 2012; and (7) There has been major progress in the last decade in the use of insecticide-treated nets among children.",
						},
						{
							Name: "AbstractInfo",
							Label: "Abstractor",
							Group: "Ab",
							Data: "ERIC",
						},
						{
							Name: "Author",
							Label: "Corporate Source",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;IN&quot; term=&quot;%22United+Nations+Children&#39;s+Fund+%28UNICEF%29+Data+and+Analytics%22&quot;&gt;United Nations Children&#39;s Fund (UNICEF) Data and Analytics&lt;/searchLink&gt;",
						},
						{
							Name: "TypePub",
							Label: "Publication Type",
							Group: "TypPub",
							Data: "Numerical/Quantitative Data; Reports - Evaluative",
						},
						{
							Name: "CodeSource",
							Label: "Journal Code",
							Group: "SrcInfo",
							Data: "&lt;searchLink fieldCode=&quot;JC&quot; term=&quot;%22DEC2015%22&quot;&gt;DEC2015&lt;/searchLink&gt;",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Code: "eng",
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "8",
									},
								},
								Subjects: [
									{
										SubjectFull: "Foreign Countries",
										Type: "general",
									},
									{
										SubjectFull: "Statistical Data",
										Type: "general",
									},
									{
										SubjectFull: "Child Health",
										Type: "general",
									},
									{
										SubjectFull: "Nutrition",
										Type: "general",
									},
									{
										SubjectFull: "Acquired Immunodeficiency Syndrome (AIDS)",
										Type: "general",
									},
									{
										SubjectFull: "Communicable Diseases",
										Type: "general",
									},
									{
										SubjectFull: "Children",
										Type: "general",
									},
									{
										SubjectFull: "Marriage",
										Type: "general",
									},
									{
										SubjectFull: "Birth Rate",
										Type: "general",
									},
									{
										SubjectFull: "Sexuality",
										Type: "general",
									},
									{
										SubjectFull: "Violence",
										Type: "general",
									},
									{
										SubjectFull: "Child Abuse",
										Type: "general",
									},
									{
										SubjectFull: "Mortality Rate",
										Type: "general",
									},
									{
										SubjectFull: "Out of School Youth",
										Type: "general",
									},
									{
										SubjectFull: "Enrollment",
										Type: "general",
									},
									{
										SubjectFull: "Gender Differences",
										Type: "general",
									},
									{
										SubjectFull: "Water Quality",
										Type: "general",
									},
									{
										SubjectFull: "Sanitation",
										Type: "general",
									},
									{
										SubjectFull: "Mothers",
										Type: "general",
									},
									{
										SubjectFull: "Child Safety",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Children in Africa: Key Statistics on Child Survival, Protection and Development",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull:
													"United Nations Children's Fund (UNICEF) Data and Analytics",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "05",
													Text: "20140501",
													Type: "published",
													Y: "2014",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "ERICRIE0",
												},
											],
											Titles: [
												{
													TitleFull: "UNICEF",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 18,
					Header: {
						DbId: "edsgao",
						DbLabel: "Academic OneFile",
						An: "edsgcl.405172240",
						RelevancyScore: "2023",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edsgao&AN=edsgcl.405172240",
					FullText: {
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:edsgao&genre=article&issn=00472891&ISBN=&volume=44&issue=4&date=20150401&spage=847&pages=847-859&title=Journal of Youth and Adolescence&atitle=Relationships%20Between%20Familial%20HIV%2FAIDS%20and%20Symptoms%20of%20Anxiety%20and%20Depression%3A%20The%20Mediating%20Effect%20of%20Bullying%20Victimization%20in%20a%20Prospective%20Sample%20of%20South%20African%20Children%20and%20Adolescents&aulast=Boyes%2C%20Mark%20E.&id=DOI:",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Relationships Between Familial HIV/AIDS and Symptoms of Anxiety and Depression: The Mediating Effect of Bullying Victimization in a Prospective Sample of South African Children and Adolescents",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Boyes%2C+Mark+E%2E%22&quot;&gt;Boyes, Mark E.&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Cluver%2C+Lucie+D%2E%22&quot;&gt;Cluver, Lucie D.&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "Journal of Youth and Adolescence. April 2015, Vol. 44 Issue 4, p847, 13 p.",
						},
						{
							Name: "Subject",
							Label: "Subject Terms",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Behavioral+health+care+--+Health+aspects%22&quot;&gt;Behavioral health care -- Health aspects&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Bullying+--+Health+aspects%22&quot;&gt;Bullying -- Health aspects&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Anxiety+--+Genetic+aspects%22&quot;&gt;Anxiety -- Genetic aspects&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Anxiety+--+Health+aspects%22&quot;&gt;Anxiety -- Health aspects&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Depression%2C+Mental+--+Genetic+aspects%22&quot;&gt;Depression, Mental -- Genetic aspects&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22Depression%2C+Mental+--+Health+aspects%22&quot;&gt;Depression, Mental -- Health aspects&lt;/searchLink&gt;",
						},
						{
							Name: "Subject",
							Label: "Subject Geographic",
							Group: "Su",
							Data: "&lt;searchLink fieldCode=&quot;DE&quot; term=&quot;%22South+Africa%22&quot;&gt;South Africa&lt;/searchLink&gt;",
						},
						{
							Name: "Abstract",
							Label: "Description",
							Group: "Ab",
							Data: "South African children and adolescents living in HIV/AIDS-affected families are at elevated risk of both symptoms of anxiety and depressive symptoms. Poverty and HIV/AIDS-related stigma are additional risk factors for these negative mental health outcomes. Community level factors, such as poverty and stigma, are difficult to change in the short term and identifying additional potentially malleable mechanisms linking familial HIV/AIDS with mental health is important from an intervention perspective. HIV/AIDS-affected children are also at increased risk of bullying victimization. This longitudinal study aimed to determine whether prospective relationships between familial HIV/AIDS and both anxiety symptoms and depressive symptoms operate indirectly via bullying victimization. Adolescents (M = 13.45 years, 56.67 % female, n = 3,515) from high HIV-prevalent (&gt;30 %) communities in South Africa were interviewed and followed-up one year later (n = 3,401, 96.70 % retention). Census enumeration areas were randomly selected from urban and rural sites in two provinces, and door-to-door sampling included all households with a resident child/adolescent. Familial HIV/AIDS at baseline assessment was not directly associated with mental health outcomes 1 year later. However, significant indirect effects operating via bullying victimization were obtained for both anxiety and depression scores. Importantly, these effects were independent of poverty, HIV/AIDS-related stigma, and baseline mental health, which highlight bullying victimization as a potential target for future intervention efforts. The implementation and rigorous evaluation of bullying prevention programs in South African communities may improve mental health outcomes for HIV/AIDS-affected children and adolescents and this should be a focus of future research and intervention.",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Languages: [
									{
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "13",
										StartPage: "847",
									},
								},
								Subjects: [
									{
										SubjectFull: "Behavioral health care -- Health aspects",
										Type: "general",
									},
									{
										SubjectFull: "Bullying -- Health aspects",
										Type: "general",
									},
									{
										SubjectFull: "Anxiety -- Genetic aspects",
										Type: "general",
									},
									{
										SubjectFull: "Anxiety -- Health aspects",
										Type: "general",
									},
									{
										SubjectFull: "Depression, Mental -- Genetic aspects",
										Type: "general",
									},
									{
										SubjectFull: "Depression, Mental -- Health aspects",
										Type: "general",
									},
									{
										SubjectFull: "South Africa",
										Type: "general",
									},
								],
								Titles: [
									{
										TitleFull:
											"Relationships Between Familial HIV/AIDS and Symptoms of Anxiety and Depression: The Mediating Effect of Bullying Victimization in a Prospective Sample of South African Children and Adolescents",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Boyes, Mark E.",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Cluver, Lucie D.",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "04",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-print",
													Value: "00472891",
												},
												{
													Type: "issn-locals",
													Value: "edsgaoNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsgea",
												},
												{
													Type: "issn-locals",
													Value: "edsgeaNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsggoNFT",
												},
												{
													Type: "issn-locals",
													Value: "edsggr",
												},
												{
													Type: "issn-locals",
													Value: "edsgih",
												},
												{
													Type: "issn-locals",
													Value: "edsgihNFT",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "44",
												},
												{
													Type: "issue",
													Value: "4",
												},
											],
											Titles: [
												{
													TitleFull: "Journal of Youth and Adolescence",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 19,
					Header: {
						DbId: "edselp",
						DbLabel: "ScienceDirect",
						An: "S105532901500028X",
						RelevancyScore: "2022",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=edselp&AN=S105532901500028X",
					FullText: {
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:edselp&genre=article&issn=10553290&ISBN=&volume=26&issue=4&date=20150701&spage=432&pages=432-442&title=Journal of the Association of Nurses in AIDS Care&atitle=Feature%3A%20Children%20Seeking%20Refuge%3A%20A%20Review%20of%20the%20Escalating%20Humanitarian%20Crisis%20of%20Child%20Sexual%20Abuse%20and%20HIV%2FAIDS%20in%20Latin%20America&aulast=Thornton%2C%20Clifton%20P.&id=DOI:10.1016/j.jana.2015.01.002",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Feature: Children Seeking Refuge: A Review of the Escalating Humanitarian Crisis of Child Sexual Abuse and HIV/AIDS in Latin America",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Thornton%2C+Clifton+P%2E%22&quot;&gt;Thornton, Clifton P.&lt;/searchLink&gt;&lt;br /&gt;&lt;searchLink fieldCode=&quot;AR&quot; term=&quot;%22Veenema%2C+Tener+Goodwin%22&quot;&gt;Veenema, Tener Goodwin&lt;/searchLink&gt;",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "In &lt;searchLink fieldCode=&quot;JN&quot; term=&quot;%22Journal+of+the+Association+of+Nurses+in+AIDS+Care%22&quot;&gt;Journal of the Association of Nurses in AIDS Care&lt;/searchLink&gt; July-August 2015 26(4):432-442",
						},
						{
							Name: "Abstract",
							Label: "Abstract",
							Group: "Ab",
							Data: "Early identification and intervention for victims of child sexual abuse (CSA) is essential to halting the spread of HIV in Latino populations because children who are sexually abused are at an increased risk of contracting HIV. The recent influx of unaccompanied children into the United States exposed histories of victimization, vulnerability to CSA, and suggested an epidemic of CSA in Latin America. CSA has been identified as a contributory event to HIV infection. The aim of our research was to identify factors associated with CSA and Latin Americans. A systematic review and a document search were conducted on factors associated with CSA in Latin America. Victimization was associated with lifelong risk factors for HIV. Males were consistently underrepresented in the published CSA literature and machismo attitudes may contribute to abuses of sexual power by males and contribute to males not reporting or under-reporting victimization.",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Identifiers: [
									{
										Type: "doi",
										Value: "10.1016/j.jana.2015.01.002",
									},
								],
								Languages: [
									{
										Code: "eng",
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										PageCount: "11",
										StartPage: "432",
									},
								},
								Titles: [
									{
										TitleFull:
											"Feature: Children Seeking Refuge: A Review of the Escalating Humanitarian Crisis of Child Sexual Abuse and HIV/AIDS in Latin America",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Thornton, Clifton P.",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Veenema, Tener Goodwin",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "01",
													M: "07",
													Text: "July-August 2015",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-electronic",
													Value: "10553290",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "26",
												},
												{
													Type: "issue",
													Value: "4",
												},
											],
											Titles: [
												{
													TitleFull:
														"Journal of the Association of Nurses in AIDS Care",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
				{
					ResultId: 20,
					Header: {
						DbId: "mnh",
						DbLabel: "MEDLINE with Full Text",
						An: "26184881",
						RelevancyScore: "2021",
						PubType: "Academic Journal",
						PubTypeId: "academicJournal",
					},
					PLink:
						"http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&db=mnh&AN=26184881",
					FullText: {
						Links: [
							{
								Type: "pdflink",
							},
						],
						Text: {
							Availability: "0",
						},
						CustomLinks: [
							{
								Url: "http://resolver.ebscohost.com/openurl?sid=EBSCO:mnh&genre=article&issn=14712458&ISBN=&volume=15&issue=&date=20150717&spage=674&pages=674&title=BMC Public Health&atitle=Perceptions%20of%20Sudanese%20women%20of%20reproductive%20age%20toward%20HIV%2FAIDS%20and%20services%20for%20Prevention%20of%20Mother-to-Child%20Transmission%20of%20HIV.&aulast=Elsheikh%20IE&id=DOI:10.1186/s12889-015-2054-1",
								Name: "Full Text Finder (Bibliovie)",
								Category: "fullText",
								Text: "Accéder à l'article",
								Icon: "http://imageserver.ebscohost.com/branding/images/FTF.gif",
								MouseOverText: "Accéder à l'article",
							},
						],
					},
					Items: [
						{
							Name: "Title",
							Label: "Title",
							Group: "Ti",
							Data: "Perceptions of Sudanese women of reproductive age toward HIV/AIDS and services for Prevention of Mother-to-Child Transmission of HIV.",
						},
						{
							Name: "Author",
							Label: "Authors",
							Group: "Au",
							Data: "&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Elsheikh+IE%22&quot;&gt;Elsheikh IE&lt;/searchLink&gt;; Department of Health Promotion, CAPHRI School for Public Health and Primary Care, Maastricht University, Maastricht, The Netherlands. ibrahim.e.elsheikh@gmail.com.; Sudanese Public Health Association (SPHA), Khartoum, Sudan. ibrahim.e.elsheikh@gmail.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Crutzen+R%22&quot;&gt;Crutzen R&lt;/searchLink&gt;; Department of Health Promotion, CAPHRI School for Public Health and Primary Care, Maastricht University, Maastricht, The Netherlands. rik.crutzen@maastrichtuniversity.nl.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Van+den+Borne+HW%22&quot;&gt;Van den Borne HW&lt;/searchLink&gt;; Department of Health Promotion, CAPHRI School for Public Health and Primary Care, Maastricht University, Maastricht, The Netherlands. b.vdborne@maastrichtuniversity.nl.",
						},
						{
							Name: "TitleSource",
							Label: "Source",
							Group: "Src",
							Data: "&lt;searchLink fieldCode=&quot;JN&quot; term=&quot;%22BMC+public+health+[electronic+resource]+[BMC+Public+Health]+NLMUID%3A+100968562%22&quot;&gt;BMC Public Health&lt;/searchLink&gt; [BMC Public Health] 2015 Jul 17; Vol. 15, pp. 674. &lt;i&gt;Date of Electronic Publication: &lt;/i&gt;2015 Jul 17.",
						},
						{
							Name: "TypePub",
							Label: "Publication Type",
							Group: "TypPub",
							Data: "Journal Article",
						},
						{
							Name: "TitleSource",
							Label: "Journal Info",
							Group: "Src",
							Data: "&lt;i&gt;Publisher: &lt;/i&gt;&lt;searchLink fieldCode=&quot;PB&quot; term=&quot;%22BioMed+Central%22&quot;&gt;BioMed Central &lt;/searchLink&gt;&lt;i&gt;Country of Publication: &lt;/i&gt;England &lt;i&gt;NLM ID: &lt;/i&gt;100968562 &lt;i&gt;Publication Model: &lt;/i&gt;Electronic &lt;i&gt;Cited Medium: &lt;/i&gt;Internet &lt;i&gt;ISSN: &lt;/i&gt;1471-2458 (Electronic) &lt;i&gt;Linking ISSN: &lt;/i&gt;&lt;searchLink fieldCode=&quot;IS&quot; term=&quot;%2214712458%22&quot;&gt;14712458 &lt;/searchLink&gt;&lt;i&gt;NLM ISO Abbreviation: &lt;/i&gt;BMC Public Health &lt;i&gt;Subsets: &lt;/i&gt;In Process; MEDLINE",
						},
						{
							Name: "Abstract",
							Label: "Abstract",
							Group: "Ab",
							Data: "Background: Access to antenatal HIV testing during pregnancy and the level of uptake of services for Prevention of Mother-to-Child Transmission (PMTCT) in Sudan are very low. This study aimed to obtain insights into the perceptions of Sudanese pregnant women toward HIV/AIDS and the use of PMTCT services.&lt;br /&gt;Methods: Ten focus group discussions (FGDs) with women of reproductive age were conducted at community settings in Khartoum (N = 121). Recruitment eligibility included living near or around a PMTCT site and being in the age range of 18-40 years. Out of 121 women who participated, 72 (61 %) were pregnant. Predefined themes were addressed in the theory-based interview scheme, which was derived from multiple socio-cognitive theories-i.e., the Extended Parallel Process Model, the Reasoned Action Approach and the socio-psychological view on stigma. Emerging themes were incorporated during data analysis.&lt;br /&gt;Results: Few women knew about the Mother to child transmission (MTCT) of HIV. No one indicated that MTCT might occur during labor. Most women believed that HIV/AIDS is a serious and fatal condition for them and also for their children. They believed they were susceptible to HIV/AIDS as a result of cesarean section, contaminated items (blood and sharp items) and husband infidelity. The usefulness and advantages of HIV testing were questioned; for some women it was perceived as an additional burden of anxiety and worry. Doctors were the most influential with regard to acceptance of HIV testing. The speed of the testing process and confidentiality were mentioned by some women as key factors affecting willingness to undergo HIV testing at a health facility during pregnancy.&lt;br /&gt;Conclusion: The study reveals that most of the women felt susceptible to HIV infection with perceived high severity; however, this perception has not translated into positive attitudes toward the importance of HIV testing during pregnancy. Because of anticipated stigma, women are not likely to disclose their HIV status. Further research should focus on gaining a more in-depth understanding of the psycho-social determinants and processes underlying the factors identified above. In addition, the adequate implementation of Provider Initiated Testing and Counseling (PITC) should be critically assessed in future research about PMTCT in Sudan.",
						},
					],
					RecordInfo: {
						BibRecord: {
							BibEntity: {
								Identifiers: [
									{
										Type: "doi",
										Value: "10.1186/s12889-015-2054-1",
									},
								],
								Languages: [
									{
										Code: "eng",
										Text: "English",
									},
								],
								PhysicalDescription: {
									Pagination: {
										StartPage: "674",
									},
								},
								Titles: [
									{
										TitleFull:
											"Perceptions of Sudanese women of reproductive age toward HIV/AIDS and services for Prevention of Mother-to-Child Transmission of HIV.",
										Type: "main",
									},
								],
							},
							BibRelationships: {
								HasContributorRelationships: [
									{
										PersonEntity: {
											Name: {
												NameFull: "Elsheikh IE",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Crutzen R",
											},
										},
									},
									{
										PersonEntity: {
											Name: {
												NameFull: "Van den Borne HW",
											},
										},
									},
								],
								IsPartOfRelationships: [
									{
										BibEntity: {
											Dates: [
												{
													D: "17",
													M: "07",
													Text: "2015 Jul 17",
													Type: "published",
													Y: "2015",
												},
											],
											Identifiers: [
												{
													Type: "issn-electronic",
													Value: "1471-2458",
												},
											],
											Numbering: [
												{
													Type: "volume",
													Value: "15",
												},
											],
											Titles: [
												{
													TitleFull: "BMC Public Health",
													Type: "main",
												},
											],
										},
									},
								],
							},
						},
					},
				},
			],
		},
		AvailableFacets: [
			{
				Id: "SourceType",
				Label: "Source Type",
				AvailableFacetValues: [
					{
						Value: "Academic Journals",
						Count: 32850,
						AddAction: "addfacetfilter(SourceType:Academic Journals)",
					},
					{
						Value: "Magazines",
						Count: 5939,
						AddAction: "addfacetfilter(SourceType:Magazines)",
					},
					{
						Value: "Reports",
						Count: 1651,
						AddAction: "addfacetfilter(SourceType:Reports)",
					},
					{
						Value: "Books",
						Count: 1114,
						AddAction: "addfacetfilter(SourceType:Books)",
					},
					{
						Value: "Reviews",
						Count: 780,
						AddAction: "addfacetfilter(SourceType:Reviews)",
					},
					{
						Value: "News",
						Count: 384,
						AddAction: "addfacetfilter(SourceType:News)",
					},
					{
						Value: "Electronic Resources",
						Count: 139,
						AddAction: "addfacetfilter(SourceType:Electronic Resources)",
					},
					{
						Value: "Conference Materials",
						Count: 76,
						AddAction: "addfacetfilter(SourceType:Conference Materials)",
					},
					{
						Value: "Dissertations",
						Count: 46,
						AddAction: "addfacetfilter(SourceType:Dissertations)",
					},
					{
						Value: "Non-Print Resources",
						Count: 5,
						AddAction: "addfacetfilter(SourceType:Non-Print Resources)",
					},
					{
						Value: "Primary Source Documents",
						Count: 3,
						AddAction: "addfacetfilter(SourceType:Primary Source Documents)",
					},
					{
						Value: "eBooks",
						Count: 2,
						AddAction: "addfacetfilter(SourceType:eBooks)",
					},
					{
						Value: "Videos",
						Count: 1,
						AddAction: "addfacetfilter(SourceType:Videos)",
					},
				],
			},
			{
				Id: "SubjectEDS",
				Label: "Subject",
				AvailableFacetValues: [
					{
						Value: "hiv infections",
						Count: 6272,
						AddAction: "addfacetfilter(SubjectEDS:hiv infections)",
					},
					{
						Value: "acquired immunodeficiency syndrome",
						Count: 2958,
						AddAction:
							"addfacetfilter(SubjectEDS:acquired immunodeficiency syndrome)",
					},
					{
						Value: "teaching aids & devices",
						Count: 1641,
						AddAction: "addfacetfilter(SubjectEDS:teaching aids & devices)",
					},
					{
						Value: "children",
						Count: 1297,
						AddAction: "addfacetfilter(SubjectEDS:children)",
					},
					{
						Value: "hiv-1",
						Count: 1255,
						AddAction: "addfacetfilter(SubjectEDS:hiv-1)",
					},
					{
						Value: "aids (disease)",
						Count: 1160,
						AddAction: "addfacetfilter(SubjectEDS:aids \\(disease\\))",
					},
					{
						Value: "hearing aids",
						Count: 1160,
						AddAction: "addfacetfilter(SubjectEDS:hearing aids)",
					},
					{
						Value: "aids-related opportunistic infections",
						Count: 1147,
						AddAction:
							"addfacetfilter(SubjectEDS:aids-related opportunistic infections)",
					},
					{
						Value: "infectious disease transmission, vertical",
						Count: 954,
						AddAction:
							"addfacetfilter(SubjectEDS:infectious disease transmission\\, vertical)",
					},
					{
						Value: "hiv",
						Count: 893,
						AddAction: "addfacetfilter(SubjectEDS:hiv)",
					},
					{
						Value: "audiovisual aids",
						Count: 701,
						AddAction: "addfacetfilter(SubjectEDS:audiovisual aids)",
					},
					{
						Value: "anti-hiv agents",
						Count: 672,
						AddAction: "addfacetfilter(SubjectEDS:anti-hiv agents)",
					},
					{
						Value: "pregnancy complications, infectious",
						Count: 666,
						AddAction:
							"addfacetfilter(SubjectEDS:pregnancy complications\\, infectious)",
					},
					{
						Value: "hiv (viruses)",
						Count: 655,
						AddAction: "addfacetfilter(SubjectEDS:hiv \\(viruses\\))",
					},
					{
						Value: "health education",
						Count: 612,
						AddAction: "addfacetfilter(SubjectEDS:health education)",
					},
					{
						Value: "hiv/aids",
						Count: 590,
						AddAction: "addfacetfilter(SubjectEDS:hiv/aids)",
					},
					{
						Value: "deafness",
						Count: 582,
						AddAction: "addfacetfilter(SubjectEDS:deafness)",
					},
					{
						Value: "teaching methods",
						Count: 516,
						AddAction: "addfacetfilter(SubjectEDS:teaching methods)",
					},
					{
						Value: "cochlear implants",
						Count: 511,
						AddAction: "addfacetfilter(SubjectEDS:cochlear implants)",
					},
					{
						Value: "aids (disease) -- prevention",
						Count: 503,
						AddAction:
							"addfacetfilter(SubjectEDS:aids \\(disease\\) -- prevention)",
					},
					{
						Value: "health knowledge, attitudes, practice",
						Count: 500,
						AddAction:
							"addfacetfilter(SubjectEDS:health knowledge\\, attitudes\\, practice)",
					},
					{
						Value: "elementary education",
						Count: 498,
						AddAction: "addfacetfilter(SubjectEDS:elementary education)",
					},
					{
						Value: "hiv seropositivity",
						Count: 495,
						AddAction: "addfacetfilter(SubjectEDS:hiv seropositivity)",
					},
					{
						Value: "visual aids",
						Count: 484,
						AddAction: "addfacetfilter(SubjectEDS:visual aids)",
					},
					{
						Value: "aids",
						Count: 475,
						AddAction: "addfacetfilter(SubjectEDS:aids)",
					},
					{
						Value: "hiv-positive persons",
						Count: 474,
						AddAction: "addfacetfilter(SubjectEDS:hiv-positive persons)",
					},
					{
						Value: "elementary secondary education",
						Count: 473,
						AddAction:
							"addfacetfilter(SubjectEDS:elementary secondary education)",
					},
					{
						Value: "public health",
						Count: 454,
						AddAction: "addfacetfilter(SubjectEDS:public health)",
					},
					{
						Value: "aids (disease) in children",
						Count: 448,
						AddAction:
							"addfacetfilter(SubjectEDS:aids \\(disease\\) in children)",
					},
					{
						Value: "tuberculosis",
						Count: 439,
						AddAction: "addfacetfilter(SubjectEDS:tuberculosis)",
					},
					{
						Value: "sexually transmitted diseases",
						Count: 410,
						AddAction:
							"addfacetfilter(SubjectEDS:sexually transmitted diseases)",
					},
					{
						Value: "developing countries",
						Count: 406,
						AddAction: "addfacetfilter(SubjectEDS:developing countries)",
					},
					{
						Value: "audiovisual materials",
						Count: 396,
						AddAction: "addfacetfilter(SubjectEDS:audiovisual materials)",
					},
					{
						Value: "sexual behavior",
						Count: 376,
						AddAction: "addfacetfilter(SubjectEDS:sexual behavior)",
					},
					{
						Value: "caregivers",
						Count: 374,
						AddAction: "addfacetfilter(SubjectEDS:caregivers)",
					},
					{
						Value: "foreign countries",
						Count: 374,
						AddAction: "addfacetfilter(SubjectEDS:foreign countries)",
					},
					{
						Value: "pediatrics",
						Count: 373,
						AddAction: "addfacetfilter(SubjectEDS:pediatrics)",
					},
					{
						Value: "children -- health aspects",
						Count: 369,
						AddAction: "addfacetfilter(SubjectEDS:children -- health aspects)",
					},
					{
						Value: "hearing loss",
						Count: 363,
						AddAction: "addfacetfilter(SubjectEDS:hearing loss)",
					},
					{
						Value: "antiretroviral therapy, highly active",
						Count: 362,
						AddAction:
							"addfacetfilter(SubjectEDS:antiretroviral therapy\\, highly active)",
					},
					{
						Value: "child development",
						Count: 362,
						AddAction: "addfacetfilter(SubjectEDS:child development)",
					},
					{
						Value: "parents",
						Count: 361,
						AddAction: "addfacetfilter(SubjectEDS:parents)",
					},
					{
						Value: "instructional materials",
						Count: 353,
						AddAction: "addfacetfilter(SubjectEDS:instructional materials)",
					},
					{
						Value: "company business management",
						Count: 348,
						AddAction: "addfacetfilter(SubjectEDS:company business management)",
					},
					{
						Value: "adolescents",
						Count: 344,
						AddAction: "addfacetfilter(SubjectEDS:adolescents)",
					},
					{
						Value: "research -- finance",
						Count: 335,
						AddAction: "addfacetfilter(SubjectEDS:research -- finance)",
					},
					{
						Value: "educational technology",
						Count: 326,
						AddAction: "addfacetfilter(SubjectEDS:educational technology)",
					},
					{
						Value: "communication aids for disabled",
						Count: 322,
						AddAction:
							"addfacetfilter(SubjectEDS:communication aids for disabled)",
					},
					{
						Value: "child welfare",
						Count: 310,
						AddAction: "addfacetfilter(SubjectEDS:child welfare)",
					},
					{
						Value: "speech perception",
						Count: 305,
						AddAction: "addfacetfilter(SubjectEDS:speech perception)",
					},
				],
			},
			{
				Id: "Publisher",
				Label: "Publisher",
				AvailableFacetValues: [
					{
						Value: "wiley-blackwell",
						Count: 1391,
						AddAction: "addfacetfilter(Publisher:wiley-blackwell)",
					},
					{
						Value: "oxford university press",
						Count: 1106,
						AddAction: "addfacetfilter(Publisher:oxford university press)",
					},
					{
						Value: "elsevier b.v.",
						Count: 1046,
						AddAction: "addfacetfilter(Publisher:elsevier b.v.)",
					},
					{
						Value: "taylor & francis ltd",
						Count: 1027,
						AddAction: "addfacetfilter(Publisher:taylor & francis ltd)",
					},
					{
						Value: "biomed central",
						Count: 982,
						AddAction: "addfacetfilter(Publisher:biomed central)",
					},
					{
						Value: "informa healthcare",
						Count: 912,
						AddAction: "addfacetfilter(Publisher:informa healthcare)",
					},
					{
						Value: "elsevier",
						Count: 910,
						AddAction: "addfacetfilter(Publisher:elsevier)",
					},
					{
						Value: "springer",
						Count: 880,
						AddAction: "addfacetfilter(Publisher:springer)",
					},
					{
						Value: "springer science & business media b.v.",
						Count: 857,
						AddAction:
							"addfacetfilter(Publisher:springer science & business media b.v.)",
					},
					{
						Value: "media source, inc.",
						Count: 739,
						AddAction: "addfacetfilter(Publisher:media source\\, inc.)",
					},
					{
						Value: "elsevier inc.",
						Count: 718,
						AddAction: "addfacetfilter(Publisher:elsevier inc.)",
					},
					{
						Value: "elsevier science",
						Count: 567,
						AddAction: "addfacetfilter(Publisher:elsevier science)",
					},
					{
						Value: "public library of science",
						Count: 565,
						AddAction: "addfacetfilter(Publisher:public library of science)",
					},
					{
						Value: "american academy of pediatrics",
						Count: 523,
						AddAction:
							"addfacetfilter(Publisher:american academy of pediatrics)",
					},
					{
						Value: "mary ann liebert, inc.",
						Count: 505,
						AddAction: "addfacetfilter(Publisher:mary ann liebert\\, inc.)",
					},
					{
						Value: "lancet publishing group",
						Count: 472,
						AddAction: "addfacetfilter(Publisher:lancet publishing group)",
					},
					{
						Value: "lippincott williams & wilkins",
						Count: 432,
						AddAction:
							"addfacetfilter(Publisher:lippincott williams & wilkins)",
					},
					{
						Value: "blackwell scientific publications",
						Count: 415,
						AddAction:
							"addfacetfilter(Publisher:blackwell scientific publications)",
					},
					{
						Value: "international aids society",
						Count: 395,
						AddAction: "addfacetfilter(Publisher:international aids society)",
					},
					{
						Value: "british medical association",
						Count: 394,
						AddAction: "addfacetfilter(Publisher:british medical association)",
					},
					{
						Value: "american public health association",
						Count: 390,
						AddAction:
							"addfacetfilter(Publisher:american public health association)",
					},
					{
						Value: "university of chicago press",
						Count: 372,
						AddAction: "addfacetfilter(Publisher:university of chicago press)",
					},
					{
						Value: "american speech-language-hearing association",
						Count: 359,
						AddAction:
							"addfacetfilter(Publisher:american speech-language-hearing association)",
					},
					{
						Value: "oxford university press / usa",
						Count: 358,
						AddAction:
							"addfacetfilter(Publisher:oxford university press / usa)",
					},
					{
						Value: "sage publications",
						Count: 299,
						AddAction: "addfacetfilter(Publisher:sage publications)",
					},
					{
						Value: "world health organization",
						Count: 247,
						AddAction: "addfacetfilter(Publisher:world health organization)",
					},
					{
						Value: "nature publishing group",
						Count: 244,
						AddAction: "addfacetfilter(Publisher:nature publishing group)",
					},
					{
						Value: "springer science + business media",
						Count: 211,
						AddAction:
							"addfacetfilter(Publisher:springer science + business media)",
					},
					{
						Value: "taylor & francis",
						Count: 206,
						AddAction: "addfacetfilter(Publisher:taylor & francis)",
					},
					{
						Value: "bmj publishing group",
						Count: 172,
						AddAction: "addfacetfilter(Publisher:bmj publishing group)",
					},
					{
						Value: "springer-verlag",
						Count: 148,
						AddAction: "addfacetfilter(Publisher:springer-verlag)",
					},
					{
						Value: "american association for the advancement of science",
						Count: 124,
						AddAction:
							"addfacetfilter(Publisher:american association for the advancement of science)",
					},
					{
						Value: "american library association",
						Count: 102,
						AddAction: "addfacetfilter(Publisher:american library association)",
					},
					{
						Value: "canadian medical association",
						Count: 102,
						AddAction: "addfacetfilter(Publisher:canadian medical association)",
					},
					{
						Value: "american psychological association",
						Count: 97,
						AddAction:
							"addfacetfilter(Publisher:american psychological association)",
					},
					{
						Value: "library journals, llc",
						Count: 69,
						AddAction: "addfacetfilter(Publisher:library journals\\, llc)",
					},
					{
						Value: "routledge",
						Count: 56,
						AddAction: "addfacetfilter(Publisher:routledge)",
					},
					{
						Value: "cambridge university press",
						Count: 55,
						AddAction: "addfacetfilter(Publisher:cambridge university press)",
					},
					{
						Value: "council for exceptional children",
						Count: 50,
						AddAction:
							"addfacetfilter(Publisher:council for exceptional children)",
					},
					{
						Value: "ios press",
						Count: 39,
						AddAction: "addfacetfilter(Publisher:ios press)",
					},
					{
						Value: "national academy of sciences",
						Count: 36,
						AddAction: "addfacetfilter(Publisher:national academy of sciences)",
					},
					{
						Value: "new statesman, ltd.",
						Count: 30,
						AddAction: "addfacetfilter(Publisher:new statesman\\, ltd.)",
					},
					{
						Value: "sociedade brasileira de pediatria",
						Count: 25,
						AddAction:
							"addfacetfilter(Publisher:sociedade brasileira de pediatria)",
					},
					{
						Value: "superintendent of documents",
						Count: 25,
						AddAction: "addfacetfilter(Publisher:superintendent of documents)",
					},
					{
						Value: "pwxyz, llc",
						Count: 12,
						AddAction: "addfacetfilter(Publisher:pwxyz\\, llc)",
					},
					{
						Value: "earl g. graves publishing co., inc.",
						Count: 10,
						AddAction:
							"addfacetfilter(Publisher:earl g. graves publishing co.\\, inc.)",
					},
					{
						Value: "universitat de barcelona",
						Count: 3,
						AddAction: "addfacetfilter(Publisher:universitat de barcelona)",
					},
					{
						Value: "international marketing reports ltd.",
						Count: 2,
						AddAction:
							"addfacetfilter(Publisher:international marketing reports ltd.)",
					},
					{
						Value: "sense publishers",
						Count: 2,
						AddAction: "addfacetfilter(Publisher:sense publishers)",
					},
					{
						Value:
							"west virginia university press, university of west virginia",
						Count: 2,
						AddAction:
							"addfacetfilter(Publisher:west virginia university press\\, university of west virginia)",
					},
				],
			},
			{
				Id: "Journal",
				Label: "Publication",
				AvailableFacetValues: [
					{
						Value: "aids care",
						Count: 1039,
						AddAction: "addfacetfilter(Journal:aids care)",
					},
					{
						Value: "school library journal",
						Count: 716,
						AddAction: "addfacetfilter(Journal:school library journal)",
					},
					{
						Value: "pediatrics",
						Count: 514,
						AddAction: "addfacetfilter(Journal:pediatrics)",
					},
					{
						Value: "lancet london england",
						Count: 486,
						AddAction: "addfacetfilter(Journal:lancet london england)",
					},
					{
						Value: "plos one",
						Count: 447,
						AddAction: "addfacetfilter(Journal:plos one)",
					},
					{
						Value: "international journal of pediatric otorhinolaryngology",
						Count: 446,
						AddAction:
							"addfacetfilter(Journal:international journal of pediatric otorhinolaryngology)",
					},
					{
						Value: "journal of the international aids society",
						Count: 443,
						AddAction:
							"addfacetfilter(Journal:journal of the international aids society)",
					},
					{
						Value: "american journal of public health",
						Count: 352,
						AddAction:
							"addfacetfilter(Journal:american journal of public health)",
					},
					{
						Value: "aids and behavior",
						Count: 322,
						AddAction: "addfacetfilter(Journal:aids and behavior)",
					},
					{
						Value: "the lancet",
						Count: 314,
						AddAction: "addfacetfilter(Journal:the lancet)",
					},
					{
						Value: "bmc public health",
						Count: 309,
						AddAction: "addfacetfilter(Journal:bmc public health)",
					},
					{
						Value: "aids patient care and stds",
						Count: 304,
						AddAction: "addfacetfilter(Journal:aids patient care and stds)",
					},
					{
						Value: "bulletin of the world health organization",
						Count: 238,
						AddAction:
							"addfacetfilter(Journal:bulletin of the world health organization)",
					},
					{
						Value: "journal of infectious diseases",
						Count: 222,
						AddAction: "addfacetfilter(Journal:journal of infectious diseases)",
					},
					{
						Value: "journal of school health",
						Count: 222,
						AddAction: "addfacetfilter(Journal:journal of school health)",
					},
					{
						Value: "international journal of audiology",
						Count: 195,
						AddAction:
							"addfacetfilter(Journal:international journal of audiology)",
					},
					{
						Value: "journal of pediatrics",
						Count: 182,
						AddAction: "addfacetfilter(Journal:journal of pediatrics)",
					},
					{
						Value: "archives of disease in childhood",
						Count: 166,
						AddAction:
							"addfacetfilter(Journal:archives of disease in childhood)",
					},
					{
						Value: "clinical infectious diseases",
						Count: 157,
						AddAction: "addfacetfilter(Journal:clinical infectious diseases)",
					},
					{
						Value: "journal of tropical pediatrics",
						Count: 134,
						AddAction: "addfacetfilter(Journal:journal of tropical pediatrics)",
					},
					{
						Value: "pediatric radiology",
						Count: 128,
						AddAction: "addfacetfilter(Journal:pediatric radiology)",
					},
					{
						Value: "annals of the new york academy of sciences",
						Count: 127,
						AddAction:
							"addfacetfilter(Journal:annals of the new york academy of sciences)",
					},
					{
						Value: "cadernos de saude publica",
						Count: 125,
						AddAction: "addfacetfilter(Journal:cadernos de saude publica)",
					},
					{
						Value: "reproductive health matters",
						Count: 122,
						AddAction: "addfacetfilter(Journal:reproductive health matters)",
					},
					{
						Value: "nature",
						Count: 120,
						AddAction: "addfacetfilter(Journal:nature)",
					},
					{
						Value: "child development",
						Count: 116,
						AddAction: "addfacetfilter(Journal:child development)",
					},
					{
						Value: "african journal of reproductive health",
						Count: 104,
						AddAction:
							"addfacetfilter(Journal:african journal of reproductive health)",
					},
					{
						Value: "bmc infectious diseases",
						Count: 104,
						AddAction: "addfacetfilter(Journal:bmc infectious diseases)",
					},
					{
						Value: "plos medicine",
						Count: 95,
						AddAction: "addfacetfilter(Journal:plos medicine)",
					},
					{
						Value: "social work",
						Count: 93,
						AddAction: "addfacetfilter(Journal:social work)",
					},
					{
						Value: "library journal",
						Count: 87,
						AddAction: "addfacetfilter(Journal:library journal)",
					},
					{
						Value: "bmc pediatrics",
						Count: 84,
						AddAction: "addfacetfilter(Journal:bmc pediatrics)",
					},
					{
						Value: "american annals of the deaf",
						Count: 72,
						AddAction: "addfacetfilter(Journal:american annals of the deaf)",
					},
					{
						Value: "child welfare",
						Count: 69,
						AddAction: "addfacetfilter(Journal:child welfare)",
					},
					{
						Value: "european journal of pediatrics",
						Count: 67,
						AddAction: "addfacetfilter(Journal:european journal of pediatrics)",
					},
					{
						Value: "bmc health services research",
						Count: 65,
						AddAction: "addfacetfilter(Journal:bmc health services research)",
					},
					{
						Value: "journal of deaf studies and deaf education",
						Count: 64,
						AddAction:
							"addfacetfilter(Journal:journal of deaf studies and deaf education)",
					},
					{
						Value: "ciencia & saude coletiva",
						Count: 51,
						AddAction: "addfacetfilter(Journal:ciencia & saude coletiva)",
					},
					{
						Value: "family relations",
						Count: 50,
						AddAction: "addfacetfilter(Journal:family relations)",
					},
					{
						Value: "aids research and therapy",
						Count: 49,
						AddAction: "addfacetfilter(Journal:aids research and therapy)",
					},
					{
						Value: "journal of pediatric nursing",
						Count: 47,
						AddAction: "addfacetfilter(Journal:journal of pediatric nursing)",
					},
					{
						Value: "reproductive health",
						Count: 44,
						AddAction: "addfacetfilter(Journal:reproductive health)",
					},
					{
						Value: "brazilian journal of infectious diseases",
						Count: 43,
						AddAction:
							"addfacetfilter(Journal:brazilian journal of infectious diseases)",
					},
					{
						Value: "adolescence",
						Count: 32,
						AddAction: "addfacetfilter(Journal:adolescence)",
					},
					{
						Value: "virology",
						Count: 30,
						AddAction: "addfacetfilter(Journal:virology)",
					},
					{
						Value: "harvard law review",
						Count: 19,
						AddAction: "addfacetfilter(Journal:harvard law review)",
					},
					{
						Value: "california law review",
						Count: 14,
						AddAction: "addfacetfilter(Journal:california law review)",
					},
					{
						Value: "black enterprise",
						Count: 11,
						AddAction: "addfacetfilter(Journal:black enterprise)",
					},
					{
						Value: "beijing review",
						Count: 4,
						AddAction: "addfacetfilter(Journal:beijing review)",
					},
					{
						Value: "world journal of gastroenterology",
						Count: 3,
						AddAction:
							"addfacetfilter(Journal:world journal of gastroenterology)",
					},
				],
			},
			{
				Id: "Language",
				Label: "Language",
				AvailableFacetValues: [
					{
						Value: "english",
						Count: 37550,
						AddAction: "addfacetfilter(Language:english)",
					},
					{
						Value: "undetermined",
						Count: 2323,
						AddAction: "addfacetfilter(Language:undetermined)",
					},
					{
						Value: "portuguese",
						Count: 640,
						AddAction: "addfacetfilter(Language:portuguese)",
					},
					{
						Value: "french",
						Count: 393,
						AddAction: "addfacetfilter(Language:french)",
					},
					{
						Value: "spanish",
						Count: 275,
						AddAction: "addfacetfilter(Language:spanish)",
					},
					{
						Value: "german",
						Count: 205,
						AddAction: "addfacetfilter(Language:german)",
					},
					{
						Value: "spanish; castilian",
						Count: 82,
						AddAction: "addfacetfilter(Language:spanish; castilian)",
					},
					{
						Value: "swedish",
						Count: 40,
						AddAction: "addfacetfilter(Language:swedish)",
					},
					{
						Value: "afrikaans",
						Count: 29,
						AddAction: "addfacetfilter(Language:afrikaans)",
					},
					{
						Value: "other",
						Count: 29,
						AddAction: "addfacetfilter(Language:other)",
					},
					{
						Value: "turkish",
						Count: 12,
						AddAction: "addfacetfilter(Language:turkish)",
					},
					{
						Value: "英文",
						Count: 12,
						AddAction: "addfacetfilter(Language:英文)",
					},
					{
						Value: "catalan; valencian",
						Count: 8,
						AddAction: "addfacetfilter(Language:catalan; valencian)",
					},
					{
						Value: "dutch; flemish",
						Count: 7,
						AddAction: "addfacetfilter(Language:dutch; flemish)",
					},
					{
						Value: "enen",
						Count: 7,
						AddAction: "addfacetfilter(Language:enen)",
					},
					{
						Value: "italian",
						Count: 7,
						AddAction: "addfacetfilter(Language:italian)",
					},
					{
						Value: "multiple languages",
						Count: 7,
						AddAction: "addfacetfilter(Language:multiple languages)",
					},
					{
						Value: "chinese",
						Count: 5,
						AddAction: "addfacetfilter(Language:chinese)",
					},
					{
						Value: "polish",
						Count: 5,
						AddAction: "addfacetfilter(Language:polish)",
					},
					{
						Value: "czech",
						Count: 4,
						AddAction: "addfacetfilter(Language:czech)",
					},
					{
						Value: "en-1",
						Count: 3,
						AddAction: "addfacetfilter(Language:en-1)",
					},
					{
						Value: "lithuanian",
						Count: 3,
						AddAction: "addfacetfilter(Language:lithuanian)",
					},
					{
						Value: "serbian",
						Count: 3,
						AddAction: "addfacetfilter(Language:serbian)",
					},
					{
						Value: "dutch",
						Count: 2,
						AddAction: "addfacetfilter(Language:dutch)",
					},
					{
						Value: "japanese",
						Count: 2,
						AddAction: "addfacetfilter(Language:japanese)",
					},
					{
						Value: "sv-1",
						Count: 2,
						AddAction: "addfacetfilter(Language:sv-1)",
					},
					{
						Value: "sven-1",
						Count: 2,
						AddAction: "addfacetfilter(Language:sven-1)",
					},
					{
						Value: "繁體中文",
						Count: 2,
						AddAction: "addfacetfilter(Language:繁體中文)",
					},
					{
						Value: "arabic",
						Count: 1,
						AddAction: "addfacetfilter(Language:arabic)",
					},
					{
						Value: "cht",
						Count: 1,
						AddAction: "addfacetfilter(Language:cht)",
					},
					{
						Value: "danish",
						Count: 1,
						AddAction: "addfacetfilter(Language:danish)",
					},
					{
						Value: "english, old (ca.450-1100)",
						Count: 1,
						AddAction:
							"addfacetfilter(Language:english\\, old \\(ca.450-1100\\))",
					},
					{
						Value: "lao",
						Count: 1,
						AddAction: "addfacetfilter(Language:lao)",
					},
					{
						Value: "malay",
						Count: 1,
						AddAction: "addfacetfilter(Language:malay)",
					},
					{
						Value: "norwegian",
						Count: 1,
						AddAction: "addfacetfilter(Language:norwegian)",
					},
					{
						Value: "persian",
						Count: 1,
						AddAction: "addfacetfilter(Language:persian)",
					},
					{
						Value: "romanian",
						Count: 1,
						AddAction: "addfacetfilter(Language:romanian)",
					},
					{
						Value: "sotho, southern",
						Count: 1,
						AddAction: "addfacetfilter(Language:sotho\\, southern)",
					},
					{
						Value: "stellenbosch",
						Count: 1,
						AddAction: "addfacetfilter(Language:stellenbosch)",
					},
					{
						Value: "sven",
						Count: 1,
						AddAction: "addfacetfilter(Language:sven)",
					},
					{
						Value: "vietnamese",
						Count: 1,
						AddAction: "addfacetfilter(Language:vietnamese)",
					},
					{
						Value: "中文繁體",
						Count: 1,
						AddAction: "addfacetfilter(Language:中文繁體)",
					},
					{
						Value: "簡體中文",
						Count: 1,
						AddAction: "addfacetfilter(Language:簡體中文)",
					},
				],
			},
			{
				Id: "SubjectGeographic",
				Label: "Geography",
				AvailableFacetValues: [
					{
						Value: "united states",
						Count: 1930,
						AddAction: "addfacetfilter(SubjectGeographic:united states)",
					},
					{
						Value: "south africa",
						Count: 962,
						AddAction: "addfacetfilter(SubjectGeographic:south africa)",
					},
					{
						Value: "africa",
						Count: 582,
						AddAction: "addfacetfilter(SubjectGeographic:africa)",
					},
					{
						Value: "uganda",
						Count: 496,
						AddAction: "addfacetfilter(SubjectGeographic:uganda)",
					},
					{
						Value: "brazil",
						Count: 456,
						AddAction: "addfacetfilter(SubjectGeographic:brazil)",
					},
					{
						Value: "india",
						Count: 381,
						AddAction: "addfacetfilter(SubjectGeographic:india)",
					},
					{
						Value: "kenya",
						Count: 373,
						AddAction: "addfacetfilter(SubjectGeographic:kenya)",
					},
					{
						Value: "china",
						Count: 325,
						AddAction: "addfacetfilter(SubjectGeographic:china)",
					},
					{
						Value: "great britain",
						Count: 269,
						AddAction: "addfacetfilter(SubjectGeographic:great britain)",
					},
					{
						Value: "tanzania",
						Count: 269,
						AddAction: "addfacetfilter(SubjectGeographic:tanzania)",
					},
					{
						Value: "zimbabwe",
						Count: 258,
						AddAction: "addfacetfilter(SubjectGeographic:zimbabwe)",
					},
					{
						Value: "malawi",
						Count: 229,
						AddAction: "addfacetfilter(SubjectGeographic:malawi)",
					},
					{
						Value: "nigeria",
						Count: 228,
						AddAction: "addfacetfilter(SubjectGeographic:nigeria)",
					},
					{
						Value: "thailand",
						Count: 215,
						AddAction: "addfacetfilter(SubjectGeographic:thailand)",
					},
					{
						Value: "canada",
						Count: 182,
						AddAction: "addfacetfilter(SubjectGeographic:canada)",
					},
					{
						Value: "zambia",
						Count: 178,
						AddAction: "addfacetfilter(SubjectGeographic:zambia)",
					},
					{
						Value: "ethiopia",
						Count: 161,
						AddAction: "addfacetfilter(SubjectGeographic:ethiopia)",
					},
					{
						Value: "europe",
						Count: 136,
						AddAction: "addfacetfilter(SubjectGeographic:europe)",
					},
					{
						Value: "italy",
						Count: 117,
						AddAction: "addfacetfilter(SubjectGeographic:italy)",
					},
					{
						Value: "england",
						Count: 112,
						AddAction: "addfacetfilter(SubjectGeographic:england)",
					},
					{
						Value: "australia",
						Count: 110,
						AddAction: "addfacetfilter(SubjectGeographic:australia)",
					},
					{
						Value: "botswana",
						Count: 102,
						AddAction: "addfacetfilter(SubjectGeographic:botswana)",
					},
					{
						Value: "california",
						Count: 93,
						AddAction: "addfacetfilter(SubjectGeographic:california)",
					},
					{
						Value: "cote d'ivoire",
						Count: 87,
						AddAction: "addfacetfilter(SubjectGeographic:cote d'ivoire)",
					},
					{
						Value: "france",
						Count: 78,
						AddAction: "addfacetfilter(SubjectGeographic:france)",
					},
					{
						Value: "netherlands",
						Count: 78,
						AddAction: "addfacetfilter(SubjectGeographic:netherlands)",
					},
					{
						Value: "asia",
						Count: 74,
						AddAction: "addfacetfilter(SubjectGeographic:asia)",
					},
					{
						Value: "ghana",
						Count: 71,
						AddAction: "addfacetfilter(SubjectGeographic:ghana)",
					},
					{
						Value: "vietnam",
						Count: 67,
						AddAction: "addfacetfilter(SubjectGeographic:vietnam)",
					},
					{
						Value: "new york",
						Count: 64,
						AddAction: "addfacetfilter(SubjectGeographic:new york)",
					},
					{
						Value: "haiti",
						Count: 59,
						AddAction: "addfacetfilter(SubjectGeographic:haiti)",
					},
					{
						Value: "japan",
						Count: 57,
						AddAction: "addfacetfilter(SubjectGeographic:japan)",
					},
					{
						Value: "mexico",
						Count: 56,
						AddAction: "addfacetfilter(SubjectGeographic:mexico)",
					},
					{
						Value: "mozambique",
						Count: 54,
						AddAction: "addfacetfilter(SubjectGeographic:mozambique)",
					},
					{
						Value: "romania",
						Count: 54,
						AddAction: "addfacetfilter(SubjectGeographic:romania)",
					},
					{
						Value: "texas",
						Count: 51,
						AddAction: "addfacetfilter(SubjectGeographic:texas)",
					},
					{
						Value: "florida",
						Count: 45,
						AddAction: "addfacetfilter(SubjectGeographic:florida)",
					},
					{
						Value: "latin america",
						Count: 42,
						AddAction: "addfacetfilter(SubjectGeographic:latin america)",
					},
					{
						Value: "british columbia",
						Count: 40,
						AddAction: "addfacetfilter(SubjectGeographic:british columbia)",
					},
					{
						Value: "namibia",
						Count: 36,
						AddAction: "addfacetfilter(SubjectGeographic:namibia)",
					},
					{
						Value: "swaziland",
						Count: 33,
						AddAction: "addfacetfilter(SubjectGeographic:swaziland)",
					},
					{
						Value: "massachusetts",
						Count: 31,
						AddAction: "addfacetfilter(SubjectGeographic:massachusetts)",
					},
					{
						Value: "north carolina",
						Count: 30,
						AddAction: "addfacetfilter(SubjectGeographic:north carolina)",
					},
					{
						Value: "new zealand",
						Count: 28,
						AddAction: "addfacetfilter(SubjectGeographic:new zealand)",
					},
					{
						Value: "taiwan",
						Count: 22,
						AddAction: "addfacetfilter(SubjectGeographic:taiwan)",
					},
					{
						Value: "israel",
						Count: 21,
						AddAction: "addfacetfilter(SubjectGeographic:israel)",
					},
					{
						Value: "libya",
						Count: 21,
						AddAction: "addfacetfilter(SubjectGeographic:libya)",
					},
					{
						Value: "pennsylvania",
						Count: 20,
						AddAction: "addfacetfilter(SubjectGeographic:pennsylvania)",
					},
					{
						Value: "papua new guinea",
						Count: 14,
						AddAction: "addfacetfilter(SubjectGeographic:papua new guinea)",
					},
					{
						Value: "illinois",
						Count: 13,
						AddAction: "addfacetfilter(SubjectGeographic:illinois)",
					},
				],
			},
			{
				Id: "Category",
				Label: "Category",
				AvailableFacetValues: [
					{
						Value: "education / administration / general",
						Count: 1,
						AddAction:
							"addfacetfilter(Category:education / administration / general)",
					},
					{
						Value: "education / organizations & institutions",
						Count: 1,
						AddAction:
							"addfacetfilter(Category:education / organizations & institutions)",
					},
					{
						Value: "health & fitness / diseases / aids & hiv",
						Count: 1,
						AddAction:
							"addfacetfilter(Category:health & fitness / diseases / aids & hiv)",
					},
					{
						Value: "medical / aids & hiv",
						Count: 1,
						AddAction: "addfacetfilter(Category:medical / aids & hiv)",
					},
				],
			},
			{
				Id: "ContentProvider",
				Label: "Content Provider",
				AvailableFacetValues: [
					{
						Value: "MEDLINE",
						Count: 8159,
						AddAction: "addfacetfilter(ContentProvider:MEDLINE)",
					},
					{
						Value: "MEDLINE with Full Text",
						Count: 8155,
						AddAction: "addfacetfilter(ContentProvider:MEDLINE with Full Text)",
					},
					{
						Value: "Academic OneFile",
						Count: 6333,
						AddAction: "addfacetfilter(ContentProvider:Academic OneFile)",
					},
					{
						Value: "General OneFile",
						Count: 4507,
						AddAction: "addfacetfilter(ContentProvider:General OneFile)",
					},
					{
						Value: "Expanded Academic ASAP",
						Count: 4097,
						AddAction: "addfacetfilter(ContentProvider:Expanded Academic ASAP)",
					},
					{
						Value: "InfoTrac Health Reference Center Academic",
						Count: 3559,
						AddAction:
							"addfacetfilter(ContentProvider:InfoTrac Health Reference Center Academic)",
					},
					{
						Value: "ERIC",
						Count: 2838,
						AddAction: "addfacetfilter(ContentProvider:ERIC)",
					},
					{
						Value: "General Reference Center Gold",
						Count: 2467,
						AddAction:
							"addfacetfilter(ContentProvider:General Reference Center Gold)",
					},
					{
						Value: "ScienceDirect",
						Count: 2359,
						AddAction: "addfacetfilter(ContentProvider:ScienceDirect)",
					},
					{
						Value: "Health & Wellness Resource Center",
						Count: 1885,
						AddAction:
							"addfacetfilter(ContentProvider:Health & Wellness Resource Center)",
					},
					{
						Value: "InfoTrac Student Edition",
						Count: 1812,
						AddAction:
							"addfacetfilter(ContentProvider:InfoTrac Student Edition)",
					},
					{
						Value: "Networked Digital Library of Theses & Dissertations",
						Count: 1422,
						AddAction:
							"addfacetfilter(ContentProvider:Networked Digital Library of Theses & Dissertations)",
					},
					{
						Value:
							"British Library Document Supply Centre Inside Serials & Conference Proceedings",
						Count: 1133,
						AddAction:
							"addfacetfilter(ContentProvider:British Library Document Supply Centre Inside Serials & Conference Proceedings)",
					},
					{
						Value: "JSTOR Journals",
						Count: 965,
						AddAction: "addfacetfilter(ContentProvider:JSTOR Journals)",
					},
					{
						Value: "RCAAP",
						Count: 703,
						AddAction: "addfacetfilter(ContentProvider:RCAAP)",
					},
					{
						Value: "Research Starters",
						Count: 677,
						AddAction: "addfacetfilter(ContentProvider:Research Starters)",
					},
					{
						Value: "Library, Information Science & Technology Abstracts",
						Count: 669,
						AddAction:
							"addfacetfilter(ContentProvider:Library\\, Information Science & Technology Abstracts)",
					},
					{
						Value: "Newswires",
						Count: 567,
						AddAction: "addfacetfilter(ContentProvider:Newswires)",
					},
					{
						Value: "Student Resources in Context",
						Count: 565,
						AddAction:
							"addfacetfilter(ContentProvider:Student Resources in Context)",
					},
					{
						Value: "SciELO",
						Count: 515,
						AddAction: "addfacetfilter(ContentProvider:SciELO)",
					},
					{
						Value: "Canada In Context",
						Count: 397,
						AddAction: "addfacetfilter(ContentProvider:Canada In Context)",
					},
					{
						Value: "Biography in Context",
						Count: 320,
						AddAction: "addfacetfilter(ContentProvider:Biography in Context)",
					},
					{
						Value: "Directory of Open Access Journals",
						Count: 236,
						AddAction:
							"addfacetfilter(ContentProvider:Directory of Open Access Journals)",
					},
					{
						Value: "InfoTrac Newsstand",
						Count: 236,
						AddAction: "addfacetfilter(ContentProvider:InfoTrac Newsstand)",
					},
					{
						Value: "Science In Context",
						Count: 218,
						AddAction: "addfacetfilter(ContentProvider:Science In Context)",
					},
					{
						Value: "Narcis",
						Count: 185,
						AddAction: "addfacetfilter(ContentProvider:Narcis)",
					},
					{
						Value: "AGRIS",
						Count: 139,
						AddAction: "addfacetfilter(ContentProvider:AGRIS)",
					},
					{
						Value: "Business Insights: Essentials",
						Count: 125,
						AddAction:
							"addfacetfilter(ContentProvider:Business Insights\\: Essentials)",
					},
					{
						Value: "Opposing Viewpoints in Context",
						Count: 119,
						AddAction:
							"addfacetfilter(ContentProvider:Opposing Viewpoints in Context)",
					},
					{
						Value: "InfoTrac LegalTrac",
						Count: 116,
						AddAction: "addfacetfilter(ContentProvider:InfoTrac LegalTrac)",
					},
					{
						Value: "LexisNexis Academic: Law Reviews",
						Count: 104,
						AddAction:
							"addfacetfilter(ContentProvider:LexisNexis Academic\\: Law Reviews)",
					},
					{
						Value: "Government Printing Office Catalog",
						Count: 101,
						AddAction:
							"addfacetfilter(ContentProvider:Government Printing Office Catalog)",
					},
					{
						Value: "U.S. History in Context",
						Count: 93,
						AddAction:
							"addfacetfilter(ContentProvider:U.S. History in Context)",
					},
					{
						Value: "World History in Context",
						Count: 76,
						AddAction:
							"addfacetfilter(ContentProvider:World History in Context)",
					},
					{
						Value: "InfoTrac Junior Edition",
						Count: 66,
						AddAction:
							"addfacetfilter(ContentProvider:InfoTrac Junior Edition)",
					},
					{
						Value: "InfoTrac Informe!",
						Count: 64,
						AddAction: "addfacetfilter(ContentProvider:InfoTrac Informe!)",
					},
					{
						Value: "SA ePublications Service",
						Count: 52,
						AddAction:
							"addfacetfilter(ContentProvider:SA ePublications Service)",
					},
					{
						Value: "Index New Zealand",
						Count: 44,
						AddAction: "addfacetfilter(ContentProvider:Index New Zealand)",
					},
					{
						Value: "SwePub",
						Count: 42,
						AddAction: "addfacetfilter(ContentProvider:SwePub)",
					},
					{
						Value: "PsycCRITIQUES",
						Count: 40,
						AddAction: "addfacetfilter(ContentProvider:PsycCRITIQUES)",
					},
					{
						Value: "USPTO Patent Grants",
						Count: 38,
						AddAction: "addfacetfilter(ContentProvider:USPTO Patent Grants)",
					},
					{
						Value: "GreenFILE",
						Count: 35,
						AddAction: "addfacetfilter(ContentProvider:GreenFILE)",
					},
					{
						Value: "Project MUSE",
						Count: 33,
						AddAction: "addfacetfilter(ContentProvider:Project MUSE)",
					},
					{
						Value: "InfoTrac Computer Database",
						Count: 33,
						AddAction:
							"addfacetfilter(ContentProvider:InfoTrac Computer Database)",
					},
					{
						Value: "Literature Resource Center",
						Count: 32,
						AddAction:
							"addfacetfilter(ContentProvider:Literature Resource Center)",
					},
					{
						Value: "Europeana",
						Count: 31,
						AddAction: "addfacetfilter(ContentProvider:Europeana)",
					},
					{
						Value: "USPTO Patent Applications",
						Count: 27,
						AddAction:
							"addfacetfilter(ContentProvider:USPTO Patent Applications)",
					},
					{
						Value: "TOXNET TOXLINE",
						Count: 26,
						AddAction: "addfacetfilter(ContentProvider:TOXNET TOXLINE)",
					},
					{
						Value: "Digital Access to Scholarship at Harvard (DASH)",
						Count: 20,
						AddAction:
							"addfacetfilter(ContentProvider:Digital Access to Scholarship at Harvard \\(DASH\\))",
					},
					{
						Value: "ECONIS",
						Count: 20,
						AddAction: "addfacetfilter(ContentProvider:ECONIS)",
					},
					{
						Value: "Cairn.info",
						Count: 19,
						AddAction: "addfacetfilter(ContentProvider:Cairn.info)",
					},
					{
						Value: "VLeBooks",
						Count: 17,
						AddAction: "addfacetfilter(ContentProvider:VLeBooks)",
					},
					{
						Value: "Airiti Library eBooks & Journals - 華藝線上圖書館",
						Count: 14,
						AddAction:
							"addfacetfilter(ContentProvider:Airiti Library eBooks & Journals - 華藝線上圖書館)",
					},
					{
						Value: "Harvard Library Bibliographic Dataset",
						Count: 11,
						AddAction:
							"addfacetfilter(ContentProvider:Harvard Library Bibliographic Dataset)",
					},
					{
						Value: "Persée",
						Count: 11,
						AddAction: "addfacetfilter(ContentProvider:Persée)",
					},
					{
						Value: "TDX",
						Count: 10,
						AddAction: "addfacetfilter(ContentProvider:TDX)",
					},
					{
						Value: "SOLIS - Sozialwissenschaftliche Literatur",
						Count: 9,
						AddAction:
							"addfacetfilter(ContentProvider:SOLIS - Sozialwissenschaftliche Literatur)",
					},
					{
						Value: "BioOne Online Journals",
						Count: 9,
						AddAction: "addfacetfilter(ContentProvider:BioOne Online Journals)",
					},
					{
						Value: "J-STAGE",
						Count: 8,
						AddAction: "addfacetfilter(ContentProvider:J-STAGE)",
					},
					{
						Value: "CQ Press Congress Collection",
						Count: 8,
						AddAction:
							"addfacetfilter(ContentProvider:CQ Press Congress Collection)",
					},
					{
						Value: "China Science & Technology Journal Database",
						Count: 7,
						AddAction:
							"addfacetfilter(ContentProvider:China Science & Technology Journal Database)",
					},
					{
						Value: "HeinOnline",
						Count: 6,
						AddAction: "addfacetfilter(ContentProvider:HeinOnline)",
					},
					{
						Value: "Gigaom Research",
						Count: 6,
						AddAction: "addfacetfilter(ContentProvider:Gigaom Research)",
					},
					{
						Value: "EU Bookshop",
						Count: 5,
						AddAction: "addfacetfilter(ContentProvider:EU Bookshop)",
					},
					{
						Value: "SciTech Connect",
						Count: 5,
						AddAction: "addfacetfilter(ContentProvider:SciTech Connect)",
					},
					{
						Value: "Energy Citations Database",
						Count: 5,
						AddAction:
							"addfacetfilter(ContentProvider:Energy Citations Database)",
					},
					{
						Value: "CogPrints",
						Count: 4,
						AddAction: "addfacetfilter(ContentProvider:CogPrints)",
					},
					{
						Value: "Informit Health Collection",
						Count: 4,
						AddAction:
							"addfacetfilter(ContentProvider:Informit Health Collection)",
					},
					{
						Value: "RACO",
						Count: 3,
						AddAction: "addfacetfilter(ContentProvider:RACO)",
					},
					{
						Value: "Small Business Resource Center",
						Count: 3,
						AddAction:
							"addfacetfilter(ContentProvider:Small Business Resource Center)",
					},
					{
						Value: "Informit Humanities & Social Sciences Collection",
						Count: 3,
						AddAction:
							"addfacetfilter(ContentProvider:Informit Humanities & Social Sciences Collection)",
					},
					{
						Value: "KoreaScience",
						Count: 2,
						AddAction: "addfacetfilter(ContentProvider:KoreaScience)",
					},
					{
						Value: "HBO Kennisbank",
						Count: 2,
						AddAction: "addfacetfilter(ContentProvider:HBO Kennisbank)",
					},
					{
						Value: "Openedition.org",
						Count: 2,
						AddAction: "addfacetfilter(ContentProvider:Openedition.org)",
					},
					{
						Value: "Informit Indigenous Collection",
						Count: 2,
						AddAction:
							"addfacetfilter(ContentProvider:Informit Indigenous Collection)",
					},
					{
						Value: "China/Asia On Demand",
						Count: 2,
						AddAction: "addfacetfilter(ContentProvider:China/Asia On Demand)",
					},
					{
						Value: "Minority Health Archive",
						Count: 1,
						AddAction:
							"addfacetfilter(ContentProvider:Minority Health Archive)",
					},
					{
						Value: "CQ Press Public Affairs Collection",
						Count: 1,
						AddAction:
							"addfacetfilter(ContentProvider:CQ Press Public Affairs Collection)",
					},
					{
						Value: "RECERCAT",
						Count: 1,
						AddAction: "addfacetfilter(ContentProvider:RECERCAT)",
					},
					{
						Value: "Bibliotheksverbund Bayern",
						Count: 1,
						AddAction:
							"addfacetfilter(ContentProvider:Bibliotheksverbund Bayern)",
					},
					{
						Value: "HyRead Journal",
						Count: 1,
						AddAction: "addfacetfilter(ContentProvider:HyRead Journal)",
					},
					{
						Value: "arXiv",
						Count: 1,
						AddAction: "addfacetfilter(ContentProvider:arXiv)",
					},
					{
						Value: "Korean Studies Information Service System (KISS)",
						Count: 1,
						AddAction:
							"addfacetfilter(ContentProvider:Korean Studies Information Service System \\(KISS\\))",
					},
					{
						Value: "Gale Virtual Reference Library",
						Count: 1,
						AddAction:
							"addfacetfilter(ContentProvider:Gale Virtual Reference Library)",
					},
				],
			},
		],
		AvailableCriteria: {
			DateRange: {
				MinDate: "1029-01",
				MaxDate: "2015-01",
			},
		},
	},
};
