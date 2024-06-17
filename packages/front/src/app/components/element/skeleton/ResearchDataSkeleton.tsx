import { memo } from "react";
import TableSkeleton from "./TableSkeleton";

const ResearchDataSkeleton = () => {
	return (
		<div>
			<TableSkeleton />
		</div>
	);
};

export default memo(ResearchDataSkeleton);
