import {
	AutocompleteArrayInput,
	AutocompleteInput,
	BooleanInput,
	Create,
	ReferenceArrayInput,
	ReferenceInput,
	SimpleForm,
	TextInput,
} from "react-admin";
import { CreateActions } from "../components/Actions";

const JanusCreate = () => (
	<Create redirect="list" actions={<CreateActions />}>
		<SimpleForm>
			<TextInput
				source="name"
				label="resources.janusAccounts.fields.name"
				fullWidth
			/>

			<TextInput
				source="firstname"
				label="resources.janusAccounts.fields.firstname"
				fullWidth
			/>

			<TextInput
				type="email"
				source="mail"
				label="resources.janusAccounts.fields.mail"
				fullWidth
			/>

			<ReferenceInput
				label="resources.janusAccounts.fields.primary_institute"
				source="primary_institute"
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
				label="resources.janusAccounts.fields.additional_institutes"
				source="additional_institutes"
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

			<ReferenceInput
				label="resources.janusAccounts.fields.primary_unit"
				source="primary_unit"
				reference="units"
			>
				<AutocompleteInput
					filterToQuery={(searchText) => ({
						code: searchText,
					})}
					optionText="code"
					fullWidth
				/>
			</ReferenceInput>

			<ReferenceArrayInput
				label="resources.janusAccounts.fields.additional_units"
				source="additional_units"
				reference="units"
			>
				<AutocompleteArrayInput
					filterToQuery={(searchText) => ({
						code: searchText,
					})}
					optionText="code"
					fullWidth
				/>
			</ReferenceArrayInput>

			<ReferenceArrayInput
				label="resources.janusAccounts.fields.communities"
				source="communities"
				reference="communities"
			>
				<AutocompleteArrayInput
					filterToQuery={(searchText) => ({
						name: searchText,
					})}
					optionText="name"
					fullWidth
				/>
			</ReferenceArrayInput>

			<BooleanInput
				source="active"
				label="resources.janusAccounts.fields.active"
				defaultValue={true}
			/>
			<TextInput
				multiline
				source="comment"
				label="resources.janusAccounts.fields.comment"
				fullWidth
			/>
		</SimpleForm>
	</Create>
);

export default JanusCreate;
