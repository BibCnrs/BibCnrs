import {
	CloneButton,
	CreateButton,
	DeleteWithConfirmButton,
	ExportButton,
	FilterButton,
	ListButton,
	TopToolbar,
	useRecordContext,
} from "react-admin";

export const EditActions = () => {
	const record = useRecordContext();
	return (
		<TopToolbar>
			{record && (
				<>
					<DeleteWithConfirmButton mutationMode="undoable" />
					<CloneButton />
				</>
			)}
			<ListButton />
		</TopToolbar>
	);
};

export const CreateActions = () => (
	<TopToolbar>
		<ListButton />
	</TopToolbar>
);

export const ListActions = () => (
	<TopToolbar>
		<FilterButton />
		<CreateButton />
		<ExportButton maxResults={100000} />
	</TopToolbar>
);
