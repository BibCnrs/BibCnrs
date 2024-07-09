import jsonExport from "jsonexport/dist";
import {
	AutocompleteInput,
	BooleanField,
	BooleanInput,
	ChipField,
	Datagrid,
	DeleteWithConfirmButton,
	EditButton,
	type FieldProps,
	List,
	type RaRecord,
	ReferenceArrayField,
	ReferenceField,
	ReferenceInput,
	SingleFieldList,
	TextField,
	TextInput,
	downloadCSV,
	useRecordContext,
} from "react-admin";
import { Link } from "react-router-dom";
import { ListActions } from "../components/Actions";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";

const UnitsFilter = [
	<TextInput key="match" label="Rechercher" source="match" alwaysOn />,
	<TextInput key="code" source="code" label="resources.units.fields.code" />,
	<TextInput key="name" source="name" label="resources.units.fields.name" />,
	<ReferenceInput
		key="unit_community"
		label="resources.units.fields.communities"
		source="unit_community.community_id"
		reference="communities"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.units.fields.communities"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="main_institute"
		label="resources.units.fields.main_institute"
		source="main_institute"
		reference="institutes"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.units.fields.main_institute"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="unit_institute"
		label="resources.units.fields.institutes"
		source="unit_institute.institute_id"
		reference="institutes"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.units.fields.institutes"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="unit_section_cn"
		label="resources.units.fields.section_cn"
		source="unit_section_cn.section_cn_id"
		reference="section_cn"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.units.fields.section_cn"
		/>
	</ReferenceInput>,
	<BooleanInput
		key="active"
		source="active"
		label="resources.inistAccounts.fields.active"
	/>,
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
	const listPrincipalIt = await fetchRelatedRecords(
		records,
		"main_institute",
		"institutes",
	);
	const listCommunities = await fetchRelatedRecords(
		records,
		"communities",
		"communities",
	);
	const listInstitutes = await fetchRelatedRecords(
		records,
		"institutes",
		"institutes",
	);
	const listSections = await fetchRelatedRecords(
		records,
		"sections_cn",
		"section_cn",
	);
	const dataWithRelation = records.map((record) => ({
		...record,
		main_institute:
			listPrincipalIt[record.main_institute] &&
			listPrincipalIt[record.main_institute].name,
		communities: record.communities.map((n: number) => listCommunities[n].name),
		institutes: record.institutes.map((n: number) => listInstitutes[n].name),
		sections_cn: record.sections_cn.map((n: number) => listSections[n].name),
	}));
	const data = dataWithRelation.map((record) => renameKeys(record, "units"));
	jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
		downloadCSV(csv, "units");
	});
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export const UrlSearchInist = (props: Omit<FieldProps, "source">) => {
	const record = useRecordContext();
	if (!record) {
		return null;
	}
	return (
		<Link
			to={{
				pathname: "/inistAccounts",
				search: `filter=${JSON.stringify({
					main_unit: record.id,
				})}`,
			}}
		>
			{record.nb_inist_account}
		</Link>
	);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export const UrlSearchJanus = (props: Omit<FieldProps, "source">) => {
	const record = useRecordContext();
	if (!record) {
		return null;
	}
	return (
		<Link
			to={{
				pathname: "/janusAccounts",
				search: `filter=${JSON.stringify({
					primary_unit: record.id,
				})}`,
			}}
		>
			{record.nb_janus_account}
		</Link>
	);
};

const UnitsList = () => (
	<List
		filters={UnitsFilter}
		perPage={10}
		pagination={<CustomPagination />}
		exporter={exporter}
		actions={<ListActions />}
	>
		<Datagrid bulkActionButtons={<BulkActionButtons />}>
			<LinkEdit source="code" label="resources.units.fields.code" />

			<LinkEdit source="name" label="resources.units.fields.name" />

			<ReferenceField
				label="resources.units.fields.main_institute"
				source="main_institute"
				reference="institutes"
				sortBy="institute.name"
			>
				<TextField source="name" />
			</ReferenceField>

			<ReferenceArrayField
				label="resources.units.fields.institutes"
				reference="institutes"
				source="institutes"
				sortable={false}
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>

			<UrlSearchInist label="Nombre de compte Inist" />
			<UrlSearchJanus label="Nombre de compte Janus" />

			<ReferenceArrayField
				label="resources.units.fields.communities"
				reference="communities"
				source="communities"
				sortable={false}
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>

			<ReferenceArrayField
				label="resources.units.fields.section_cn"
				reference="section_cn"
				source="sections_cn"
				sortable={false}
			>
				<SingleFieldList>
					<ChipField source="code" />
				</SingleFieldList>
			</ReferenceArrayField>

			<BooleanField source="active" label="resources.units.fields.active" />
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);

export default UnitsList;
