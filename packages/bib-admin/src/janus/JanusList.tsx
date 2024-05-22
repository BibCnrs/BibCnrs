import jsonExport from "jsonexport/dist";
import {
	AutocompleteInput,
	BooleanField,
	BooleanInput,
	ChipField,
	Datagrid,
	DateField,
	DateInput,
	DeleteWithConfirmButton,
	EditButton,
	ExportButton,
	FilterButton,
	List,
	type RaRecord,
	ReferenceArrayField,
	ReferenceField,
	ReferenceInput,
	SingleFieldList,
	TextField,
	TextInput,
	TopToolbar,
	downloadCSV,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";

const JanusFilter = [
	<TextInput key="match" label="Rechercher" source="match" alwaysOn />,
	<TextInput
		key="uid"
		source="uid"
		label="resources.janusAccounts.fields.uid"
	/>,
	<TextInput
		key="mail"
		type="email"
		source="mail"
		label="resources.janusAccounts.fields.mail"
	/>,
	<ReferenceInput
		key="primary_institute"
		label="resources.janusAccounts.fields.primary_institute"
		source="primary_institute"
		reference="institutes"
	>
		<AutocompleteInput
			key="primary_institute_autocomplete"
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.janusAccounts.fields.primary_institute"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="primary_unit"
		label="resources.janusAccounts.fields.primary_unit"
		source="primary_unit"
		reference="units"
	>
		<AutocompleteInput
			key="primary_unit_autocomplete"
			filterToQuery={(searchText) => ({ code: searchText })}
			optionText="code"
			label="resources.janusAccounts.fields.primary_unit"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="additional_units"
		label="resources.janusAccounts.fields.additional_units"
		source="janus_account_unit.unit_id"
		reference="units"
	>
		<AutocompleteInput
			key="additional_units_autocomplete"
			filterToQuery={(searchText) => ({ code: searchText })}
			optionText="code"
			label="resources.janusAccounts.fields.additional_units"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="communities"
		label="resources.janusAccounts.fields.communities"
		source="janus_account_community.community_id"
		reference="communities"
	>
		<AutocompleteInput
			key="communities_autocomplete"
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.janusAccounts.fields.communities"
		/>
	</ReferenceInput>,
	<DateInput
		key="last_connexion_lte"
		source="last_connexion_lte"
		label="resources.janusAccounts.fields.last_connexion_before"
	/>,
	<DateInput
		key="last_connexion_gte"
		source="last_connexion_gte"
		label="resources.janusAccounts.fields.last_connexion_after"
	/>,
	<DateInput
		key="first_connexion_lte"
		source="first_connexion_lte"
		label="resources.janusAccounts.fields.first_connexion_before"
	/>,
	<DateInput
		key="first_connexion_gte"
		source="first_connexion_gte"
		label="resources.janusAccounts.fields.first_connexion_after"
	/>,
	<BooleanInput
		key="cnrs"
		source="cnrs"
		label="resources.janusAccounts.fields.cnrs"
	/>,
	<BooleanInput
		key="active"
		source="active"
		label="resources.janusAccounts.fields.active"
	/>,
];

const exporter = async (records: RaRecord[]) => {
	const data = records.map((record) => renameKeys(record, "janusAccounts"));
	jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
		downloadCSV(csv, "janusAccounts");
	});
};

const ListActions = () => (
	<TopToolbar>
		<FilterButton />
		<ExportButton maxResults={100000} />
	</TopToolbar>
);

const JanusList = () => (
	<List
		filters={JanusFilter}
		perPage={10}
		pagination={<CustomPagination />}
		exporter={exporter}
		actions={<ListActions />}
	>
		<Datagrid bulkActionButtons={<BulkActionButtons />}>
			<LinkEdit source="uid" label="resources.janusAccounts.fields.uid" />
			<LinkEdit source="mail" label="resources.janusAccounts.fields.mail" />

			<ReferenceField
				label="resources.janusAccounts.fields.primary_institute"
				source="primary_institute"
				reference="institutes"
				sortBy="institute.name"
			>
				<TextField source="name" />
			</ReferenceField>

			<ReferenceArrayField
				label="resources.janusAccounts.fields.additional_institutes"
				reference="institutes"
				source="additional_institutes"
				sortable={false}
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>

			<ReferenceField
				label="resources.janusAccounts.fields.primary_unit"
				source="primary_unit"
				reference="units"
				sortBy="unit.code"
			>
				<TextField source="code" />
			</ReferenceField>

			<ReferenceArrayField
				label="resources.janusAccounts.fields.all_communities"
				reference="communities"
				source="all_communities"
				sortable={false}
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>

			<DateField
				source="last_connexion"
				label="resources.janusAccounts.fields.last_connexion"
			/>
			<DateField
				source="first_connexion"
				label="resources.janusAccounts.fields.first_connexion"
			/>
			<BooleanField
				source="active"
				label="resources.janusAccounts.fields.active"
			/>
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);

export default JanusList;
