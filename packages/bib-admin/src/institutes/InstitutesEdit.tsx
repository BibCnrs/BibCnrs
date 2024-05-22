import {
	AutocompleteArrayInput,
	Edit,
	ReferenceArrayInput,
	SimpleForm,
	TextInput,
	required,
	useRecordContext,
} from "react-admin";
import { EditActions } from "../components/Actions";
import EditToolbar from "../components/EditToolbar";

const InstitutesTitle = () => {
	const record = useRecordContext();
	return record ? record.name : "";
};

const InstitutesEdit = () => (
	<Edit title={<InstitutesTitle />} actions={<EditActions />}>
		<SimpleForm toolbar={<EditToolbar />}>
			<TextInput
				source="code"
				label="resources.institutes.fields.code"
				validate={required()}
			/>
			<TextInput
				source="name"
				label="resources.institutes.fields.name"
				validate={required()}
			/>
			<ReferenceArrayInput
				label="resources.institutes.fields.communities"
				source="communities"
				reference="communities"
			>
				<AutocompleteArrayInput
					filterToQuery={(searchText) => ({ name: searchText })}
					optionText="name"
					fullWidth
				/>
			</ReferenceArrayInput>
		</SimpleForm>
	</Edit>
);

export default InstitutesEdit;
