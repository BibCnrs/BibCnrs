import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Container, Stack } from "@mui/system";
import { useState } from "react";
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
	const [platformView, setPlatformView] = useState<"list" | "card">(
		user?.settings?.platformView,
	);

	return (
		<>
			<PageTitle page="database" />
			<SearchBar
				placeholder={t("pages.researchData.search.bar")}
				label="facets"
				value={search}
				onSearch={setSearch}
				disableAutocomplete
				isPlateformPage={true}
			>
				<ChipFacet value={domain} values={domains} onChange={handleDomain} />
			</SearchBar>
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4, overflowX: "hidden" }}>
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
						sx={{
							width: "100%",
							minWidth: 0,
						}}
					>
						<Box>
							<FilterTab
								setFilters={setFilters}
								filters={filters}
								databases={platforms}
							/>
						</Box>
						<Stack gap={2}>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="space-between"
							>
								<Typography fontWeight={700}>
									{t("pages.database.platform", {
										count: platforms.length,
									})}
								</Typography>
								<Stack direction="row">
									<IconButton
										color={platformView === "list" ? "primary" : "default"}
										onClick={() => setPlatformView("list")}
										aria-label="list"
									>
										<ViewListIcon />
									</IconButton>
									<IconButton
										color={platformView === "card" ? "primary" : "default"}
										onClick={() => setPlatformView("card")}
										aria-label="card"
									>
										<ViewModuleIcon />
									</IconButton>
								</Stack>
							</Stack>

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
							) : platformView === "list" ? (
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
