import {
	BooleanInput,
	FileField,
	FileInput,
	ReferenceInput,
	SelectInput,
	TextInput,
} from "react-admin";

export const ResourcesForm = () => {
	return (
		<>
			<BooleanInput
				sx={{ marginTop: "15px" }}
				label="Actif"
				source="enable"
				name="enable"
				defaultValue={true}
			/>
			<ReferenceInput
				label="Média associé"
				source="media_id"
				reference="medias"
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
			<FileInput
				sx={{ marginTop: 4 }}
				source="file"
				label="Média à uploader"
				name="file"
			>
				<FileField source="src" title="title" />
			</FileInput>
			<TextInput
				label="Titre français"
				sx={{ width: "100%" }}
				name="name_fr"
				source="name_fr"
				required
			/>
			<TextInput
				label="Titre anglais"
				sx={{ width: "100%" }}
				name="name_en"
				source="name_en"
				required
			/>
		</>
	);
};
