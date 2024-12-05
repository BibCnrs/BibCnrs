import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import PageTitle from "../../../components/internal/PageTitle";
import ChipFacet from "../../../components/page/search/ChipFacet";
import SearchBar from "../../../components/page/searchbar/SearchBar";
import { useBibContext } from "../../../context/BibContext";
import { useDomain, useFacetsDomainHandler } from "../../../shared/hook";
import { useTranslator } from "../../../shared/locales/I18N";
import FilterTab from "./FilterTab";
import { PlatformCardView } from "./PlatformCardView";
import { PlatformListView } from "./PlatformListView";
import { usePlatforms } from "./usePlatforms";

export function PlatformPage() {
	const {
		session: { user },
		search: { domain },
	} = useBibContext();

	const {
		platforms,
		search,
		setSearch,
		filters,
		setFilters,
		isLoading,
		isError,
	} = usePlatforms();

	const t = useTranslator();

	const handleDomain = useFacetsDomainHandler();
	const domains = useDomain();

	return (
		<>
			<PageTitle page="database" />
			<SearchBar
				placeholder={t("pages.researchData.search.bar")}
				value={search}
				onSearch={setSearch}
				disableAutocomplete
				isPlateformPage={true}
			>
				<ChipFacet value={domain} values={domains} onChange={handleDomain} />
			</SearchBar>
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<Stack gap={2}>
					{!user && (
						<Alert variant="outlined" severity="info">
							{t("pages.database.anonymousMessage")}
						</Alert>
					)}

					<Box
						display="grid"
						gridTemplateColumns={{
							xs: "1fr",
							sm: "1fr 4fr",
						}}
						gap={3}
					>
						<Box>
							<FilterTab
								setFilters={setFilters}
								filters={filters}
								databases={platforms}
							/>
						</Box>
						<Stack gap={2}>
							<Typography fontWeight={700}>
								{t("pages.database.platform", {
									count: platforms.length,
								})}
							</Typography>

							{isLoading ? (
								<Stack alignItems="center" spacing={5}>
									<CircularProgress />
								</Stack>
							) : isError ? (
								<Alert variant="outlined" severity="error">
									{t("pages.database.errorMessage")}
								</Alert>
							) : platforms.length === 0 ? (
								<Alert variant="outlined" severity="info">
									{t("pages.database.noResult")}
								</Alert>
							) : user?.settings?.platformView === "list" ? (
								<PlatformListView platforms={platforms} />
							) : (
								<PlatformCardView platforms={platforms} />
							)}
						</Stack>
					</Box>
				</Stack>
			</Container>
		</>
	);
}
