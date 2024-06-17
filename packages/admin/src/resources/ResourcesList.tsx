import {
	BooleanField,
	Datagrid,
	DeleteWithConfirmButton,
	EditButton,
	List,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";

const ResourcesList = () => {
	return (
		<List perPage={10} pagination={<CustomPagination />}>
			<Datagrid bulkActionButtons={<BulkActionButtons />}>
				<LinkEdit source="name_fr" label="resources.resource.fields.name" />
				<BooleanField label="Actif" source="enable" />
				<EditButton />
				<DeleteWithConfirmButton />
			</Datagrid>
		</List>
	);
};

export default ResourcesList;
