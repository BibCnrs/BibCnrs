import {
	ChipField,
	Datagrid,
	DateField,
	DeleteWithConfirmButton,
	EditButton,
	List,
	ReferenceArrayField,
	SingleFieldList,
	TextField,
	TextInput,
	UrlField,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";

const MediasFilter = [
	<TextInput key="name" label="Rechercher" source="name" alwaysOn />,
	<TextInput key="file_name" source="file_name" />,
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
}
