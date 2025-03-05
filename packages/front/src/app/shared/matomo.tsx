import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslator } from "./locales/I18N";

const MATOMO_TRACKER_URL = import.meta.env.VITE_MATOMO_TRACKER_URL;
const MATOMO_SCRIPT_URL = import.meta.env.VITE_MATOMO_SCRIPT_URL;
const MATOMO_SITE_ID = import.meta.env.VITE_MATOMO_SITE_ID;

export function ConsentForm() {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const location = useLocation();
	const t = useTranslator();

	useEffect(() => {
		if (!MATOMO_TRACKER_URL || !MATOMO_SCRIPT_URL || window._paq) {
			return;
		}

		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		const _paq = (window._paq = window._paq || []);

		_paq.push(["trackPageView"]);
		_paq.push(["enableLinkTracking"]);
		_paq.push(["setTrackerUrl", MATOMO_TRACKER_URL]);
		_paq.push(["setSiteId", MATOMO_SITE_ID]);

		const d = document;
		const g = d.createElement("script");
		const s = d.getElementsByTagName("script")[0];
		g.async = true;
		g.src = MATOMO_SCRIPT_URL;
		s.parentNode.insertBefore(g, s);
	}, []);

	useEffect(() => {
		const consent = document.cookie
			.split("; ")
			.find((row) => row.startsWith("consent="));

		if (consent) {
			setIsVisible(false);
		}
	}, []);

	useEffect(() => {
		window._paq?.push?.([
			"setCustomUrl",
			`${location.pathname}${location.search}`,
		]);
		window._paq?.push?.(["setDocumentTitle", document.title]);
		window._paq?.push?.(["trackPageView"]);
	}, [location]);

	const handleAccept = () => {
		document.cookie = "consent=true; path=/; max-age=2592000";
		setIsVisible(false);
	};

	const handleLearnMore = () => {
		setIsVisible(true);
		window.location.href = "/privacy";
	};

	if (!isVisible) {
		return null;
	}

	return (
		<Box
			id="optout-form"
			sx={{
				padding: "20px",
				textAlign: "center",
				position: "fixed",
				bottom: 0,
				width: "100%",
				backgroundColor: (theme) => theme.palette.info.light,
				boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
				zIndex: 1000,
			}}
		>
			<Typography variant="body1">{t("consent.consent")}</Typography>

			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					gap: "20px",
					marginTop: "20px",
				}}
			>
				<Button
					variant="contained"
					color="primary"
					onClick={handleAccept}
					sx={{
						borderRadius: "20px",
						fontWeight: "bold",
						":hover": {
							backgroundColor: (theme) => theme.palette.background.default,
							color: (theme) => theme.palette.text.primary,
							boxShadow: (theme) =>
								`inset 0 0 0 2px ${theme.palette.secondary.main}`,
						},
					}}
				>
					OK
				</Button>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleLearnMore}
					sx={{
						borderRadius: "20px",
						fontWeight: "bold",
						":hover": {
							backgroundColor: (theme) => theme.palette.background.default,
							color: (theme) => theme.palette.text.primary,
							boxShadow: (theme) =>
								`inset 0 0 0 2px ${theme.palette.secondary.main}`,
						},
					}}
				>
					{t("consent.learnMore")}
				</Button>
			</Box>
		</Box>
	);
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
