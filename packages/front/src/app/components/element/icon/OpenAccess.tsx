import Tooltip from "@mui/material/Tooltip";
import { memo } from "react";
import { useTranslator } from "../../../shared/locales/I18N";

const OpenAccess = () => {
	const t = useTranslator();
	return (
		<Tooltip title={t("components.icon.openAccess")} placement="top" arrow>
			<img
				style={{ height: "1em" }}
				src="/icons/open_access.svg"
				alt={t("components.icon.tooltip.openAccess")}
			/>
		</Tooltip>
	);
};

export default memo(OpenAccess);
