import Divider from "@mui/material/Divider";
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

	let divider = false;
	const facets: ReactNode[] = [];
	keys.forEach((key) => {
		const facet: FacetEntry[] | undefined = available[key] ?? [];
		if (facet) {
			const component = (
				<Fragment key={key}>
					{divider ? <Divider className="facet-divider" /> : null}
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
			divider = true;
			facets.push(component);
		}
	});

	return <div>{facets}</div>;
}
