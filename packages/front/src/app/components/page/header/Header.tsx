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
import CustomLink from "../../element/link/CustomLink";
import NavBar from "../../element/navbar/NavBar";
import HeaderButton from "./components/HeaderButton";
import LocalButton from "./components/LocaleButton";
import SignInButton from "./components/SignInButton";
import ThemeButton from "./components/ThemeButton";
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
	const { session: user } = useBibContext();

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
					{user.status === "loading" && <UserLoading />}
					{user.status === "loggedIn" && (
						<>
							<UserButton />
							<HeaderButton name="news" route={RouteNews} />
							<HeaderButton name="licences" route={RouteLicences} />
						</>
					)}
					{user.status === "loggedOut" && <SignInButton />}

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
