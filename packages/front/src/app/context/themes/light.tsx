import type { ThemeOptions } from "@mui/material";
import { muiCardTheme, typography } from "./common";

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
	},
};
