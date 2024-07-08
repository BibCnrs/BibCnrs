import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { RichTextInput } from "ra-input-rich-text";
import { type SyntheticEvent, useState } from "react";
import { TextInput, required } from "react-admin";
import { useFormState } from "react-hook-form";
import TabPanel from "./TabPanel";

export const validateLicenceCreation = (values) => {
	const requiredFields = ["content_en", "name_en", "content_fr", "name_fr"];
	return requiredFields.reduce((errors, field) => {
		if (!values[field]) {
			errors[field] = "ra.validation.required";
		}
		return errors;
	}, {});
};

export const validateMultilingualContentCreation = (values) => {
	const requiredFields = [
		"page",
		"content_en",
		"name_en",
		"content_fr",
		"name_fr",
	];
	return requiredFields.reduce((errors, field) => {
		if (!values[field]) {
			errors[field] = "ra.validation.required";
		}
		return errors;
	}, {});
};

export const MultilingualContentTab = () => {
	const [valueTab, setValueTab] = useState(0);
	const { errors } = useFormState();

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValueTab(newValue);
	};

	return (
		<>
			<Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
				<Tabs
					value={valueTab}
					onChange={handleChange}
					aria-label="language tabs"
				>
					<Tab
						label="Français"
						sx={{
							color: (errors.content_fr || errors.name_fr) && "red",
						}}
					/>
					<Tab
						label="Anglais"
						sx={{
							color: (errors.content_en || errors.name_en) && "red",
						}}
					/>
				</Tabs>
			</Box>
			<TabPanel valueTab={valueTab} index={0}>
				<TextInput
					source="name_fr"
					label="resources.contentManagement.fields.name"
					validate={required()}
				/>
				<RichTextInput
					source="content_fr"
					label="resources.contentManagement.fields.content"
					validate={required()}
					fullWidth
				/>
			</TabPanel>
			<TabPanel valueTab={valueTab} index={1}>
				<TextInput
					source="name_en"
					label="resources.contentManagement.fields.name"
					validate={required()}
				/>
				<RichTextInput
					source="content_en"
					label="resources.contentManagement.fields.content"
					validate={required()}
					fullWidth
				/>
			</TabPanel>
		</>
	);
};
