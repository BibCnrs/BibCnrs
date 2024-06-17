import { Edit } from "react-admin";
import { EditActions } from "../components/Actions";
import TestNewsForm from "./TestNewsForm";

export default function TestsNewsEdit() {
	return (
		<Edit actions={<EditActions />} redirect="list">
			<TestNewsForm />
		</Edit>
	);
}
