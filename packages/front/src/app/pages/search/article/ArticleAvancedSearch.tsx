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
import { type FormEvent, useCallback } from "react";
import { useAdvancedSearchContext } from "../../../context/AdvancedSearchContext";
import { useTranslator } from "../../../shared/locales/I18N";
import ArticleAdvancedSearchGroup from "./ArticleAdvancedSearchGroup";
import ArticleAdvancedSearchHumanReadable from "./ArticleAdvancedSearchHumanReadable";

type ArticleAdvancedSearchProps = {
	open: boolean;
	onClose: (query?: string) => void;
};

const Form = styled.form`
	height: 100%;
	display: flex;
	flex-direction: column;`;

export default function ArticleAdvancedSearch({
	open,
	onClose,
	disabled = false,
}: ArticleAdvancedSearchProps & { disabled?: boolean }) {
	const t = useTranslator();

	const { groups, humanReadableSearch, advancedSearchQuery, reset } =
		useAdvancedSearchContext();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			if (disabled) return;

			onClose?.(advancedSearchQuery);
		},
		[onClose, advancedSearchQuery],
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

				<DialogActions
					sx={{
						justifyContent: "space-between",
						paddingX: 3,
						paddingY: 2,
					}}
				>
					<Button
						type="button"
						variant="outlined"
						color="error"
						onClick={reset}
					>
						{t("components.advancedSearch.reset")}
					</Button>
					<Button type="submit" variant="contained">
						{t("components.advancedSearch.search")}
					</Button>
				</DialogActions>
			</Form>
		</Drawer>
	);
}
