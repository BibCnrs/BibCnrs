import {
	DateField,
	Edit,
	EditActions,
	FileField,
	Labeled,
	SimpleForm,
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
				<Labeled>
					<FileField source="url" title="url" />
				</Labeled>
			</SimpleForm>
		</Edit>
	);
}
