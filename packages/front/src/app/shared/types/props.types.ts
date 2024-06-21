import type { UniqueIdentifier } from "@dnd-kit/core";
import type { Property } from "csstype";
import type {
	ElementType,
	MouseEvent,
	MouseEventHandler,
	PropsWithChildren,
	PropsWithoutRef,
	ReactElement,
	ReactNode,
} from "react";
import type {
	CMSResultDataType,
	HistoryEntryDataType,
	TestsNewsDataType,
} from "./data.types";
import type { FacetEntry, FavouriteResourceWithId, TFunction } from "./types";

type HaveReactChildren = PropsWithChildren;

export type SearchBarProps = PropsWithoutRef<{
	placeholder: string;
	value?: string | null;
	onSearch: (value: string | undefined) => void;
	children?: ReactNode;
}>;

export type PageTitleProps = PropsWithoutRef<{
	customTitle?: boolean;
	page?: string;
}>;

export type TableDisplayElementProps<T> = PropsWithoutRef<{
	debugKey: number | string;
	first: boolean;
	last: boolean;
	index: number;
	data: T;
}>;

export type TableArgsProps = PropsWithoutRef<{
	page?: number;
	perPage?: number;
	stateIndex?: number; // use for specific action, like in history when the user uses the deleted button
}>;

export type TableProps = PropsWithoutRef<{
	id?: string;
	className?: string;
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	DisplayElement: ElementType<TableDisplayElementProps<any>>;
	header?: ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	results?: any[];
	total?: number;
	args: TableArgsProps;
	onArgsChange: (tableArgs: TableArgsProps) => void;
}>;

export type LocalizedThemeProviderProps = HaveReactChildren;

export type ExceptedErrorProps = HaveReactChildren;

export type ContextProviderProps = HaveReactChildren;

export type AuthenticationProviderProps = HaveReactChildren;

export type PaginationComponentProps = PropsWithoutRef<{
	extend?: ReactNode;
	total: number;
	resultsPerPage?: number;
	currentPage?: number;
	onChange: (currentPage: number, resultParPage: number) => void;
}>;

export type RenderContentProps = PropsWithoutRef<{
	data: CMSResultDataType | undefined;
	updateDocumentTitle?: boolean;
	displayTitle?: boolean;
	page: string;
	showDate?: boolean;
	t: TFunction;
	Container?: ElementType;
}>;

export type PageDateProps = PropsWithoutRef<{
	date: string;
	updateAtLabel?: boolean;
}>;

export type OpenablePaperProps = PropsWithoutRef<{
	Title: ReactElement | string | null;
	SmallBody: ReactElement | null;
	FullBody: ReactElement | null;
	small?: boolean;
	color?: Property.Color;
	border?: boolean;
	defaultOpenState?: boolean;
	onChange?: (isOpen: boolean) => void;
	onOpen?: (isOpen: boolean) => void;
}>;

export type AnimatedPaperProps = PropsWithChildren<{
	className?: string;
	onClick?: () => void;
	color?: Property.Color;
	border?: boolean;
}>;

export type AlertPaperProps = HaveReactChildren;

export type AuthenticationProps = PropsWithoutRef<{
	open: boolean;
	onClose?: () => void;
}>;

export type ProtectedRouteProps = HaveReactChildren;

export type ColoredPaperProps = PropsWithChildren<{
	id?: string;
	className?: string;
	color?: Property.Color | undefined;
	border?: boolean;
	onClick?: () => void;
	onMouseOver?: MouseEventHandler<HTMLDivElement>;
	onMouseOut?: MouseEventHandler<HTMLDivElement>;
	elevation?: number;
}>;

export type TestsNewsProps = PropsWithoutRef<{
	data: TestsNewsDataType | undefined;
}>;

export type FacetRequired = {
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	limiters?: any;
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	facets?: any;
};

export type FacetProps<T extends FacetRequired> = PropsWithoutRef<{
	available: Omit<FacetRequired & T, "orderBy">;
	active: Omit<FacetRequired & T, "orderBy">;
	onChange: (values: Omit<FacetRequired & T, "orderBy">) => void;
	onReset: () => void;
}>;

export type FacetLimiterProps<T extends FacetRequired> = PropsWithoutRef<{
	available: FacetProps<T>["available"]["limiters"];
	active?: FacetProps<T>["active"]["limiters"];
	onChange: (value: FacetProps<T>["active"]["limiters"]) => void;
	HALFacet?: FacetEntry;
	HALIsChecked?: boolean;
	onHALFacetChange: ({ provider }: { provider: FacetEntry[] }) => void;
}>;

export type FacetFacetsProps<T extends FacetRequired> = PropsWithoutRef<{
	available: FacetProps<T>["available"]["facets"];
	active?: FacetProps<T>["active"]["facets"];
	onChange: (value: FacetProps<T>["active"]["facets"]) => void;
}>;

export type FacetFieldProps<T> = {
	initial?: T;
	onChange: (value: T) => void;
};

export type FacetTextTypeProps = PropsWithoutRef<
	FacetFieldProps<string[]> & {
		texts: string[];
	}
>;

export type FacetDateRangeProps = PropsWithoutRef<
	FacetFieldProps<number[]> & {
		min: number;
		max: number;
		minDistance?: number;
	}
>;

export type FacetSearchListProps = PropsWithoutRef<
	FacetFieldProps<FacetEntry[]> & {
		name: string;
		facets: FacetEntry[];
	}
>;

export type ChipFacetProps = PropsWithoutRef<{
	value?: string | null;
	values: Array<
		| string
		| {
				value: string;
				label: string;
		  }
	>;
	isDomain?: boolean;
	onChange: (event: MouseEvent<HTMLElement>, field: string | null) => void;
}>;

export type BookmarkButtonProps = PropsWithoutRef<{
	title: string;
	url: string;
	className?: string;
}>;

export type SortableFavouriteProps = PropsWithoutRef<{
	id: UniqueIdentifier;
	onDelete: (entry: FavouriteResourceWithId) => void;
}>;

export type DialogProps = PropsWithoutRef<{
	open: boolean;
	onClose: () => void;
}>;

export type AlertModificationProps = PropsWithoutRef<
	DialogProps & {
		data: HistoryEntryDataType;
	}
>;
