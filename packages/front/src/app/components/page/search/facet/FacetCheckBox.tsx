import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { type ChangeEvent, useCallback } from "react";
import { useTranslator } from "../../../../shared/locales/I18N";
import { useMatomo } from "../../../../shared/matomo";

type FacetCheckBoxProps = {
	field: string;
	checked: boolean;
	onChange: (field: string) => void;
};

export default function FacetCheckBox({
	field,
	onChange,
	checked,
}: FacetCheckBoxProps) {
	const t = useTranslator();
	const { trackEvent } = useMatomo();

	const handleChange = useCallback(
		(_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
			trackEvent("Facet", field, checked ? "on" : "off");
			onChange(field);
		},
		[field, trackEvent, onChange],
	);

	return (
		<FormControl size="small">
			<FormControlLabel
				control={
					<Checkbox onChange={handleChange} checked={checked} size="small" />
				}
				label={t(`components.facet.${field}`)}
			/>
		</FormControl>
	);
}
