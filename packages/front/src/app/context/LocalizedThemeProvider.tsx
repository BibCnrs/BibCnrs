import { CssBaseline } from "@mui/material";
import { frFR } from "@mui/material/locale";
import { enUS } from "@mui/material/locale";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme, {
	type ThemeOptions,
} from "@mui/material/styles/createTheme";
import { memo } from "react";
import { useLanguageKey } from "../shared/locales/I18N";
import type { LocalizedThemeProviderProps } from "../shared/types/props.types";
import { useBibContext } from "./BibContext";

import IBMPlexSans from "/fonts/IBMPlexSans-Regular.ttf";
import Satoshi from "/fonts/Satoshi-Regular.ttf";

export const lightTheme: ThemeOptions = {
	palette: {
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
	},
	typography: {
		fontFamily: "IBMPlexSans",
		h1: {
			fontFamily: "IBMPlexSans",
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			  @font-face {
				font-family: 'Satoshi';
				font-style: normal;
				font-display: swap;
				font-weight: 400;
				src: local('Satoshi'), local('Satoshi-Regular'), url(${Satoshi}) format('ttf');
				unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
			  }
			  @font-face {
				font-family: 'IBMPlexSans';
				font-style: normal;
				font-display: swap;
				font-weight: 400;
				src: local('IBMPlexSans'), local('IBMPlexSans-Regular'), url(${IBMPlexSans}) format('ttf');
				unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
			  }
			`,
		},
	},
};

export const darkTheme: ThemeOptions = {
	palette: {
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
	},
	typography: {
		fontFamily: "Satoshi",
		h1: {
			fontFamily: "IBMPlexSans",
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			  @font-face {
				font-family: 'Satoshi';
				font-style: normal;
				font-display: swap;
				font-weight: 400;
				src: local('Satoshi'), local('Satoshi-Regular'), url(${Satoshi}) format('ttf');
				unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
			  }
			  @font-face {
				font-family: 'IBMPlexSans';
				font-style: normal;
				font-display: swap;
				font-weight: 400;
				src: local('IBMPlexSans'), local('IBMPlexSans-Regular'), url(${IBMPlexSans}) format('ttf');
				unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
			  }
			`,
		},
	},
};

/**
 * Utils component used to set up the Material UI theme.
 * @param children - component parameters containing react children.
 */
const LocalizedThemeProvider = ({ children }: LocalizedThemeProviderProps) => {
	// Get the language key and use it to get the material ui language pack
	const language = useLanguageKey();
	const { theme } = useBibContext();

	/**
	 * Function used to return a Material UI language object
	 * @returns - Material UI language
	 *            - Default: French
	 */
	const getLocal = () => {
		if (language === "en") {
			return enUS;
		}
		return frFR;
	};

	// Create Material UI theme
	const muiTheme = createTheme(
		theme === "light" ? lightTheme : darkTheme,
		getLocal(),
	);

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default memo(LocalizedThemeProvider);
