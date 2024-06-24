import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import { memo } from "react";

const SearchSkeleton = () => {
	return (
		<Stack gap={4}>
			{Array(10)
				.fill(0)
				.map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<Skeleton variant="rounded" height={75} key={i} />
				))}
		</Stack>
	);
};

export default memo(SearchSkeleton);
