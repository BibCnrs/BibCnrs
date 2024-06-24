import { memo } from "react";
import type { SearchResultsElementProps } from "../../page/search/SearchResults";
import OpenablePaper from "../paper/OpenablePaper";

let init = false;
const onCall = () => {
	if (!init) {
		init = true;
		if (import.meta.env.VITE_ENV !== "prod") {
			// eslint-disable-next-line no-console
			console.trace(
				"TableDebug have been imported, please create a element to replace it!",
			);
		}
	}
};

const TableDebug = ({
	data,
	debugKey,
	last,
	first,
	index,
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
}: SearchResultsElementProps<any>) => {
	onCall();

	return (
		<OpenablePaper
			title={
				<p>
					key: {JSON.stringify(debugKey)}, last: {JSON.stringify(last)}, first:{" "}
					{JSON.stringify(first)}, index: {JSON.stringify(index)}
				</p>
			}
			summary={<p>Table debug format, open to see data receive.</p>}
			content={<div>{JSON.stringify(data)}</div>}
		/>
	);
};

export default memo(TableDebug);
