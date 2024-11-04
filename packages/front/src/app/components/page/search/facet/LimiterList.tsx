import { Checkbox, FormControlLabel } from "@mui/material";
import { Stack } from "@mui/system";
import { useCallback, useMemo } from "react";
import { useMatomo } from "../../../../shared/matomo";
import type { FacetEntry, FacetRequired } from "./Facet.type";
import FacetCheckBox from "./FacetCheckBox";
import FacetDateRange from "./FacetDateRange";

type LimiterListProps = {
	limiters: FacetRequired["limiters"];
	activeLimiters?: FacetRequired["limiters"];
	halFacet?: FacetEntry;
	halActive?: boolean;
	arxivFacet?: FacetEntry;
	arxivActive?: boolean;
	onLimitersChange: (value: FacetRequired["limiters"]) => void;
	onPrioritizedFacetChange: ({ provider }: { provider: FacetEntry[] }) => void;
};

export default function LimiterList({
	limiters,
	activeLimiters,
	halFacet,
	halActive,
	arxivFacet,
	arxivActive,
	onLimitersChange,
	onPrioritizedFacetChange,
}: LimiterListProps) {
	const { trackEvent } = useMatomo();

	const dateRange = useMemo(() => {
		if (activeLimiters?.dateRange && limiters?.dateRange) {
			return {
				from: Math.max(activeLimiters.dateRange.from, limiters.dateRange.from),
				to: Math.min(activeLimiters.dateRange.to, limiters.dateRange.to),
			};
		}

		if (activeLimiters?.dateRange) {
			return {
				from: activeLimiters.dateRange.from,
				to: activeLimiters.dateRange.to,
			};
		}

		if (limiters?.dateRange) {
			return {
				from: limiters.dateRange.from,
				to: limiters.dateRange.to,
			};
		}

		return undefined;
	}, [limiters, activeLimiters]);

	const handleLimiterChange = useCallback(
		(field: string) => {
			const limiter = { ...activeLimiters };
			if (limiter[field]) {
				delete limiter[field];
			} else {
				limiter[field] = true;
			}
			onLimitersChange(limiter);
		},
		[activeLimiters, onLimitersChange],
	);

	const handleHalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		trackEvent("Facet", "hal", event.target.checked ? "on" : "off");
		if (event.target.checked) {
			return onPrioritizedFacetChange({
				provider: [halFacet],
			});
		}

		return onPrioritizedFacetChange({
			provider: [],
		});
	};

	const handleArxivChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		trackEvent("Facet", "arXiv", event.target.checked ? "on" : "off");
		if (event.target.checked) {
			return onPrioritizedFacetChange({
				provider: [arxivFacet],
			});
		}

		return onPrioritizedFacetChange({
			provider: [],
		});
	};

	const handleDateRange = useCallback(
		(key: "from" | "to", value: number) => {
			// if value.length < 4, it means the user is typing the year
			// so we don't update the state
			if (value.toString().length < 4) {
				return;
			}

			const currentYear = new Date().getFullYear();
			if (value < 1000 || value > currentYear + 1) {
				return;
			}

			trackEvent("Facet", "dateRange", key, value);

			onLimitersChange({
				dateRange: {
					...dateRange,
					[key]: value,
				},
			});
		},
		[dateRange, trackEvent, onLimitersChange],
	);

	return (
		<Stack>
			<FacetCheckBox
				field="fullText"
				checked={!!activeLimiters?.fullText}
				onChange={handleLimiterChange}
			/>
			<FacetCheckBox
				field="openAccess"
				checked={!!activeLimiters?.openAccess}
				onChange={handleLimiterChange}
			/>
			<Stack spacing={0.2} sx={{ pl: 2 }}>
				{halFacet && (
					<FormControlLabel
						key={"HAL"}
						control={
							<Checkbox
								checked={halActive}
								onChange={handleHalChange}
								inputProps={{ "aria-label": "controlled" }}
								size="small"
							/>
						}
						label="HAL"
					/>
				)}
				{arxivFacet && (
					<FormControlLabel
						key={"arXiv"}
						control={
							<Checkbox
								checked={arxivActive}
								onChange={handleArxivChange}
								inputProps={{ "aria-label": "controlled" }}
								size="small"
							/>
						}
						label="arXiv"
					/>
				)}
			</Stack>
			<FacetCheckBox
				field="reviewed"
				checked={!!activeLimiters?.reviewed}
				onChange={handleLimiterChange}
			/>
			{dateRange && (
				<FacetDateRange
					from={dateRange?.from}
					to={dateRange?.to}
					handleDateRange={handleDateRange}
				/>
			)}
		</Stack>
	);
}
