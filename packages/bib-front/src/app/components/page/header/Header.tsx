import "./Header.scss";
import { memo, useContext } from "react";
import BibCNRSLogo from "/logos/bibcnrs.png";
import {
	RouteFaq,
	RouteLicences,
	RouteNews,
	RouteResources,
	RouteRoot,
	RouteTests,
} from "../../../shared/Routes";
import createSxProps from "../../../shared/createSxProps";
import { useTranslator } from "../../../shared/locales/I18N";
import HeaderButton from "../../element/header/HeaderButton";
import LocalButton from "../../element/header/LocaleButton";
import SignInButton from "../../element/header/SignInButton";
import ThemeButton from "../../element/header/ThemeButton";
import UserButton from "../../element/header/UserButton";
import CustomLink from "../../element/link/CustomLink";
import NavBar from "../../element/navbar/NavBar";
import { BibContext } from "../../internal/provider/ContextProvider";

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
	const { login } = useContext(BibContext);
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
					{login ? (
						<>
							<UserButton />
							<HeaderButton name="news" route={RouteNews} />
							<HeaderButton name="tests" route={RouteTests} />
							<HeaderButton name="licences" route={RouteLicences} />
						</>
					) : (
						<SignInButton />
					)}
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
