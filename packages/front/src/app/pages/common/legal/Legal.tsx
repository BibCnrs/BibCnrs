import { keepPreviousData, useQuery } from "@tanstack/react-query";
import RenderContent from "../../../components/page/render/RenderContent";
import { legal } from "../../../services/common/CMS";
import { useTranslator } from "../../../shared/locales/I18N";
import type { CMSResultDataType } from "../../../shared/types/data.types";
import "./Legal.scss";

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
		<div id="app">
			<RenderContent
				data={data}
				page="legal"
				updateDocumentTitle
				showDate
				t={t}
			/>
		</div>
	);
};

export default Legal;
