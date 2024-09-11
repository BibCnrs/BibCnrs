import type { ThemeOptions } from "@mui/material";
import {
	muiCardContentTheme,
	muiCardTheme,
	muiPaperTheme,
	typography,
} from "./common";

const darkThemePalette = {
	mode: "dark",
	primary: {
		main: "#E0B0FF",
	},
	secondary: {
		main: "#FFEB6E",
	},
	background: {
		default: "#1D232B",
		paper: "#2A323C",
	},
	error: {
		main: "#F35B5B",
		light: "#F35B5B4D",
	},
	info: {
		main: "#2A323C",
		light: "#2A323C",
	},
} satisfies ThemeOptions["palette"];

export const darkTheme: ThemeOptions = {
	palette: darkThemePalette,
	typography,
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					...muiPaperTheme,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					...muiCardTheme,
					borderColor: darkThemePalette.info.main,
					":hover": {
						backgroundColor: darkThemePalette.info.light,
					},
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: muiCardContentTheme,
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					fontSize: "1em",
				},
			},
		},
	},
};
