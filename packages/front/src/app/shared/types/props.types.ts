import type { Property } from "csstype";
import type {
	ElementType,
	MouseEvent,
	MouseEventHandler,
	PropsWithChildren,
	PropsWithoutRef,
	ReactNode,
} from "react";
import type {
	CMSResultDataType,
	HistoryEntryDataType,
	TestsNewsDataType,
} from "./data.types";
import type { TFunction } from "./types";

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

export type FacetFieldProps<T> = {
	initial?: T;
	onChange: (value: T) => void;
};

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

export type DialogProps = PropsWithoutRef<{
	open: boolean;
	onClose: () => void;
}>;

export type AlertModificationProps = PropsWithoutRef<
	DialogProps & {
		data: HistoryEntryDataType;
	}
>;
