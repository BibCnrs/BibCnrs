import { Pagination } from "react-admin";

const CustomPagination = () => (
	<Pagination rowsPerPageOptions={[5, 10, 25, 50]} />
);

export default CustomPagination;
