import Box from "@mui/material/Box";

// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
const TabPanel = (props: any) => {
	const { children, valueTab, index, ...other } = props;

	return (
		<Box
			role="tabpanel"
			hidden={valueTab !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",

				"& .ra-input-content_fr, & .ra-input-content_en": {
					minHeight: "400px",
				},
				"& .RaRichTextInputToolbar-root": {
					minHeight: "40px",
				},
				"& .RaRichTextInput-editorContent": {
					minHeight: "100px",
					".ProseMirror": {
						minHeight: "400px",
					},
				},
			}}
			{...other}
		>
			{valueTab === index && children}
		</Box>
	);
};

export default TabPanel;
