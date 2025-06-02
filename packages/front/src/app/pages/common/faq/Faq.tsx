import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { SyntheticEvent } from "react";
import PageTitle from "../../../components/internal/PageTitle";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { useBibContext } from "../../../context/BibContext";
import { faq } from "../../../services/common/CMS";
import { useTranslator } from "../../../shared/locales/I18N";
import { useMatomo } from "../../../shared/matomo";
import type {
	CMSDataType,
	CMSResultDataType,
} from "../../../shared/types/data.types";

const FaqEntry = ({ data }: { data: CMSDataType }) => {
	const { trackEvent } = useMatomo();
	const { language } = useBibContext();

	const handleChange = (_: SyntheticEvent, expanded: boolean) => {
		if (expanded) {
			trackEvent("FAQ", data.name_fr, "on", data.id);
		}
	};

	return (
		<Accordion onChange={handleChange}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`${data.name_en.replace(/\s+/g, "_")}-content`}
				id={`${data.name_en.replace(/\s+/g, "_")}-header`}
			>
				{/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
				<Typography color="primary" fontWeight="bold" role="heading">
					{language === "en" ? data.name_en : data.name_fr}
				</Typography>
			</AccordionSummary>
			<AccordionDetails
				sx={{
					a: {
						color: "primary.main",
					},
				}}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: language === "en" ? data.content_en : data.content_fr,
				}}
			/>
		</Accordion>
	);
};

const Faq = () => {
	const t = useTranslator();
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const { data } = useQuery<CMSResultDataType, any, CMSResultDataType, any>({
		queryKey: ["faq"],
		queryFn: faq,
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	return (
		<>
			<PageTitle page="faq" />
			<FakeSearchBar title={t("pages.faq.title")} />
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				{data
					? data.map((value) => <FaqEntry key={value.id} data={value} />)
					: null}
			</Container>
		</>
	);
};

export default Faq;
