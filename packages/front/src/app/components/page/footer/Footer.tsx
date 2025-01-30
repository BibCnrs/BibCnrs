import { Button, Divider, IconButton, Link } from "@mui/material";
import { Container, Stack, useTheme } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import CNRSRFLogo from "/logos/CNRS-RF-Footer.png";
import {
	RouteAbout,
	RouteAccessibility,
	RouteLegal,
	RoutePrivacy,
} from "../../../shared/Routes";
import { useTranslator } from "../../../shared/locales/I18N";

const FOOTER_SX = {
	color: (theme) => theme.palette.text.primary,
	textDecoration: "none",
	textTransform: "none",
};
const BlueSkyIcon = () => {
	return <img src="/logos/BlueSkyLogo.png" alt="BlueSky" />;
};
const MastodonIcon = () => {
	return <img src="/logos/MastodonLogo.png" alt="Mastodon" />;
};
const InstagramIcon = () => {
	return <img src="/logos/InstagramLogo.png" alt="Instagram" />;
};
const LinkedInIcon = () => {
	return <img src="/logos/LinkedinLogo.png" alt="Linkedin" />;
};

/**
 * Footer component used in every page
 */
const Footer = () => {
	const theme = useTheme();
	const t = useTranslator();

	return (
		<Stack
			component="footer"
			sx={{ backgroundColor: (theme) => theme.palette.info.light, height: 230 }}
			alignContent="center"
			justifyContent="center"
		>
			<Container
				maxWidth="xl"
				component={Stack}
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					justifyContent: { xs: "center", md: "space-between" },
					alignItems: { xs: "center", md: "center" },
				}}
			>
				<Link
					href="https://www.cnrs.fr"
					target="_blank"
					rel="noreferrer noopener nofollow"
					sx={{ display: "flex", justifyContent: "center" }}
				>
					<img
						src={CNRSRFLogo}
						alt="CNRS RF logo"
						aria-label="CNRS logo"
						style={{
							width: 200,
							filter:
								theme.palette.mode === "dark"
									? "grayscale(1) invert(1)"
									: "none",
						}}
					/>
				</Link>

				<Stack direction="row" spacing={2}>
					<Button component={RouterLink} to={RouteAbout} sx={FOOTER_SX}>
						{t("components.footer.about")}
					</Button>
					<Divider orientation="vertical" flexItem />
					<Button
						component={Link}
						sx={FOOTER_SX}
						href={`mailto:assistance-portail@inist.fr?subject=${encodeURIComponent(
							t("components.footer.mail.subject").toString(),
						)}&body=${encodeURIComponent(
							t("components.footer.mail.body").toString(),
						)}`}
					>
						{t("components.footer.contact")}
					</Button>
					<Divider orientation="vertical" flexItem />
					<Button to={RouteLegal} component={RouterLink} sx={FOOTER_SX}>
						{t("components.footer.legal")}
					</Button>
					<Divider orientation="vertical" flexItem />
					<Button to={RoutePrivacy} component={RouterLink} sx={FOOTER_SX}>
						{t("components.footer.privacy")}
					</Button>
					<Divider orientation="vertical" flexItem />
					<Button to={RouteAccessibility} component={RouterLink} sx={FOOTER_SX}>
						{t("components.footer.accessibility")}
					</Button>
				</Stack>

				<Stack
					direction="row"
					id="social-media"
					spacing={1}
					justifyContent={{ xs: "center", md: "flex-end" }}
					width="200px"
				>
					<IconButton
						href="https://www.linkedin.com/company/inist-cnrs"
						target="_blank"
						rel="noreferrer noopener nofollow"
						aria-label="LinkedIn"
					>
						<LinkedInIcon />
					</IconButton>
					<IconButton
						href="https://bsky.app/profile/cnrs-inist.bsky.social"
						target="_blank"
						rel="noreferrer noopener nofollow"
						aria-label="BlueSky"
					>
						<BlueSkyIcon />
					</IconButton>
					<IconButton
						href="https://social.numerique.gouv.fr/@inistcnrs"
						target="_blank"
						rel="noreferrer noopener nofollow"
						aria-label="Mastodon"
					>
						<MastodonIcon />
					</IconButton>
					<IconButton
						href=" https://www.instagram.com/inist_cnrs/ "
						target="_blank"
						rel="noreferrer noopener nofollow"
						aria-label="Instagram"
					>
						<InstagramIcon />
					</IconButton>
				</Stack>
			</Container>
		</Stack>
	);
};

export default Footer;
