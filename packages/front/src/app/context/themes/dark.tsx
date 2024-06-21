import type { ThemeOptions } from "@mui/material";
import { muiCardTheme, typography } from "./common";

const darkThemePalette = {
	mode: "dark",
	primary: {
		main: "#A6ADBB",
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
	},
	info: {
		main: "#6B7882",
		light: "#ebf0f5",
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
