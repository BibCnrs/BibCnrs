import InfoIcon from "@mui/icons-material/InfoOutlined";
import { Link, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import { CompleteIcon } from "../../../components/element/icon/CompleteIcon";
import { EmbargoIcon } from "../../../components/element/icon/EmbargoIcon";
import OpenAccess from "../../../components/element/icon/OpenAccess";
import { useTranslator } from "../../../shared/locales/I18N";
import type { DatabaseItemProps } from "../../../shared/types/data.types";

type PlatformListViewProps = {
	platforms: DatabaseItemProps[];
};

export function PlatformListView({ platforms }: PlatformListViewProps) {
	const t = useTranslator();

	const columns: GridColDef<DatabaseItemProps>[] = [
		{
			field: "name",
			headerName: t("pages.database.name"),
			flex: 1,
			renderCell: ({ row }) => {
				return (
					<Link
						fontWeight={700}
						href={row.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{row.name}
					</Link>
				);
			},
		},
		{
			field: "description",
			headerName: "",
			headerAlign: "center",
			align: "center",
			width: 150,
			renderCell: ({ row }) => {
				return (
					<Tooltip title={row.text} arrow>
						<InfoIcon sx={{ fontSize: "1.2em" }} color="action" />
					</Tooltip>
				);
			},
		},
		{
			field: "oa",
			headerName: t("pages.database.oa"),
			headerAlign: "center",
			align: "center",
			width: 150,
			renderCell: (params) => {
				return (
					<Typography fontSize="1.1em" mt="0.2em">
						{params.row.oa ? <OpenAccess /> : null}
					</Typography>
				);
			},
		},
		{
			field: "is_completed",
			headerName: t("pages.database.is_completed"),
			headerAlign: "center",
			align: "center",
			width: 150,
			renderCell: (params) => {
				return (
					<Typography fontSize="0.75em">
						{params.row.is_completed ? <CompleteIcon /> : null}
					</Typography>
				);
			},
		},
		{
			field: "without_embargo",
			headerName: t("pages.database.embargo"),
			headerAlign: "center",
			align: "center",
			width: 150,
			renderCell: (params) => {
				return !params.row.without_embargo ? <EmbargoIcon /> : null;
			},
		},
		{
			field: "favorite",
			headerName: "",
			headerAlign: "center",
			align: "center",
			width: 150,
			renderCell: (params) => {
				return (
					<BookmarkButton
						title={params.row.name}
						url={params.row.url}
						source="database"
					/>
				);
			},
		},
	];

	return (
		<Stack minHeight={0} height={1}>
			<DataGrid
				rows={platforms}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 25,
						},
					},
				}}
				autoHeight
				pageSizeOptions={[10, 25, 50, 100]}
				disableRowSelectionOnClick
				disableColumnSelector
				disableColumnFilter
				disableColumnSorting
				disableColumnMenu
				sx={{
					fontSize: "1rem",
					"& .MuiDataGrid-cell": {
						display: "flex",
						alignItems: "center",
					},
				}}
			/>
		</Stack>
	);
}
