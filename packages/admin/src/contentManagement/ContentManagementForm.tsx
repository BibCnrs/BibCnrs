import { Divider, Stack } from "@mui/material";
import {
	BooleanInput,
	DateInput,
	FileField,
	FileInput,
	FormDataConsumer,
	NumberInput,
	ReferenceInput,
	SelectInput,
	required,
} from "react-admin";
import { MultilingualContentTab } from "../components/MultilingualContentTab";
import ContentManagementHeader from "./ContentManagementHeader";

const FileComponent = () => {
	return (
		<>
			<Divider flexItem />
			<ReferenceInput
				label="Média associé"
				source="media_id"
				reference="medias"
			>
				<SelectInput optionText="name" helperText={false} />
			</ReferenceInput>
			<FileInput
				sx={{ marginTop: 4 }}
				source="file"
				label="Média à uploader"
				name="file"
			>
				<FileField source="src" title="title" />
			</FileInput>
		</>
	);
};

export function ContentManagementForm() {
	return (
		<>
			<ContentManagementHeader />
			<Stack direction="row" spacing={2} mt={4}>
				<BooleanInput
					label="Actif"
					source="enable"
					defaultValue={true}
					name="enable"
					options={{}}
				/>
				<FormDataConsumer<{ page: "home" | "alert" | string }>>
					{({ formData }) =>
						formData.page === "alert" ? (
							<BooleanInput
								label="Info"
								source="info"
								defaultValue={false}
								name="info"
								options={{}}
							/>
						) : null
					}
				</FormDataConsumer>
				<NumberInput label="Ordre" source="order" />
				<DateInput
					name="from"
					label="Date début"
					source="from"
					defaultValue={new Date().toISOString().slice(0, 10)}
					validate={required()}
				/>
				<DateInput name="to" label="Date fin" source="to" />
			</Stack>
			<MultilingualContentTab />
			<FormDataConsumer<{ page: "home" | "alert" | string }>>
				{({ formData }) =>
					formData.page === "alert" || formData.page === "home" ? (
						<FileComponent />
					) : null
				}
			</FormDataConsumer>
		</>
	);
}
