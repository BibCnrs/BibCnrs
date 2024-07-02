import { Button, LinearProgress } from "@mui/material";
import { Container } from "@mui/system";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import TableHistory from "../../../components/element/table/TableHistory";
import PageTitle from "../../../components/internal/PageTitle";
import type { SearchResultsArgsProps } from "../../../components/page/search/SearchResults";
import SearchResults from "../../../components/page/search/SearchResults";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { Empty } from "../../../components/shared/Empty";
import {
	deleteHistory,
	deleteHistoryEntry,
	history,
} from "../../../services/user/History";
import { disableAllSearchAlert } from "../../../services/user/SearchAlert";
import { useTranslator } from "../../../shared/locales/I18N";
import type { HistoryDataType } from "../../../shared/types/data.types";

export const HistoryContext = createContext<{
	handleDeleteEntry: (id: number) => void;
	requestUpdate: () => void;
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
}>(null as any);

const History = ({
	displayOnlyAlert = false,
}: { displayOnlyAlert?: boolean }) => {
	const t = useTranslator();

	const [args, setArgs] = useState<SearchResultsArgsProps>({
		page: 1,
		perPage: 20,
		stateIndex: 0,
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

	const handleDisable = () => {
		disableAllSearchAlert().then(() => {
			setArgs({
				page: 1,
				perPage: 20,
				stateIndex: (args.stateIndex ?? 0) + 1,
			});
		});
	};

	const handleDeleteEntry = (id: number) => {
		deleteHistoryEntry(id).then(() => {
			setArgs({
				...args,
				stateIndex: (args.stateIndex ?? 0) + 1,
			});
		});
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
			<FakeSearchBar
				title={t(`pages.${displayOnlyAlert ? "alert" : "history"}.title`)}
			/>
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				{data?.histories.length === 0 && <Empty />}

				{isPending && <LinearProgress />}

				{data?.histories.length > 0 && (
					<HistoryContext.Provider
						value={{ handleDeleteEntry, requestUpdate: handleUpdateRequest }}
					>
						<SearchResults
							DisplayElement={TableHistory}
							disableItemGap
							results={data?.histories}
							args={args}
							onArgsChange={setArgs}
							total={data ? data.totalCount : 0}
							header={
								<div className="history-header">
									{displayOnlyAlert ? (
										<Button variant="outlined" onClick={handleDisable}>
											{t("pages.history.buttons.disable")}
										</Button>
									) : (
										<Button variant="outlined" onClick={handleDelete}>
											{t("pages.history.buttons.delete")}
										</Button>
									)}
								</div>
							}
						/>
					</HistoryContext.Provider>
				)}
			</Container>
		</>
	);
};

export default History;
