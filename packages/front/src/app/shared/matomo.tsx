import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslator } from "./locales/I18N";

const MATOMO_TRACKER_URL = import.meta.env.VITE_MATOMO_TRACKER_URL;
const MATOMO_SCRIPT_URL = import.meta.env.VITE_MATOMO_SCRIPT_URL;
const MATOMO_SITE_ID = import.meta.env.VITE_MATOMO_SITE_ID;

export function useInitMatomo() {
	const [isOptedOut, setIsOptedOut] = useState(false);
	const location = useLocation();
	useEffect(() => {
		if (
			!MATOMO_TRACKER_URL ||
			!MATOMO_SCRIPT_URL ||
			window._paq ||
			isOptedOut
		) {
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
	}, [isOptedOut]);

	useEffect(() => {
		window._paq?.push?.([
			"setCustomUrl",
			`${location.pathname}${location.search}`,
		]);
		window._paq?.push?.(["setDocumentTitle", document.title]);
		window._paq?.push?.(["trackPageView"]);
	}, [location]);

	const toggleOptOut = (optOut: boolean) => {
		if (optOut) {
			window._paq?.push?.(["optUserOut"]);
		} else {
			window._paq?.push?.(["forgetUserOptOut"]);
		}
		setIsOptedOut(optOut);
	};

	return {
		isOptedOut,
		toggleOptOut,
	};
}

export function ConsentForm() {
	const { isOptedOut, toggleOptOut } = useInitMatomo();
	const [isVisible, setIsVisible] = useState(true);
	const t = useTranslator();

	useEffect(() => {
		const session = sessionStorage.getItem("consent");
		if (session) {
			setIsVisible(false);
		}
	}, []);

	const handleAccept = () => {
		sessionStorage.setItem("consent", "true");
		toggleOptOut(false);
		setIsVisible(false);
	};

	const handleDecline = () => {
		sessionStorage.setItem("consent", "false");
		toggleOptOut(true);
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<Box
			id="optout-form"
			sx={{
				padding: "20px",
				textAlign: "center",
				position: "fixed",
				bottom: 0,
				width: "100%",
				background: (theme) => theme.palette.background.default,
				boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
				zIndex: 1000,
			}}
		>
			<Typography variant="h6">{t("consent.consent")}</Typography>

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
						padding: "10px 20px",
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
					{t("consent.accept")}
				</Button>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleDecline}
					sx={{
						padding: "10px 20px",
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
					{t("consent.decline")}
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
