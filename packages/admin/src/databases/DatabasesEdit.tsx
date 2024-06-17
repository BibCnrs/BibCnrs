import { Edit, SimpleForm, useRecordContext } from "react-admin";
import { EditActions } from "../components/Actions";
import EditToolbar from "../components/EditToolbar";
import { DatabasesForm } from "./DatabasesForm";

const DatabasesTitle = () => {
	const record = useRecordContext();
	return record ? record.name_fr : "";
};

const DatabasesEdit = () => (
	<Edit title={<DatabasesTitle />} actions={<EditActions />}>
		<SimpleForm toolbar={<EditToolbar />}>
			<DatabasesForm />
		</SimpleForm>
	</Edit>
);

export default DatabasesEdit;
