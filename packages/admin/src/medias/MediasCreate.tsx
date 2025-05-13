import { useEffect } from "react";
import {
	AutocompleteArrayInput,
	Create,
	FileField,
	FileInput,
	ReferenceArrayInput,
	SimpleForm,
	TextInput,
	required,
} from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
import { CreateActions } from "../components/Actions";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function validate(values: any) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const errors: any = {};
	if (!values.name) {
		errors.name = "ra.validation.required";
	} else {
		const invalidName = /[^a-zA-Z\s]|(\.[a-zA-Z0-9]+)$/;
		if (invalidName.test(values.name)) {
			errors.name =
				"Le nom du média ne doit contenir que des lettres sans chiffres, tirets ou extensions.";
		}
	}

	if (values.file && values.url) {
		errors.name = "Un média est soit une URL soit un fichier pas les deux.";
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
				<NameFile />
				<TextInput
					source="name"
					label="resources.medias.fields.name"
					validate={required()}
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
				<ReferenceArrayInput
					label="Tags"
					source="tags"
					reference="tags"
					sort={{ field: "id", order: "ASC" }}
				>
					<AutocompleteArrayInput
						filterToQuery={(searchText) => ({ name: searchText })}
						optionText="name"
						fullWidth
					/>
				</ReferenceArrayInput>
			</SimpleForm>
		</Create>
	);
}

function NameFile() {
	const file = useWatch({ name: "file" });
	const { setValue } = useFormContext();

	useEffect(() => {
		if (file) {
			setValue("name", file.rawFile.name.replace(/\.[^/.]+$/, ""));
		}
	}, [file, setValue]);

	return null;
}
