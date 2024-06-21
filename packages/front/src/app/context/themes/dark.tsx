import type { ThemeOptions } from "@mui/material";
import { muiCardTheme, typography } from "./common";

const darkThemePalette = {
	mode: "dark",
	primary: {
		main: "#A6ADBB",
	},
	secondary: {
		main: "#FAD6B3",
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
		main: "##2A323C",
		light: "#2A323C",
	},
} satisfies ThemeOptions["palette"];

export const darkTheme: ThemeOptions = {
	palette: darkThemePalette,
	typography,
	components: {
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
	},
};
