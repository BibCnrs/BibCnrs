import * as ReactQuery from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, it, vi } from "vitest";
import { BibContextProvider } from "../../../context/BibContext";
import { database } from "../../../services/search/Database";
import type {
	DatabaseDataType,
	DatabaseEntryDataType,
} from "../../../shared/types/data.types";
import { usePlatforms } from "./usePlatforms";

vi.mock("../../../services/search/Database", () => ({
	database: vi.fn(),
}));

beforeEach(() => {
	vi.mocked(database).mockClear();
});

function wrapperFactory({ children }: { children: React.ReactNode }) {
	const queryClient = new ReactQuery.QueryClient();
	return (
		<MemoryRouter>
			<ReactQuery.QueryClientProvider client={queryClient}>
				<BibContextProvider>{children}</BibContextProvider>
			</ReactQuery.QueryClientProvider>
		</MemoryRouter>
	);
}

it("should return loading state", async () => {
	let resolver: ((list: DatabaseDataType) => void) | null = null;
	const stubPromise = new Promise<DatabaseDataType>((resolve) => {
		resolver = resolve;
	});

	vi.mocked(database).mockReturnValueOnce(stubPromise);

	const { result, rerender } = renderHook(() => usePlatforms(), {
		wrapper: wrapperFactory,
	});

	rerender();
	expect(result.current.isLoading).toBe(true);

	resolver?.([]);
	await stubPromise;

	rerender();
	expect(result.current.isLoading).toBe(false);
});

it("should return database list", async () => {
	const databaseItem: DatabaseEntryDataType = {
		id: 1,
		active: true,
		communities: [1],
		domains: ["INSHS"],
		is_archived: false,
		oa: true,
		name_en: "Test",
		name_fr: "Test",
		text_en: "Test",
		text_fr: "Test",
		url_en: "https://test.com",
		url_fr: "https://test.com",
		use_proxy: false,
		is_completed: true,
		is_text_integral: true,
		without_embargo: true,
		type: [],
	};
	const stubPromise = new Promise<DatabaseDataType>((resolve) => {
		resolve([databaseItem]);
	});

	vi.mocked(database).mockReturnValueOnce(stubPromise);

	const { result, rerender } = renderHook(() => usePlatforms(), {
		wrapper: wrapperFactory,
	});

	rerender();
	expect(result.current.platforms).toStrictEqual([]);

	await stubPromise;

	rerender();
	expect(result.current.platforms).toStrictEqual([
		{
			...databaseItem,
			name: databaseItem.name_en,
			url: databaseItem.url_en,
			text: databaseItem.text_en,
			upperName: databaseItem.name_en.toUpperCase(),
		},
	]);
});
