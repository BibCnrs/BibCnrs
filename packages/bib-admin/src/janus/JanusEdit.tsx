import {
	AutocompleteArrayInput,
	AutocompleteInput,
	BooleanField,
	BooleanInput,
	ChipField,
	DateField,
	Edit,
	Labeled,
	ReferenceArrayField,
	ReferenceArrayInput,
	ReferenceInput,
	SimpleForm,
	SingleFieldList,
	TextField,
	TextInput,
	useRecordContext,
} from "react-admin";
import { EditActions } from "../components/Actions";
import EditToolbar from "../components/EditToolbar";

const JanusTitle = () => {
	const record = useRecordContext();
	return record ? record.uid : "";
};

const JanusEdit = () => (
	<Edit
		title={<JanusTitle />}
		actions={<EditActions />}
		sx={{
			"& .RaLabeled-label + *": {
				marginBottom: "1.5rem",
			},
		}}
	>
		<SimpleForm toolbar={<EditToolbar />}>
			<Labeled>
				<TextField source="uid" label="resources.janusAccounts.fields.uid" />
			</Labeled>
			<Labeled>
				<BooleanField
					source="cnrs"
					label="resources.janusAccounts.fields.cnrs"
				/>
			</Labeled>

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
			<Labeled>
				<ReferenceArrayField
					label="resources.janusAccounts.fields.all_communities"
					reference="communities"
					source="all_communities"
					className="tags"
				>
					<SingleFieldList>
						<ChipField source="name" />
					</SingleFieldList>
				</ReferenceArrayField>
			</Labeled>
			<Labeled>
				<DateField
					source="last_connexion"
					label="resources.janusAccounts.fields.last_connexion"
				/>
			</Labeled>
			<Labeled>
				<DateField
					source="first_connexion"
					label="resources.janusAccounts.fields.first_connexion"
				/>
			</Labeled>
			<BooleanInput
				source="active"
				label="resources.janusAccounts.fields.active"
			/>
			<TextInput
				multiline
				source="comment"
				label="resources.janusAccounts.fields.comment"
				fullWidth
			/>
		</SimpleForm>
	</Edit>
);

export default JanusEdit;
