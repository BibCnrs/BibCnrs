import { Button, Typography } from "@mui/material";
import { Box, Container, Stack, type SxProps, type Theme } from "@mui/system";
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

const buttonStyles: SxProps<Theme> = {
	color: (theme) => theme.palette.text.primary,
	paddingX: "20px",
	borderRadius: "20px",
	width: "200px",
	textTransform: "none",
	fontWeight: "900",
	":hover": {
		backgroundColor: (theme) => theme.palette.secondary.main,
		color: (theme) => theme.palette.secondary.contrastText,
	},
	"&.active": {
		backgroundColor: (theme) => theme.palette.secondary.main,
		color: (theme) => theme.palette.secondary.contrastText,
	},
};

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
				<Stack>
					<Stack direction="row" gap={3} id="licences-nav" mb={4}>
						{data.map((value) => (
							<Button
								type="button"
								key={value.id}
								onClick={() => {
									if (activeLicences?.id !== value.id) {
										setActiveLicences(value);
									}
								}}
								variant="contained"
								sx={{
									...buttonStyles,
									background: (theme) =>
										activeLicences?.id === value.id
											? theme.palette.secondary.main
											: theme.palette.background.default,
								}}
							>
								{language === "en" ? value.name_en : value.name_fr}
							</Button>
						))}
					</Stack>
					<div id="licences-content">
						{activeLicences ? (
							<>
								<Typography
									variant="h4"
									component="h1"
									fontWeight="bold"
									color="primary"
								>
									{language === "en"
										? activeLicences.name_en
										: activeLicences.name_fr}
								</Typography>
								<Box
									sx={{
										"a, h1": {
											color: "primary.main",
										},
									}}
									// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
									dangerouslySetInnerHTML={{
										__html:
											language === "en"
												? activeLicences.content_en
												: activeLicences.content_fr,
									}}
								/>
								{activeLicences.pdf ? (
									<p>
										{t("pages.licences.pdf")}{" "}
										<a
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
