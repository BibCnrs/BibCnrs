import { Button } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PageTitle from "../../../components/internal/PageTitle";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { useBibContext } from "../../../context/BibContext";
import { licences } from "../../../services/user/Licences";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type {
	LicenceDataType,
	LicencesDataType,
} from "../../../shared/types/data.types";

const Licences = () => {
	const t = useTranslator();
	const {
		session: { user },
	} = useBibContext();
	const language = useLanguageKey();
	const [activeLicences, setActiveLicences] = useState<
		LicenceDataType | undefined
	>(undefined);

	const { data, isFetching, isLoading } = useQuery<
		LicencesDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		LicencesDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: ["licences"],
		queryFn: () => licences(user?.domains),
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (data && data.length > 0) {
			setActiveLicences(data[0]);
		}
	}, [data, isFetching, isLoading]);

	if (!data || data.length === 0) {
		return <div id="app">{t("pages.licences.empty")}</div>;
	}

	return (
		<>
			<PageTitle page="licences" />
			<FakeSearchBar title="Licences" />
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<Stack direction="row">
					<Box
						id="licences-nav"
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "fit-content",
							height: "fit-content",
							marginRight: "40px",
							borderStyle: "solid",
							borderWidth: "2px",
						}}
					>
						{data.map((value) => (
							<Button
								type="button"
								key={value.id}
								onClick={() => {
									if (activeLicences?.id !== value.id) {
										setActiveLicences(value);
									}
								}}
								sx={{
									padding: "20px 40px",
									fontWeight: "600",
									textAlign: "center",
									cursor: "pointer",
									color: (theme) =>
										activeLicences?.id === value.id
											? theme.palette.primary.contrastText
											: theme.palette.text.primary,
									borderRadius: 0,
									backgroundColor: (theme) =>
										activeLicences?.id === value.id
											? theme.palette.primary.main
											: theme.palette.background.default,
									"&:hover": {
										backgroundColor: (theme) => theme.palette.primary.main,
										color: (theme) => theme.palette.primary.contrastText,
									},
								}}
							>
								{language === "en" ? value.name_en : value.name_fr}
							</Button>
						))}
					</Box>
					<div id="licences-content">
						{activeLicences ? (
							<>
								<h1 className="title">
									{language === "en"
										? activeLicences.name_en
										: activeLicences.name_fr}
								</h1>
								{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
								<div
									className="cms-content"
									// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
									dangerouslySetInnerHTML={{
										__html:
											language === "en"
												? activeLicences.content_en
												: activeLicences.content_fr,
									}}
								></div>
								{activeLicences.pdf ? (
									<p>
										{t("pages.licences.pdf")}{" "}
										<a
											className="link"
											href={`files/${activeLicences.pdf.src}`}
											target="_blank"
											rel="noopener noreferrer nofollow"
										>
											{activeLicences.pdf.title}
										</a>
									</p>
								) : null}
							</>
						) : null}
					</div>
				</Stack>
			</Container>
		</>
	);
};

export default Licences;
