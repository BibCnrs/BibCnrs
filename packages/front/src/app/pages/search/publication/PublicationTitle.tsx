import { Link, Popover, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import Diamond from "../../../components/element/icon/Diamond";
import OpenAccess from "../../../components/element/icon/OpenAccess";
import { useBibContext } from "../../../context/BibContext";
import { environment } from "../../../services/Environment";
import type {
	PublicationCoverageDataType,
	PublicationHolding,
	PublicationResultDataType,
} from "../../../shared/types/data.types";

function proxifyOAPublication(url: string, domain: string) {
	return `${environment.host}/ebsco/oa?url=${encodeURIComponent(
		url,
	)}&sid=oa&domaine=${domain}&doi=null`;
}

export function isOpenAccessLink(holding: PublicationHolding) {
	return !holding.url.toLowerCase().includes("bib.cnrs.fr");
}

export function PublicationTitle({
	reconciledFullTextHoldings,
	titleCoverage,
	publication,
	getCoverage,
}: {
	reconciledFullTextHoldings: PublicationHolding[];
	titleCoverage: string;
	publication: PublicationResultDataType;
	getCoverage: (coverage: PublicationCoverageDataType) => string;
}) {
	const {
		search,
		session: { user },
		showLoginModal,
	} = useBibContext();

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handlePopoverClick = (event) => {
		event.stopPropagation();
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (event) => {
		event.stopPropagation();
		event.preventDefault();
		setAnchorEl(null);
	};

	const openPoper = Boolean(anchorEl);

	const href = reconciledFullTextHoldings[0].url;
	const isOpenAccess = reconciledFullTextHoldings.every(isOpenAccessLink);

	if (!isOpenAccess && !user) {
		return (
			<Typography
				component={Box}
				variant="h4"
				sx={{
					fontSize: 20,
					display: "block",
					minHeight: "34px",
					color: (theme) => theme.palette.primary.main,
					fontWeight: 700,
					cursor: "pointer",
					mb: 2,
					": hover": {
						textDecoration: "underline",
					},
				}}
				onClick={(e) => {
					e.stopPropagation();
					showLoginModal();
				}}
			>
				{publication.isDiamond ? <Diamond /> : null}
				{publication.title} [{publication.type}] {titleCoverage}
			</Typography>
		);
	}

	if (reconciledFullTextHoldings.length > 1) {
		const idPopover = open ? `simple-popover-${publication.id}` : undefined;
		return (
			<>
				<Typography
					component={Box}
					variant="h4"
					sx={{
						fontSize: 20,
						display: "block",
						minHeight: "34px",
						color: (theme) => theme.palette.primary.main,
						fontWeight: 700,
						cursor: "pointer",
						mb: 2,
						": hover": {
							textDecoration: "underline",
						},
					}}
					onClick={(event) => handlePopoverClick(event)}
				>
					{/* The component OpenablePaper has been incorrectly designed. It requires a lot of refacto and so we are obliged to make hacks for the presta */}
					{isOpenAccess ? (
						<Box mr={1} display="inline-block">
							<OpenAccess />
						</Box>
					) : null}
					{publication.isDiamond ? (
						<Box mr={1} display="inline-block">
							<Diamond />
						</Box>
					) : null}
					{publication.title} [{publication.type}] {titleCoverage}
				</Typography>

				<Popover
					id={idPopover}
					open={openPoper}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
				>
					<Stack spacing={2} p={2}>
						{reconciledFullTextHoldings.map((value) => {
							const isOpenAccess = isOpenAccessLink(value);
							return (
								<Stack
									key={value.name}
									sx={{
										flexDirection: "row",
										gap: 2,
										alignItems: "center",
									}}
								>
									<Link
										href={
											isOpenAccess && user
												? proxifyOAPublication(value.url, search.domain)
												: value.url
										}
										target="_blank"
										rel="noreferrer noopener nofollow"
										onClick={(e) => {
											e.stopPropagation();
										}}
										sx={{ textDecoration: "none" }}
									>
										{value.name} - {getCoverage(value.coverage)}{" "}
										{value.embargo
											? `(embargo: ${value.embargo.value} ${value.embargo.unit})`
											: null}
									</Link>
									{isOpenAccess && <OpenAccess />}
									{user ? (
										<BookmarkButton
											className="table-bookmark-button"
											title={`${publication.title} : ${value.name} - ${getCoverage(value.coverage)}`}
											url={value.url}
											source="publication"
										/>
									) : null}
								</Stack>
							);
						})}
					</Stack>
				</Popover>
			</>
		);
	}

	return (
		<Link
			href={
				isOpenAccess && user ? proxifyOAPublication(href, search.domain) : href
			}
			target="_blank"
			rel="noreferrer noopener nofollow"
			onClick={(e) => {
				e.stopPropagation();
			}}
			variant="h4"
			sx={{
				fontSize: 20,
				display: "block",
				minHeight: "34px",
				color: (theme) => theme.palette.primary.main,
				fontWeight: 700,
				cursor: "pointer",
				mb: 2,
			}}
			underline={href ? "hover" : "none"}
		>
			{/* The component OpenablePaper has been incorrectly designed. It requires a lot of refacto and so we are obliged to make hacks for the presta */}
			{isOpenAccess ? (
				<Box mr={1} display="inline-block">
					<OpenAccess />
				</Box>
			) : null}
			{publication.isDiamond ? (
				<Box mr={1} display="inline-block">
					<Diamond />
				</Box>
			) : null}
			{publication.title} [{publication.type}]{" "}
			{titleCoverage && ` - ${titleCoverage}`}
		</Link>
	);
}
