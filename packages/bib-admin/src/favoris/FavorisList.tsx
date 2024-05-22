import jsonExport from "jsonexport/dist";
import {
	AutocompleteInput,
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

const FavorisFilter = [
	<TextInput key="match" label="Rechercher" source="match" alwaysOn />,
	<TextInput
		key="title"
		label="resources.revues.fields.title"
		source="title"
	/>,
	<ReferenceInput
		key="community_id"
		label="resources.revues.fields.communities"
		source="community_id"
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
	const data = dataWithRelation.map((record) => renameKeys(record, "revues"));
	jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
		downloadCSV(csv, "revues");
	});
};

const FavorisList = () => (
	<List
		filters={FavorisFilter}
		perPage={10}
		pagination={<CustomPagination />}
		sort={{ field: "title", order: "ASC" }}
		exporter={exporter}
		actions={<ListActions />}
	>
		<Datagrid bulkActionButtons={<BulkActionButtons />}>
			<LinkEdit source="title" label="resources.revues.fields.title" />

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

export default FavorisList;
