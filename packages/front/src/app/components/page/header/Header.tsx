import "./Header.scss";
import { memo } from "react";
import BibCNRSLogo from "/logos/bibcnrs.png";
import { useBibContext } from "../../../context/BibContext";
import {
	RouteFaq,
	RouteLicences,
	RouteNews,
	RouteResources,
	RouteRoot,
} from "../../../shared/Routes";
import createSxProps from "../../../shared/createSxProps";
import { useTranslator } from "../../../shared/locales/I18N";
import HeaderButton from "../../element/header/HeaderButton";
import LocalButton from "../../element/header/LocaleButton";
import ThemeButton from "../../element/header/ThemeButton";
import CustomLink from "../../element/link/CustomLink";
import NavBar from "../../element/navbar/NavBar";
import SignInButton from "./components/SignInButton";
import UserButton from "./components/UserButton";
import { UserLoading } from "./components/UserLoading";

export const headerButtonStyle = createSxProps({
	fontFamily: '"Source Sans Pro", sans-serif',
	textTransform: "none",
	fontSize: "initial",
	lineHeight: "initial",
	minWidth: "initial",
});

/**
 * Header component used in every page.
 * This component also handles language selection and account navigation.
 */
const Header = () => {
	const t = useTranslator();
	const { user } = useBibContext();

	return (
		<>
			<header>
				<div id="header-left">
					<CustomLink to={RouteRoot}>
						<img src={BibCNRSLogo} alt="BibCNRS Logo" />
					</CustomLink>
					<div>
						<p>{t("components.header.title")}</p>
					</div>
				</div>
				<div id="header-right">
					{user.type === "loading" && <UserLoading />}
					{user.type === "loggedIn" && (
						<>
							<UserButton />
							<HeaderButton name="news" route={RouteNews} />
							<HeaderButton name="licences" route={RouteLicences} />
						</>
					)}
					{user.type === "loggedOut" && <SignInButton />}

					<HeaderButton name="resources" route={RouteResources} />
					<HeaderButton name="questions" route={RouteFaq} />
					<LocalButton />
					<ThemeButton />
				</div>
			</header>
			<NavBar />
		</>
	);
};

export default memo(Header);
