import {
	Checkbox,
	FormControlLabel,
	FormLabel,
	TextField,
	Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useTranslator } from "../../../../shared/locales/I18N";
import { useMatomo } from "../../../../shared/matomo";
import type { FacetEntry, FacetRequired } from "./Facet.type";
import FacetTextType from "./FacetTextType";

type FacetLimiterProps = {
	available: FacetRequired["limiters"];
	active?: FacetRequired["limiters"];
	onChange: (value: FacetRequired["limiters"]) => void;
	HALFacet?: FacetEntry;
	HALIsChecked?: boolean;
	onHALFacetChange: ({ provider }: { provider: FacetEntry[] }) => void;
};

export default function FacetLimiter({
	available,
	active,
	onChange,
	HALFacet,
	HALIsChecked,
	onHALFacetChange,
}: FacetLimiterProps) {
	const t = useTranslator();
	const { trackEvent } = useMatomo();

	if (!available) {
		return null;
	}

	let textType = null;
	if (available.reviewed || available.fullText || available.openAccess) {
		const texts: string[] = [];
		let initial: string[] | undefined = undefined;

		if (available.reviewed) {
			texts.push("reviewed");
		}
		if (available.fullText) {
			texts.push("fullText");
		}
		if (available.openAccess) {
			texts.push("openAccess");
		}

		if (active) {
			initial = [];
			if (active.reviewed) {
				initial.push("reviewed");
			}
			if (active.fullText) {
				initial.push("fullText");
			}
			if (active.openAccess) {
				initial.push("openAccess");
			}
		}

		const handleTextType = (values: string[]) => {
			const set = new Set(values);
			if (active) {
				onChange({
					dateRange: active.dateRange,
					fullText: set.has("fullText"),
					openAccess: set.has("openAccess"),
					reviewed: set.has("reviewed"),
				});
				return;
			}
			onChange({
				fullText: set.has("fullText"),
				openAccess: set.has("openAccess"),
				reviewed: set.has("reviewed"),
			});
		};

		textType = (
			<FacetTextType
				texts={texts}
				initial={initial}
				onChange={handleTextType}
			/>
		);
	}

	let dateRange = null;
	if (available.dateRange) {
		let initialRange: { from: number; to: number } | undefined;
		if (active?.dateRange) {
			initialRange = { from: active.dateRange.from, to: active.dateRange.to };
		} else {
			initialRange = {
				from: available.dateRange.from,
				to: available.dateRange.to,
			};
		}

		const handleDateRange = (key: "from" | "to", value: number) => {
			// if value.length < 4, it means the user is typing the year
			// so we don't update the state
			if (value.toString().length < 4) {
				return;
			}
			const currentYear = new Date().getFullYear();
			if (value < 1000 || value > currentYear + 1) {
				return;
			}

			onChange({
				dateRange: {
					...initialRange,
					...active.dateRange,
					[key]: value,
				},
			});
		};

		const labelDateRange = `${t("components.facet.date")} (${
			available.dateRange.from
		} - ${available.dateRange.to})`;

		dateRange = (
			<Box mt={2} mb={2}>
				<FormLabel component="legend">{labelDateRange}</FormLabel>
				<Stack gap={1} direction="row" alignItems="center">
					<TextField
						type="number"
						inputProps={{ min: 1000, max: new Date().getFullYear() + 1 }}
						size="small"
						defaultValue={initialRange.from}
						onChange={(event) =>
							handleDateRange("from", Number.parseInt(event.target.value))
						}
					/>
					<Typography>{t("components.facet.to")}</Typography>
					<TextField
						type="number"
						inputProps={{ min: 1000, max: new Date().getFullYear() + 1 }}
						size="small"
						defaultValue={initialRange.to}
						onChange={(event) =>
							handleDateRange("to", Number.parseInt(event.target.value))
						}
					/>
				</Stack>
			</Box>
		);
	}

	const handleHALChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		trackEvent("Facet", "hal", event.target.checked ? "on" : "off");
		if (event.target.checked) {
			return onHALFacetChange({
				provider: [HALFacet],
			});
		}

		return onHALFacetChange({
			provider: [],
		});
	};

	return (
		<Stack>
			{textType}
			{HALFacet && (
				<FormControlLabel
					key={"HAL"}
					control={
						<Checkbox
							checked={HALIsChecked}
							onChange={handleHALChange}
							inputProps={{ "aria-label": "controlled" }}
							size="small"
						/>
					}
					label="HAL"
				/>
			)}
			{dateRange}
		</Stack>
	);
}
