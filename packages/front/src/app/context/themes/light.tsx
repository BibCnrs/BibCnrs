import type { ThemeOptions } from "@mui/material";
import {
	muiCardContentTheme,
	muiCardTheme,
	muiPaperTheme,
	typography,
} from "./common";

const lightThemePalette = {
	mode: "light",
	primary: {
		main: "#6941EB",
	},
	secondary: {
		main: "#FFEB6E",
	},
	background: {
		default: "#FFFFFF",
		paper: "#FFFFFF",
	},
	text: {
		primary: "#00294B",
		secondary: "#00294B",
	},
	error: {
		main: "#F35B5B",
		light: "#F35B5B4D",
	},
	info: {
		main: "#6B7882",
		light: "#ebf0f5",
	},
} satisfies ThemeOptions["palette"];

export const lightTheme: ThemeOptions = {
	palette: lightThemePalette,
	typography,
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					...muiPaperTheme,
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					backgroundColor: lightThemePalette.background.paper,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					...muiCardTheme,
					borderColor: lightThemePalette.info.main,
					":hover": {
						backgroundColor: lightThemePalette.info.light,
					},
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: muiCardContentTheme,
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					color: lightThemePalette.primary.main,
				},
			},
		},
	},
};
