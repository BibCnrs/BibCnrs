import { useEffect } from "react";
import {
	Create,
	FileField,
	FileInput,
	SelectInput,
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
				"Le nom ne doit contenir que des lettres sans chiffres, tirets ou extensions.";
		}
	}

	if (!values.file && !values.url) {
		errors.url = "ra.validation.required";
	}

	if (!values.tag) {
		errors.tag = "Le tag est requis";
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

				<SelectInput
					source="tag"
					label="Tag du Média"
					choices={[
						{ id: "logo", name: "Logo" },
						{ id: "image", name: "Image" },
						{ id: "pdf", name: "PDF" },
						{ id: "video", name: "Vidéo" },
						{ id: "contentFR", name: "Content FR" },
						{ id: "contentEN", name: "Content EN" },
						{ id: "Alertes", name: "Alertes" },
						{ id: "News", name: "Actualités" },
						{ id: "Plateformes", name: "Plateformes" },
						{ id: "Ressources", name: "Ressources" },
						{ id: "FAQ", name: "FAQ" },
						{ id: "licences", name: "Licences" },
						{ id: "Accueil", name: "Accueil" },
					]}
					validate={required()}
				/>

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
