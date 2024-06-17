const MIN_PER_PAGE = 1;
const MAX_PER_PAGE = 100;

type PageQuery = {
	_perPage?: string;
	_page?: string;
};

export function parsePage(query: PageQuery) {
	const page = Math.max(Number.parseInt(query._page || "1", 10), 1);
	const perPage = Math.min(
		Math.max(Number.parseInt(query._perPage || "100", 10), MIN_PER_PAGE),
		MAX_PER_PAGE,
	);

	return {
		take: perPage,
		skip: (page - 1) * perPage,
	};
}
