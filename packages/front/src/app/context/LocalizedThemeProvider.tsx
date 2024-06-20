import { CssBaseline } from "@mui/material";
import { frFR } from "@mui/material/locale";
import { enUS } from "@mui/material/locale";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createPalette from "@mui/material/styles/createPalette";
import createTheme, {
	type ThemeOptions,
} from "@mui/material/styles/createTheme";
import type { Property } from "csstype";
import { memo } from "react";
import { useLanguageKey } from "../shared/locales/I18N";
import type { LocalizedThemeProviderProps } from "../shared/types/props.types";
import type {
	Institute,
	InstituteLowerCase,
	ThemeType,
} from "../shared/types/types";
import { useBibContext } from "./BibContext";

/**
 * Application colors
 */
export const colors = {
	white: "#fff",
	grey: "#c0c0d0",
	text: {
		dark: "#cfcfe0",
		light: "#000000DE",
	},
	background: {
		dark: "#151723",
		light: "#eee",
	},
	button: {
		dark: "#0050a0",
		light: "#0050a0",
		hover: {
			dark: "#0f3556",
			light: "#00284b",
		},
		navActive: {
			dark: "#0f3556",
			light: "#fff",
		},
	},
	table: {
		light: "#c0c0d0",
		dark: "#151723",
	},
	cnrs: {
		primary: {
			dark: "#00284b",
			light: "#64c3dc",
		},
		secondary: {
			lightBlue: "#c8e6e6",
			blue: "#2d7dc3",
			darkBlue: "#0050a0",
			cyan: "#2d9bb4",
		},
		institute: {
			insb: "#eb004e",
			inc: "#007faa",
			inee: "#008000",
			inshs: "#b2003c",
			insis: "#f00000",
			insmi: "#007a7c",
			inp: "#0045e5",
			ins2i: "#a800e5",
			in2p3: "#db3a00",
			insu: "#e0009d",
		},
	},
	other: {
		legacy: "#f3ff33",
	},
};

/**
 * Function used to get color associated to an Institute
 * @param institute - The name of the institute
 * @returns - The color of the institute
 */
export const getInstituteColor = (institute: Institute): Property.Color => {
	return colors.cnrs.institute[institute.toLowerCase() as InstituteLowerCase];
};

export const getHeaderBackgroundColor = (theme: ThemeType): Property.Color => {
	return theme === "light"
		? colors.cnrs.secondary.darkBlue
		: colors.cnrs.primary.dark;
};

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
		fontFamily: "Lora",
		h1: {
			fontFamily: "Oswald",
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
		fontFamily: "Lora",
		h1: {
			fontFamily: "Oswald",
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

	// Material UI dark theme color palette
	const darkPalette = createPalette({
		mode: "dark",
		primary: {
			main: colors.cnrs.secondary.blue,
		},
		background: {
			default: colors.background.dark,
			paper: colors.background.dark,
		},
	});

	console.log("theme", theme);

	// Create Material UI theme
	const muiTheme = createTheme(
		theme === "light" ? lightTheme : darkTheme,
		getLocal(),
	);

	console.log();

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default memo(LocalizedThemeProvider);
