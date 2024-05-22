import FolderIcon from "@mui/icons-material/Folder";
import DatabasesCreate from "./DatabasesCreate";
import DatabasesEdit from "./DatabasesEdit";
import DatabasesList from "./DatabasesList";

const databases = {
	list: DatabasesList,
	edit: DatabasesEdit,
	create: DatabasesCreate,
	icon: FolderIcon,
};

export default databases;
