import { Link } from "react-router-dom";
import { useTranslator } from "../../shared/locales/I18N";

/**
 * React element use to display localized 404 error
 * @constructor
 */
const Error404 = () => {
	const t = useTranslator();
	return (
		<div id="app">
			<h1>{t("error.404.title")}</h1>
			<p>{t("error.404.message")}</p>
			<Link to="/">{t("error.return")}</Link>
		</div>
	);
};

export default Error404;
