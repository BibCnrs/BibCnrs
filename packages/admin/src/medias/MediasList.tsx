import {
	AutocompleteInput,
	ChipField,
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
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";

const MediasFilter = [
	<TextInput key="name" label="Rechercher" source="name" alwaysOn />,
	<ReferenceInput
		key="tags_medias"
		label="tags"
		source="tags_medias.tags_id"
		reference="tags"
	>
		<AutocompleteInput
			key="tags_autocomplete"
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="tags"
		/>
	</ReferenceInput>,
];

export default function MediasList() {
	return (
		<List
			filters={MediasFilter}
			perPage={10}
			pagination={<CustomPagination />}
			sort={{ field: "created_at", order: "DESC" }}
		>
			<Datagrid bulkActionButtons={<BulkActionButtons />}>
				<TextField source="name" label="resources.medias.fields.name" />
				<UrlField
					source="url"
					label="resources.medias.fields.url"
					target="_blank"
				/>
				<DateField
					source="created_at"
					label="resources.medias.fields.createdAt"
				/>
				<ReferenceArrayField
					label="tags"
					reference="tags"
					source="tags"
					sortable={true}
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
}
