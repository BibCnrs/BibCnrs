import { memo } from "react";
import TableSkeleton from "./TableSkeleton";

const SearchSkeleton = ({ order }: { order?: boolean }) => {
	return (
		<div id="search-content" style={{ width: "100%" }}>
			<TableSkeleton order={order} />
		</div>
	);
};

export default memo(SearchSkeleton);
