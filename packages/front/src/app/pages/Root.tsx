import { useNavigate } from "react-router-dom";
import SearchBar from "../components/page/searchbar/SearchBar";
import { RouteArticle, updatePageQueryUrl } from "../shared/Routes";
import { useTranslator } from "../shared/locales/I18N";
import "./Root.scss";
import { LinearProgress } from "@mui/material";
import { Container } from "@mui/system";
import { AnonymousHome } from "../components/page/home/AnonymousHome";
import { LoginHome } from "../components/page/home/LoginHome";
import { useBibContext } from "../context/BibContext";

const Root = () => {
	const { session } = useBibContext();

	console.log("user", session);

	const navigate = useNavigate();
	const t = useTranslator();

	const handleSearch = (q: string | undefined) => {
		updatePageQueryUrl(RouteArticle, navigate, { q });
	};

	if (session.status === "loading") {
		return (
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<LinearProgress color="primary" />
			</Container>
		);
	}

	return (
		<div>
			<div className="header-footer">
				<SearchBar
					placeholder={t("pages.article.searchBar")}
					onSearch={handleSearch}
				/>
			</div>
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				{!session.user && <AnonymousHome />}
				{session.user && <LoginHome />}
			</Container>
		</div>
	);
};

export default Root;
