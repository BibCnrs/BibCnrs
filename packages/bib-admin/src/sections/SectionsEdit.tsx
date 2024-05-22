import {
	AutocompleteArrayInput,
	AutocompleteInput,
	Edit,
	ReferenceArrayInput,
	ReferenceInput,
	SimpleForm,
	TextInput,
	required,
	useNotify,
	useRecordContext,
} from "react-admin";
import { EditActions } from "../components/Actions";
import EditToolbar from "../components/EditToolbar";

const SectionsTitle = () => {
	const record = useRecordContext();
	return record ? record.name : "";
};

// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
const fromArrayToInt = (value: any) => {
	if (Array.isArray(value)) {
		return value[0];
	}
	return value;
};

// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
const transform = (data: any) => {
	return {
		...data,
		primary_institutes: fromArrayToInt(data.primary_institutes),
	};
};

const SectionsEdit = () => {
	const notify = useNotify();

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const onError = (error: any) => {
		if (error.body.error.includes("constraint failed")) {
			// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
			notify(`Impossible de modifier la section car le code est déjà utilisé`, {
				type: "warning",
			});
		}
	};

	return (
		<Edit
			title={<SectionsTitle />}
			actions={<EditActions />}
			mutationOptions={{ onError }}
			transform={transform}
		>
			<SimpleForm toolbar={<EditToolbar />}>
				<TextInput
					source="name"
					label="resources.section_cn.fields.name"
					validate={required()}
					fullWidth
				/>
				<TextInput
					source="code"
					label="resources.section_cn.fields.code"
					validate={required()}
					fullWidth
				/>
				<TextInput
					source="comment"
					label="resources.section_cn.fields.comment"
					fullWidth
				/>
				<ReferenceInput
					label="resources.section_cn.fields.primary_institutes"
					source="primary_institutes"
					reference="institutes"
				>
					<AutocompleteInput
						filterToQuery={(searchText) => ({
							name: searchText,
						})}
						optionText="name"
						format={fromArrayToInt}
						fullWidth
					/>
				</ReferenceInput>
				<ReferenceArrayInput
					label="resources.section_cn.fields.secondary_institutes"
					source="secondary_institutes"
					reference="institutes"
				>
					<AutocompleteArrayInput
						filterToQuery={(searchText) => ({
							name: searchText,
						})}
						optionText="name"
						fullWidth
					/>
				</ReferenceArrayInput>
			</SimpleForm>
		</Edit>
	);
};

export default SectionsEdit;
