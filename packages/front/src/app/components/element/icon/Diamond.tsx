import Tooltip from "@mui/material/Tooltip";
import { memo } from "react";
import { useTranslator } from "../../../shared/locales/I18N";

const Diamond = ({ className }: { className?: string }) => {
	const t = useTranslator();
	return (
		<Tooltip title={t("components.icon.diamond")} placement="top" arrow>
			<img
				className={className}
				style={{ height: "1em" }}
				src="/icons/diamond.svg"
				alt={t("components.icon.tooltip.diamond")}
			/>
		</Tooltip>
	);
};

export default memo(Diamond);
