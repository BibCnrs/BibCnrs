import {
	BooleanInput,
	Create,
	FileField,
	FileInput,
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
				<FileInput
					sx={{ marginTop: 4 }}
					source="pdf"
					label="PDF"
					accept={{ "application/pdf": [".pdf"] }}
					maxSize={26000000}
					helperText="Taille maximale 25 Mb"
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
