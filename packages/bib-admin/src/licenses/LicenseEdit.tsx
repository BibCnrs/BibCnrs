import { BooleanInput, Edit, SimpleForm, TextInput } from "react-admin";
import { EditActions } from "../components/Actions";
import { MultilingualContentTab } from "../components/MultilingualContentTab";
import { LicenseCommunities } from "./LicenseCommunities";

const LicenseEdit = () => {
	return (
		<Edit actions={<EditActions />} redirect="list">
			<SimpleForm>
				<LicenseCommunities />
				<TextInput
					sx={{ marginTop: 4, width: "100%" }}
					name="pdf.title"
					source="pdf.title"
				/>
				<TextInput sx={{ width: "100%" }} name="pdf.src" source="pdf.src" />
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
