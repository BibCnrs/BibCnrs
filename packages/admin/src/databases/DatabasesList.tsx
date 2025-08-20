import jsonExport from "jsonexport/dist";
import {
	AutocompleteInput,
	BooleanField,
	ChipField,
	Datagrid,
	DeleteWithConfirmButton,
	EditButton,
	List,
	type RaRecord,
	ReferenceArrayField,
	ReferenceInput,
	SingleFieldList,
	TextInput,
	downloadCSV,
} from "react-admin";
import { ListActions } from "../components/Actions";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";

const DatabasesFilter = [
	<TextInput key="name_fr" label="Rechercher" source="name_fr" alwaysOn />,
	<ReferenceInput
		key="communities.community_id"
		label="resources.revues.fields.communities"
		source="communities.community_id"
		reference="communities"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.revues.fields.communities"
		/>
	</ReferenceInput>,
];

const exporter = async (
	records: RaRecord[],
	fetchRelatedRecords: (
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		data: any,
		field: string,
		resource: string,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	) => Promise<any>,
) => {
	const listCommunities = await fetchRelatedRecords(
		records,
		"communities",
		"communities",
	);
	const dataWithRelation = records.map((record) => ({
		...record,
		communities: record.communities.map((n: number) => listCommunities[n].name),
	}));
	const data = dataWithRelation.map((record) =>
		renameKeys(record, "databases"),
	);
	jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
		downloadCSV(csv, "databases");
	});
};

const DatabasesList = () => (
	<List
		filters={DatabasesFilter}
		sort={{ field: "name_fr", order: "ASC" }}
		perPage={10}
		pagination={<CustomPagination />}
		exporter={exporter}
		actions={<ListActions />}
	>
		<Datagrid bulkActionButtons={<BulkActionButtons />}>
			<LinkEdit source="name_fr" label="resources.databases.fields.name_fr" />
			<BooleanField source="active" label="resources.databases.fields.active" />
			<BooleanField
				source="oa"
				label="resources.databases.fields.open_access"
			/>
			<BooleanField
				source="diamond"
				label="resources.databases.fields.diamond"
			/>
			<BooleanField
				source="use_proxy"
				label="resources.databases.fields.has_proxy"
			/>{" "}
			<ReferenceArrayField
				label="resources.revues.fields.communities"
				reference="communities"
				source="communities"
				sortable={false}
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);

export default DatabasesList;
