import {
	type FieldProps,
	useCreatePath,
	useRecordContext,
	useResourceContext,
} from "react-admin";
import { Link } from "react-router-dom";

interface LinkEditProps extends FieldProps {
	source: string;
}

const LinkEdit = ({ source }: LinkEditProps) => {
	const record = useRecordContext();
	const createPath = useCreatePath();
	const resource = useResourceContext();

	if (!record?.id) {
		return null;
	}
	return (
		<Link to={createPath({ resource, type: "edit", id: record.id })}>
			{record[source]}
		</Link>
	);
};

export default LinkEdit;
