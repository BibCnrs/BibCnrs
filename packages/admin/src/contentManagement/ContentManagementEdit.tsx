import { Edit, SimpleForm } from "react-admin";
import { EditActions } from "../components/Actions";
import { validateMultilingualContentCreation } from "../components/MultilingualContentTab";
import { ContentManagementForm } from "./ContentManagementForm";

const transformEdit = (data) => {
	if (data.page !== "home" && data.page !== "alert") {
		return {
			...data,
			media_id: null,
		};
	}

	return data;
};

export default function ContentManagementEdit() {
	return (
		<Edit actions={<EditActions />} redirect="list" transform={transformEdit}>
			<SimpleForm validate={validateMultilingualContentCreation}>
				<ContentManagementForm />
			</SimpleForm>
		</Edit>
	);
}
