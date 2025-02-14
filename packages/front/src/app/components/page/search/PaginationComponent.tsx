import { Box, Button, type ButtonProps, Divider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import type { PaginationComponentProps } from "../../../shared/types/props.types";

const buttonStyle = {
	color: (theme) => theme.palette.text.primary,
	margin: 0,
	paddingBlock: 0.5,
	paddingInline: 1,
	minWidth: 0,
	boxShadow: "initial",
	"&.MuiButton-contained": {
		backgroundColor: (theme) => theme.palette.info.light,
	},
	"&:hover": {
		boxShadow: "initial",
	},
} satisfies ButtonProps["sx"];

const height = "32px";

export default function PaginationComponent({
	total,
	resultsPerPage,
	currentPage,
	onChange,
}: PaginationComponentProps) {
	// Set the default values if the current page and the number of results per page is not initialized
	const page = currentPage ? currentPage : 1;
	const perPage = resultsPerPage ? resultsPerPage : 20;

	if (!total) {
		return null;
	}

	return (
		<Box
			sx={{
				position: "relative",
				width: "100%",
				height,
			}}
		>
			<Box
				sx={{
					position: "relative",
					display: "flex",
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
					height,
				}}
			>
				<Pagination
					onChange={(event, newPage) => {
						onChange(newPage, perPage);
					}}
					color="primary"
					className="page-selector"
					count={Math.ceil(total / perPage)}
					page={page}
					tabIndex={0}
				/>
			</Box>

			<Box
				sx={{
					position: "absolute",
					display: "flex",
					alignItems: "center",
					top: 0,
					right: 0,
					height,
					gap: 0.5,
				}}
			>
				<Button
					onClick={() => onChange(page, 20)}
					sx={buttonStyle}
					variant={perPage === 20 ? "contained" : "text"}
				>
					20
				</Button>

				<Divider orientation="vertical" flexItem />

				<Button
					onClick={() => onChange(page, 100)}
					sx={buttonStyle}
					variant={perPage === 100 ? "contained" : "text"}
				>
					100
				</Button>
			</Box>
		</Box>
	);
}
