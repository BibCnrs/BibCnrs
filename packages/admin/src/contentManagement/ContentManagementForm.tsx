import type { CSSProperties } from "react";
import { BooleanInput, DateInput, NumberInput, required } from "react-admin";
import { MultilingualContentTab } from "../components/MultilingualContentTab";
import ContentManagementHeader from "./ContentManagementHeader";

const divStyle: CSSProperties = {
	display: "flex",
	marginTop: "24px",
	width: "100%",
};

export function ContentManagementForm() {
	return (
		<>
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
				<NumberInput label="Ordre" source="order" />
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
		</>
	);
}
