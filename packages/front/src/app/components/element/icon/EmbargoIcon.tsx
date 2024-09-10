import { Tooltip } from "@mui/material";
import { useTranslator } from "../../../shared/locales/I18N";

export function EmbargoIcon() {
	const t = useTranslator();
	return (
		<Tooltip
			title={t("components.icon.withEmbargo")}
			placement="top"
			arrow
			aria-label={t("components.icon.withEmbargo")}
		>
			<img
				style={{ height: "22.4px" }}
				src="/icons/horloge.svg"
				alt={t("components.icon.tooltip.withEmbargo")}
			/>
		</Tooltip>
	);
}
