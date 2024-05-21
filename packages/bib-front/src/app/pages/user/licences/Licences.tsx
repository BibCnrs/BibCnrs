import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PageTitle from "../../../components/internal/PageTitle";
import { licences } from "../../../services/user/Licences";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type {
	LicenceDataType,
	LicencesDataType,
} from "../../../shared/types/data.types";
import "./Licences.scss";

const Licences = () => {
	const t = useTranslator();
	const language = useLanguageKey();
	const [activeLicences, setActiveLicences] = useState<
		LicenceDataType | undefined
	>(undefined);

	const { data, isFetching, isLoading } = useQuery<
		LicencesDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		LicencesDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: ["licences"],
		queryFn: licences,
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (data && data.length > 0) {
			setActiveLicences(data[0]);
		}
	}, [data, isFetching, isLoading]);

	if (!data || data.length === 0) {
		return <div id="app">{t("pages.licences.empty")}</div>;
	}

	return (
		<div id="app">
			<PageTitle page="licences" />
			<div id="licences">
				<div id="licences-nav">
					{data.map((value) => (
						<button
							type="button"
							key={value.id}
							id={
								activeLicences?.id === value.id ? "licences-button-active" : ""
							}
							className="licences-button"
							onClick={() => {
								if (activeLicences?.id !== value.id) {
									setActiveLicences(value);
								}
							}}
						>
							{language === "en" ? value.name_en : value.name_fr}
						</button>
					))}
				</div>
				<div id="licences-content">
					{activeLicences ? (
						<>
							<h1 className="title">
								{language === "en"
									? activeLicences.name_en
									: activeLicences.name_fr}
							</h1>
							{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
							<div
								className="cms-content"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								dangerouslySetInnerHTML={{
									__html:
										language === "en"
											? activeLicences.content_en
											: activeLicences.content_fr,
								}}
							></div>
							{activeLicences.pdf ? (
								<p>
									{t("pages.licences.pdf")}{" "}
									<a
										className="link"
										href={activeLicences.pdf.src}
										target="_blank"
										rel="noopener noreferrer nofollow"
									>
										{activeLicences.pdf.title}
									</a>
								</p>
							) : null}
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Licences;
