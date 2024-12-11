import { Button, Typography } from "@mui/material";
import { Container, Stack, type SxProps, type Theme } from "@mui/system";
import { useEffect, useState } from "react";

interface CookieBannerProps {
	onAccept: () => void;
	onDecline: () => void;
}

const buttonStyles: SxProps<Theme> = {
	color: "black",
	paddingX: "20px",
	borderRadius: "20px",
	width: "200px",
	textTransform: "none",
	fontWeight: "900",
	backgroundColor: "white",
	":hover": {
		backgroundColor: "secondary",
		color: "black",
	},
	"&.active": {
		backgroundColor: "secondary",
		color: "black",
	},
};

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onDecline }) => {
	const [Banner, setBanner] = useState(true);

	useEffect(() => {
		const consent = sessionStorage.getItem("cookieConsent");
		if (consent === "accepted") {
			setBanner(false);
			onAccept();
		} else if (consent === "declined") {
			setBanner(false);
			onDecline();
		}
	}, [onAccept, onDecline]);

	const handleAccept = () => {
		sessionStorage.setItem("cookieConsent", "accepted");
		setBanner(false);
		onAccept();
	};

	const handleDecline = () => {
		sessionStorage.setItem("cookieConsent", "declined");
		setBanner(false);
		onDecline();
	};

	if (!Banner) {
		return null;
	}

	return (
		<Container
			maxWidth="xl"
			sx={{
				position: "fixed",
				bottom: 0,
				width: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				color: "white",
				textAlign: "center",
				padding: "10px",
			}}
		>
			<Stack>
				<Typography variant="body1">
					Nous utilisons des cookies pour améliorer votre expérience sur notre
					site. En continuant à naviguer, vous acceptez notre utilisation des
					cookies
				</Typography>
				<Stack direction="row" gap={2} justifyContent="center" mt={2}>
					<Button variant="contained" onClick={handleAccept} sx={buttonStyles}>
						Accepter
					</Button>
					<Button variant="contained" onClick={handleDecline} sx={buttonStyles}>
						Refuser
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
};

export default CookieBanner;
