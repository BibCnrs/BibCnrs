import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminUserCreate from "./AdminUserCreate";
import AdminUserEdit from "./AdminUserEdit";
import AdminUserList from "./AdminUserList";

const adminUsers = {
	list: AdminUserList,
	edit: AdminUserEdit,
	create: AdminUserCreate,
	icon: PersonAddIcon,
};

export default adminUsers;
