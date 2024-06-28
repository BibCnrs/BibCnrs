import { Create, SimpleForm } from "react-admin";
import { CreateActions } from "../components/Actions";
import { validateMultilingualContentCreation } from "../components/MultilingualContentTab";
import { ContentManagementForm } from "./ContentManagementForm";

export default function ContentManagementCreate() {
	return (
		<Create actions={<CreateActions />} redirect="list">
			<SimpleForm validate={validateMultilingualContentCreation}>
				<ContentManagementForm />
			</SimpleForm>
		</Create>
	);
}
