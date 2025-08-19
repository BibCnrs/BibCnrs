import Button from "@mui/material/Button";
import { useBibContext } from "../../../../context/BibContext";
import { useTranslator } from "../../../../shared/locales/I18N";

/**
 * Button component used to sign-in into the application
 */
const SignInButton = () => {
	const { showLoginModal } = useBibContext();

	const t = useTranslator();

	return (
		<Button
			color="secondary"
			variant="contained"
			disableElevation
			sx={{
				borderRadius: "20px",
				fontWeight: "bold",
			}}
		>
			{t("components.header.login")}
		</Button>
	);
};

export default SignInButton;
