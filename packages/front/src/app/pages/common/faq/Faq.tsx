import { Container } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import OpenablePaper from "../../../components/element/paper/OpenablePaper";
import PageTitle from "../../../components/internal/PageTitle";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { faq } from "../../../services/common/CMS";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type {
	CMSDataType,
	CMSResultDataType,
} from "../../../shared/types/data.types";

const FaqEntry = ({ data }: { data: CMSDataType }) => {
	const language = useLanguageKey();
	if (language === "en") {
		return (
			<OpenablePaper
				title={data.name_en}
				summary={null}
				content={
					// biome-ignore lint/style/useSelfClosingElements: <explanation>
					<div
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: data.content_en }}
					></div>
				}
			/>
		);
	}
	return (
		<OpenablePaper
			title={data.name_fr}
			summary={null}
			content={
				// biome-ignore lint/style/useSelfClosingElements: <explanation>
				<div
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{ __html: data.content_fr }}
				></div>
			}
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
		<>
			<PageTitle page="faq" />
			<FakeSearchBar title={t("pages.faq.title")} />
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				{data
					? data.map((value) => <FaqEntry key={value.id} data={value} />)
					: null}
			</Container>
		</>
	);
};

export default Faq;
