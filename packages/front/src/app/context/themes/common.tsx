import type { ThemeOptions } from "@mui/material";

export const typography = {
	fontFamily: "Satoshi",
	h1: {
		fontFamily: "IBMPlexSans",
	},
	h2: {
		fontFamily: "IBMPlexSans",
	},
	h3: {
		fontFamily: "IBMPlexSans",
	},
	h4: {
		fontFamily: "IBMPlexSans",
	},
	h5: {
		fontFamily: "IBMPlexSans",
	},
	h6: {
		fontFamily: "IBMPlexSans",
	},
	subtitle1: {
		fontFamily: "IBMPlexSans",
		fontWeight: 600,
	},
} satisfies ThemeOptions["typography"];

export const muiPaperTheme = {
	borderRadius: 0,
} satisfies ThemeOptions["components"]["MuiPaper"]["styleOverrides"]["root"];

export const muiCardTheme = {
	borderRadius: 8,
	minHeight: "100px",
	borderWidth: "2px",
	borderStyle: "solid",
} satisfies ThemeOptions["components"]["MuiCard"]["styleOverrides"]["root"];

export const muiCardContentTheme = {
	styleOverrides: {
		root: {
			"&:last-child": {
				paddingBottom: 16,
				height: "100%",
			},
		},
	},
} satisfies ThemeOptions["components"]["MuiCardContent"]["styleOverrides"]["root"];
