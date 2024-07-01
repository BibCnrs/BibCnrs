import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
	type FormEvent,
	Fragment,
	useCallback,
	useMemo,
	useState,
} from "react";
import { useTranslator } from "../../../shared/locales/I18N";
import { uuidv7 } from "../../../shared/uuidv7";
import ArticleAdvancedSearchItem, {
	FIELDS,
	OPERATORS,
	type AdvancedSearchItemValue,
} from "./ArticleAdvancedSearchItem";

type ArticleAdvancedSearchProps = {
	open: boolean;
	onClose: (query?: string) => void;
};

const ITEM_DEFAULT: Pick<
	AdvancedSearchItemValue,
	"operator" | "field" | "value"
> = {
	operator: null,
	field: "AU",
	value: "",
};

export default function ArticleAdvancedSearch({
	open,
	onClose,
}: ArticleAdvancedSearchProps) {
	const t = useTranslator();

	const [items, setItems] = useState<AdvancedSearchItemValue[]>([
		{
			...ITEM_DEFAULT,
			id: uuidv7(),
		},
	]);

	const humanReadableSearch = useMemo(() => {
		const searchLines: AdvancedSearchItemValue[][] = [[items[0]]];

		for (let i = 1; i < items.length; i++) {
			const item = items[i];
			if (item.operator === "OR") {
				searchLines.push([]);
			}
			searchLines.at(-1).push(items[i]);
		}

		return searchLines;
	}, [items]);

	const handleChange = useCallback((value: AdvancedSearchItemValue) => {
		setItems((prev) =>
			prev.map((item) => (item.id === value.id ? value : item)),
		);
	}, []);

	const handleAdd = useCallback((item: Pick<AdvancedSearchItemValue, "id">) => {
		setItems((currentItems) => {
			const index = currentItems.findIndex((i) => i.id === item.id);
			if (index === -1) {
				return currentItems;
			}

			const sliceIndex = index + 1;
			return [
				...currentItems.slice(0, sliceIndex),
				{
					...ITEM_DEFAULT,
					operator: "AND",
					id: uuidv7(),
				},
				...currentItems.slice(sliceIndex),
			];
		});
	}, []);

	const handleRemove = useCallback(
		(item: Pick<AdvancedSearchItemValue, "id">) => {
			setItems((currentItems) => {
				return currentItems
					.filter((i) => i.id !== item.id)
					.map((item, index) => {
						if (index === 0) {
							return {
								...item,
								operator: null,
							};
						}
						return item;
					});
			});
		},
		[],
	);

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			const itemsWithValue = items
				.map((item) => ({ ...item, value: item.value.trim() }))
				.filter((item) => item.value !== "");

			if (itemsWithValue.length === 0) {
				onClose?.();
				return;
			}

			const query = itemsWithValue
				.map(({ operator, field, value }) => {
					return `${operator ?? ""} (${field} ${value.trim()})`;
				})
				.join(" ");

			onClose?.(query);
		},
		[onClose, items],
	);

	return (
		<Dialog open={open} keepMounted onClose={onClose} fullWidth maxWidth="lg">
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t("components.advancedSearch.modalTitle")}</DialogTitle>
				<IconButton
					onClick={() => onClose()}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>

				<DialogContent>
					<Stack gap={2}>
						<Stack gap={1}>
							{items.map((item, index) => (
								<ArticleAdvancedSearchItem
									{...item}
									key={item.id}
									onChange={handleChange}
									onAdd={() => handleAdd(item)}
									onRemove={() => handleRemove(item)}
									hasRemoveButton={items.length > 1}
								/>
							))}
						</Stack>

						<Divider />

						<Stack
							gap={1}
							sx={{
								overflowX: "auto",
							}}
						>
							<Typography variant="h3" fontSize={16} color="primary">
								{t("components.advancedSearch.humanQuery")}
							</Typography>
							{humanReadableSearch.map((line, index) => (
								<Stack
									key={line.at(0).id}
									gap={1}
									direction="row"
									sx={{
										marginInlineStart: index > 0 ? 4 : 0,
										flexWrap: "nowrap",
										whiteSpace: "nowrap",
									}}
								>
									{line.map((item, index) => (
										<Fragment key={item.id}>
											{item.operator && (
												<Typography fontWeight={700} color="primary">
													{t(
														`components.advancedSearch.${OPERATORS[item.operator]}`,
													)}
												</Typography>
											)}
											<Typography fontWeight={700}>
												{t(`components.advancedSearch.${FIELDS[item.field]}`)}:
											</Typography>
											<Typography>{item.value}</Typography>
										</Fragment>
									))}
								</Stack>
							))}
						</Stack>
					</Stack>
				</DialogContent>

				<DialogActions>
					<Button type="submit" variant="contained">
						{t("components.advancedSearch.search")}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
