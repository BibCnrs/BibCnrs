import { Create, SimpleForm } from "react-admin";
import { CreateActions } from "../components/Actions";
import { ResourcesForm } from "./ResourcesForm";

const ResourcesCreate = () => {
	return (
		<Create actions={<CreateActions />} redirect="list">
			<SimpleForm>
				<ResourcesForm />
			</SimpleForm>
		</Create>
	);
};

export default ResourcesCreate;
