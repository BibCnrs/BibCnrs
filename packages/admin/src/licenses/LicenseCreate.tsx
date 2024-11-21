import {
	AutocompleteInput,
	BooleanInput,
	Create,
	FileField,
	FileInput,
	ReferenceInput,
	SimpleForm,
} from "react-admin";
import { CreateActions } from "../components/Actions";
import {
	MultilingualContentTab,
	validateLicenceCreation,
} from "../components/MultilingualContentTab";
import { LicenseCommunities } from "./LicenseCommunities";

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
const LicenseCreate = () => {
	return (
		<Create actions={<CreateActions />} redirect="list">
			<SimpleForm validate={validateLicenceCreation}>
				<LicenseCommunities />
				<FileComponent />
				<BooleanInput
					label="Actif"
					source="enable"
					sx={{ marginTop: 4 }}
					defaultValue={true}
				/>
				<MultilingualContentTab />
			</SimpleForm>
		</Create>
	);
};

export default LicenseCreate;
