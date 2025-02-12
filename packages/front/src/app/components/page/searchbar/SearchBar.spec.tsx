import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { BibContextProvider } from "../../../context/BibContext";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
	it("should call onSearch with input value only once after user has stopped typing when autocomplete is disabled", async () => {
		const onSearch = vi.fn();
		const client = new QueryClient();
		render(
			<QueryClientProvider client={client}>
				<BrowserRouter>
					<BibContextProvider>
						<SearchBar
							onSearch={onSearch}
							placeholder="placeholder"
							value=""
							disableAutocomplete
							isPlateformPage
						/>
					</BibContextProvider>
				</BrowserRouter>
			</QueryClientProvider>,
		);

		expect(onSearch).toBeCalledTimes(0);

		const input = screen.getByPlaceholderText("placeholder");
		await userEvent.type(input, "hello");
		await userEvent.type(input, " ");
		await userEvent.type(input, "there");
		expect(onSearch).toBeCalledTimes(0);
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 500);
		});
		expect(onSearch).toBeCalledTimes(1);
		expect(onSearch).toBeCalledWith("hello there");
	});

	it("should call onSearch onBlur instead when autocomplete is enabled", async () => {
		const onSearch = vi.fn();
		const client = new QueryClient();
		render(
			<QueryClientProvider client={client}>
				<BrowserRouter>
					<BibContextProvider>
						<SearchBar
							onSearch={onSearch}
							placeholder="placeholder"
							value=""
							disableAutocomplete={false}
							isPlateformPage
						/>
					</BibContextProvider>
				</BrowserRouter>
			</QueryClientProvider>,
		);

		expect(onSearch).toBeCalledTimes(0);

		const input = screen.getByPlaceholderText("placeholder");
		await userEvent.type(input, "hello");
		await userEvent.type(input, " ");
		await userEvent.type(input, "there");
		expect(onSearch).toBeCalledTimes(0);
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 500);
		});
		expect(onSearch).toBeCalledTimes(0);
		input.blur();
		expect(onSearch).toBeCalledTimes(1);
		expect(onSearch).toHaveBeenCalledWith("hello there");
	});

	it("should also call onSearch when clicking search button", async () => {
		const onSearch = vi.fn();
		const client = new QueryClient();
		render(
			<QueryClientProvider client={client}>
				<BrowserRouter>
					<BibContextProvider>
						<SearchBar
							onSearch={onSearch}
							placeholder="placeholder"
							value=""
							disableAutocomplete={false}
							isPlateformPage
						/>
					</BibContextProvider>
				</BrowserRouter>
			</QueryClientProvider>,
		);

		expect(onSearch).toBeCalledTimes(0);

		const input = screen.getByPlaceholderText("placeholder");
		await userEvent.type(input, "hello");
		await userEvent.type(input, " ");
		await userEvent.type(input, "there");
		expect(onSearch).toBeCalledTimes(0);
		screen.getByTestId("search-box-button").click();
		expect(onSearch).toBeCalledTimes(1);
		expect(onSearch).toHaveBeenCalledWith("hello there");
	});
});
