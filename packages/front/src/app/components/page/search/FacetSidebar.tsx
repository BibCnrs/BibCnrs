import { useMemo } from "react";
import { useTranslator } from "../../../shared/locales/I18N";

import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import type { FacetRequired } from "./facet/Facet.type";
import FacetFacets from "./facet/FacetFacets";
import FacetLimiter from "./facet/FacetLimiter";

export type FacetSidebarProps<T extends FacetRequired> = {
	available: Omit<FacetRequired & T, "orderBy">;
	active: Omit<FacetRequired & T, "orderBy">;
	onChange: (values: Omit<FacetRequired & T, "orderBy">) => void;
	onReset: () => void;
};

export default function ({
	available,
	active,
	onChange,
	onReset,
}: FacetSidebarProps<FacetRequired>) {
	const t = useTranslator();

	const handleLimiter = (
		limiters: FacetSidebarProps<FacetRequired>["active"]["limiters"],
	) => {
		onChange({
			facets: active.facets,
			limiters,
		});
	};

	const handleFacet = (
		facets: FacetSidebarProps<FacetRequired>["active"]["facets"],
	) => {
		onChange({
			limiters: active.limiters,
			facets,
		});
	};

	const HALFacet = useMemo(
		() => available.facets?.provider?.find((facet) => facet.name === "HAL"),
		[available.facets],
	);

	const HALIsChecked = useMemo(
		() =>
			active.facets?.provider?.some((facet) => facet?.name === HALFacet?.name),
		[active.facets, HALFacet],
	);

	return (
		<Stack gap={1}>
			<Typography variant="h5" color="text" fontWeight="bold">
				{t("components.facet.title")}
			</Typography>

			{/* Limiter */}
			<FacetLimiter
				available={available.limiters}
				active={active.limiters}
				onChange={handleLimiter}
				HALFacet={HALFacet}
				HALIsChecked={HALIsChecked}
				onHALFacetChange={handleFacet}
			/>
			{/* Facet */}
			<FacetFacets
				available={available.facets}
				active={active.facets}
				onChange={handleFacet}
			/>
			<Button
				color="error"
				size="small"
				variant="text"
				onClick={onReset}
				sx={{
					width: "auto",
					textTransform: "none",
					justifyContent: "flex-start",
				}}
			>
				{t("components.facet.reset")}
			</Button>
		</Stack>
	);
}
