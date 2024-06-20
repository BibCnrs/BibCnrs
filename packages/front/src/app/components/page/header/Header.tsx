import { Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { memo } from "react";
import BibCNRSLightLogo from "/logos/BIB_LIGHT.svg";
import CNRSLightLogo from "/logos/CNRS_LIGHT.svg";
import { useBibContext } from "../../../context/BibContext";
import { RouteFaq, RouteResources, RouteRoot } from "../../../shared/Routes";
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
	const { session: user } = useBibContext();
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
					<CustomLink to={RouteRoot}>
						<img
							src={CNRSLightLogo}
							alt="CNRS Logo"
							style={{
								maxWidth: "60px",
								height: "auto",
								filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
							}}
						/>
					</CustomLink>
					<CustomLink to={RouteRoot}>
						<img
							src={BibCNRSLightLogo}
							alt="BibCNRS Logo"
							style={{
								maxWidth: "60px",
								height: "auto",
								filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
							}}
						/>
					</CustomLink>
					<Typography
						variant="h5"
						component="h1"
						sx={{ marginLeft: 2, fontWeight: "bold" }}
					>
						{t("components.header.title")}
					</Typography>
				</Stack>
				<Stack direction="row" alignItems="flex-end" gap={1}>
					<LocalButton />
					<ThemeButton />
					<HeaderButton name="resources" route={RouteResources} />
					<HeaderButton name="questions" route={RouteFaq} />

					{user.status === "loading" && <UserLoading />}
					{user.status === "loggedIn" && (
						<>
							<UserButton />
						</>
					)}
					{user.status === "loggedOut" && <SignInButton />}
				</Stack>
			</Stack>
		</>
	);
};

export default memo(Header);
