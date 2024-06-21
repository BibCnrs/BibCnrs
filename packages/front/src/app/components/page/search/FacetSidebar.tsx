import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useMemo } from "react";
import { useTranslator } from "../../../shared/locales/I18N";

import CustomButton from "../../element/button/CustomButton";
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
		<Paper id="facet">
			<h3 id="facet-title" className="title">
				{t("components.facet.title")}
			</h3>
			<Divider className="facet-divider" />
			<CustomButton sx={{ width: "100%" }} onClick={onReset}>
				{t("components.facet.reset")}
			</CustomButton>
			<Divider className="facet-divider" />
			{/* Limiter */}
			<FacetLimiter
				available={available.limiters}
				active={active.limiters}
				onChange={handleLimiter}
				HALFacet={HALFacet}
				HALIsChecked={HALIsChecked}
				onHALFacetChange={handleFacet}
			/>

			<Divider className="facet-divider" />
			{/* Facet */}

			<FacetFacets
				available={available.facets}
				active={active.facets}
				onChange={handleFacet}
			/>
		</Paper>
	);
}
