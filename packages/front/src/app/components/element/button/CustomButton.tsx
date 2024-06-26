import "./scss/CustomButton.scss";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import { memo } from "react";

/**
 * Custom component extending Material UI Button.
 * This component changes the default color of the button to match CNRS color chart.
 * @param className - HTML Class name
 * @param props - Material UI button props
 */
const CustomButton = ({ className, ...props }: ButtonProps) => {
	return (
		<div className="custom-button-container">
			<Button {...props} className={`custom-button ${className ?? ""}`} />
		</div>
	);
};

export default memo(CustomButton);
