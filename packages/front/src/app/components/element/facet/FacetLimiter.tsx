import {
	Checkbox,
	FormControlLabel,
	FormLabel,
	TextField,
	Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/system";
import { memo } from "react";
import { useTranslator } from "../../../shared/locales/I18N";
import type {
	FacetLimiterProps,
	FacetRequired,
} from "../../../shared/types/props.types";
import TextType from "./TextType";

const FacetLimiter = ({
	available,
	active,
	onChange,
	HALFacet,
	HALIsChecked,
	onHALFacetChange,
}: FacetLimiterProps<FacetRequired>) => {
	const t = useTranslator();
	if (!available) {
		return null;
	}

	let divider = false;
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
			<TextType texts={texts} initial={initial} onChange={handleTextType} />
		);
		divider = true;
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
			<>
				{divider ? <Divider className="facet-divider" /> : null}
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
			</>
		);
	}

	const handleHALChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
		<div>
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
		</div>
	);
};

export default memo(FacetLimiter);
