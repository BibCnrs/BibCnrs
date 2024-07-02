import { Card, CardContent } from "@mui/material";
import { memo } from "react";
import type { AlertPaperProps } from "../../../../shared/types/props.types";

/**
 * Paper component used to display alert
 * @param children - Alert content
 */
const AlertPaper = ({ children }: AlertPaperProps) => {
	return (
		<Card
			elevation={3}
			id="alert"
			sx={{
				borderColor: (theme) => theme.palette.error.main,
				backgroundColor: (theme) => theme.palette.error.light,
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100%",
				textAlign: "center",
			}}
		>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default memo(AlertPaper);
