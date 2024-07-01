import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FormEvent, useCallback, useMemo, useState } from "react";
import { useTranslator } from "../../../shared/locales/I18N";
import { uuidv7 } from "../../../shared/uuidv7";
import ArticleAdvancedSearchGroup, {
	type AdvancedSearchGroup,
} from "./ArticleAdvancedSearchGroup";
import ArticleAdvancedSearchHumanReadable from "./ArticleAdvancedSearchHumanReadable";
import type { AdvancedSearchItem } from "./ArticleAdvancedSearchItem";

type ArticleAdvancedSearchProps = {
	open: boolean;
	onClose: (query?: string) => void;
};

const ITEM_DEFAULT: Pick<AdvancedSearchItem, "operator" | "field" | "value"> = {
	operator: null,
	field: "AU",
	value: "",
};

const Form = styled.form`
	height: 100%;
	display: flex;
	flex-direction: column;`;

export default function ArticleAdvancedSearch({
	open,
	onClose,
}: ArticleAdvancedSearchProps) {
	const t = useTranslator();

	const [groups, setGroups] = useState<AdvancedSearchGroup[]>([
		{
			id: uuidv7(),
			operator: null,
			items: [
				{
					...ITEM_DEFAULT,
					id: uuidv7(),
				},
			],
		},
	]);

	const humanReadableSearch = useMemo(
		() =>
			groups.map((group) => {
				const searchLines: AdvancedSearchItem[][] = [[group.items[0]]];

				for (let i = 1; i < group.items.length; i++) {
					const item = group.items[i];
					if (item.operator === "OR") {
						searchLines.push([]);
					}
					searchLines.at(-1).push(group.items[i]);
				}

				return {
					id: group.id,
					operator: group.operator,
					searchLines,
				};
			}),
		[groups],
	);

	const handleGroupChange = useCallback(
		(group: Pick<AdvancedSearchGroup, "id" | "operator">) => {
			setGroups((groups) =>
				groups.map((g) => {
					if (g.id !== group.id) {
						return g;
					}
					return {
						...g,
						operator: group.operator,
					};
				}),
			);
		},
		[],
	);
	const handleGroupAdd = useCallback(
		(after: Pick<AdvancedSearchGroup, "id">) => {
			setGroups((groups) => {
				const index = groups.findIndex((i) => i.id === after.id);
				if (index === -1) {
					return groups;
				}

				const sliceIndex = index + 1;
				return [
					...groups.slice(0, sliceIndex),
					{
						id: uuidv7(),
						operator: "AND",
						items: [
							{
								...ITEM_DEFAULT,
								id: uuidv7(),
							},
						],
					},
					...groups.slice(sliceIndex),
				];
			});
		},
		[],
	);

	const handleGroupRemove = useCallback(
		(group: Pick<AdvancedSearchGroup, "id">) => {
			setGroups((groups) =>
				groups
					.filter((g) => g.id !== group.id)
					.map((group, index) => {
						if (index !== 0) {
							return group;
						}
						return {
							...group,
							operator: null,
						};
					}),
			);
		},
		[],
	);

	const handleItemChange = useCallback(
		(
			{ id: gid }: Pick<AdvancedSearchGroup, "id">,
			value: AdvancedSearchItem,
		) => {
			setGroups((groups) =>
				groups.map((group) => {
					if (group.id !== gid) {
						return group;
					}

					return {
						...group,
						items: group.items.map((item) =>
							item.id === value.id ? value : item,
						),
					};
				}),
			);
		},
		[],
	);

	const handleAddItem = useCallback(
		(
			{ id: gid }: Pick<AdvancedSearchGroup, "id">,
			after: Pick<AdvancedSearchItem, "id">,
		) => {
			setGroups((groups) =>
				groups.map((group) => {
					if (group.id !== gid) {
						return group;
					}

					const index = group.items.findIndex((i) => i.id === after.id);
					if (index === -1) {
						return group;
					}

					const sliceIndex = index + 1;
					return {
						...group,
						items: [
							...group.items.slice(0, sliceIndex),
							{
								...ITEM_DEFAULT,
								operator: "AND",
								id: uuidv7(),
							},
							...group.items.slice(sliceIndex),
						],
					};
				}),
			);
		},
		[],
	);

	const handleRemoveItem = useCallback(
		(
			{ id: gid }: Pick<AdvancedSearchGroup, "id">,
			item: Pick<AdvancedSearchItem, "id">,
		) => {
			setGroups((groups) =>
				groups.map((group) => {
					if (group.id !== gid) {
						return group;
					}

					return {
						...group,
						items: group.items
							.filter((i) => i.id !== item.id)
							.map((item, index) => {
								if (index !== 0) {
									return item;
								}
								return {
									...item,
									operator: null,
								};
							}),
					};
				}),
			);
		},
		[],
	);

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			const query = groups
				.map((group) => {
					const items = group.items
						.map((item) => ({ ...item, value: item.value.trim() }))
						.filter((item) => item.value !== "");

					if (!items.length) {
						return null;
					}

					return `${group.operator ?? ""} (${items
						.map(({ operator, field, value }) => {
							return `${operator ?? ""} (${field} ${value.trim()})`.trim();
						})
						.join(" ")})`.trim();
				})
				.filter((query) => query)
				.join(" ")
				.trim();

			onClose?.(query);
		},
		[onClose, groups],
	);

	return (
		<Drawer open={open} keepMounted onClose={() => onClose()}>
			<Form onSubmit={handleSubmit}>
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

				<DialogContent sx={{ flexGrow: 1 }}>
					<Stack gap={2}>
						{groups.map((group) => (
							<ArticleAdvancedSearchGroup
								key={group.id}
								group={group}
								hasRemoveButton={groups.length > 1}
								onGroupChange={handleGroupChange}
								onAddGoup={() => handleGroupAdd(group)}
								onRemoveGroup={() => handleGroupRemove(group)}
								onItemChange={handleItemChange}
								onAddItem={handleAddItem}
								onRemoveItem={handleRemoveItem}
							/>
						))}

						<Divider />

						<Stack
							gap={2}
							sx={{
								overflowX: "auto",
							}}
						>
							<Typography variant="h3" fontSize={16} color="primary">
								{t("components.advancedSearch.humanQuery")}
							</Typography>

							{humanReadableSearch.map((group) => (
								<ArticleAdvancedSearchHumanReadable key={group.id} {...group} />
							))}
						</Stack>
					</Stack>
				</DialogContent>

				<DialogActions>
					<Button type="submit" variant="contained">
						{t("components.advancedSearch.search")}
					</Button>
				</DialogActions>
			</Form>
		</Drawer>
	);
}
