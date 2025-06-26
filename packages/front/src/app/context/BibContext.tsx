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
	useMemo,
	useState,
} from "react";
import { useFullTranslator } from "../shared/locales/I18N";
import type { SearchContextType, ThemeType } from "../shared/types/types";
import { AdvancedSearchProvider } from "./AdvancedSearchContext";
import {
	BibContextArticleDefault,
	BibContextMetadoreDefault,
	BibContextPublicationDefault,
} from "./BibContext.const";
import AuthenticationModal from "./components/AuthenticationModal";
import { UserPopup } from "./components/UserPopup";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";
import { useSession } from "./useSession";

type BibContextType = {
	language: "fr" | "en";
	displayAuthenticationModal: boolean;
	theme: ThemeType;
	setTheme: (value: ThemeType) => void;
	search: SearchContextType;
	setSearch: Dispatch<SetStateAction<SearchContextType>>;
	showLoginModal: () => void;
	hideLoginModal: () => void;
	isMoreFacetOpen: boolean;
	setIsMoreFacetOpen: Dispatch<SetStateAction<boolean>>;
} & ReturnType<typeof useSession>;

const BibContext = createContext<BibContextType | null>(null);

type BibContextProviderProps = {
	children: ReactNode;
};

export function BibContextProvider({ children }: BibContextProviderProps) {
	const session = useSession();
	const { i18n } = useFullTranslator();
	const [displayAuthenticationModal, setDisplayAuthenticationModal] =
		useState(false);

	const [search, setSearch] = useState<SearchContextType>({
		query: undefined,
		domain: undefined,
		article: BibContextArticleDefault,
		publication: BibContextPublicationDefault,
		metadore: BibContextMetadoreDefault,
	});

	const [isMoreFacetOpen, setIsMoreFacetOpen] = useState(false);

	const showLoginModal = () => {
		setDisplayAuthenticationModal(true);
	};

	const hideLoginModal = () => {
		setDisplayAuthenticationModal(false);
	};

	const language = useMemo(() => {
		if (
			session.session.user?.origin === "janus" &&
			session.session.user.settings.defaultLanguage !== "auto"
		) {
			return session.session.user.settings.defaultLanguage;
		}
		return i18n.language.startsWith("fr") ? "fr" : "en";
	}, [session, i18n]);

	const locale = useMemo(() => {
		if (language === "en") {
			return enUS;
		}
		return frFR;
	}, [language]);

	// Create Material UI theme
	const muiTheme = useMemo(
		() =>
			createTheme(session.theme === "light" ? lightTheme : darkTheme, locale),
		[session.theme, locale],
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
				language,
				displayAuthenticationModal,
				search,
				setSearch,
				showLoginModal,
				hideLoginModal,
				isMoreFacetOpen,
				setIsMoreFacetOpen,
			}}
		>
			<ThemeProvider theme={muiTheme}>
				<CssBaseline />
				<AdvancedSearchProvider>{children}</AdvancedSearchProvider>
				<UserPopup
					open={session.displayUserPopup}
					onClose={session.closeUserPopup}
				/>
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
