import { keepPreviousData, useQuery } from "@tanstack/react-query";
import OpenablePaper from "../../../components/element/paper/openable/OpenablePaper";
import PageTitle from "../../../components/internal/PageTitle";
import { faq } from "../../../services/common/CMS";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type {
	CMSDataType,
	CMSResultDataType,
} from "../../../shared/types/data.types";
import "./Faq.scss";

const FaqEntry = ({ data }: { data: CMSDataType }) => {
	const language = useLanguageKey();
	if (language === "en") {
		return (
			<OpenablePaper
				Title={data.name_en}
				SmallBody={null}
				FullBody={
					// biome-ignore lint/style/useSelfClosingElements: <explanation>
					<div
						className="cms-content"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: data.content_en }}
					></div>
				}
				small
			/>
		);
	}
	return (
		<OpenablePaper
			Title={data.name_fr}
			SmallBody={null}
			FullBody={
				// biome-ignore lint/style/useSelfClosingElements: <explanation>
				<div
					className="cms-content"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{ __html: data.content_fr }}
				></div>
			}
			small
		/>
	);
};

const Faq = () => {
	const t = useTranslator();
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
		queryKey: ["faq"],
		queryFn: faq,
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	return (
		<div id="app">
			<h1>{t("pages.faq.title")}</h1>
			<PageTitle page="faq" />
			{data
				? data.map((value) => <FaqEntry key={value.id} data={value} />)
				: null}
		</div>
	);
};

export default Faq;
