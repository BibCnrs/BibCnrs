import { Stack } from "@mui/system";
import { Fragment } from "react";
import type { ReactNode } from "react";
import type { FacetEntry, FacetRequired } from "./Facet.type";
import FacetSearchList from "./FacetSearchList";

type FacetFacetsProps = {
	available: FacetRequired["facets"];
	active?: FacetRequired["facets"];
	onChange: (value: FacetRequired["facets"]) => void;
};

export default function FacetFacets({
	available,
	active,
	onChange,
}: FacetFacetsProps) {
	if (!available) {
		return null;
	}

	const keys = new Set<string>(Object.keys(available));

	if (active) {
		Object.keys(active).forEach((key) => {
			keys.add(key);
		});
	}

	const handleFacet = (values: FacetEntry[], key: string) => {
		if (active) {
			onChange({
				...active,
				[key]: values,
			});
			return;
		}
		onChange({
			[key]: values,
		});
	};

	const facets: ReactNode[] = [];
	keys.forEach((key) => {
		const facet: FacetEntry[] | undefined = available[key] ?? [];
		if (facet) {
			const component = (
				<Fragment key={key}>
					<FacetSearchList
						name={key}
						facets={facet}
						initial={active ? active[key] : undefined}
						onChange={(values) => {
							handleFacet(values, key);
						}}
					/>
				</Fragment>
			);
			facets.push(component);
		}
	});

	return <Stack gap={1}>{facets}</Stack>;
}
