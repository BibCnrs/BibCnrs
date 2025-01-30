import AddIcon from "@mui/icons-material/PlaylistAdd";
import RemoveIcon from "@mui/icons-material/PlaylistRemove";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import {
	type AdvancedSearchGroup,
	OPERATORS,
	type Operator,
	useAdvancedSearchContext,
} from "../../../context/AdvancedSearchContext";
import { useTranslator } from "../../../shared/locales/I18N";
import ArticleAdvancedSearchItem from "./ArticleAdvancedSearchItem";

export type ArticleAdvancedSearchItemProps = {
	group: AdvancedSearchGroup;
	hasRemoveButton: boolean;
};

export default function ArticleAdvancedSearchGroup({
	group,
	hasRemoveButton,
}: ArticleAdvancedSearchItemProps) {
	const t = useTranslator();

	const {
		updateGroup,
		addGroup,
		removeGroup,
		updateItem,
		addItem,
		removeItem,
	} = useAdvancedSearchContext();

	return (
		<Stack direction="row" gap={2} alignItems="center">
			{group.operator ? (
				<FormControl
					sx={{
						width: "96px",
					}}
					size="small"
				>
					<InputLabel aria-label="operateur">{t("components.advancedSearch.operator")}</InputLabel>
					<Select
						value={group.operator}
						label={t("components.advancedSearch.operator")}
						onChange={(e) => {
							updateGroup({
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
						group={group}
						item={item}
						key={item.id}
						onChange={(item) => updateItem(group, item)}
						onAdd={() => addItem(group, item)}
						onRemove={() => removeItem(group, item)}
						hasRemoveButton={group.items.length > 1}
					/>
				))}
			</Stack>

			<IconButton
				onClick={() => addGroup(group)}
				aria-label={t("components.advancedSearch.addGroup")}
			>
				<AddIcon />
			</IconButton>

			<IconButton
				disabled={!hasRemoveButton}
				onClick={() => removeGroup(group)}
				aria-label={t("components.advancedSearch.removeGroup")}
			>
				<RemoveIcon />
			</IconButton>
		</Stack>
	);
}
