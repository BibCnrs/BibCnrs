import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { TooltipProps } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
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
 * Styled tooltips with no max width
 */
const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }}>
		{props.children}
	</Tooltip>
))({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: "none",
	},
});

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
			id="authentication"
			aria-labelledby="authentication-header"
			aria-describedby="authentication-body"
			closeAfterTransition
		>
			{/* Add a sliding animation from the top */}
			<Slide direction="down" in={open} timeout={400}>
				<Paper elevation={15}>
					{/*------------ Modal header ------------*/}
					<div id="authentication-header">
						<Typography>{t("components.authentication.title")}</Typography>
						<IconButton
							id="authentication-close"
							size="small"
							onClick={handleClose}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					</div>
					<Divider />
					{/*------------ Modal body ------------*/}
					<div id="authentication-body">
						<div>
							<p>
								<small>{t("components.authentication.info")}</small>
							</p>
							<p>{t("components.authentication.mode")}</p>
						</div>
						{/* Authentication form */}
						<div>
							{/* Authentication janus login form */}
							<NoMaxWidthTooltip
								id="authentication-tooltip"
								title={t("components.authentication.janus.tooltip")}
								placement="top"
								arrow
							>
								<Button
									className="authentication-button"
									onClick={loginToJanus}
								>
									<LoginIcon className="authentication-button-icon" />
									{t("components.authentication.janus.button")}
								</Button>
							</NoMaxWidthTooltip>
							<p id="authentication-janus">
								<a
									className="link"
									href="https://sesame.cnrs.fr"
									target="blank"
									rel="noopener noreferrer nofollow"
								>
									{t("components.authentication.janus.ask")}
								</a>
							</p>
							{/* Authentication legacy login display button */}
							<Button
								id="authentication-legacy-button"
								className="authentication-button"
								onClick={displayLegacy}
								style={
									legacy
										? {
												borderBottomRightRadius: 0,
												borderBottomLeftRadius: 0,
											}
										: undefined
								}
							>
								<LoginIcon className="authentication-button-icon" />
								{t("components.authentication.legacy.button")}
							</Button>
							{/* Authentication legacy login form */}
							<TransitionGroup>
								{legacy ? (
									<Collapse>
										<form id="authentication-legacy" onSubmit={handleLegacy}>
											<TextField
												name="username"
												error={legacyError}
												className="authentication-legacy-form-input"
												label={t("components.authentication.legacy.username")}
												size="small"
											/>
											<TextField
												name="password"
												type="password"
												error={legacyError}
												className="authentication-legacy-form-input"
												label={t("components.authentication.legacy.password")}
												size="small"
												helperText={
													legacyError
														? t("components.authentication.legacy.error")
														: undefined
												}
											/>
											<Button
												type="submit"
												className="authentication-button authentication-legacy-form-input"
											>
												{t("components.authentication.legacy.login")}
											</Button>
										</form>
									</Collapse>
								) : null}
							</TransitionGroup>
						</div>
					</div>
					<Divider />
					{/*------------ Modal footer ------------*/}
					<div id="authentication-footer">
						<a className="link" href="mailto:assistance-portail@inist.fr">
							{t("components.authentication.contact")}
						</a>
					</div>
				</Paper>
			</Slide>
		</Modal>
	);
}

export default AuthenticationModal;
