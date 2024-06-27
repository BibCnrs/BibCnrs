import { Edit, SimpleForm } from "react-admin";
import { EditActions } from "../components/Actions";
import { validateMultilingualContentCreation } from "../components/MultilingualContentTab";
import { ContentManagementForm } from "./ContentManagementForm";

export default function ContentManagementEdit() {
	return (
		<Edit actions={<EditActions />} redirect="list">
			<SimpleForm validate={validateMultilingualContentCreation}>
				<ContentManagementForm />
			</SimpleForm>
		</Edit>
	);
}
