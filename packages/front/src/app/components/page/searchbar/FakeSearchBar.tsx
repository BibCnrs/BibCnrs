import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";
import { useTranslator } from "../../../shared/locales/I18N";

export const FakeSearchBar = ({ title }: { title: string }) => {
	const t = useTranslator();
	return (
		<Box
			sx={{
				backgroundImage: "url(/img/SEARCH_BANNER.png)",
				backgroundSize: "contain",
				minHeight: "250px",
				display: "flex",
			}}
		>
			<Container
				maxWidth="xl"
				sx={{
					mt: 4,
					mb: 4,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<Typography
					variant="h6"
					component={Link}
					to="/"
					sx={{
						color: (theme) => theme.palette.primary.contrastText,
						textDecoration: "none",
					}}
				>
					{t("components.fakeSearchBar.homepage")}
				</Typography>
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
