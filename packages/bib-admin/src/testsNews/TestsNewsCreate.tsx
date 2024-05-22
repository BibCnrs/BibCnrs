import type { CSSProperties } from "react";
import {
	ArrayInput,
	BooleanInput,
	Create,
	DateInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput,
	required,
} from "react-admin";
import { CreateActions } from "../components/Actions";
import { MultilingualContentTab } from "../components/MultilingualContentTab";
import TestsNewsHeader from "./TestsNewsHeader";

const divStyle: CSSProperties = {
	display: "flex",
	marginTop: "24px",
	width: "100%",
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const validate = (values: any) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const errors: any = {};
	if (!values.content_en) {
		errors.content_en = "ra.validation.required";
	}

	if (!values.name_en) {
		errors.name_en = "ra.validation.required";
	}

	if (!values.content_fr) {
		errors.content_fr = "ra.validation.required";
	}

	if (!values.name_fr) {
		errors.name_fr = "ra.validation.required";
	}

	if (!values.page) {
		errors.page = "ra.validation.required";
	}

	if (values.page === "tests") {
		if (!values.to) {
			errors.to = "ra.validation.required";
		}
	}

	if (!values.domains || values.domains.length < 1) {
		errors.domains = "ra.validation.required";
	}

	return errors;
};

export default function TestsNewsCreate() {
	return (
		<Create actions={<CreateActions />} redirect="list">
			<SimpleForm validate={validate}>
				<TestsNewsHeader />
				<ArrayInput source="urls" sx={{ margin: "auto" }}>
					<SimpleFormIterator inline>
						<TextInput
							label="Lien de la ressource"
							source="url"
							sx={{ margin: "auto" }}
							helperText={false}
						/>
						<TextInput
							label="Nom de la ressource"
							source="name"
							sx={{ margin: "auto" }}
							helperText={false}
						/>
						<BooleanInput
							label="Proxyfier"
							source="proxy"
							sx={{ margin: "auto" }}
							helperText={false}
						/>
					</SimpleFormIterator>
				</ArrayInput>
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
		</Create>
	);
}
