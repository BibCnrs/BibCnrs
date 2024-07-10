import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { SyntheticEvent } from "react";
import { useTranslator } from "../../../../shared/locales/I18N";
import type { FacetEntry } from "./Facet.type";

type FacetSearchListProps = {
	name: string;
	options: FacetEntry[];
	value?: FacetEntry[];
	onChange: (value: FacetEntry[]) => void;
};

export default function FacetSearchList({
	name,
	options,
	value = [],
	onChange,
}: FacetSearchListProps) {
	const t = useTranslator();

	const handleChange = (event: SyntheticEvent, value: FacetEntry[]) => {
		onChange(value);
	};

	const handleGroupBy = (option: FacetEntry): string => {
		if (option.name.toUpperCase() === "HAL") {
			return "HAL";
		}
		const firstLetter = option.name[0].toUpperCase();
		return /[0-9]/.test(firstLetter) ? "0-9" : firstLetter;
	};

	const handleIsOptionEqualToValue = (
		option: FacetEntry,
		value: FacetEntry,
	) => {
		return option.name === value.name;
	};

	return (
		<Autocomplete
			size="small"
			multiple
			options={options}
			groupBy={handleGroupBy}
			getOptionLabel={(option) => `${option.name} (${option.count})`}
			value={value}
			isOptionEqualToValue={handleIsOptionEqualToValue}
			filterSelectedOptions
			renderInput={(params) => (
				<TextField
					{...params}
					label={`${t(`components.facet.${name}`)} - ${options.length}`}
				/>
			)}
			onChange={handleChange}
		/>
	);
}
