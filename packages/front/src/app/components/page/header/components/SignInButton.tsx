import Button from "@mui/material/Button";
import { useBibContext } from "../../../../context/BibContext";
import { useTranslator } from "../../../../shared/locales/I18N";
import { headerButtonStyle } from "../Header";

/**
 * Button component used to sign-in into the application
 */
const SignInButton = () => {
	const { showLoginModal } = useBibContext();

	const t = useTranslator();

	return (
		<div className="header-nav">
			<Button
				className="header-button"
				sx={headerButtonStyle}
				onClick={showLoginModal}
			>
				{t("components.header.login")}
			</Button>
		</div>
	);
};

export default SignInButton;
