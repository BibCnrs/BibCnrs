import WarningIcon from "@mui/icons-material/Warning";
import { Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import { memo } from "react";
import { useLanguageKey } from "../../../../shared/locales/I18N";
import type { CMSResultDataType } from "../../../../shared/types/data.types";
/**
 * Paper component used to display alert
 * @param children - Alert content
 */
const AlertCard = ({ data }: { data: CMSResultDataType | undefined }) => {
	const language = useLanguageKey();
	if (!data || data.length < 1) {
		return null;
	}
	// Get the page content in French
	const content = {
		title: data[0].name_fr,
		text: data[0].content_fr,
		media: data[0].media,
	};

	// Change the page content if the page is set to English
	if (language === "en") {
		content.title = data[0].name_en;
		content.text = data[0].content_en;
	}

	return (
		<Card
			elevation={3}
			id="alert"
			sx={{
				border: "none",
				backgroundColor: (theme) => theme.palette.error.light,
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100%",
				textAlign: "center",
				pointerEvents: "none",
			}}
		>
			<CardContent
				sx={{
					display: "flex",
					gap: 2,
					alignItems: "center",
					"&:last-child": {
						padding: 1,

						height: "100%",
					},
				}}
			>
				{content.media?.url ? (
					<img
						src={content.media?.url}
						alt="about"
						style={{ width: "100%", maxWidth: "300px", borderRadius: "6px" }}
					/>
				) : (
					<WarningIcon color="error" />
				)}
				<Box
					sx={{
						a: {
							color: "primary.main",
						},
					}}
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{ __html: content.text }}
				/>
			</CardContent>
		</Card>
	);
};

export default memo(AlertCard);
