import {
	AutocompleteInput,
	BooleanInput,
	FileField,
	FileInput,
	ReferenceInput,
	TextInput,
} from "react-admin";

const FileComponent = () => (
	<>
		<ReferenceInput label="Média associé" source="media_id" reference="medias">
			<AutocompleteInput
				filterToQuery={(searchText) => ({
					name: searchText,
				})}
				optionText="name"
				fullWidth
			/>
		</ReferenceInput>
		<FileInput sx={{ marginTop: 4 }} source="file" label="Média à uploader">
			<FileField source="src" title="title" />
		</FileInput>
	</>
);
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
			<FileComponent />
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
