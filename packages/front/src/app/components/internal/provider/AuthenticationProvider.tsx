import { memo, useContext } from "react";
import type { AuthenticationProviderProps } from "../../../shared/types/props.types";
import Authentication from "../../element/authentication/Authentication";
import { BibContext } from "./ContextProvider";

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
	const { login, askLogin, setAskLogin } = useContext(BibContext);
	const isOpen = !login && askLogin;
	return (
		<>
			<Authentication
				open={isOpen}
				onClose={() => {
					setAskLogin(false);
				}}
			/>
			{children}
		</>
	);
};

export default memo(AuthenticationProvider);
