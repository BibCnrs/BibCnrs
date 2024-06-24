import { CssBaseline } from "@mui/material";
import { frFR } from "@mui/material/locale";
import { enUS } from "@mui/material/locale";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { useLanguageKey } from "../shared/locales/I18N";
import type { LocalizedThemeProviderProps } from "../shared/types/props.types";
import { useBibContext } from "./BibContext";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";

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

export default LocalizedThemeProvider;
