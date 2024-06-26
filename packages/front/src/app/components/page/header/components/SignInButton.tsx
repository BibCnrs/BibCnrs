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
			onClick={showLoginModal}
			color="secondary"
			variant="contained"
			disableElevation
			sx={{
				borderRadius: "20px",
				fontWeight: "bold",
				":hover": {
					backgroundColor: (theme) => theme.palette.background.default,
					color: (theme) => theme.palette.text.primary,
					boxShadow: (theme) =>
						`inset 0 0 0 2px ${theme.palette.secondary.main}`,
				},
			}}
		>
			{t("components.header.login")}
		</Button>
	);
};

export default SignInButton;
