import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Stack } from "@mui/system";
import { useCallback } from "react";
import { useTranslator } from "../../../../shared/locales/I18N";
import type { FacetEntry, FacetRequired } from "./Facet.type";
import FacetSearchList from "./FacetSearchList";

const MOST_USED_FACETS = ["subject", "journal", "source"];
const LEAST_USED_FACETS = ["language", "publisher", "provider", "collection"];

type FacetFacetsProps = {
	facets: FacetRequired["facets"];
	activeFacets?: FacetRequired["facets"];
	onChange: (facets: FacetRequired["facets"]) => void;
};

export default function FacetList({
	facets,
	activeFacets = {},
	onChange,
}: FacetFacetsProps) {
	const t = useTranslator();

	const handleFacetChange = useCallback(
		(values: FacetEntry[], key: string) => {
			onChange({
				...activeFacets,
				[key]: values,
			});
		},
		[activeFacets, onChange],
	);

	if (!facets) {
		return null;
	}

	return (
		<Stack gap={1}>
			{MOST_USED_FACETS.map((facet) => (
				<FacetSearchList
					key={facet}
					name={facet}
					options={facets[facet] ?? []}
					value={activeFacets[facet]}
					onChange={(values) => {
						handleFacetChange(values, facet);
					}}
				/>
			))}
			<Accordion
				sx={{
					background: "none",
					boxShadow: "none",
					border: 0,
					margin: 0,
					padding: 0,
				}}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					sx={{
						border: 0,
						margin: 0,
						padding: 0,
					}}
				>
					{t("components.facet.more")}
				</AccordionSummary>
				<AccordionDetails
					sx={{
						padding: 0,
					}}
				>
					<Stack gap={1}>
						{LEAST_USED_FACETS.map((facet) => (
							<FacetSearchList
								key={facet}
								name={facet}
								options={facets[facet] ?? []}
								value={activeFacets[facet]}
								onChange={(values) => {
									handleFacetChange(values, facet);
								}}
							/>
						))}
					</Stack>
				</AccordionDetails>
			</Accordion>
		</Stack>
	);
}