import "./App.scss";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/internal/ProtectedRoute";
import Footer from "./components/page/footer/Footer";
import Header from "./components/page/header/Header";
import Root from "./pages/Root";
import About from "./pages/common/about/About";
import Accessibility from "./pages/common/accessibility/AccessibilityPage";
import Faq from "./pages/common/faq/Faq";
import Legal from "./pages/common/legal/Legal";
import PrivacyPage from "./pages/common/privacy/PrivacyPage";
import Resources from "./pages/common/resources/Resources";
import Error404 from "./pages/errors/Error404";
import ArticlePage from "./pages/search/article/ArticlePage";
import { PlatformPage } from "./pages/search/database/PlatformPage";
import MetadorePage from "./pages/search/metadore/MetadorePage";
import PublicationPage from "./pages/search/publication/PublicationPage";
import UserSettings from "./pages/user/UserSettings/UserSettings";
import Favourite from "./pages/user/favourite/Favourite";
import History from "./pages/user/history/History";
import Licences from "./pages/user/licences/Licences";
import IndividualNews from "./pages/user/news/IndividualNews";
import News from "./pages/user/news/News";
import {
	RouteAbout,
	RouteAccessibility,
	RouteAlert,
	RouteArticle,
	RouteDatabase,
	RouteFaq,
	RouteFavourite,
	RouteHistory,
	RouteLegal,
	RouteLicences,
	RouteMetadore,
	RouteNews,
	RoutePrivacy,
	RoutePublication,
	RouteResources,
	RouteRoot,
	RouteUserSettings,
} from "./shared/Routes";
import { ConsentForm } from "./shared/matomo";

const App = () => {
	return (
		<>
			<ConsentForm />
			<Header />
			<div id="app-container">
				<Routes>
					{/* Header route */}
					<Route path={RouteRoot} element={<Root />} />
					{/* Navigation route */}
					<Route
						path={RouteArticle}
						element={
							<ProtectedRoute>
								<ArticlePage />
							</ProtectedRoute>
						}
					/>
					<Route path={RoutePublication} element={<PublicationPage />} />
					<Route path={RouteDatabase} element={<PlatformPage />} />
					<Route path={RouteMetadore} element={<MetadorePage />} />
					<Route path={RouteFaq} element={<Faq />} />
					<Route path={RoutePrivacy} element={<PrivacyPage />} />
					<Route path={RouteResources} element={<Resources />} />
					{/* Protected route */}
					<Route
						path={RouteLicences}
						element={
							<ProtectedRoute>
								<Licences />
							</ProtectedRoute>
						}
					/>

					<Route
						path={RouteNews}
						element={
							<ProtectedRoute>
								<News page="news" />
							</ProtectedRoute>
						}
					/>
					<Route
						path={`${RouteNews}/:id`}
						element={
							<ProtectedRoute>
								<IndividualNews />
							</ProtectedRoute>
						}
					/>
					<Route
						path={RouteHistory}
						element={
							<ProtectedRoute>
								<History />
							</ProtectedRoute>
						}
					/>
					<Route
						path={RouteAlert}
						element={
							<ProtectedRoute>
								<History displayOnlyAlert />
							</ProtectedRoute>
						}
					/>
					<Route
						path={RouteUserSettings}
						element={
							<ProtectedRoute>
								<UserSettings />
							</ProtectedRoute>
						}
					/>
					<Route
						path={RouteFavourite}
						element={
							<ProtectedRoute>
								<Favourite />
							</ProtectedRoute>
						}
					/>
					{/* Footer route */}
					<Route path={RouteAbout} element={<About />} />
					<Route path={RouteLegal} element={<Legal />} />
					<Route path={RouteAccessibility} element={<Accessibility />} />
					{/* Error route */}
					<Route path="*" element={<Error404 />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
};

export default App;
