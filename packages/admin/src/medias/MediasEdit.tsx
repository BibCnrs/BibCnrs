import { useEffect, useState } from "react";
import {
	DateField,
	Edit,
	EditActions,
	FileField,
	FileInput,
	Labeled,
	SelectArrayInput,
	SimpleForm,
	TextField,
	TextInput,
	useEditController,
} from "react-admin";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function transformTags(record: any) {
	if (typeof record?.tag === "string") {
		return record.tag.split(",").map((tag: string) => tag.trim());
	}
	return [];
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function validate(values: any, record: any) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const errors: any = {};
	if (!values.name) {
		errors.name = "ra.validation.required";
	}
	if (values.url2 && !values.url2.startsWith("http")) {
		errors.url2 = "Lien invalide";
	}
	if (values.file2 && record.file_name) {
		const fileExtension = values.file2.rawFile.name
			.split(".")
			.pop()
			.toLowerCase();
		const expectedExtension = record.file_name.split(".").pop().toLowerCase();
		const isImage = ["jpg", "png", "svg"].includes(expectedExtension);
		if (expectedExtension === "pdf" && fileExtension !== "pdf") {
			errors.file2 =
				"Le fichier doit être de type PDF et avoir l'extension .pdf";
		} else if (isImage && !["jpg", "png", "svg"].includes(fileExtension)) {
			errors.file2 =
				"Le fichier doit être une image et avoir l'extension .jpg, .png ou .svg";
		} else if (!isImage && fileExtension !== expectedExtension) {
			errors.file2 = `Le fichier doit avoir la même extension que le nom de fichier existant (${expectedExtension}) `;
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

	const Choices = [
		{ id: "Accueil", name: "Accueil" },
		{ id: "Alertes", name: "Alertes" },
		{ id: "EN", name: "EN" },
		{ id: "FAQ", name: "FAQ" },
		{ id: "FR", name: "FR" },
		{ id: "Image", name: "Image" },
		{ id: "licences", name: "Licences" },
		{ id: "Logo", name: "Logo" },
		{ id: "Actus", name: "Actus" },
		{ id: "Pdf", name: "PDF" },
		{ id: "Plateformes", name: "Plateformes" },
		{ id: "Ressources", name: "Ressources" },
		{ id: "Video", name: "Vidéo" },
	];

	return (
		<Edit actions={<EditActions />} redirect="list">
			<SimpleForm validate={(values) => validate(values, record)}>
				<Labeled>
					<TextField source="name" label="resources.medias.fields.name" />
				</Labeled>
				<Labeled>
					<DateField
						source="created_at"
						label="resources.medias.fields.createdAt"
					/>
				</Labeled>
				<Labeled>
					<SelectArrayInput
						source="tag"
						label="Tag du Média"
						choices={Choices}
						format={(value) => transformTags({ tag: value })}
						parse={(value) => value.join(", ")}
					/>
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
