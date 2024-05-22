import {
	BooleanInput,
	Create,
	SimpleForm,
	TextInput,
	required,
} from "react-admin";
import { CreateActions } from "../components/Actions";

const CommunitiesCreate = () => (
	<Create actions={<CreateActions />} redirect="list">
		<SimpleForm>
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
	</Create>
);

export default CommunitiesCreate;
