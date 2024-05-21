import "./AlertPaper.scss";
import { memo } from "react";
import type { AlertPaperProps } from "../../../../shared/types/props.types";
import ColoredPaper from "../colored/ColoredPaper";

/**
 * Paper component used to display alert
 * @param children - Alert content
 */
const AlertPaper = ({ children }: AlertPaperProps) => {
	return (
		<ColoredPaper id="alert" color="#f00" border>
			{children}
		</ColoredPaper>
	);
};

export default memo(AlertPaper);
