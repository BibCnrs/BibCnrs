import { Container } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/internal/PageTitle";
import RenderNews from "../../../components/page/render/RenderNews";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { useBibContext } from "../../../context/BibContext";
import type { Pages } from "../../../services/user/TestsNews";
import { news } from "../../../services/user/TestsNews";
import { useTranslator } from "../../../shared/locales/I18N";
import type { TestsNewsDataType } from "../../../shared/types/data.types";

const News = ({ page }: { page: Pages }) => {
	const t = useTranslator();
	const {
		session: { user },
	} = useBibContext();

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const { data } = useQuery<TestsNewsDataType, any, TestsNewsDataType, any>({
		queryKey: [page],
		queryFn: () => news({ domains: user?.domains }),
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	return (
		<>
			<PageTitle page={page} />
			<FakeSearchBar title={t(`pages.${page}.title`)} />
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<RenderNews data={data} />
			</Container>
		</>
	);
};

export default News;
