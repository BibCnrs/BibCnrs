import AddIcon from "@mui/icons-material/PlaylistAdd";
import RemoveIcon from "@mui/icons-material/PlaylistRemove";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useTranslator } from "../../../shared/locales/I18N";
import ArticleAdvancedSearchItem, {
	type Operator,
	type AdvancedSearchItem,
	OPERATORS,
} from "./ArticleAdvancedSearchItem";

export type AdvancedSearchGroup = {
	id: string;
	operator: Operator | null;
	items: AdvancedSearchItem[];
};

export type ArticleAdvancedSearchItemProps = {
	group: AdvancedSearchGroup;
	hasRemoveButton: boolean;

	onGroupChange(group: Pick<AdvancedSearchGroup, "id" | "operator">): void;
	onAddGoup(): void;
	onRemoveGroup(): void;

	onItemChange(group: AdvancedSearchGroup, value: AdvancedSearchItem): void;
	onAddItem(
		group: Pick<AdvancedSearchGroup, "id">,
		after: Pick<AdvancedSearchItem, "id">,
	): void;
	onRemoveItem(
		group: Pick<AdvancedSearchGroup, "id">,
		item: Pick<AdvancedSearchItem, "id">,
	): void;
};

export default function ArticleAdvancedSearchGroup({
	group,
	hasRemoveButton,
	onGroupChange,
	onAddGoup,
	onRemoveGroup,
	onItemChange,
	onAddItem,
	onRemoveItem,
}: ArticleAdvancedSearchItemProps) {
	const t = useTranslator();

	return (
		<Stack direction="row" gap={2} alignItems="center">
			{group.operator ? (
				<FormControl
					sx={{
						width: "96px",
					}}
					size="small"
				>
					<InputLabel>{t("components.advancedSearch.operator")}</InputLabel>
					<Select
						value={group.operator}
						label={t("components.advancedSearch.operator")}
						onChange={(e) => {
							onGroupChange({
								id: group.id,
								operator: e.target.value as Operator,
							});
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

			<Stack
				gap={1}
				flexGrow={1}
				sx={{
					padding: 1,
					backgroundColor: (theme) => theme.palette.info.light,
				}}
			>
				{group.items.map((item) => (
					<ArticleAdvancedSearchItem
						item={item}
						key={item.id}
						onChange={(item) => onItemChange(group, item)}
						onAdd={() => onAddItem(group, item)}
						onRemove={() => onRemoveItem(group, item)}
						hasRemoveButton={group.items.length > 1}
					/>
				))}
			</Stack>

			<IconButton onClick={onAddGoup}>
				<AddIcon />
			</IconButton>

			<IconButton disabled={!hasRemoveButton} onClick={onRemoveGroup}>
				<RemoveIcon />
			</IconButton>
		</Stack>
	);
}
