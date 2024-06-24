/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import {
	ArticleContentGetter,
	retrieve as retrieveFn,
} from "../../../services/search/Article";
import type {
	ArticleResultDataType,
	ArticleRetrieveDataType,
} from "../../../shared/types/data.types";
import Article from "../render/Article";
import SkeletonEntry from "../skeleton/SkeletonEntry";
import "./scss/TableList.scss";
import { useBibContext } from "../../../context/BibContext";
import type { SearchResultsElementProps } from "../../page/search/SearchResults";

const TableArticle = ({
	data: dataIn,
}: SearchResultsElementProps<ArticleResultDataType>) => {
	const { search } = useBibContext();
	const [retrieve, setRetrieve] = useState(false);
	const [missing, setMissing] = useState(false);
	const [first, setFirst] = useState(true);
	const [getter, setGetter] = useState(new ArticleContentGetter(dataIn, null));
	const [open, setOpen] = useState(false);

	const {
		data: dataRetrieve,
		isFetching,
		isLoading,
		isSuccess,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	} = useQuery<ArticleRetrieveDataType, any, ArticleRetrieveDataType, any>({
		queryKey: [
			"article_retrieve",
			missing,
			search.domain,
			dataIn.dbId,
			dataIn.an,
		],
		queryFn: async () => {
			if (missing && search.domain) {
				return retrieveFn(search.domain, dataIn.dbId, dataIn.an);
			}
			return null;
		},
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	const handleOpen = (isOpen: boolean) => {
		setOpen(isOpen);
		if (isOpen && !missing) {
			setMissing(true);
		}
	};

	useEffect(() => {
		if (first && (!dataIn.authors || !dataIn.source || !getter.getHref())) {
			setMissing(true);
		}
		setFirst(false);
	}, [dataIn, first, getter]);

	useEffect(() => {
		if (isSuccess) {
			setRetrieve(true);
			setGetter(new ArticleContentGetter(dataIn, dataRetrieve));
		}
	}, [dataIn, dataRetrieve, isSuccess]);

	if (
		((missing && !retrieve) || first || isFetching || isLoading || !getter) &&
		!open
	) {
		return <SkeletonEntry animation="pulse" />;
	}
	return (
		<Article
			onChange={handleOpen}
			open={open}
			getter={getter}
			isWaiting={isFetching || isLoading}
		/>
	);
};

export default memo(TableArticle);
