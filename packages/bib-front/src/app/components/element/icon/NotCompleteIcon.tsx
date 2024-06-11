import { Box, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTranslator } from "../../../shared/locales/I18N";

export function NotCompleteIcon() {
	const t = useTranslator();
	return (
		<Tooltip title={t("components.icon.notComplete")} placement="top" arrow>
			<img
				style={{ width: "34px", height: "32.4px" }}
				src="/icons/not_completed.svg"
				alt="Open access icon"
			/>
		</Tooltip>
	);
}
