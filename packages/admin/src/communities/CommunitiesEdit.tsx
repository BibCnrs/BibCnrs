import {
	BooleanInput,
	Edit,
	SimpleForm,
	TextInput,
	required,
	useRecordContext,
} from "react-admin";
import { EditActions } from "../components/Actions";
import EditToolbar from "../components/EditToolbar";

const CommunitiesTitle = () => {
	const record = useRecordContext();
	return record ? record.name : "";
};

const CommunitiesEdit = () => (
	<Edit title={<CommunitiesTitle />} actions={<EditActions />}>
		<SimpleForm toolbar={<EditToolbar />}>
			<TextInput
				source="name"
				label="resources.communities.fields.name"
				fullWidth
				validate={required()}
			/>
			<TextInput
				source="gate"
				label="resources.communities.fields.gate"
				fullWidth
				validate={required()}
			/>
			<TextInput
				source="user_id"
				label="resources.communities.fields.user_id"
				fullWidth
				validate={required()}
			/>
			<TextInput
				source="password"
				label="resources.communities.fields.password"
				fullWidth
				validate={required()}
			/>
			<TextInput
				source="profile"
				label="resources.communities.fields.profile"
				fullWidth
				validate={required()}
			/>
			<BooleanInput source="ebsco" label="resources.communities.fields.ebsco" />
		</SimpleForm>
	</Edit>
);

export default CommunitiesEdit;
