import {
	DateField,
	Edit,
	EditActions,
	FileField,
	FileInput,
	Labeled,
	SimpleForm,
	TextField,
	TextInput,
	required,
} from "react-admin";
// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
function validate(values: any) {
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const errors: any = {};
	if (!values.name) {
		errors.name = "ra.validation.required";
	}

	return errors;
}

export default function MediasEdit() {
	return (
		<Edit actions={<EditActions />} redirect="list">
			<SimpleForm validate={validate}>
				<TextInput
					source="name"
					label="resources.medias.fields.name"
					validate={required()}
					name="name"
				/>
				<Labeled>
					<DateField
						source="created_at"
						label="resources.medias.fields.createdAt"
					/>
				</Labeled>
				<TextInput label="Url" source="url" title="url" />

				<FileInput
					sx={{ marginTop: 4 }}
					source="file2"
					label="Fichier"
					name="file2"
					placeholder="Pour remplacer le média, déposez un nouveau fichier ici."
				>
					<FileField source="src" title="title" />
				</FileInput>
			</SimpleForm>
		</Edit>
	);
}
