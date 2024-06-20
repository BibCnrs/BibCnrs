import { Edit, SimpleForm } from "react-admin";
import { EditActions } from "../components/Actions";
import { ResourcesForm } from "./ResourcesForm";

const ResourcesEdit = () => {
	return (
		<Edit actions={<EditActions />} redirect="list">
			<SimpleForm>
				<ResourcesForm />
			</SimpleForm>
		</Edit>
	);
};

export default ResourcesEdit;
