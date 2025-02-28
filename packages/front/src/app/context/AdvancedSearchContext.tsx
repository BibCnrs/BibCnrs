import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { uuidv7 } from "../shared/uuidv7";

export const OPERATORS = {
	AND: "and",
	OR: "or",
	NOT: "not",
} as const;

export const FIELDS = {
	AU: "author",
	DO: "doi",
	IB: "isbn",
	ZI: "issn",
	SU: "keywords",
	AB: "abstract",
	TI: "title",
	SO: "source",
	AD: "affiliation",
	DT: "publication_date",
} as const;

export type Operator = keyof typeof OPERATORS;
export type Field = keyof typeof FIELDS;

export type AdvancedSearchItem = {
	id: string;
	operator: Operator | null;
	field: Field;
	value: string;
};

export type AdvancedSearchGroup = {
	id: string;
	operator: Operator | null;
	items: AdvancedSearchItem[];
};

const ITEM_DEFAULT: Pick<AdvancedSearchItem, "operator" | "field" | "value"> = {
	operator: null,
	field: "AU",
	value: "",
};

function useAdvancedSearch() {
	const [groups, setGroups] = useState<AdvancedSearchGroup[]>([
		{
			id: uuidv7(),
			operator: null,
			items: [
				{
					...ITEM_DEFAULT,
					id: uuidv7(),
				},
			],
		},
	]);

	const humanReadableSearch = useMemo(
		() =>
			groups.map((group) => {
				const searchLines: AdvancedSearchItem[][] = [[group.items[0]]];

				for (let i = 1; i < group.items.length; i++) {
					const item = group.items[i];
					if (item.operator === "OR") {
						searchLines.push([]);
					}
					searchLines.at(-1).push(group.items[i]);
				}

				return {
					id: group.id,
					operator: group.operator,
					searchLines,
				};
			}),
		[groups],
	);

	const advancedSearchQuery = useMemo(() => {
		return groups
			.map((group) => {
				const items = group.items
					.map((item) => ({
						...item,
						value: item.value.trim(),
					}))
					.filter((item) => item.value !== "");

				if (!items.length) {
					return null;
				}

				const transformedItems = items.map(({ operator, field, value }) => {
					if (field === "AU") {
						value = addN0Operator(value);
					}

					return `${operator ?? ""} (${field} ${value.trim()})`.trim();
				});

				return `${group.operator ?? ""} (${transformedItems.join(" ")})`.trim();
			})
			.filter((query) => query)
			.join(" ")
			.trim();
	}, [groups]);

	const updateGroup = useCallback(
		(group: Pick<AdvancedSearchGroup, "id" | "operator">) => {
			setGroups((groups) =>
				groups.map((g) => {
					if (g.id !== group.id) {
						return g;
					}
					return {
						...g,
						operator: group.operator,
					};
				}),
			);
		},
		[],
	);
	const addGroup = useCallback((after: Pick<AdvancedSearchGroup, "id">) => {
		setGroups((groups) => {
			const index = groups.findIndex((i) => i.id === after.id);
			if (index === -1) {
				return groups;
			}

			const sliceIndex = index + 1;
			return [
				...groups.slice(0, sliceIndex),
				{
					id: uuidv7(),
					operator: "AND",
					items: [
						{
							...ITEM_DEFAULT,
							id: uuidv7(),
						},
					],
				},
				...groups.slice(sliceIndex),
			];
		});
	}, []);

	const removeGroup = useCallback((group: Pick<AdvancedSearchGroup, "id">) => {
		setGroups((groups) =>
			groups
				.filter((g) => g.id !== group.id)
				.map((group, index) => {
					if (index !== 0) {
						return group;
					}
					return {
						...group,
						operator: null,
					};
				}),
		);
	}, []);

	const updateItem = useCallback(
		(
			{ id: gid }: Pick<AdvancedSearchGroup, "id">,
			value: AdvancedSearchItem,
		) => {
			setGroups((groups) =>
				groups.map((group) => {
					if (group.id !== gid) {
						return group;
					}

					return {
						...group,
						items: group.items.map((item) =>
							item.id === value.id ? value : item,
						),
					};
				}),
			);
		},
		[],
	);

	const addItem = useCallback(
		(
			{ id: gid }: Pick<AdvancedSearchGroup, "id">,
			after: Pick<AdvancedSearchItem, "id">,
		) => {
			setGroups((groups) =>
				groups.map((group) => {
					if (group.id !== gid) {
						return group;
					}

					const index = group.items.findIndex((i) => i.id === after.id);
					if (index === -1) {
						return group;
					}

					const sliceIndex = index + 1;
					return {
						...group,
						items: [
							...group.items.slice(0, sliceIndex),
							{
								...ITEM_DEFAULT,
								operator: "AND",
								id: uuidv7(),
							},
							...group.items.slice(sliceIndex),
						],
					};
				}),
			);
		},
		[],
	);

	const removeItem = useCallback(
		(
			{ id: gid }: Pick<AdvancedSearchGroup, "id">,
			item: Pick<AdvancedSearchItem, "id">,
		) => {
			setGroups((groups) =>
				groups.map((group) => {
					if (group.id !== gid) {
						return group;
					}

					return {
						...group,
						items: group.items
							.filter((i) => i.id !== item.id)
							.map((item, index) => {
								if (index !== 0) {
									return item;
								}
								return {
									...item,
									operator: null,
								};
							}),
					};
				}),
			);
		},
		[],
	);

	const reset = useCallback(() => {
		setGroups([
			{
				id: uuidv7(),
				operator: null,
				items: [
					{
						...ITEM_DEFAULT,
						id: uuidv7(),
					},
				],
			},
		]);
	}, []);

	return {
		groups,
		humanReadableSearch,
		advancedSearchQuery,
		updateGroup,
		addGroup,
		removeGroup,
		updateItem,
		addItem,
		removeItem,
		reset,
	};
}

export type AdvancedSearchContextType = ReturnType<typeof useAdvancedSearch>;

const AdvancedSearchContext = createContext<
	AdvancedSearchContextType | undefined
>(undefined);

export function AdvancedSearchProvider({ children }: { children: ReactNode }) {
	const value = useAdvancedSearch();
	return (
		<AdvancedSearchContext.Provider value={value}>
			{children}
		</AdvancedSearchContext.Provider>
	);
}

export function useAdvancedSearchContext() {
	const context = useContext(AdvancedSearchContext);
	if (!context) {
		throw new Error(
			"useAdvancedSearchContext must be used within a AdvancedSearchProvider",
		);
	}
	return context;
}
function addN0Operator(value: string): string {
	if (!value) {
		return value;
	}
	const words = value.split(/\s+/);
	return words.join(" N0 ");
}
