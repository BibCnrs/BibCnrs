import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { memo, useContext, useEffect, useState } from "react";
import { retrieve as retrieveFn } from "../../../services/search/Publication";
import { useServicesCatch } from "../../../shared/hook";
import { useTranslator } from "../../../shared/locales/I18N";
import parseFullTextHoldings from "../../../shared/parseFullTextHoldings";
import type {
	PublicationCoverageDataType,
	PublicationHolding,
	PublicationResultDataType,
	PublicationRetrieveDataType,
} from "../../../shared/types/data.types";
import type { TableDisplayElementProps } from "../../../shared/types/props.types";
import { BibContext } from "../../internal/provider/ContextProvider";
import BookmarkButton from "../button/BookmarkButton";
import Diamond from "../icon/Diamond";
import OpenAccess from "../icon/OpenAccess";
import OpenablePaper from "../paper/openable/OpenablePaper";
import SkeletonEntry from "../skeleton/SkeletonEntry";
import "./scss/TableList.scss";
import { Popover, Tooltip } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { environment } from "../../../services/Environment";

function proxifyOAPublication(url: string, domain: string) {
	return `${
		environment.host
	}/ebsco/oa?url=${encodeURIComponent(url)}&sid=ao&domaine=${domain}&doi=null`;
}

const PublicationTitle = ({
	reconciledFullTextHoldings,
	titleCoverage,
	publication,
	getCoverage,
}: {
	reconciledFullTextHoldings: PublicationHolding[];
	titleCoverage: string;
	publication: PublicationResultDataType;
	getCoverage: (coverage: PublicationCoverageDataType) => string;
}) => {
	const { search, login } = useContext(BibContext);

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

	if (reconciledFullTextHoldings.length > 1) {
		const idPopover = open ? `simple-popover-${publication.id}` : undefined;
		return (
			<>
				<Stack
					component="div" // Add the component prop with the value of "div"
					direction="row"
					aria-describedby={idPopover}
					onClick={(event) => handlePopoverClick(event)}
					sx={{ cursor: "pointer" }}
				>
					<span className="table-list-title link">
						{publication.id}. {publication.title} [{publication.type}]{" "}
					</span>
					&nbsp;&nbsp;{titleCoverage}
					{isOpenAccess ? (
						<OpenAccess className="table-icon table-icon-oa" />
					) : null}
					{publication.isDiamond ? <Diamond className="table-icon" /> : null}
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
							<Stack direction="row" key={value.name} gap={2}>
								<a
									className="table-list-title link"
									href={
										isOpenAccess
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
								</a>
								{login ? (
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

	if (!isOpenAccess && !login) {
		return (
			<Tooltip title="Veuillez vous connecter">
				<Box display="flex" alignItems="center">
					<a
						className="table-list-title link"
						href={href}
						target="_blank"
						rel="noreferrer noopener nofollow"
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						{publication.id}. {publication.title} [{publication.type}]
					</a>
					&nbsp;&nbsp;{titleCoverage}
					{publication.isDiamond ? <Diamond className="table-icon" /> : null}
				</Box>
			</Tooltip>
		);
	}

	return (
		<>
			<a
				className="table-list-title link"
				href={isOpenAccess ? proxifyOAPublication(href, search.domain) : href}
				target="_blank"
				rel="noreferrer noopener nofollow"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{publication.id}. {publication.title} [{publication.type}]
			</a>
			&nbsp;&nbsp;{titleCoverage}
			{isOpenAccess ? (
				<OpenAccess className="table-icon table-icon-oa" />
			) : null}
			{publication.isDiamond ? <Diamond className="table-icon" /> : null}
		</>
	);
};

const TablePublication = ({
	data: dataIn,
}: TableDisplayElementProps<PublicationResultDataType>) => {
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
	const { search } = useContext(BibContext);
	const { login, setAskLogin } = useContext(BibContext);
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
		if (isOpen && !login) {
			setAskLogin(true);
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
		<div className={login ? "table-bookmark-size" : undefined}>
			<OpenablePaper
				onOpen={handleChange}
				Title={
					<PublicationTitle
						reconciledFullTextHoldings={reconciledFullTextHoldings}
						titleCoverage={getTitleCoverage()}
						publication={dataIn}
						getCoverage={getCoverage}
					/>
				}
				SmallBody={
					<div className="table-list-body">
						{issnOnline && issnOnline.length > 0 ? (
							<div>
								{t("components.table.content.issnOnline") /* eISSN */}
								{issnOnline.join(", ")}
							</div>
						) : null}
						{issnPrint && issnPrint.length > 0 ? (
							<div>
								{t("components.table.content.issnPrint") /* pISSN */}
								{issnPrint.join(", ")}
							</div>
						) : null}
						{isbnOnline && isbnOnline.length > 0 ? (
							<div>
								{t("components.table.content.isbnOnline") /* eISBN */}
								{isbnOnline.join(", ")}
							</div>
						) : null}
						{isbnPrint && isbnPrint.length > 0 ? (
							<div>
								{t("components.table.content.isbnPrint") /* pISBN */}
								{isbnPrint.join(", ")}
							</div>
						) : null}
					</div>
				}
				/* eslint-disable-next-line react/jsx-no-useless-fragment */
				FullBody={
					!dataRetrieve || isLoading || isFetching ? (
						<SkeletonEntry animation="pulse" height={450} />
					) : (
						<dl className="table-list-body">
							{dataRetrieve.items?.map((item) => {
								if (item.name.toLowerCase() === "title") {
									return null;
								}
								return (
									<span key={item.name}>
										<dt>{item.label}</dt>
										<dd>
											{item.value.map((value) => (
												<div key={value}>{value}</div>
											))}
										</dd>
									</span>
								);
							})}
							<span>
								<dt>Accès à l&apos;article</dt>
								<dd>
									{fullTextHoldings.map((value) => (
										<div key={value.name}>
											<a
												className="link"
												href={value.url}
												target="_blank"
												rel="noreferrer nofollow noopener"
											>
												{value.name}
											</a>{" "}
											{getCoverage(value.coverage)}
											{value.embargo
												? ` (embargo: ${value.embargo.value} ${value.embargo.unit})`
												: null}
										</div>
									))}
								</dd>
							</span>
						</dl>
					)
				}
			/>
			<div className="table-bookmark">
				{login ? (
					<BookmarkButton
						className="table-bookmark-button"
						title={bookmarkTitle}
						url={href}
					/>
				) : null}
			</div>
		</div>
	);
};

export default memo(TablePublication);
