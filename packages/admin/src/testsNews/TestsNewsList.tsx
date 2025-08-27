import Chip from "@mui/material/Chip";
import find from "lodash/find";
import {
	BooleanField,
	ChipField,
	Datagrid,
	DateField,
	DeleteWithConfirmButton,
	EditButton,
	List,
	ReferenceArrayField,
	SelectInput,
	SingleFieldList,
	TextInput,
	WrapperField,
	useRecordContext,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { pages } from "./TestsNewsHeader";

const InternalChip = () => {
	const record = useRecordContext();
	return <Chip label={find(pages, { id: record?.page })?.name} />;
};

const TestsNewsFilter = [
	<TextInput key="name_fr" label="Rechercher" source="name_fr" alwaysOn />,
	<SelectInput key="page" source="page" choices={pages} />,
];
export default function TestsNewsList() {
	return (
		<List
			filters={TestsNewsFilter}
			perPage={10}
			pagination={<CustomPagination />}
			sort={{ field: "from", order: "DESC" }}
		>
			<Datagrid bulkActionButtons={<BulkActionButtons />}>
				<LinkEdit source="name_fr" label="Nom" />
				<BooleanField label="Actif" source="enable" />
				<WrapperField label="Page" source={null}>
					<InternalChip />
				</WrapperField>
				<ReferenceArrayField
					label="Communautés"
					source="communities"
					reference="communities"
				>
					<SingleFieldList>
						<ChipField source="name" />
					</SingleFieldList>
				</ReferenceArrayField>
				<DateField source="from" label="Date début" />
				<DateField source="to" emptyText="-" label="Date fin" />
				<EditButton />
				<DeleteWithConfirmButton />
			</Datagrid>
		</List>
	);
}
