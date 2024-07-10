import CloseIcon from "@mui/icons-material/Close";
import {
	Button,
	Card,
	CardContent,
	IconButton,
	Modal,
	Slide,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import { RouteUserSettings } from "../../shared/Routes";
import { useTranslator } from "../../shared/locales/I18N";

export const UserPopup = ({ open, onClose }) => {
	const t = useTranslator();
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="user-popup-header"
			aria-describedby="user-popup-body"
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
						minWidth: 512,
						padding: 2,
						":hover": {
							backgroundColor: "background.default",
						},
					}}
				>
					<CardContent
						id="authentication-body"
						sx={{ padding: 0, textAlign: "right" }}
					>
						<IconButton onClick={onClose}>
							<CloseIcon />
						</IconButton>
						<Stack gap={2} justifyContent="center" alignItems="center">
							<img
								src="/img/happy_news_re_tsbd.svg"
								alt="Happy news"
								width={200}
							/>
							<Typography variant="h4" align="center">
								{t("components.userPopup.title")}
							</Typography>
							<Typography align="center">
								{t("components.userPopup.description")}
							</Typography>
							<Button
								variant="contained"
								component={Link}
								to={RouteUserSettings}
								onClick={onClose}
							>
								{t("components.userPopup.configure")}
							</Button>
						</Stack>
					</CardContent>
				</Card>
			</Slide>
		</Modal>
	);
};
