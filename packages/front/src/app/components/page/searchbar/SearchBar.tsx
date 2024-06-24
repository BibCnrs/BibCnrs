import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Container, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { KeyboardEvent, SyntheticEvent } from "react";
import { memo, useEffect, useState } from "react";
import { autoComplete } from "../../../services/common/AutoComplete";
import { useDebounce } from "../../../shared/hook";
import type { SearchBarProps } from "../../../shared/types/props.types";

import SearchModeSelection from "./SearchModeSelection";

const SEARCH_BAR_HEIGHT = "50px";

/**
 * Search bar component used in: "Root", "Article", "Journal, book", "Database" and "Research data"
 * @param placeholder - Search bar placeholder
 * @param onSearch    - Event call when the user press 'Enter' or click on the search icon
 * @param props       - Rest of the search bar props
 */
const SearchBar = ({
	placeholder,
	onSearch,
	children,
	...props
}: SearchBarProps) => {
	// Search bar states
	const [value, setValue] = useState<string>(props.value ?? "");
	const [autocompleteValue, setAutocompleteValue] = useState<
		string | undefined
	>("");

	useEffect(() => {
		if (props.value) {
			setValue(props.value);
		}
	}, [props.value]);

	const debounceValue = useDebounce(value, 375);

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const { data } = useQuery<string[], any, string[], any>({
		queryKey: ["search-bar", debounceValue],
		queryFn: () => {
			if (value === "") {
				return [];
			}
			return autoComplete(value);
		},
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	// Perform search when the user press 'Enters'
	const inputKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter") {
			onSearch(value);
		}
	};

	// Clear the input when the user clicks on the clear button
	const clearOnClick = () => {
		setValue("");
		setAutocompleteValue(undefined);
		onSearch(undefined);
	};

	// Perform search when the user clicks on the search button
	const searchOnClick = () => {
		onSearch(value);
	};

	const handleAutocompleteChange = (
		event: SyntheticEvent,
		newValue: string | undefined,
	) => {
		setAutocompleteValue(newValue);
		onSearch(newValue);
		if (newValue) {
			setValue(newValue);
		}
	};

	const handleChange = (event: SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<Stack
			sx={{
				backgroundImage: "url(/img/SEARCH_BANNER.png)",
				backgroundSize: "contain",
				minHeight: "250px",
			}}
			alignItems="center"
			justifyContent="center"
		>
			<Container
				sx={{
					display: "flex",
					flexDirection: "column",
					mt: 4,
					mb: 4,
					gap: 2,
					alignItems: "center",
				}}
			>
				<SearchModeSelection />
				<Stack
					direction="row"
					id="search-box"
					sx={{
						width: "100%",
						background: (theme) => theme.palette.background.paper,
						borderRadius: "50px",
						height: SEARCH_BAR_HEIGHT,
						"& .MuiAutocomplete-inputRoot": {
							height: SEARCH_BAR_HEIGHT,
						},
					}}
				>
					<Autocomplete
						inputValue={value}
						value={autocompleteValue}
						onChange={handleAutocompleteChange}
						onInputChange={handleChange}
						onKeyDown={inputKeyDown}
						renderInput={(params) => (
							<TextField {...params} placeholder={placeholder} />
						)}
						options={data ?? []}
						id="search-box-input"
						freeSolo
						disableClearable
						fullWidth
						size="small"
						sx={{
							"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
								border: "none",
							},
						}}
					/>
					{value !== "" ? (
						<>
							<IconButton onClick={clearOnClick}>
								<ClearIcon />
							</IconButton>
							<Divider orientation="vertical" id="search-box-divider" />
						</>
					) : null}
					<IconButton onClick={searchOnClick} role="search">
						<SearchIcon />
					</IconButton>
				</Stack>
				{children}
			</Container>
		</Stack>
	);
};

export default memo(SearchBar);
