import { type ReactNode, createContext, useContext, useState } from "react";
import AuthenticationModal from "./components/AuthenticationModal";
import { useSession } from "./useSession";

type BibContextType = {
	showLoginModal: () => void;
	hideLoginModal: () => void;
} & ReturnType<typeof useSession>;

const BibContext = createContext<BibContextType | null>(null);

type BibContextProviderProps = {
	children: ReactNode;
};

export function BibContextProvider({ children }: BibContextProviderProps) {
	const session = useSession();
	const [displayAuthenticationModal, setDisplayAuthenticationModal] =
		useState(false);

	const showLoginModal = () => {
		setDisplayAuthenticationModal(true);
	};

	const hideLoginModal = () => {
		setDisplayAuthenticationModal(false);
	};

	return (
		<BibContext.Provider value={{ ...session, showLoginModal, hideLoginModal }}>
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
