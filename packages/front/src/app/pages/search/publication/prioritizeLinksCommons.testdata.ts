import type { Link } from "./prioritizeLinksCommons";

// Sample data for testing
export const linkPresentWithEmbargo_one: Link = {
	url: "http://example.com/1",
	name: "Link 1",
	isCurrent: true,
	embargo: {
		value: 6,
		unit: "Month",
	},
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "9999",
			},
		},
	],
};

export const linkPresentWithEmbargo_two: Link = {
	url: "http://example.com/2",
	name: "Link 2",
	isCurrent: true,
	embargo: {
		value: 6,
		unit: "Month",
	},
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "9999",
			},
		},
	],
};

export const linkPresentWithEmbargo_doaj: Link = {
	url: "https://doaj.org/2",
	name: "Link 2",
	isCurrent: true,
	embargo: {
		value: 6,
		unit: "Month",
	},
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "9999",
			},
		},
	],
};

export const linkPast: Link = {
	url: "http://example.com/3",
	name: "Link 3",
	isCurrent: true,
	embargo: null,
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "2021",
			},
		},
	],
};

export const linkPastWithEmbargo: Link = {
	url: "http://example.com/4",
	name: "Link 4",
	isCurrent: true,
	embargo: {
		value: 1,
		unit: "Year",
	},
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "2025",
			},
		},
	],
};

export const linkPresent: Link = {
	url: "http://example.com/4",
	name: "Link 4",
	isCurrent: true,
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2023",
			},
			end: {
				month: "12",
				day: "31",
				year: "9999",
			},
		},
	],
};

export const linkA: Link = {
	url: "http://example.com/A",
	name: "Link A",
	isCurrent: true,
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "2022",
			},
		},
	],
};

export const linkB: Link = {
	url: "http://example.com/B",
	name: "Link B",
	isCurrent: true,
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "2022",
			},
		},
	],
};

export const linkC: Link = {
	url: "http://example.com/C",
	name: "Link C",
	isCurrent: true,
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2021",
			},
			end: {
				month: "12",
				day: "31",
				year: "2023",
			},
		},
	],
};
