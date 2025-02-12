import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslator } from "../../shared/locales/I18N";

export const SearchError = () => {
	const t = useTranslator();
	return (
		<Stack
			sx={{
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				gap: 2,
				textAlign: "center",
			}}
		>
			<img src="/img/error.svg" alt="error" width={300} />
			<Typography variant="h4" component="h2">
				{t("components.searchError.message")}
			</Typography>
		</Stack>
	);
};
