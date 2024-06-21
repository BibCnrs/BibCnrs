import type { ThemeOptions } from "@mui/material";

export const typography = {
	fontFamily: "Satoshi",
	h1: {
		fontFamily: "IBMPlexSans",
	},
} satisfies ThemeOptions["typography"];

export const muiCardTheme = {
	borderRadius: 0,
	minHeight: "140px",
	borderWidth: "2px",
	borderStyle: "solid",
} satisfies ThemeOptions["components"]["MuiCard"]["styleOverrides"]["root"];
