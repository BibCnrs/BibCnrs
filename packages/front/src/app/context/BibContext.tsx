import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import type { SearchContextType, ThemeType } from "../shared/types/types";
import {
	BibContextArticleDefault,
	BibContextMetadoreDefault,
	BibContextPublicationDefault,
} from "./BibContext.const";
import AuthenticationModal from "./components/AuthenticationModal";
import { useSession } from "./useSession";

type BibContextType = {
	displayAuthenticationModal: boolean;
	theme: ThemeType;
	setTheme: (value: ThemeType) => void;
	search: SearchContextType;
	setSearch: (value: SearchContextType) => void;
	showLoginModal: () => void;
	hideLoginModal: () => void;
} & ReturnType<typeof useSession>;

const BibContext = createContext<BibContextType | null>(null);

type BibContextProviderProps = {
	children: ReactNode;
};

const setStorageTheme = (value: ThemeType) => {
	window?.localStorage?.setItem("mode", value);
};

const getStorageTheme = (): ThemeType => {
	const mode = window?.localStorage?.getItem("mode");
	if (mode == null) {
		setStorageTheme("light");
		return "light";
	}
	return mode as ThemeType;
};

export function BibContextProvider({ children }: BibContextProviderProps) {
	const session = useSession();
	const [displayAuthenticationModal, setDisplayAuthenticationModal] =
		useState(false);

	const [theme, setTheme] = useState<ThemeType>(getStorageTheme());
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

	useEffect(() => {
		const user = session.session.user;
		if (!user || search.domain != null) {
			return;
		}
		const domain = user.favorite_domain ?? user.domains?.at(0);
		if (domain == null) {
			console.error(`No domain found for this user: ${user.domains}`);
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
				theme,
				setTheme,
				search,
				setSearch,
				showLoginModal,
				hideLoginModal,
			}}
		>
			{children}

			<AuthenticationModal
				open={displayAuthenticationModal}
				onClose={hideLoginModal}
				{...session}
			/>
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
