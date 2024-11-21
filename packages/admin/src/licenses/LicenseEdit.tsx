import {
	AutocompleteInput,
	BooleanInput,
	Edit,
	FileField,
	FileInput,
	ReferenceInput,
	SimpleForm,
} from "react-admin";
import { EditActions } from "../components/Actions";
import { MultilingualContentTab } from "../components/MultilingualContentTab";
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
const LicenseEdit = () => {
	return (
		<Edit actions={<EditActions />} redirect="list">
			<SimpleForm>
				<LicenseCommunities />
				<FileComponent />
				<BooleanInput
					label="Actif"
					source="enable"
					name="enable"
					options={undefined}
				/>
				<MultilingualContentTab />
			</SimpleForm>
		</Edit>
	);
};

export default LicenseEdit;
