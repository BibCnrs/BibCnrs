import {
	BooleanInput,
	Create,
	FileField,
	FileInput,
	ReferenceInput,
	SelectInput,
	SimpleForm,
} from "react-admin";
import { CreateActions } from "../components/Actions";
import {
	MultilingualContentTab,
	validateLicenceCreation,
} from "../components/MultilingualContentTab";
import { LicenseCommunities } from "./LicenseCommunities";

const LicenseCreate = () => {
	return (
		<Create actions={<CreateActions />} redirect="list">
			<SimpleForm validate={validateLicenceCreation}>
				<LicenseCommunities />
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
