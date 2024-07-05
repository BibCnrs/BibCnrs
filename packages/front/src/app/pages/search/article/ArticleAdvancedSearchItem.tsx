import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCallback } from "react";
import {
	type AdvancedSearchGroup,
	type AdvancedSearchItem,
	FIELDS,
	OPERATORS,
} from "../../../context/AdvancedSearchContext";
import { useTranslator } from "../../../shared/locales/I18N";

export type ArticleAdvancedSearchItemProps = {
	group: AdvancedSearchGroup;
	item: AdvancedSearchItem;
	hasRemoveButton?: boolean;
	onChange(value: AdvancedSearchItem): void;
	onAdd(): void;
	onRemove(): void;
};

export default function ArticleAdvancedSearchItem({
	hasRemoveButton = false,
	item,
	onChange,
	onAdd,
	onRemove,
}: ArticleAdvancedSearchItemProps) {
	const t = useTranslator();

	const handleChange = useCallback(
		(prop: string, newValue: string) => {
			onChange({
				...item,
				[prop]: newValue,
			});
		},
		[item, onChange],
	);

	return (
		<Stack direction="row" gap={1} alignItems="center">
			{item.operator ? (
				<FormControl
					sx={{
						width: "96px",
					}}
					size="small"
				>
					<InputLabel>{t("components.advancedSearch.operator")}</InputLabel>
					<Select
						value={item.operator}
						label={t("components.advancedSearch.operator")}
						onChange={(e) => {
							handleChange("operator", e.target.value);
						}}
					>
						{Object.keys(OPERATORS).map((operator) => (
							<MenuItem key={operator} value={operator}>
								{t(`components.advancedSearch.${OPERATORS[operator]}`)}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			) : (
				<Box
					sx={{
						width: "96px",
					}}
				/>
			)}
			<FormControl
				sx={{
					width: "128px",
				}}
				size="small"
			>
				<InputLabel>{t("components.advancedSearch.field")}</InputLabel>
				<Select
					label={t("components.advancedSearch.field")}
					value={item.field}
					onChange={(e) => {
						handleChange("field", e.target.value);
					}}
				>
					{Object.keys(FIELDS).map((field) => (
						<MenuItem key={field} value={field}>
							{t(`components.advancedSearch.${FIELDS[field]}`)}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				sx={{
					flexGrow: 1,
				}}
				value={item.value}
				onChange={(e) => {
					handleChange("value", e.target.value);
				}}
				size="small"
			/>
			<IconButton onClick={onAdd}>
				<AddIcon />
			</IconButton>
			<IconButton disabled={!hasRemoveButton} onClick={onRemove}>
				<RemoveIcon />
			</IconButton>
		</Stack>
	);
}
