import { useNavigate } from "react-router-dom";
import SearchBar from "../components/page/searchbar/SearchBar";
import {
	RouteArticle,
	RouteDatabase,
	RoutePublication,
	RouteResearchData,
	updatePageQueryUrl,
} from "../shared/Routes";
import { useTranslator } from "../shared/locales/I18N";
import "./Root.scss";
import { LinearProgress } from "@mui/material";
import { Container } from "@mui/system";
import { AnonymousHome } from "../components/page/home/AnonymousHome";
import { LoginHome } from "../components/page/home/LoginHome";
import { useBibContext } from "../context/BibContext";

const ROUTE_SEARCH = {
	article: RouteArticle,
	journal: RoutePublication,
	platform: RouteDatabase,
	searchData: RouteResearchData,
};

const Root = () => {
	const { session } = useBibContext();

	const navigate = useNavigate();
	const t = useTranslator();

	const handleSearch = (q: string | undefined) => {
		if (!session.user?.settings) {
			return updatePageQueryUrl(RouteArticle, navigate, { q });
		}

		const { defaultSearchMode } = session.user.settings;
		const route = ROUTE_SEARCH[defaultSearchMode];
		return updatePageQueryUrl(route, navigate, { q });
	};

	if (session.status === "loading") {
		return (
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<LinearProgress color="primary" />
			</Container>
		);
	}

	return (
		<>
			<SearchBar
				placeholder={t("pages.article.searchBar")}
				onSearch={handleSearch}
			/>
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				{!session.user && <AnonymousHome />}
				{session.user && <LoginHome />}
			</Container>
		</>
	);
};

export default Root;
