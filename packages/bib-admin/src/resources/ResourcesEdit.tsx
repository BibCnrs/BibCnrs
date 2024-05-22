import { BooleanInput, Edit, SimpleForm, TextInput } from "react-admin";
import { EditActions } from "../components/Actions";
import ResourcesHeader from "./ResourcesHeader";

const ResourcesEdit = () => {
	return (
		<Edit actions={<EditActions />} redirect="list">
			<SimpleForm>
				<ResourcesHeader />
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
				/>
				<TextInput
					label="Titre français"
					sx={{ width: "100%" }}
					name="name_fr"
					source="name_fr"
				/>
				<TextInput
					label="Titre anglais"
					sx={{ width: "100%" }}
					name="name_en"
					source="name_en"
				/>
			</SimpleForm>
		</Edit>
	);
};

export default ResourcesEdit;
