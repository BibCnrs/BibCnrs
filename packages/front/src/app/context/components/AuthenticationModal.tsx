import CloseIcon from "@mui/icons-material/Close";
import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import type { FormEvent } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import { useTranslator } from "../../shared/locales/I18N";
import type { useSession } from "../useSession";
import PasswordField from "./PasswordField";

type AuthenticationModalProps = {
	open: boolean;
	onClose?: () => void;

	loginToJanus: ReturnType<typeof useSession>["loginToJanus"];
	loginToLegacy: ReturnType<typeof useSession>["loginToLegacy"];
};

/**
 * Authentication components used
 * to display the authentication box when clicking on login or when use access an unauthorized route
 * @param open    - Boolean used to display the modal
 * @param onClose - Component close callback
 */
function AuthenticationModal({
	open,
	onClose,
	loginToJanus,
	loginToLegacy,
}: AuthenticationModalProps) {
	const t = useTranslator();

	// State use to handle the legacy login form
	const [legacy, setLegacy] = useState(false);
	const [legacyError, setLegacyError] = useState(false);

	/**
	 * Function used to handle close
	 */
	const handleClose = () => {
		setLegacy(false);
		setLegacyError(false);
		onClose?.();
	};

	/**
	 * Function used to display the legacy login form
	 */
	const displayLegacy = () => {
		setLegacy(!legacy);
		setLegacyError(false);
	};

	/**
	 * Function used to handle the legacy login form action
	 * @param event - Form event containing the username and password
	 */
	const handleLegacy = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);

		setLegacyError(false);
		void loginToLegacy({
			username: form.get("username") as string,
			password: form.get("password") as string,
		}).then((login) => {
			if (login) {
				onClose?.();
				return;
			}
			setLegacyError(true);
		});
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="authentication-header"
			aria-describedby="authentication-body"
			closeAfterTransition
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: 0,
			}}
		>
			{/* Add a sliding animation from the top */}
			<Slide direction="down" in={open} timeout={400}>
				<Card
					elevation={3}
					sx={{
						border: 0,
						borderRadius: 2,
						width: "95%",
						maxWidth: 400,
						boxSizing: "border-box",
						padding: 2,
						":hover": {
							backgroundColor: "background.default",
						},
					}}
				>
					<CardHeader
						id="authentication-header"
						title={t("components.authentication.title")}
						titleTypographyProps={{
							fontSize: 22,
							fontWeight: "bold",
						}}
						action={
							<Button
								onClick={handleClose}
								size="small"
								sx={{ minWidth: 0, padding: 0, color: "grey.600" }}
								aria-label="close"
							>
								<CloseIcon />
							</Button>
						}
					/>
					<CardContent id="authentication-body">
						<Stack gap={2}>
							<Stack gap={1} sx={{ alignItems: "flex-end" }}>
								<Button
									className="authentication-button"
									onClick={loginToJanus}
									fullWidth
									disableElevation
									variant="contained"
									sx={{
										textTransform: "none",
										fontSize: "1rem",
										height: 50,
									}}
								>
									{t("components.authentication.janus.button")}
								</Button>
								<Link
									href="https://sesame.cnrs.fr"
									target="blank"
									rel="noopener noreferrer nofollow"
									sx={{
										fontSize: "0.8rem",
										fontStyle: "italic",
										textDecoration: "none",
									}}
								>
									{t("components.authentication.janus.ask")}
								</Link>
							</Stack>

							<Divider>
								<Typography
									color="disabled"
									sx={{
										color: "text.disabled",
									}}
								>
									ou
								</Typography>
							</Divider>

							<Stack gap={1}>
								<Button
									onClick={displayLegacy}
									variant="outlined"
									color="primary"
									sx={{
										textTransform: "none",
									}}
								>
									{t("components.authentication.legacy.button")}
								</Button>

								<TransitionGroup>
									{legacy ? (
										<Collapse>
											<form id="authentication-legacy" onSubmit={handleLegacy}>
												<Stack gap={1}>
													<TextField
														name="username"
														error={legacyError}
														label={t(
															"components.authentication.legacy.username",
														)}
														size="small"
													/>
													<PasswordField
														name="password"
														label={t(
															"components.authentication.legacy.password",
														)}
														size="small"
														helperText={
															legacyError
																? t("components.authentication.legacy.error")
																: undefined
														}
													/>
													<Button
														type="submit"
														variant="text"
														sx={{
															textTransform: "none",
														}}
													>
														{t("components.authentication.legacy.login")}
													</Button>
												</Stack>
											</form>
										</Collapse>
									) : null}
								</TransitionGroup>
							</Stack>
						</Stack>
					</CardContent>
				</Card>
			</Slide>
		</Modal>
	);
}

export default AuthenticationModal;
