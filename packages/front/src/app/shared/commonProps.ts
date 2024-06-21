import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/system";

export const cardStyles: SxProps<Theme> = {
	borderRadius: 0,
	border: (theme) => `2px solid ${theme.palette.info.main}`,
	minHeight: "140px",
	":hover": {
		backgroundColor: (theme) => theme.palette.info.light,
	},
};
