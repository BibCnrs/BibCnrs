import "./app/shared/easter-egg/konamiCode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import ReactDOMClient from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import ContextProvider from "./app/components/internal/provider/ContextProvider";
import LocalizedThemeProvider from "./app/components/internal/provider/LocalizedThemeProvider";
import { BibContextProvider } from "./app/context/BibContext";
import ExceptedError from "./app/pages/errors/ExceptedError";
import I18N from "./app/shared/locales/I18N";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(container);
const queryClient = new QueryClient();

root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<I18nextProvider i18n={I18N}>
				<BibContextProvider>
					<ContextProvider>
						<LocalizedThemeProvider>
							<BrowserRouter>
								<ExceptedError>
									<App />
								</ExceptedError>
							</BrowserRouter>
						</LocalizedThemeProvider>
					</ContextProvider>
				</BibContextProvider>
			</I18nextProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</StrictMode>,
);
