import {
	Datagrid,
	DeleteWithConfirmButton,
	EditButton,
	List,
	TextField,
	TextInput,
} from "react-admin";
import { ListActions } from "../components/Actions";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";

const AdminUserFilter = [
	<TextInput key="match" label="Rechercher" source="match" alwaysOn />,
];

const AdminUserList = () => (
	<List
		filters={AdminUserFilter}
		perPage={25}
		pagination={<CustomPagination />}
		actions={<ListActions />}
	>
		<Datagrid bulkActionButtons={<BulkActionButtons />}>
			<TextField source="username" label="resources.adminUsers.fields.login" />
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);

export default AdminUserList;
