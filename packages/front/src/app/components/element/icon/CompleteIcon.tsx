import { Tooltip } from "@mui/material";
import { useTranslator } from "../../../shared/locales/I18N";

export function CompleteIcon() {
	const t = useTranslator();
	return (
		<Tooltip
			title={t("components.icon.complete")}
			placement="top"
			arrow
			aria-label={t("components.icon.complete")}
		>
			<img
				style={{ height: "1em" }}
				src="/icons/completed.svg"
				alt={t("components.icon.tooltip.complete")}
			/>
		</Tooltip>
	);
}
