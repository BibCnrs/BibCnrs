import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

export const FakeSearchBar = ({ title }: { title: string }) => {
	return (
		<Box
			sx={{
				backgroundImage: "url(/img/SEARCH_BANNER.png)",
				backgroundSize: "contain",
				minHeight: "250px",
				display: "flex",
				alignItems: "flex-end",
			}}
		>
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<Typography
					variant="h4"
					component="h1"
					fontWeight="bold"
					sx={{
						color: (theme) => theme.palette.primary.contrastText,
					}}
				>
					{title}
				</Typography>
			</Container>
		</Box>
	);
};
