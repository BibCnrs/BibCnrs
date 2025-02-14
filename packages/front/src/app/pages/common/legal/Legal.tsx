import { Container } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/internal/PageTitle";
import RenderContent from "../../../components/page/render/RenderContent";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { legal } from "../../../services/common/CMS";
import { useTranslator } from "../../../shared/locales/I18N";
import type { CMSResultDataType } from "../../../shared/types/data.types";

const Legal = () => {
	const t = useTranslator();

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
		queryKey: ["legal"],
		queryFn: legal,
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	return (
		<>
			<PageTitle page="legal" />
			<FakeSearchBar title={t("pages.legal.title")} />
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }} tabIndex={0}>
				<RenderContent
					data={data}
					page="legal"
					updateDocumentTitle
					showDate
					t={t}
				/>
			</Container>
		</>
	);
};

export default Legal;
