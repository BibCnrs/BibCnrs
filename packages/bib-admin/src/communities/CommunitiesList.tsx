import jsonExport from "jsonexport/dist";
import {
	BooleanField,
	BooleanInput,
	Datagrid,
	DeleteWithConfirmButton,
	EditButton,
	List,
	type RaRecord,
	TextField,
	TextInput,
	downloadCSV,
} from "react-admin";
import { ListActions } from "../components/Actions";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";

const CommunitiesFilter = [
	<TextInput key="match" label="Rechercher" source="match" alwaysOn />,
	<TextInput
		key="gate"
		source="gate"
		label="resources.communities.fields.gate"
	/>,
	<TextInput
		key="user_id"
		source="user_id"
		label="resources.communities.fields.user_id"
	/>,
	<TextInput
		key="password"
		source="password"
		label="resources.communities.fields.password"
	/>,
	<TextInput
		key="profile"
		source="profile"
		label="resources.communities.fields.profile"
	/>,
	<BooleanInput
		key="ebsco"
		source="ebsco"
		label="resources.communities.fields.ebsco"
	/>,
];

const exporter = async (records: RaRecord[]) => {
	const data = records.map((record) => renameKeys(record, "communities"));
	jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
		downloadCSV(csv, "communities");
	});
};

const CommunitiesList = () => (
	<List
		filters={CommunitiesFilter}
		perPage={10}
		pagination={<CustomPagination />}
		exporter={exporter}
		actions={<ListActions />}
	>
		<Datagrid bulkActionButtons={<BulkActionButtons />}>
			<LinkEdit source="name" label="resources.communities.fields.name" />

			<TextField source="gate" label="resources.communities.fields.gate" />
			<TextField
				source="user_id"
				label="resources.communities.fields.user_id"
			/>
			<TextField
				source="profile"
				label="resources.communities.fields.profile"
			/>
			<BooleanField source="ebsco" label="resources.communities.fields.ebsco" />
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);

export default CommunitiesList;
