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
	List,
	type RaRecord,
	ReferenceArrayField,
	ReferenceField,
	ReferenceInput,
	SingleFieldList,
	TextField,
	TextInput,
	downloadCSV,
} from "react-admin";
import { ListActions } from "../components/Actions";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";

const InistFilter = [
	<TextInput key="match" label="Rechercher" source="match" alwaysOn />,
	<TextInput
		key="username"
		source="username"
		label="resources.inistAccounts.fields.username"
	/>,
	<TextInput
		key="name"
		source="name"
		label="resources.inistAccounts.fields.name"
	/>,
	<TextInput
		key="firstname"
		source="firstname"
		label="resources.inistAccounts.fields.firstname"
	/>,
	<TextInput
		key="email"
		type="email"
		source="mail"
		label="resources.inistAccounts.fields.mail"
	/>,
	<ReferenceInput
		key="main_institute"
		label="resources.inistAccounts.fields.main_institute"
		source="main_institute"
		reference="institutes"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.inistAccounts.fields.main_institute"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="inist_account_institute"
		label="resources.inistAccounts.fields.institutes"
		source="inist_account_institute.institute_id"
		reference="institutes"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.inistAccounts.fields.institutes"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="main_unit"
		label="resources.inistAccounts.fields.main_unit"
		source="main_unit"
		reference="units"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ code: searchText })}
			optionText="code"
			label="resources.inistAccounts.fields.main_unit"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="inist_account_unit"
		label="resources.inistAccounts.fields.units"
		source="inist_account_unit.unit_id"
		reference="units"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ code: searchText })}
			optionText="code"
			label="resources.inistAccounts.fields.units"
		/>
	</ReferenceInput>,
	<ReferenceInput
		key="inist_account_community"
		label="resources.inistAccounts.fields.communities"
		source="inist_account_community.community_id"
		reference="communities"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.inistAccounts.fields.communities"
		/>
	</ReferenceInput>,
	<DateInput
		key="subscription_date_lte"
		source="subscription_date_lte"
		label="resources.inistAccounts.fields.subscription_date_before"
	/>,
	<DateInput
		key="subscription_date_gte"
		source="subscription_date_gte"
		label="resources.inistAccounts.fields.subscription_date_after"
	/>,
	<DateInput
		key="expiration_date_lte"
		source="expiration_date_lte"
		label="resources.inistAccounts.fields.expiration_date_before"
	/>,
	<DateInput
		key="expiration_date_gte"
		source="expiration_date_gte"
		label="resources.inistAccounts.fields.expiration_date_after"
	/>,
	<DateInput
		key="last_connexion_lte"
		source="last_connexion_lte"
		label="resources.inistAccounts.fields.last_connexion_before"
	/>,
	<DateInput
		key="last_connexion_gte"
		source="last_connexion_gte"
		label="resources.inistAccounts.fields.last_connexion_after"
	/>,
	<BooleanInput
		key="active"
		source="active"
		label="resources.inistAccounts.fields.active"
		defaultValue={true}
	/>,
];

const exporter = async (records: RaRecord[]) => {
	const data = records.map((record) => renameKeys(record, "inistAccounts"));
	jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
		downloadCSV(csv, "inistAccounts");
	});
};

const InistList = () => (
	<List
		filters={InistFilter}
		perPage={10}
		pagination={<CustomPagination />}
		exporter={exporter}
		actions={<ListActions />}
	>
		<Datagrid bulkActionButtons={<BulkActionButtons />}>
			<LinkEdit
				source="username"
				label="resources.inistAccounts.fields.username"
			/>
			<LinkEdit
				source="password"
				label="resources.inistAccounts.fields.password"
			/>

			<LinkEdit source="name" label="resources.inistAccounts.fields.name" />
			<LinkEdit
				source="firstname"
				label="resources.inistAccounts.fields.firstname"
			/>
			<LinkEdit source="mail" label="resources.inistAccounts.fields.mail" />

			<ReferenceField
				label="resources.inistAccounts.fields.main_institute"
				source="main_institute"
				reference="institutes"
				sortBy="institute.name"
			>
				<TextField source="name" />
			</ReferenceField>

			<ReferenceArrayField
				label="resources.inistAccounts.fields.institutes"
				reference="institutes"
				source="institutes"
				sortable={false}
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>

			<ReferenceField
				label="resources.inistAccounts.fields.main_unit"
				source="main_unit"
				reference="units"
				sortBy="unit.code"
			>
				<TextField source="code" />
			</ReferenceField>

			<ReferenceArrayField
				label="resources.inistAccounts.fields.all_communities"
				reference="communities"
				source="communities"
				sortable={false}
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>

			<DateField
				source="subscription_date"
				label="resources.inistAccounts.fields.subscription_date"
			/>
			<DateField
				source="expiration_date"
				label="resources.inistAccounts.fields.expiration_date"
			/>
			<DateField
				source="last_connexion"
				label="resources.inistAccounts.fields.last_connexion"
			/>
			<BooleanField
				source="active"
				label="resources.inistAccounts.fields.active"
			/>
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);

export default InistList;
