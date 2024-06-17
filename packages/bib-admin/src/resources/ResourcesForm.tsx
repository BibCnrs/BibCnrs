import { BooleanInput, TextInput } from "react-admin";

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
			<TextInput
				label="Lien du fichier"
				sx={{ width: "100%" }}
				name="href"
				source="href"
				required
			/>
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
