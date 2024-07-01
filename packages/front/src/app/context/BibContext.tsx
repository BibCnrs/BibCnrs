import { CssBaseline } from "@mui/material";
import { enUS, frFR } from "@mui/material/locale";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useLanguageKey } from "../shared/locales/I18N";
import type { SearchContextType, ThemeType } from "../shared/types/types";
import {
	BibContextArticleDefault,
	BibContextMetadoreDefault,
	BibContextPublicationDefault,
} from "./BibContext.const";
import AuthenticationModal from "./components/AuthenticationModal";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";
import { useSession } from "./useSession";

type BibContextType = {
	displayAuthenticationModal: boolean;
	theme: ThemeType;
	setTheme: (value: ThemeType) => void;
	search: SearchContextType;
	setSearch: Dispatch<SetStateAction<SearchContextType>>;
	showLoginModal: () => void;
	hideLoginModal: () => void;
} & ReturnType<typeof useSession>;

const BibContext = createContext<BibContextType | null>(null);

type BibContextProviderProps = {
	children: ReactNode;
};

export function BibContextProvider({ children }: BibContextProviderProps) {
	const session = useSession();
	const language = useLanguageKey();
	const [displayAuthenticationModal, setDisplayAuthenticationModal] =
		useState(false);

	const [search, setSearch] = useState<SearchContextType>({
		query: undefined,
		domain: undefined,
		article: BibContextArticleDefault,
		publication: BibContextPublicationDefault,
		metadore: BibContextMetadoreDefault,
	});

	const showLoginModal = () => {
		setDisplayAuthenticationModal(true);
	};

	const hideLoginModal = () => {
		setDisplayAuthenticationModal(false);
	};

	/**
	 * Function used to return a Material UI language object
	 * @returns - Material UI language
	 *            - Default: French
	 */
	const getLocale = () => {
		if (language === "en") {
			return enUS;
		}
		return frFR;
	};

	// Create Material UI theme
	const muiTheme = createTheme(
		session.theme === "light" ? lightTheme : darkTheme,
		getLocale(),
	);

	useEffect(() => {
		const user = session.session.user;
		if (!user || search.domain != null) {
			return;
		}
		const domain = user.favorite_domain ?? user.domains?.at(0);
		if (domain == null) {
			console.error(`No domain found for this user: ${user.domains}`);
			return;
		}

		setSearch({
			...search,
			domain,
		});
	}, [session.session.user, search]);

	return (
		<BibContext.Provider
			value={{
				...session,
				displayAuthenticationModal,
				search,
				setSearch,
				showLoginModal,
				hideLoginModal,
			}}
		>
			<ThemeProvider theme={muiTheme}>
				<CssBaseline />
				{children}

				<AuthenticationModal
					open={displayAuthenticationModal}
					onClose={hideLoginModal}
					{...session}
				/>
			</ThemeProvider>
		</BibContext.Provider>
	);
}

export function useBibContext() {
	const context = useContext(BibContext);
	if (!context) {
		throw new Error("useBibContext must be used within a BibContextProvider");
	}

	return context;
}
