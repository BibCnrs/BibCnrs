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

	if (!values.file) {
		errors.file = "ra.validation.required";
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
				<FileInput
					sx={{ marginTop: 4 }}
					source="file"
					label="Fichier"
					validate={required()}
					name="file"
				>
					<FileField source="src" title="title" />
				</FileInput>
			</SimpleForm>
		</Create>
	);
}
