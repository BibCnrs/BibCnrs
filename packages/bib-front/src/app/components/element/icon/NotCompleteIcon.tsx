import { Box, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTranslator } from "../../../shared/locales/I18N";

export function NotCompleteIcon() {
	const t = useTranslator();
	return (
		<Tooltip title={t("components.icon.notComplete")} placement="top" arrow>
			<Box
				sx={{
					height: "32px",
					width: "64px",
					textDecoration: "line-through",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: grey[700],
					fontWeight: 700,
				}}
			>
				100%
			</Box>
		</Tooltip>
	);
}
