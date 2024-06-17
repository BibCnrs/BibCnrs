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

const InstitutesFilter = [
	<TextInput key="match" label="Rechercher" source="match" alwaysOn />,
	<TextInput key="id" source="id" label="resources.institutes.fields.id" />,
	<TextInput
		key="code"
		source="code"
		label="resources.institutes.fields.code"
	/>,
	<TextInput
		key="name"
		source="name"
		label="resources.institutes.fields.name"
	/>,
	<ReferenceInput
		key="institute_community"
		label="resources.institutes.fields.communities"
		source="institute_community.community_id"
		reference="communities"
	>
		<AutocompleteInput
			key="institute_community_autocomplete"
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.institutes.fields.communities"
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
		renameKeys(record, "institutes"),
	);
	jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
		downloadCSV(csv, "institutes");
	});
};

const InstitutesList = () => (
	<List
		filters={InstitutesFilter}
		perPage={10}
		pagination={<CustomPagination />}
		exporter={exporter}
		actions={<ListActions />}
	>
		<Datagrid bulkActionButtons={<BulkActionButtons />}>
			<LinkEdit source="id" label="resources.institutes.fields.id" />
			<LinkEdit label="resources.institutes.fields.code" source="code" />
			<LinkEdit source="name" label="resources.institutes.fields.name" />
			<ReferenceArrayField
				label="resources.institutes.fields.communities"
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

export default InstitutesList;
