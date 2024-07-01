import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCallback } from "react";
import { useTranslator } from "../../../shared/locales/I18N";

export const OPERATORS = {
	AND: "and",
	OR: "or",
	NOT: "not",
} as const;

export const FIELDS = {
	AU: "author",
	DO: "doi",
	IB: "isbn",
	ZI: "issn",
	SU: "keywords",
	AB: "abstract",
	TI: "title",
	SO: "source",
} as const;

export type ArticleAdvancedSearchItemProps = {
	id: string;
	operator: keyof typeof OPERATORS | null;
	field: keyof typeof FIELDS;
	value: string;

	hasRemoveButton?: boolean;
	onChange(value: AdvancedSearchItemValue): void;
	onAdd(): void;
	onRemove(): void;
};

export type AdvancedSearchItemValue = Omit<
	ArticleAdvancedSearchItemProps,
	"hasRemoveButton" | "onChange" | "onAdd" | "onRemove"
>;

export default function ArticleAdvancedSearchItem({
	hasRemoveButton = false,
	id,
	operator,
	field,
	value,
	onChange,
	onAdd,
	onRemove,
}: ArticleAdvancedSearchItemProps) {
	const t = useTranslator();

	const handleChange = useCallback(
		(prop: string, newValue: string) => {
			onChange({
				id,
				operator,
				field,
				value,
				[prop]: newValue,
			});
		},
		[id, operator, field, value, onChange],
	);

	return (
		<Stack direction="row" gap={1} alignItems="center">
			{operator ? (
				<FormControl
					sx={{
						width: "128px",
					}}
					size="small"
				>
					<InputLabel>{t("components.advancedSearch.operator")}</InputLabel>
					<Select
						value={operator}
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
						width: "128px",
					}}
				/>
			)}
			<FormControl
				sx={{
					width: "192px",
				}}
				size="small"
			>
				<InputLabel>{t("components.advancedSearch.field")}</InputLabel>
				<Select
					label={t("components.advancedSearch.field")}
					value={field}
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
				value={value}
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
