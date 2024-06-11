import { MenuItem, Pagination, Select } from "@mui/material";
import { Stack } from "@mui/system";

export function DatabasePagination({
	pageCount,
	currentPage,
	setCurrentPage,
	databasePerPage,
	setDatabasePerPage,
}: {
	pageCount: number;
	currentPage: number;
	setCurrentPage: (value: number) => void;
	databasePerPage: number;
	setDatabasePerPage: (value: number) => void;
}) {
	return (
		<Stack
			spacing={2}
			gap={2}
			alignItems="flex-end"
			justifyContent="flex-end"
			flexDirection="row"
		>
			<Select
				value={databasePerPage}
				onChange={(event) => setDatabasePerPage(event.target.value as number)}
				size="small"
				label="Database per page"
				variant="standard"
			>
				<MenuItem value={10}>10</MenuItem>
				<MenuItem value={25}>25</MenuItem>
				<MenuItem value={50}>50</MenuItem>
			</Select>
			<Pagination
				count={pageCount}
				color="primary"
				page={currentPage}
				onChange={(_, value) => setCurrentPage(value)}
				size="small"
			/>
		</Stack>
	);
}
