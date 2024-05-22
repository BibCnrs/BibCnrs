import Chip from "@mui/material/Chip";
import {
	BooleanField,
	Datagrid,
	DeleteWithConfirmButton,
	EditButton,
	List,
	WrapperField,
	useRecordContext,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";

function InternalChip() {
	const record = useRecordContext();
	return <Chip label={record?.community} />;
}

const ResourcesList = () => {
	return (
		<List perPage={10} pagination={<CustomPagination />}>
			<Datagrid bulkActionButtons={<BulkActionButtons />}>
				<LinkEdit source="name_fr" label="resources.resource.fields.name" />
				<BooleanField label="Actif" source="enable" />
				<WrapperField label="Communautés (Couleur de)">
					<InternalChip />
				</WrapperField>
				<EditButton />
				<DeleteWithConfirmButton />
			</Datagrid>
		</List>
	);
};

export default ResourcesList;
