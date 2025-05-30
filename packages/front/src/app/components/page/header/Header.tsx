import { Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { memo } from "react";
import BibCNRSLightLogo from "/logos/BIB_LIGHT.svg";
import CNRSLightLogo from "/logos/CNRS_LIGHT.svg";
import BibCNRSDarkLogo from "/logos/bibcnrs.png";
import CNRSDarkLogo from "/logos/cnrs.png";
import { useBibContext } from "../../../context/BibContext";
import {
	RouteFaq,
	RouteLicences,
	RouteNews,
	RouteResources,
	RouteRoot,
} from "../../../shared/Routes";
import { useTranslator } from "../../../shared/locales/I18N";
import CustomLink from "../../element/link/CustomLink";
import HeaderButton from "./components/HeaderButton";
import LocalButton from "./components/LocaleButton";
import SignInButton from "./components/SignInButton";
import ThemeButton from "./components/ThemeButton";
import UserButton from "./components/UserButton";
import { UserLoading } from "./components/UserLoading";

/**
 * Header component used in every page.
 * This component also handles language selection and account navigation.
 */
const Header = () => {
	const t = useTranslator();
	const { session } = useBibContext();
	const theme = useTheme();

	return (
		<>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="flex-end"
				gap={2}
				component={"header"}
				m={2}
			>
				<Stack direction="row" alignItems="flex-end" gap={2}>
					<Stack direction="row" alignItems="flex-end" gap="60px">
						<CustomLink to={RouteRoot}>
							<img
								src={
									theme.palette.mode === "dark" ? CNRSDarkLogo : CNRSLightLogo
								}
								alt="CNRS Logo"
								style={{
									maxWidth: "60px",
									height: "auto",
								}}
							/>
						</CustomLink>
						<CustomLink to={RouteRoot}>
							<img
								src={
									theme.palette.mode === "dark"
										? BibCNRSDarkLogo
										: BibCNRSLightLogo
								}
								alt="BibCNRS Logo"
								style={{
									maxWidth: "60px",
									height: "auto",
								}}
							/>
						</CustomLink>
					</Stack>
					<Typography
						variant="h5"
						component="h1"
						sx={{
							marginLeft: 2,
							fontWeight: "bold",
							display: {
								xs: "none",
								sm: "block",
							},
						}}
					>
						{t("components.header.title")}
					</Typography>
				</Stack>
				<Stack direction="row" alignItems="flex-end" gap={1}>
					<LocalButton />
					<ThemeButton />
					<HeaderButton name="resources" route={RouteResources} />
					{session.user && (
						<>
							<HeaderButton name="news" route={RouteNews} />
							<HeaderButton name="licences" route={RouteLicences} />
						</>
					)}
					<HeaderButton name="questions" route={RouteFaq} />

					{session.status === "loading" && <UserLoading />}
					{session.status === "loggedIn" && (
						// biome-ignore lint/complexity/noUselessFragments: <explanation>
						<>
							<UserButton />
						</>
					)}
					{session.status === "loggedOut" && <SignInButton />}
				</Stack>
			</Stack>
		</>
	);
};

export default memo(Header);
