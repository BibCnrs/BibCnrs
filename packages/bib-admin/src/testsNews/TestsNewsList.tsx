import Chip from "@mui/material/Chip";
import find from "lodash/find";
import {
	BooleanField,
	Datagrid,
	DateField,
	DeleteWithConfirmButton,
	EditButton,
	List,
	SelectInput,
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

const DomainsField = () => {
	const record = useRecordContext();
	if (record?.domains && record.domains.length !== 0) {
		const domains = record.domains as string[];
		return (
			<>
				{domains.map((domain) => (
					<Chip key={domain} label={domain} />
				))}
			</>
		);
	}
	return <Chip label="Common" />;
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
		>
			<Datagrid bulkActionButtons={<BulkActionButtons />}>
				<LinkEdit source="name_fr" label="Nom" />
				<BooleanField label="Actif" source="enable" />
				<WrapperField label="Page">
					<InternalChip />
				</WrapperField>
				<WrapperField label="Domains">
					<DomainsField />
				</WrapperField>
				<DateField source="from" label="Date début" />
				<DateField source="to" emptyText="-" label="Date fin" />
				<EditButton />
				<DeleteWithConfirmButton />
			</Datagrid>
		</List>
	);
}
