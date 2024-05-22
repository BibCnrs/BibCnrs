import {
	AutocompleteArrayInput,
	AutocompleteInput,
	BooleanInput,
	Create,
	DateInput,
	ReferenceArrayInput,
	ReferenceInput,
	SimpleForm,
	TextInput,
	required,
} from "react-admin";
import { CreateActions } from "../components/Actions";
import RandomPasswordGenerator from "../components/RandomPasswordGenerator";

const InistCreate = () => (
	<Create actions={<CreateActions />} redirect="list">
		<SimpleForm>
			<TextInput
				source="username"
				label="resources.inistAccounts.fields.username"
				validate={required()}
				fullWidth
			/>
			<RandomPasswordGenerator
				source="password"
				label="resources.inistAccounts.fields.password"
				validate={required()}
				fullWidth
			/>
			<TextInput
				source="name"
				label="resources.inistAccounts.fields.name"
				fullWidth
			/>
			<TextInput
				source="firstname"
				label="resources.inistAccounts.fields.firstname"
				fullWidth
			/>
			<TextInput
				type="email"
				source="mail"
				label="resources.inistAccounts.fields.mail"
				fullWidth
			/>

			<TextInput
				source="phone"
				label="resources.inistAccounts.fields.phone"
				fullWidth
			/>

			<TextInput
				source="dr"
				label="resources.inistAccounts.fields.dr"
				fullWidth
			/>

			<ReferenceInput
				label="resources.inistAccounts.fields.main_institute"
				source="main_institute"
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
				label="resources.inistAccounts.fields.institutes"
				source="institutes"
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
				label="resources.inistAccounts.fields.main_unit"
				source="main_unit"
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
				label="resources.inistAccounts.fields.units"
				source="units"
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
				label="resources.units.fields.communities"
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

			<DateInput
				source="subscription_date"
				label="resources.inistAccounts.fields.subscription_date"
			/>
			<DateInput
				source="expiration_date"
				label="resources.inistAccounts.fields.expiration_date"
			/>
			<BooleanInput
				source="active"
				label="resources.inistAccounts.fields.active"
			/>
			<TextInput
				multiline
				source="comment"
				label="resources.inistAccounts.fields.comment"
				fullWidth
			/>
		</SimpleForm>
	</Create>
);

export default InistCreate;
