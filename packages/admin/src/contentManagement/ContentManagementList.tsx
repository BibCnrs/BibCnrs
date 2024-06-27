import Chip from "@mui/material/Chip";
import find from "lodash/find";
import {
	BooleanField,
	Datagrid,
	DateField,
	DeleteWithConfirmButton,
	EditButton,
	List,
	NumberField,
	SelectInput,
	TextInput,
	WrapperField,
	useRecordContext,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { pages } from "./ContentManagementHeader";

function InternalChip() {
	const record = useRecordContext();
	return <Chip label={find(pages, { id: record?.page })?.name} />;
}

const ContentManagementFilter = [
	<TextInput key="name_fr" label="Rechercher" source="name_fr" alwaysOn />,
	<SelectInput key="page" source="page" choices={pages} />,
];

export default function ContentManagementList() {
	return (
		<List
			filters={ContentManagementFilter}
			perPage={10}
			pagination={<CustomPagination />}
		>
			<Datagrid bulkActionButtons={<BulkActionButtons />}>
				<LinkEdit
					source="name_fr"
					label="resources.contentManagement.fields.name"
				/>
				<BooleanField label="Actif" source="enable" />
				<WrapperField label="Page">
					<InternalChip />
				</WrapperField>
				<NumberField source="order" label="Ordre" />
				<DateField source="from" label="Date début" />
				<DateField source="to" emptyText="-" label="Date fin" />
				<EditButton />
				<DeleteWithConfirmButton />
			</Datagrid>
		</List>
	);
}
