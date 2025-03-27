import { useEffect, useState } from "react";
import {
	DateField,
	Edit,
	EditActions,
	FileField,
	FileInput,
	Labeled,
	SimpleForm,
	TextInput,
	required,
	useEditController,
} from "react-admin";

// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
function validate(values: any) {
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const errors: any = {};
	if (!values.name) {
		errors.name = "ra.validation.required";
	}

	const { record } = useEditController();
	console.log(record);
	console.log(values);
	if (record?.file2 && record.file_name) {
		const fileExtension = values.file2.name.split(".").pop().toLowerCase();
		const expectedExtension = record.file_name.split(".").pop().toLowerCase();
		if (fileExtension !== expectedExtension) {
			errors.file2 =
				"Le fichier doit avoir la même extension que le nom de fichier existant.";
		}
	}

	return errors;
}

export default function MediasEdit() {
	const { record } = useEditController();
	const [hasFileName, setHasFileName] = useState(false);

	useEffect(() => {
		if (record?.file_name) {
			setHasFileName(true);
		} else {
			setHasFileName(false);
		}
	}, [record]);

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
					<FileField label="Url" source="url" title="url" target="_blank" />
				</Labeled>

				{hasFileName ? (
					<FileInput
						sx={{ marginTop: 4 }}
						source="file2"
						label="Pour remplacer le contenu du média"
						name="file2"
						placeholder="Déposez un nouveau fichier ici."
					>
						<FileField source="src" title="title" />
					</FileInput>
				) : (
					<TextInput label="Nouvelle URL du Média" source="url2" />
				)}
			</SimpleForm>
		</Edit>
	);
}
