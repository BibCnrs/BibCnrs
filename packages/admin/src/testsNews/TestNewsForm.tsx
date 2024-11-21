import Stack from "@mui/material/Stack";
import {
	ArrayInput,
	AutocompleteInput,
	BooleanInput,
	DateInput,
	FileField,
	FileInput,
	ReferenceInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput,
	required,
} from "react-admin";
import { MultilingualContentTab } from "../components/MultilingualContentTab";
import TestsNewsHeader from "./TestsNewsHeader";

const FileComponent = () => {
	return (
		<>
			<ReferenceInput
				label="Média associé"
				source="media_id"
				reference="medias"
			>
				<AutocompleteInput
					filterToQuery={(searchText) => ({
						name: searchText,
					})}
					optionText="name"
					fullWidth
				/>
			</ReferenceInput>
			<FileInput
				sx={{ marginTop: 4 }}
				source="file"
				label="Média à uploader"
				name="file"
			>
				<FileField source="src" title="title" />
			</FileInput>
		</>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
const validate = (values: any) => {
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const errors: any = {};
	if (!values.content_en) {
		errors.content_en = "ra.validation.required";
	}

	if (!values.name_en) {
		errors.name_en = "ra.validation.required";
	}

	if (!values.content_fr) {
		errors.content_fr = "ra.validation.required";
	}

	if (!values.name_fr) {
		errors.name_fr = "ra.validation.required";
	}

	if (!values.page) {
		errors.page = "ra.validation.required";
	}

	if (values.page === "tests") {
		if (!values.to) {
			errors.to = "ra.validation.required";
		}
	}

	if (!values.communities || values.communities.length < 1) {
		errors.communities = "ra.validation.required";
	}

	return errors;
};

export default function TestNewsForm() {
	return (
		<SimpleForm validate={validate}>
			<TestsNewsHeader />
			<ArrayInput source="urls">
				<SimpleFormIterator inline>
					<TextInput
						label="Lien ressource"
						source="url"
						sx={{ margin: "auto" }}
						helperText={false}
					/>
					<TextInput
						label="Nom de la ressource"
						source="name"
						sx={{ margin: "auto" }}
						helperText={false}
					/>
					<BooleanInput
						label="Proxyfier"
						source="proxy"
						sx={{ margin: "auto" }}
						helperText={false}
					/>
				</SimpleFormIterator>
			</ArrayInput>
			<Stack direction="row" spacing={2}>
				<BooleanInput
					label="Actif"
					source="enable"
					defaultValue={true}
					name="enable"
					options={{}}
				/>
				<DateInput
					name="from"
					label="Date début"
					source="from"
					defaultValue={new Date().toISOString().slice(0, 10)}
					validate={required()}
				/>
				<DateInput name="to" label="Date fin" source="to" />
			</Stack>
			<FileComponent />
			<MultilingualContentTab />
		</SimpleForm>
	);
}
