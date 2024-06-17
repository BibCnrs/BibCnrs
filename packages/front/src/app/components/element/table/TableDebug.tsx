import { memo } from "react";
import type { TableDisplayElementProps } from "../../../shared/types/props.types";
import OpenablePaper from "../paper/openable/OpenablePaper";

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
}: TableDisplayElementProps<any>) => {
	onCall();

	return (
		<OpenablePaper
			Title={
				<p>
					key: {JSON.stringify(debugKey)}, last: {JSON.stringify(last)}, first:{" "}
					{JSON.stringify(first)}, index: {JSON.stringify(index)}
				</p>
			}
			SmallBody={<p>Table debug format, open to see data receive.</p>}
			FullBody={<div>{JSON.stringify(data)}</div>}
		/>
	);
};

export default memo(TableDebug);
