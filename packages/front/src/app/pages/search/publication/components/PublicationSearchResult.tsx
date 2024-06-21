import { Link, Popover, Tooltip, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import BookmarkButton from "../../../../components/element/button/BookmarkButton";
import Diamond from "../../../../components/element/icon/Diamond";
import OpenAccess from "../../../../components/element/icon/OpenAccess";
import OpenablePaper from "../../../../components/element/paper/OpenablePaper";
import SkeletonEntry from "../../../../components/element/skeleton/SkeletonEntry";
import type { SearchResultsElementProps } from "../../../../components/page/search/SearchResults";
import { useBibContext } from "../../../../context/BibContext";
import { environment } from "../../../../services/Environment";
import { retrieve as retrieveFn } from "../../../../services/search/Publication";
import { useServicesCatch } from "../../../../shared/hook";
import { useTranslator } from "../../../../shared/locales/I18N";
import parseFullTextHoldings from "../../../../shared/parseFullTextHoldings";
import type {
	PublicationCoverageDataType,
	PublicationHolding,
	PublicationResultDataType,
	PublicationRetrieveDataType,
} from "../../../../shared/types/data.types";

function proxifyOAPublication(url: string, domain: string) {
	return `${environment.host}/ebsco/oa?url=${encodeURIComponent(
		url,
	)}&sid=oa&domaine=${domain}&doi=null`;
}

function PublicationId({ publication }: { publication: { id: number } }) {
	return (
		<Typography
			component="div"
			sx={{
				width: "34px",
				height: "34px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "1.2rem",
				fontWeight: 700,
			}}
		>
			{publication.id}
		</Typography>
	);
}

function PublicationTitle({
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
	const isOpenAccess = reconciledFullTextHoldings[0].name
		.toLowerCase()
		.includes("open access");

	if (!isOpenAccess && !user) {
		return (
			<Stack
				sx={{
					flexDirection: "row",
					gap: 1,
				}}
			>
				{publication.isDiamond ? <Diamond /> : null}
				<Tooltip title={`${publication.title} [${publication.type}]`}>
					<Box
						sx={{
							flexGrow: 1,
						}}
						onClick={(e) => {
							e.stopPropagation();
							showLoginModal();
						}}
					>
						{publication.title} [{publication.type}]
					</Box>
				</Tooltip>
				<Box>{titleCoverage}</Box>
			</Stack>
		);
	}

	if (reconciledFullTextHoldings.length > 1) {
		const idPopover = open ? `simple-popover-${publication.id}` : undefined;
		return (
			<>
				<Stack
					sx={{
						flexDirection: "row",
						gap: 1,
					}}
					onClick={(event) => handlePopoverClick(event)}
				>
					{isOpenAccess ? (
						<OpenAccess className="table-icon table-icon-oa" />
					) : null}
					{publication.isDiamond ? <Diamond /> : null}
					<Box
						sx={{
							flexGrow: 1,
						}}
						onClick={(e) => {
							e.stopPropagation();
							showLoginModal();
						}}
					>
						{publication.title} [{publication.type}]
					</Box>
					<Box>{titleCoverage}</Box>
				</Stack>

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
						{reconciledFullTextHoldings.map((value) => (
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
								>
									{value.name} - {getCoverage(value.coverage)}
								</Link>
								{user ? (
									<BookmarkButton
										className="table-bookmark-button"
										title={`${value.name} - ${getCoverage(value.coverage)}`}
										url={value.url}
									/>
								) : null}
							</Stack>
						))}
					</Stack>
				</Popover>
			</>
		);
	}

	return (
		<Stack
			sx={{
				flexDirection: "row",
				gap: 1,
			}}
		>
			{isOpenAccess ? <OpenAccess /> : null}
			{publication.isDiamond ? <Diamond /> : null}

			<Link
				href={
					isOpenAccess && user
						? proxifyOAPublication(href, search.domain)
						: href
				}
				target="_blank"
				rel="noreferrer noopener nofollow"
				onClick={(e) => {
					e.stopPropagation();
				}}
				sx={{
					flexGrow: 1,
				}}
			>
				{publication.title} [{publication.type}]
			</Link>

			<Box
				sx={{
					flexShrink: 0,
				}}
			>
				{titleCoverage}
			</Box>
		</Stack>
	);
}

export default function PublicationSearchResult({
	data: dataIn,
}: SearchResultsElementProps<PublicationResultDataType>) {
	const {
		fullTextHoldings,
		title,
		issnOnline,
		issnPrint,
		isbnOnline,
		isbnPrint,
		publicationId,
	} = dataIn;

	const reconciledFullTextHoldings = parseFullTextHoldings(
		fullTextHoldings,
	) as PublicationHolding[];

	const t = useTranslator();
	const serviceCatch = useServicesCatch();
	const { search } = useBibContext();
	const {
		session: { user },
		showLoginModal,
	} = useBibContext();
	const [open, setOpen] = useState(false);

	const {
		data: dataRetrieve,
		isFetching,
		isLoading,
		isError,
		error,
	} = useQuery<
		PublicationRetrieveDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		PublicationRetrieveDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: ["publication_retrieve", open, search.domain, publicationId],
		queryFn: async () => {
			if (open && search.domain) {
				return retrieveFn(search.domain, publicationId);
			}
			return null;
		},
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	useEffect(() => {
		if (isError) {
			serviceCatch(error);
		}
	}, [error, isError, serviceCatch]);

	const handleChange = (isOpen: boolean) => {
		if (isOpen && !user) {
			showLoginModal();
		}
		setOpen(isOpen);
	};

	const getCoverage = (coverage: PublicationCoverageDataType) => {
		let coverageString = "";
		try {
			coverage.forEach((value) => {
				const start = new Date(
					Number.parseInt(value.start.year, 10),
					Number.parseInt(value.start.month, 10) - 1,
					Number.parseInt(value.start.day, 10),
				);
				const end = new Date(
					Number.parseInt(value.end.year, 10),
					Number.parseInt(value.end.month, 10) - 1,
					Number.parseInt(value.end.day, 10),
				);
				if (coverageString !== "") {
					coverageString += ", ";
				}
				coverageString += `${start.toLocaleDateString()} - ${
					end.getFullYear() > new Date().getFullYear()
						? t("components.table.content.present")
						: end.toLocaleDateString()
				}`;
			});
		} catch (e) {
			console.error(e);
		}
		return coverageString;
	};

	if (reconciledFullTextHoldings.length === 0) {
		return null;
	}

	const href = reconciledFullTextHoldings[0].url;
	const bookmarkTitle = `${title} - ${reconciledFullTextHoldings[0].name}`;

	const getTitleCoverage = () => {
		let reconciledFullTextHoldingString = getCoverage(
			reconciledFullTextHoldings[0].coverage,
		);
		reconciledFullTextHoldingString += reconciledFullTextHoldings[0].embargo
			? ` (embargo: ${reconciledFullTextHoldings[0].embargo.value} ${reconciledFullTextHoldings[0].embargo.unit})`
			: "";
		return ` ${reconciledFullTextHoldingString}`;
	};

	return (
		<OpenablePaper
			onChange={handleChange}
			title={
				<PublicationTitle
					reconciledFullTextHoldings={reconciledFullTextHoldings}
					titleCoverage={getTitleCoverage()}
					publication={dataIn}
					getCoverage={getCoverage}
				/>
			}
			leftAction={<PublicationId publication={dataIn} />}
			summary={
				<Stack gap={1}>
					{issnOnline && issnOnline.length > 0 ? (
						<Typography>
							{t("components.table.content.issnOnline") /* eISSN */}
							{issnOnline.join(", ")}
						</Typography>
					) : null}
					{issnPrint && issnPrint.length > 0 ? (
						<Typography>
							{t("components.table.content.issnPrint") /* pISSN */}
							{issnPrint.join(", ")}
						</Typography>
					) : null}
					{isbnOnline && isbnOnline.length > 0 ? (
						<Typography>
							{t("components.table.content.isbnOnline") /* eISBN */}
							{isbnOnline.join(", ")}
						</Typography>
					) : null}
					{isbnPrint && isbnPrint.length > 0 ? (
						<Typography>
							{t("components.table.content.isbnPrint") /* pISBN */}
							{isbnPrint.join(", ")}
						</Typography>
					) : null}
				</Stack>
			}
			/* eslint-disable-next-line react/jsx-no-useless-fragment */
			content={
				!dataRetrieve || isLoading || isFetching ? (
					<SkeletonEntry animation="pulse" height={450} />
				) : (
					<Typography component="dl">
						{dataRetrieve.items?.map((item) => {
							if (item.name.toLowerCase() === "title") {
								return null;
							}
							return (
								<Typography key={item.name}>
									<Typography component="dt">{item.label}</Typography>
									<Typography component="dd">
										{item.value.map((value) => (
											<div key={value}>{value}</div>
										))}
									</Typography>
								</Typography>
							);
						})}
						<Typography>
							<Typography component="dt">Accès à l&apos;article</Typography>
							<Typography component="dd">
								{fullTextHoldings.map((value) => (
									<div key={value.name}>
										<Link
											href={value.url}
											target="_blank"
											rel="noreferrer nofollow noopener"
										>
											{value.name}
										</Link>
										{getCoverage(value.coverage)}
										{value.embargo
											? ` (embargo: ${value.embargo.value} ${value.embargo.unit})`
											: null}
									</div>
								))}
							</Typography>
						</Typography>
					</Typography>
				)
			}
			rightAction={
				user ? (
					<BookmarkButton
						className="table-bookmark-button"
						title={bookmarkTitle}
						url={href}
					/>
				) : null
			}
		/>
	);
}
