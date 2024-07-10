import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MATOMO_TRACKER_URL = import.meta.env.VITE_MATOMO_TRACKER_URL;
const MATOMO_SCRIPT_URL = import.meta.env.VITE_MATOMO_SCRIPT_URL;
const MATOMO_SITE_ID = import.meta.env.VITE_MATOMO_SITE_ID;

export function useInitMatomo() {
	const location = useLocation();
	useEffect(() => {
		if (!MATOMO_TRACKER_URL || !MATOMO_SCRIPT_URL || window._paq) {
			return;
		}

		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		const _paq = (window._paq = window._paq || []);

		_paq.push(["trackPageView"]);
		_paq.push(["enableLinkTracking"]);
		_paq.push(["setTrackerUrl", MATOMO_TRACKER_URL]);
		_paq.push(["setSiteId", MATOMO_SITE_ID || "1"]);

		const d = document;
		const g = d.createElement("script");
		const s = d.getElementsByTagName("script")[0];
		g.async = true;
		g.src = MATOMO_SCRIPT_URL;
		s.parentNode.insertBefore(g, s);
	}, []);

	useEffect(() => {
		window._paq?.push?.([
			"setCustomUrl",
			`${location.pathname}${location.search}`,
		]);
		window._paq?.push?.(["setDocumentTitle", document.title]);
		window._paq?.push?.(["trackPageView"]);
	}, [location]);
}

export function useMatomo() {
	const trackEvent = useCallback(
		(category: string, action: string, name: string, value?: number) => {
			window._paq?.push?.(["trackEvent", category, action, name, value]);
		},
		[],
	);

	const trackSearch = useCallback(
		(keyword: string, category: string, resultsCount: number) => {
			window._paq?.push?.(["trackSiteSearch", keyword, category, resultsCount]);
		},
		[],
	);

	return {
		trackEvent,
		trackSearch,
	};
}
