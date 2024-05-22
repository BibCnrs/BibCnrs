import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {
	ArrayField,
	AutocompleteInput,
	BooleanField,
	BulkDeleteWithConfirmButton,
	ChipField,
	Datagrid,
	DeleteWithConfirmButton,
	EditButton,
	FunctionField,
	List,
	ReferenceInput,
	SingleFieldList,
	TextField,
	TextInput,
	useDataProvider,
	useListContext,
	useNotify,
	useRefresh,
} from "react-admin";
import { useMutation } from "react-query";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";

const BulkActionLicensesButtons = () => {
	const { selectedIds } = useListContext();
	const dataProvider = useDataProvider();
	const notify = useNotify();
	const refresh = useRefresh();
	const { mutate } = useMutation(
		["setCommonLicense", selectedIds[0]],
		() => dataProvider.setCommonLicense(selectedIds[0]),
		{
			onSuccess: () => {
				refresh();
				notify("License commune mise à jour", { type: "success" });
			},
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			onError: (error: any) => {
				notify(`License commune non mise à jour: ${error.message}`, {
					type: "warning",
				});
			},
		},
	);
	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				{selectedIds.length === 1 && (
					<Button
						onClick={() => mutate()}
						sx={{ mr: "2rem" }}
						startIcon={<LocalPoliceIcon />}
					>
						Utiliser comme licence commune
					</Button>
				)}
				<BulkDeleteWithConfirmButton mutationMode="undoable" />
			</Box>
		</>
	);
};

const LicenseFilter = [
	<TextInput key="name_fr" label="Rechercher" source="name_fr" alwaysOn />,
	<ReferenceInput
		key="license_community.community_id"
		label="resources.revues.fields.communities"
		source="license_community.community_id"
		reference="communities"
	>
		<AutocompleteInput
			filterToQuery={(searchText) => ({ name: searchText })}
			optionText="name"
			label="resources.revues.fields.communities"
		/>
	</ReferenceInput>,
];

const LicenseList = () => (
	<List perPage={10} pagination={<CustomPagination />} filters={LicenseFilter}>
		<Datagrid bulkActionButtons={<BulkActionLicensesButtons />}>
			<LinkEdit source="name_fr" label="resources.licenses.fields.name" />
			<TextField
				source="pdf.title"
				label="resources.licenses.fields.pdf"
				emptyText="-"
				sortable={false}
			/>
			<ArrayField
				source="license_community"
				label="resources.licenses.fields.communities"
				sortable={false}
			>
				<SingleFieldList>
					<ChipField source="community.name" emptyText="-" />
				</SingleFieldList>
			</ArrayField>
			<BooleanField label="Actif" source="enable" />
			<EditButton />
			<DeleteWithConfirmButton />
			<FunctionField
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				render={(record: any) =>
					record.common && (
						<Tooltip title="License Commune">
							<LocalPoliceIcon />
						</Tooltip>
					)
				}
			/>
		</Datagrid>
	</List>
);

export default LicenseList;
