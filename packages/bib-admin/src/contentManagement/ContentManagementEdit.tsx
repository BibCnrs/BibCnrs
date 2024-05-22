import type { CSSProperties } from "react";
import {
	BooleanInput,
	DateInput,
	Edit,
	SimpleForm,
	required,
} from "react-admin";
import { EditActions } from "../components/Actions";
import { MultilingualContentTab } from "../components/MultilingualContentTab";
import ContentManagementHeader from "./ContentManagementHeader";

const divStyle: CSSProperties = {
	display: "flex",
	marginTop: "24px",
	width: "100%",
};

export default function ContentManagementEdit() {
	return (
		<Edit actions={<EditActions />} redirect="list">
			<SimpleForm>
				<ContentManagementHeader />
				<div style={divStyle}>
					<BooleanInput
						label="Actif"
						source="enable"
						sx={{ margin: "auto" }}
						defaultValue={true}
						name="enable"
						options={{}}
					/>
					<DateInput
						name="from"
						label="Date début"
						source="from"
						defaultValue={new Date().toISOString().slice(0, 10)}
						sx={{ margin: "auto" }}
						validate={required()}
					/>
					<DateInput
						name="to"
						label="Date fin"
						source="to"
						sx={{ margin: "auto" }}
					/>
				</div>
				<MultilingualContentTab />
			</SimpleForm>
		</Edit>
	);
}
