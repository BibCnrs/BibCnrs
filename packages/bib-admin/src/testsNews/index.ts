import FeedIcon from "@mui/icons-material/Feed";
import TestsNewsCreate from "./TestsNewsCreate";
import TestsNewsEdit from "./TestsNewsEdit";
import TestsNewsList from "./TestsNewsList";

const contentManagement = {
	create: TestsNewsCreate,
	edit: TestsNewsEdit,
	list: TestsNewsList,
	icon: FeedIcon,
};

export default contentManagement;
