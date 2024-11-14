import { useCallback, useMemo } from "react";
import { useTranslator } from "../../../shared/locales/I18N";

import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import type { FacetRequired } from "./facet/Facet.type";
import FacetList from "./facet/FacetList";
import LimiterList from "./facet/LimiterList";

export type FacetSidebarProps<T extends FacetRequired> = {
	available: Omit<FacetRequired & T, "orderBy">;
	active: Omit<FacetRequired & T, "orderBy">;
	onChange: (values: Omit<FacetRequired & T, "orderBy">) => void;
	onReset: () => void;
	isPublicationPage: boolean;
};

export default function ({
	available,
	active,
	onChange,
	onReset,
	isPublicationPage,
}: FacetSidebarProps<FacetRequired>) {
	const t = useTranslator();

	const handleLimiterChange = useCallback(
		(limiters: FacetSidebarProps<FacetRequired>["active"]["limiters"]) => {
			onChange({
				facets: active.facets,
				limiters,
			});
		},
		[active.facets, onChange],
	);

	const handleFacetChange = useCallback(
		(facets: FacetSidebarProps<FacetRequired>["active"]["facets"]) => {
			onChange({
				limiters: active.limiters,
				facets,
			});
		},
		[active.limiters, onChange],
	);

	const handlePrioritizedFacetChange = useCallback(
		(facets: FacetSidebarProps<FacetRequired>["active"]["facets"]) => {
			onChange({
				limiters: active.limiters,
				facets,
			});
		},
		[active.limiters, onChange],
	);

	const halFacet = useMemo(
		() => available.facets?.provider?.find((facet) => facet.name === "HAL"),
		[available.facets],
	);

	const halActive = useMemo(
		() =>
			active.facets?.provider?.some((facet) => facet?.name === halFacet?.name),
		[active.facets, halFacet],
	);

	const arxivFacet = useMemo(
		() => available.facets?.provider?.find((facet) => facet.name === "arXiv"),
		[available.facets],
	);

	const arxivActive = useMemo(
		() =>
			active.facets?.provider?.some(
				(facet) => facet?.name === arxivFacet?.name,
			),
		[active.facets, arxivFacet],
	);

	return (
		<Stack gap={1}>
			<Typography variant="h5" color="text" fontWeight="bold">
				{t("components.facet.title")}
			</Typography>

			{/* Limiter */}
			<LimiterList
				limiters={available.limiters}
				activeLimiters={active.limiters}
				onLimitersChange={handleLimiterChange}
				halFacet={halFacet}
				halActive={halActive}
				arxivFacet={arxivFacet}
				arxivActive={arxivActive}
				onPrioritizedFacetChange={handlePrioritizedFacetChange}
			/>
			{/* Facet */}
			<FacetList
				facets={available.facets}
				activeFacets={active.facets}
				onChange={handleFacetChange}
				isPublicationPage={isPublicationPage}
			/>
			<Button color="error" size="small" variant="text" onClick={onReset}>
				{t("components.facet.reset")}
			</Button>
		</Stack>
	);
}
