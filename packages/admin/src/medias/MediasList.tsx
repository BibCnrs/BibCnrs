import {
	BooleanField,
	Datagrid,
	DateField,
	DeleteWithConfirmButton,
	EditButton,
	List,
	TextField,
	TextInput,
	UrlField,
	useRecordContext,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";

const MediasFilter = [
	<TextInput key="name" label="Rechercher" source="name" alwaysOn />,
	<TextInput key="file_name" label="Lien" source="file_name" />,
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
				<BooleanField label="Utilisé" source="isUsed" />
				<UrlField
					source="url"
					label="resources.medias.fields.url"
					target="_blank"
				/>
				<DateField
					source="created_at"
					label="resources.medias.fields.createdAt"
				/>
				<EditButton />
				<DeleteWithConfirmButton />
			</Datagrid>
		</List>
	);
}
