import type { CSSProperties } from "react";
import { Create } from "react-admin";
import { CreateActions } from "../components/Actions";
import TestNewsForm from "./TestNewsForm";

const divStyle: CSSProperties = {
	display: "flex",
	marginTop: "24px",
	width: "100%",
};

export default function TestsNewsCreate() {
	return (
		<Create actions={<CreateActions />} redirect="list">
			<TestNewsForm />
		</Create>
	);
}
