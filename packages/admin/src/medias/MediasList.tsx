import {
	AutocompleteInput,
	BooleanField,
	Datagrid,
	DateField,
	DeleteWithConfirmButton,
	EditButton,
	List,
	ReferenceArrayField,
	ReferenceInput,
	SingleFieldList,
	TextField,
	TextInput,
	UrlField,
	useRecordContext,
} from "react-admin";
import CustomPagination from "../components/CustomPagination";

const MediasFilter = [
	<TextInput key="name" label="Rechercher" source="name" alwaysOn />,
	<ReferenceInput
		key="tags_medias"
		label="tags"
		source="tags_medias.tags_id"
		reference="tags"
		sort={{ field: "id", order: "ASC" }}
	>
		<AutocompleteInput
			key="tags_autocomplete"
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="tags"
		/>
	</ReferenceInput>,
];

const MediasActions = () => {
	const record = useRecordContext();
	if (!record) return null;
	return (
		<>
			<EditButton record={record} />
			{!record.isUsed && <DeleteWithConfirmButton record={record} />}
		</>
	);
};

const BulkActionButtons2 = () => <></>;
export default function MediasList() {
	return (
		<List
			filters={MediasFilter}
			perPage={10}
			pagination={<CustomPagination />}
			sort={{ field: "created_at", order: "DESC" }}
		>
			<Datagrid bulkActionButtons={<BulkActionButtons2 />}>
				<TextField source="name" label="resources.medias.fields.name" />
				<BooleanField label="Utilisé" source="isUsed" />
				<UrlField
					source="url"
					label="resources.medias.fields.url"
					target="_blank"
				/>
				<ReferenceArrayField
					label="tags"
					reference="tags"
					source="tags"
					sortable={false}
				>
					<SingleFieldList linkType={false} />
				</ReferenceArrayField>
				<DateField source="created_at" label="Date" />
				<MediasActions />
			</Datagrid>
		</List>
	);
}
