import jsonExport from "jsonexport/dist";
import {
	AutocompleteInput,
	Datagrid,
	DeleteWithConfirmButton,
	EditButton,
	List,
	type RaRecord,
	ReferenceInput,
	TextInput,
	downloadCSV,
} from "react-admin";
import { ListActions } from "../components/Actions";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";

const SectionsFilter = [
	<TextInput key="match" label="Rechercher" source="match" alwaysOn />,
	<TextInput
		key="section_cn.name"
		source="section_cn.name"
		label="resources.section_cn.fields.name"
	/>,
	<TextInput
		key="code"
		source="code"
		label="resources.section_cn.fields.code"
	/>,
	<TextInput
		key="comment"
		source="comment"
		label="resources.section_cn.fields.comment"
	/>,
	<ReferenceInput
		key="section_cn_primary_institute"
		label="resources.section_cn.fields.primary_institutes"
		source="section_cn_primary_institute.institute_id"
		reference="institutes"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.section_cn.fields.primary_institutes"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="section_cn_secondary_institute"
		label="resources.section_cn.fields.secondary_institutes"
		source="section_cn_secondary_institute.institute_id"
		reference="institutes"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.section_cn.fields.secondary_institutes"
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
	const listPrincipalUnit = await fetchRelatedRecords(
		records,
		"primary_institutes",
		"institutes",
	);
	const listSecondaryUnit = await fetchRelatedRecords(
		records,
		"secondary_institutes",
		"institutes",
	);
	const dataWithRelation = records.map((record) => ({
		...record,
		primary_institutes: record.primary_institutes.map(
			(n: number) => listPrincipalUnit[n].name,
		),
		secondary_institutes: record.secondary_institutes.map(
			(n: number) => listSecondaryUnit[n].name,
		),
	}));
	const data = dataWithRelation.map((record) =>
		renameKeys(record, "section_cn"),
	);
	jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
		downloadCSV(csv, "section_cn");
	});
};

const SectionsList = () => (
	<List
		filters={SectionsFilter}
		perPage={10}
		pagination={<CustomPagination />}
		exporter={exporter}
		actions={<ListActions />}
	>
		<Datagrid bulkActionButtons={<BulkActionButtons />}>
			<LinkEdit label="resources.section_cn.fields.name" source="name" />
			<LinkEdit label="resources.section_cn.fields.code" source="code" />
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);

export default SectionsList;
