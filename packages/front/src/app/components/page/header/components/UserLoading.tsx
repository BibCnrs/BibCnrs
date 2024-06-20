import { Skeleton } from "@mui/material";

export function UserLoading() {
	return (
		<Skeleton
			sx={{
				height: 24,
				width: 96,
				bgcolor: "white",
			}}
		/>
	);
}
