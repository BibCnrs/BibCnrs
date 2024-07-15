import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslator } from "../../../shared/locales/I18N";
import type {
	DatabaseItemProps,
	TypeDatabaseEnum,
} from "../../../shared/types/data.types";
import type { INITIAL_FILTER } from "./filters";

export default function FilterTab({
	setFilters,
	filters,
	databases,
}: {
	setFilters: (value) => void;
	filters: typeof INITIAL_FILTER;
	databases: DatabaseItemProps[];
}) {
	const t = useTranslator();
	const handleChange = (filter) => {
		setFilters((prev) => {
			const newFilters = prev.map((item) => {
				if (item.props === filter.props) {
					if (item.target && filter.target && item.target === filter.target) {
						return {
							...item,
							value: !item.value,
						};
					}
					if (!item.target && !filter.target) {
						return {
							...item,
							value: !item.value,
						};
					}
				}
				return item;
			});

			return newFilters;
		});
	};

	const sections = [...new Set(filters.map((item) => item.section))];

	// for each filter, count the number of databases that have this filter and set in key for each filter
	const countsByFilter = [];
	for (let i = 0; i < filters.length; i++) {
		const filter = filters[i];
		const count = databases.filter((value) => {
			if (filter.props === "type") {
				return value[filter.props].includes(filter.target as TypeDatabaseEnum);
			}

			if (filter.invert) {
				return value[filter.invert] === false;
			}

			return value[filter.props] === true;
		}).length;

		const key =
			filter.props === "type"
				? `${filter.props}_${filter.target}`
				: filter.props;
		countsByFilter[key] = count;
	}

	const getLabel = (filter) => {
		if (filter.props === "type") {
			return t(`pages.database.filters.${filter.props}_${filter.target}`);
		}
		return t(`pages.database.filters.${filter.props}`);
	};

	const getLabelCount = (filter) => {
		return countsByFilter[
			filter.props === "type"
				? `${filter.props}_${filter.target}`
				: filter.props
		];
	};

	return (
		<FormGroup sx={{ position: "sticky", top: 0 }}>
			<Typography variant="h6" fontWeight="bold">
				{t("pages.database.filters.title")}
			</Typography>
			{sections.map((section) => {
				const filteredItems = filters.filter(
					(item) => item.section === section && getLabelCount(item) > 0,
				);

				if (filteredItems.length === 0) {
					return null;
				}
				return (
					<Stack key={section} mb={1}>
						<FormLabel component="legend" sx={{ fontWeight: 700 }}>
							{t(`pages.database.filters.${section}`)}
						</FormLabel>
						{filters
							.filter(
								(item) => item.section === section && getLabelCount(item) > 0,
							)
							.map((filter, index) => (
								<FormControlLabel
									key={`${filter.props}-${index}`}
									control={
										<Checkbox
											checked={filter.value}
											onChange={() => handleChange(filter)}
										/>
									}
									label={`${getLabel(filter)} (${getLabelCount(filter)})`}
								/>
							))}
					</Stack>
				);
			})}
		</FormGroup>
	);
}
