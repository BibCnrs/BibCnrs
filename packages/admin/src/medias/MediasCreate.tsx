import {
	Create,
	FileField,
	FileInput,
	SimpleForm,
	TextInput,
	required,
} from "react-admin";
import { CreateActions } from "../components/Actions";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function validate(values: any) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const errors: any = {};
	if (!values.name) {
		errors.name = "ra.validation.required";
	}

	if (!values.file && !values.url) {
		errors.url = "ra.validation.required";
	}

	return errors;
}

export default function MediasCreate() {
	return (
		<Create actions={<CreateActions />} redirect="list">
			<SimpleForm validate={validate}>
				<TextInput
					source="name"
					label="resources.medias.fields.name"
					validate={required()}
					name="name"
				/>

				<TextInput source="url" label="URL du Média" name="url" />

				<FileInput
					sx={{ marginTop: 4 }}
					source="file"
					label="Fichier"
					name="file"
				>
					<FileField source="src" title="title" />
				</FileInput>
			</SimpleForm>
		</Create>
	);
}
