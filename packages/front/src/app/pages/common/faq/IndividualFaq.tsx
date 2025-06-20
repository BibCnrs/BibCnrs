import { Container, Typography } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/internal/PageTitle";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { useBibContext } from "../../../context/BibContext";
import { faq } from "../../../services/common/CMS";
import { useTranslator } from "../../../shared/locales/I18N";

const IndividualFaq = () => {
	const { id } = useParams<{ id: string }>();
	const t = useTranslator();
	const { language } = useBibContext();

	const { data } = useQuery({
		queryKey: ["faq"],
		queryFn: faq,
		placeholderData: keepPreviousData,
		staleTime: 3600000,
		gcTime: 3600000,
	});

	const faqItem = data?.find((item) => String(item.id) === id);

	if (!faqItem) {
		return (
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<Typography variant="h6">{t("pages.faq.notFound")}</Typography>
			</Container>
		);
	}

	return (
		<>
			<PageTitle
				customTitle
				page={language === "en" ? faqItem.name_en : faqItem.name_fr}
			/>
			<FakeSearchBar title="FAQ" />
			<Container
				sx={{
					marginTop: 4,
					marginBottom: 4,
				}}
			>
				<Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
					{language === "en" ? faqItem.name_en : faqItem.name_fr}
				</Typography>
				<div
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: language === "en" ? faqItem.content_en : faqItem.content_fr,
					}}
				/>
			</Container>
		</>
	);
};

export default IndividualFaq;
