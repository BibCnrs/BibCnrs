import { Container } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/internal/PageTitle";
import RenderContent from "../../../components/page/render/RenderContent";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { plan } from "../../../services/common/CMS";
import { useTranslator } from "../../../shared/locales/I18N";
import type { CMSResultDataType } from "../../../shared/types/data.types";

const Plan = () => {
	const t = useTranslator();

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
		queryKey: ["plan"],
		queryFn: plan,
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	return (
		<>
			<PageTitle page="plan" />
			<FakeSearchBar title={t("pages.plan.title")} />
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }} tabIndex={0}>
				<RenderContent
					data={data}
					page="plan"
					updateDocumentTitle
					showDate
					t={t}
				/>
			</Container>
		</>
	);
};

export default Plan;
