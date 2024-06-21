import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslator } from "../../shared/locales/I18N";

export const Empty = () => {
	const t = useTranslator();
	return (
		<Stack
			sx={{
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				gap: 2,
			}}
		>
			<img src="/img/empty.svg" alt="empty" width={300} />
			<Typography variant="h4" component="h1">
				{t("components.empty.message")}
			</Typography>
		</Stack>
	);
};
