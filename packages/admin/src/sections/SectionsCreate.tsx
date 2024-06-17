import {
	AutocompleteArrayInput,
	AutocompleteInput,
	Create,
	ReferenceArrayInput,
	ReferenceInput,
	SimpleForm,
	TextInput,
	required,
	useNotify,
} from "react-admin";
import { CreateActions } from "../components/Actions";

const SectionsCreate = () => {
	const notify = useNotify();

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const onError = (error: any) => {
		if (error.body.error.includes("constraint failed")) {
			notify("Impossible de créer une section car le code est déjà utilisé", {
				type: "warning",
			});
		}
	};

	return (
		<Create
			actions={<CreateActions />}
			mutationOptions={{ onError }}
			redirect="list"
		>
			<SimpleForm>
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
		</Create>
	);
};

export default SectionsCreate;
