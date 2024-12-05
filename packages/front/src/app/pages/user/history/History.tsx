import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	LinearProgress,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import TableHistory from "../../../components/element/table/TableHistory";
import PageTitle from "../../../components/internal/PageTitle";
import type { SearchResultsArgsProps } from "../../../components/page/search/SearchResults";
import SearchResults from "../../../components/page/search/SearchResults";
import SearchBar from "../../../components/page/searchbar/SearchBar";
import { Empty } from "../../../components/shared/Empty";
import {
	deleteHistory,
	deleteHistoryEntry,
	history,
} from "../../../services/user/History";
import {
	disableAllSearchAlerts,
	enableAllSearchAlerts,
} from "../../../services/user/SearchAlert";
import { useTranslator } from "../../../shared/locales/I18N";
import type { HistoryDataType } from "../../../shared/types/data.types";

export const HistoryContext = createContext<{
	handleOpenDeletePopup: (id: number) => void;
	requestUpdate: () => void;
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
}>(null as any);

const History = ({
	displayOnlyAlert = false,
}: { displayOnlyAlert?: boolean }) => {
	const t = useTranslator();
	const [historyToDelete, setHistoryToDelete] = useState(null);

	const [args, setArgs] = useState<SearchResultsArgsProps & { q?: string }>({
		page: 1,
		perPage: 20,
		stateIndex: 0,
		q: null,
	});

	const { data, isPending } = useQuery<
		HistoryDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		HistoryDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: ["history", displayOnlyAlert, args],
		queryFn: () =>
			history(
				args.perPage ?? 5,
				((args.page ?? 1) - 1) * (args.perPage ?? 1),
				displayOnlyAlert,
				args.q ?? null,
			),
	});

	const handleDelete = () => {
		if (confirm(t("pages.history.confirm.delete") as unknown as string)) {
			deleteHistory().then(() => {
				setArgs({
					page: 1,
					perPage: 20,
					stateIndex: (args.stateIndex ?? 0) + 1,
				});
			});
		}
	};

	const handleEnableSearchAlerts = () => {
		enableAllSearchAlerts().then(() => {
			setArgs({
				page: 1,
				perPage: 20,
				stateIndex: (args.stateIndex ?? 0) + 1,
			});
		});
	};
	const handleDisableSearchAlerts = () => {
		disableAllSearchAlerts().then(() => {
			setArgs({
				page: 1,
				perPage: 20,
				stateIndex: (args.stateIndex ?? 0) + 1,
			});
		});
	};

	const handleDeleteEntry = () => {
		deleteHistoryEntry(historyToDelete).then(() => {
			setArgs({
				...args,
				stateIndex: (args.stateIndex ?? 0) + 1,
			});
			setHistoryToDelete(null);
		});
	};

	const handleOpenDeletePopup = (id: number) => {
		setHistoryToDelete(id);
	};

	const handleUpdateRequest = () => {
		setArgs({
			...args,
			stateIndex: (args.stateIndex ?? 0) + 1,
		});
	};

	return (
		<>
			<PageTitle page={displayOnlyAlert ? "alert" : "history"} />
			<SearchBar
				placeholder={t("pages.history.search")}
				isPlateformPage={false}
				onSearch={(search: string) => {
					setArgs({
						...args,
						q: search,
					});
				}}
				disableAutocomplete
				disableSearchButton
			/>
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				{data?.histories.length === 0 && <Empty />}

				{isPending && <LinearProgress />}

				{data?.histories.length > 0 && (
					<HistoryContext.Provider
						value={{
							handleOpenDeletePopup,
							requestUpdate: handleUpdateRequest,
						}}
					>
						<SearchResults
							DisplayElement={TableHistory}
							results={data?.histories}
							args={args}
							onArgsChange={setArgs}
							total={data ? data.totalCount : 0}
							header={
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									{!displayOnlyAlert ? (
										<Typography variant="h6" fontWeight="bold">
											{t("pages.history.title")}
										</Typography>
									) : (
										<Typography variant="h6" fontWeight="bold">
											{t("pages.alert.title")}
										</Typography>
									)}
									{displayOnlyAlert ? (
										<Stack direction="row" spacing={2}>
											<Button
												color="secondary"
												variant="contained"
												onClick={handleEnableSearchAlerts}
												sx={{
													borderRadius: "20px",
													fontWeight: "bold",
													":hover": {
														backgroundColor: (theme) =>
															theme.palette.background.default,
														color: (theme) => theme.palette.text.primary,
														boxShadow: (theme) =>
															`inset 0 0 0 2px ${theme.palette.secondary.main}`,
													},
												}}
											>
												{t("pages.history.buttons.enableAlerts")}
											</Button>

											<Button
												color="secondary"
												variant="contained"
												onClick={handleDisableSearchAlerts}
												sx={{
													borderRadius: "20px",
													fontWeight: "bold",
													":hover": {
														backgroundColor: (theme) =>
															theme.palette.background.default,
														color: (theme) => theme.palette.text.primary,
														boxShadow: (theme) =>
															`inset 0 0 0 2px ${theme.palette.secondary.main}`,
													},
												}}
											>
												{t("pages.history.buttons.disableAlerts")}
											</Button>
										</Stack>
									) : (
										<Tooltip title={t("pages.history.tooltip.delete")}>
											<Button
												color="secondary"
												variant="contained"
												onClick={handleDelete}
												sx={{
													borderRadius: "20px",
													fontWeight: "bold",
													":hover": {
														backgroundColor: (theme) =>
															theme.palette.background.default,
														color: (theme) => theme.palette.text.primary,
														boxShadow: (theme) =>
															`inset 0 0 0 2px ${theme.palette.secondary.main}`,
													},
												}}
											>
												{t("pages.history.buttons.delete")}
											</Button>
										</Tooltip>
									)}
								</Box>
							}
						/>

						<Dialog
							open={historyToDelete !== null}
							onClose={() => setHistoryToDelete(null)}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">
								{t("pages.history.confirmDelete.title")}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									{t("pages.history.confirmDelete.description")}
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => setHistoryToDelete(null)}>
									{t("pages.history.confirmDelete.cancel")}
								</Button>
								<Button
									onClick={handleDeleteEntry}
									autoFocus
									variant="contained"
								>
									{t("pages.history.confirmDelete.confirm")}
								</Button>
							</DialogActions>
						</Dialog>
					</HistoryContext.Provider>
				)}
			</Container>
		</>
	);
};

export default History;
