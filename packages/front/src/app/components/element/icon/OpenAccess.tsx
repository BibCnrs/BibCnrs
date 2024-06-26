import Tooltip from "@mui/material/Tooltip";
import { memo } from "react";
import { useTranslator } from "../../../shared/locales/I18N";

const OpenAccess = ({ className }: { className?: string }) => {
	const t = useTranslator();
	return (
		<Tooltip title={t("components.icon.openAccess")} placement="top" arrow>
			<img
				className={className}
				style={{ width: "14px", height: "22.4px" }}
				src="/icons/open_access.svg"
				alt="Open access icon"
			/>
		</Tooltip>
	);
};

export default memo(OpenAccess);
