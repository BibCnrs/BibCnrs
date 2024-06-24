import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import type { FormEvent } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import { useTranslator } from "../../shared/locales/I18N";
import type { useSession } from "../useSession";

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
			}}
		>
			{/* Add a sliding animation from the top */}
			<Slide direction="down" in={open} timeout={400}>
				<Card elevation={15}>
					<CardHeader
						id="authentication-header"
						title={t("components.authentication.title")}
						action={
							<IconButton
								id="authentication-close"
								size="small"
								onClick={handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						}
					/>
					<Divider />
					<CardContent
						id="authentication-body"
						sx={{
							"& button": {
								display: "flex",
								gap: 1,
								flexDirection: "row",
							},
						}}
					>
						<Stack gap={2}>
							<Typography fontSize={12}>
								{t("components.authentication.info")}
							</Typography>

							<Typography>{t("components.authentication.mode")}</Typography>

							<Stack gap={1} sx={{ alignItems: "center" }}>
								<Tooltip
									title={t("components.authentication.janus.tooltip")}
									placement="top"
									arrow
									sx={{ maxWidth: "none" }}
								>
									<Button
										className="authentication-button"
										onClick={loginToJanus}
										fullWidth
										variant="contained"
										color="primary"
									>
										<LoginIcon />
										{t("components.authentication.janus.button")}
									</Button>
								</Tooltip>

								<Link
									className="link"
									href="https://sesame.cnrs.fr"
									target="blank"
									rel="noopener noreferrer nofollow"
								>
									{t("components.authentication.janus.ask")}
								</Link>
							</Stack>

							<Stack gap={1}>
								<Button
									onClick={displayLegacy}
									style={
										legacy
											? {
													borderBottomRightRadius: 0,
													borderBottomLeftRadius: 0,
												}
											: undefined
									}
									variant="contained"
									color="primary"
								>
									<LoginIcon className="authentication-button-icon" />
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
													<TextField
														name="password"
														type="password"
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
													<Button type="submit">
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
					<Divider />
					<CardActions sx={{ padding: 2 }}>
						<Link href="mailto:assistance-portail@inist.fr">
							{t("components.authentication.contact")}
						</Link>
					</CardActions>
				</Card>
			</Slide>
		</Modal>
	);
}

export default AuthenticationModal;
