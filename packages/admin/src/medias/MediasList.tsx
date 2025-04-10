import {
	ChipField,
	Datagrid,
	DateField,
	DeleteWithConfirmButton,
	EditButton,
	List,
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
	<TextInput key="tag" source="tag" label="Tags" />,
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
				<TextField source="tag" label="	Tag">
					<SingleFieldList>
						<ChipField source="tag" />
					</SingleFieldList>
				</TextField>
				<EditButton />
				<DeleteWithConfirmButton />
			</Datagrid>
		</List>
	);
}
