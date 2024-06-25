import { Stack } from "@mui/material";
import md5 from "md5";
import type { ComponentType, ReactNode } from "react";
import { useTranslator } from "../../../shared/locales/I18N";
import PaginationComponent from "./PaginationComponent";

export type SearchResultsElementProps<T> = {
	debugKey: number | string;
	first: boolean;
	last: boolean;
	index: number;
	data: T;
};

export type SearchResultsArgsProps = {
	page?: number;
	perPage?: number;
	stateIndex?: number; // use for specific action, like in history when the user uses the deleted button
};

type SearchResultsProps<T> = {
	id?: string;
	className?: string;
	DisplayElement: ComponentType<SearchResultsElementProps<T>>;
	header?: ReactNode;
	results?: T[];
	total?: number;
	args: SearchResultsArgsProps;
	disableItemGap?: boolean;
	onArgsChange: (tableArgs: SearchResultsArgsProps) => void;
};

export default function SearchResults<T>({
	results,
	DisplayElement,
	total,
	header,
	args,
	onArgsChange,
	disableItemGap = false,
}: SearchResultsProps<T>) {
	const t = useTranslator();

	// Update args parameters when we change page or results per page
	const onChange = (currentPage: number, resultsPerPage: number) => {
		onArgsChange({ ...args, perPage: resultsPerPage, page: currentPage });
	};

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const getDisplayElementKey = (result: any): number | string => {
		if (result.id) {
			return result.id as number | string;
		}
		return md5(JSON.stringify(result));
	};

	if (results === undefined || total === undefined) {
		return null;
	}

	return (
		<Stack gap={2}>
			{header}
			<Stack gap={disableItemGap ? 0 : 4}>
				{total !== 0 ? (
					results.map((result: T, index: number) => (
						<DisplayElement
							key={getDisplayElementKey(result)}
							debugKey={getDisplayElementKey(result)}
							data={result}
							index={index}
							first={index === 0}
							last={index === results.length - 1}
						/>
					))
				) : (
					<p>{t("components.table.noData")}</p>
				)}
			</Stack>

			<PaginationComponent
				currentPage={args.page}
				onChange={onChange}
				resultsPerPage={args.perPage}
				total={total}
			/>
		</Stack>
	);
}
