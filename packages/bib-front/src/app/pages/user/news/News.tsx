import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { MouseEvent } from "react";
import { useMemo, useState } from "react";
import PageTitle from "../../../components/internal/PageTitle";
import ChipFacet from "../../../components/page/facet/ChipFacet";
import RenderNews from "../../../components/page/render/RenderNews";
import { getDomains, getFavouriteDomain } from "../../../services/user/Session";
import type { Pages } from "../../../services/user/TestsNews";
import { news } from "../../../services/user/TestsNews";
import { useTranslator } from "../../../shared/locales/I18N";
import type { TestsNewsDataType } from "../../../shared/types/data.types";
import "./News.scss";

const News = ({ page }: { page: Pages }) => {
	const t = useTranslator();
	const favouriteDomain = getFavouriteDomain();
	const domains = getDomains();

	const domainsWithoutFavourite = useMemo(() => {
		return domains.filter((domain) => domain !== favouriteDomain);
	}, [domains, favouriteDomain]);

	const [selectedDomain, setSelectedDomain] = useState(
		favouriteDomain || domainsWithoutFavourite[0],
	);

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const { data } = useQuery<TestsNewsDataType, any, TestsNewsDataType, any>({
		queryKey: [page],
		queryFn: () => news(page),
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	const handleDomain = (
		event: MouseEvent<HTMLElement>,
		field: string | null,
	) => {
		if (field === null) {
			return;
		}
		setSelectedDomain(field);
	};

	return (
		<div>
			<div className="header-footer">
				<div id="news-chips">
					<ChipFacet
						value={selectedDomain}
						values={domains}
						onChange={handleDomain}
					/>
				</div>
			</div>
			<div id="app">
				<PageTitle page={page} />
				<h1>{t(`pages.${page}.title`)}</h1>
				<RenderNews data={data} domain={selectedDomain} />
			</div>
		</div>
	);
};

export default News;
