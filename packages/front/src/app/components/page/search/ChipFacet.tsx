import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import styled from "@mui/material/styles/styled";
import { memo, useMemo } from "react";
import { useTranslator } from "../../../shared/locales/I18N";
import type { ChipFacetProps } from "../../../shared/types/props.types";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	"& .MuiToggleButtonGroup-grouped": {
		margin: theme.spacing(0.1),
		minWidth: "120px",
		"&:not(:first-of-type)": {
			marginLeft: "10px",
			borderRadius: "20px",
		},
		"&:first-of-type": {
			borderRadius: "20px",
		},
	},
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
	"&.MuiToggleButton-root": {
		fontWeight: "900",
		border: 0,
		textTransform: "uppercase",
		padding: "5px 20px",
		color: "white",
	},
	":hover": {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.text.primary,
	},
	"&.Mui-selected, &.Mui-selected:hover": {
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.secondary.main,
	},
}));

const ChipFacet = ({
	value,
	values,
	onChange,
	isDomain = true,
}: ChipFacetProps) => {
	const t = useTranslator();

	const formattedValues = useMemo(() => {
		if (values.length > 0) {
			return values.map((v) => {
				if (typeof v === "string") {
					return {
						label: v,
						value: v,
					};
				}
				return v;
			});
		}
		return [];
	}, [values]);

	return (
		<StyledToggleButtonGroup
			size="small"
			value={value}
			exclusive
			onChange={onChange}
			sx={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				gap: "10px",
			}}
		>
			{formattedValues.map((v) => (
				<StyledToggleButton key={v.value} value={v.value}>
					{isDomain
						? t(`components.domains.${v.label}`)
						: t(`components.facet.chips.${v.label}`)}
				</StyledToggleButton>
			))}
		</StyledToggleButtonGroup>
	);
};

export default memo(ChipFacet);
