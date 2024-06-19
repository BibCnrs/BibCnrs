import { useNavigate } from "react-router-dom";
import SearchBar from "../components/page/searchbar/SearchBar";
import { RouteArticle, updatePageQueryUrl } from "../shared/Routes";
import { useTranslator } from "../shared/locales/I18N";
import "./Root.scss";
import { Container } from "@mui/system";
import { AnonymousHome } from "../components/page/home/AnonymousHome";
import { LoginHome } from "../components/page/home/LoginHome";
import { getToken } from "../services/user/Session";

const Root = () => {
	const navigate = useNavigate();
	const t = useTranslator();
	const tokenLogin = getToken();

	const handleSearch = (q: string | undefined) => {
		updatePageQueryUrl(RouteArticle, navigate, { q });
	};

	return (
		<div>
			<div className="header-footer">
				<SearchBar
					placeholder={t("pages.article.searchBar")}
					onSearch={handleSearch}
				/>
			</div>
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				{!tokenLogin && <AnonymousHome />}
				{tokenLogin && <LoginHome />}
			</Container>
		</div>
	);
};

export default Root;
