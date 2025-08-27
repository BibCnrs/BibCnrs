import Tooltip from "@mui/material/Tooltip";
import { memo } from "react";
import { useTranslator } from "../../../shared/locales/I18N";

const S2O = () => {
	const t = useTranslator();
	return (
		<Tooltip title={t("components.icon.s2o")} placement="top" arrow>
			<img
				style={{ height: "1.7em", verticalAlign: "-0.5em" }}
				src="/icons/S2O.svg"
				alt={t("components.icon.tooltip.s2o")}
			/>
		</Tooltip>
	);
};

export default memo(S2O);
