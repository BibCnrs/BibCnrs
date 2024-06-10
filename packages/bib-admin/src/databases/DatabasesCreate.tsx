import { Create, SimpleForm } from "react-admin";
import { CreateActions } from "../components/Actions";
import { DatabasesForm } from "./DatabasesForm";

const DatabasesCreate = () => (
	<Create actions={<CreateActions />} redirect="list">
		<SimpleForm>
			<DatabasesForm />
		</SimpleForm>
	</Create>
);

export default DatabasesCreate;
