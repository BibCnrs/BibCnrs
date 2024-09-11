import Tooltip from "@mui/material/Tooltip";
import { memo } from "react";
import { useTranslator } from "../../../shared/locales/I18N";

const Diamond = () => {
	const t = useTranslator();
	return (
		<Tooltip title={t("components.icon.diamond")} placement="top" arrow>
			<img
				style={{ height: "1em" }}
				src="/icons/diamond.svg"
				alt={t("components.icon.tooltip.diamond")}
			/>
		</Tooltip>
	);
};

export default memo(Diamond);
