import {
	BooleanField,
	Datagrid,
	DateField,
	DeleteWithConfirmButton,
	EditButton,
	Filter,
	List,
	ReferenceArrayField,
	SelectInput,
	SingleFieldList,
	TextField,
	TextInput,
	UrlField,
	useGetList,
	useRecordContext,
} from "react-admin";
import CustomPagination from "../components/CustomPagination";

export const MediasFilter = (props) => {
	const { data: tags, isLoading } = useGetList("tags", {
		pagination: { page: 1, perPage: 1000 },
		sort: { field: "name", order: "ASC" },
	});

	const tagChoices = tags
		? [
				{ id: 0, name: "sans tag" },
				...tags.map((tag) => ({ id: tag.id, name: tag.name })),
			]
		: [];

	return (
		<Filter {...props}>
			<TextInput label="Rechercher" source="name" alwaysOn />
			<SelectInput
				label="Tags"
				source="tags_medias.tags_id"
				choices={tagChoices}
				isLoading={isLoading}
				alwaysOn
			/>
		</Filter>
	);
};

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
			filters={<MediasFilter />}
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
