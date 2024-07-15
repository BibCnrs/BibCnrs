import { FormLabel, Stack, TextField, Typography } from "@mui/material";
import { type KeyboardEvent, useEffect, useState } from "react";
import { useTranslator } from "../../../../shared/locales/I18N";

type FacetDateRangeProps = {
	from: number;
	to: number;
	handleDateRange: (key: "from" | "to", value: number) => void;
};

export default function FacetDateRange({
	from: initialFrom,
	to: initialTo,
	handleDateRange,
}: FacetDateRangeProps) {
	const t = useTranslator();

	const [from, setFrom] = useState(initialFrom);
	const [to, setTo] = useState(initialTo);

	useEffect(() => {
		setFrom(initialFrom);
	}, [initialFrom]);

	useEffect(() => {
		setTo(initialTo);
	}, [initialTo]);

	const handleEnter = (
		target: "from" | "to",
		key: KeyboardEvent<HTMLInputElement>["key"],
	) => {
		if (key === "Enter") {
			handleDateRange(target, target === "from" ? from : to);
		}
	};

	return (
		<Stack gap={0.5} mt={1} mb={1}>
			<FormLabel component="legend">
				{t("components.facet.date", { from, to })}
			</FormLabel>

			<Stack gap={1} direction="row" alignItems="center">
				<TextField
					name="from"
					type="number"
					inputProps={{ min: 1000, max: new Date().getFullYear() + 1 }}
					size="small"
					value={from}
					onChange={(event) => setFrom(Number.parseInt(event.target.value, 10))}
					onBlur={() => handleDateRange("from", from)}
					onKeyUp={(event) => handleEnter("from", event.key)}
				/>
				<Typography>{t("components.facet.to")}</Typography>
				<TextField
					name="to"
					type="number"
					inputProps={{ min: 1000, max: new Date().getFullYear() + 1 }}
					size="small"
					value={to}
					onChange={(event) => setTo(Number.parseInt(event.target.value, 10))}
					onBlur={() => handleDateRange("to", to)}
					onKeyUp={(event) => handleEnter("to", event.key)}
				/>
			</Stack>
		</Stack>
	);
}
