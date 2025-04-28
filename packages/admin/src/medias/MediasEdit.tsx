import { useEffect, useState } from "react";
import {
	Button,
	DateField,
	DeleteButton,
	DeleteWithConfirmButton,
	Edit,
	EditActions,
	FileField,
	FileInput,
	Labeled,
	ListButton,
	SaveButton,
	ShowButton,
	SimpleForm,
	TextField,
	TextInput,
	Toolbar,
	TopToolbar,
	useEditController,
	useRecordContext,
} from "react-admin";
import EditToolbar from "../components/EditToolbar";

// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
function validate(values: any, record: any) {
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
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

const PostEditActions = () => {
	const record = useRecordContext();
	if (!record) return null;
	return (
		<TopToolbar>
			<ListButton />
			{!record.isUsed && <DeleteWithConfirmButton record={record} />}
		</TopToolbar>
	);
};

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
		<Edit actions={<PostEditActions />} redirect="list">
			<SimpleForm
				validate={(values) => validate(values, record)}
				toolbar={<EditToolbar />}
			>
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
