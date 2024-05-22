import {
	AutocompleteArrayInput,
	AutocompleteInput,
	BooleanInput,
	Create,
	NumberInput,
	ReferenceArrayInput,
	ReferenceInput,
	SimpleForm,
	TextInput,
	required,
} from "react-admin";
import { CreateActions } from "../components/Actions";

const UnitsCreate = () => (
	<Create redirect="list" actions={<CreateActions />}>
		<SimpleForm>
			<TextInput
				source="code"
				label="resources.units.fields.code"
				validate={required()}
				fullWidth
			/>
			<TextInput source="name" label="resources.units.fields.name" fullWidth />
			<TextInput
				source="implantation"
				label="resources.units.fields.implantation"
				fullWidth
			/>
			<TextInput source="body" label="resources.units.fields.body" fullWidth />

			<TextInput
				source="building"
				label="resources.units.fields.building"
				fullWidth
			/>
			<TextInput
				source="street"
				label="resources.units.fields.street"
				fullWidth
			/>
			<TextInput
				source="post_office_box"
				label="resources.units.fields.post_office_box"
				fullWidth
			/>
			<TextInput
				source="postal_code"
				label="resources.units.fields.postal_code"
				fullWidth
			/>
			<TextInput source="town" label="resources.units.fields.town" fullWidth />
			<TextInput
				source="country"
				label="resources.units.fields.country"
				fullWidth
			/>
			<TextInput
				source="unit_dr"
				label="resources.units.fields.unit_dr"
				fullWidth
			/>

			<NumberInput
				source="nb_researcher_cnrs"
				label="resources.units.fields.nb_researcher_cnrs"
				fullWidth
			/>
			<NumberInput
				source="nb_researcher_nocnrs"
				label="resources.units.fields.nb_researcher_nocnrs"
				fullWidth
			/>
			<NumberInput
				source="nb_doctorant"
				label="resources.units.fields.nb_doctorant"
				fullWidth
			/>
			<NumberInput
				source="nb_post_doctorant"
				label="resources.units.fields.nb_post_doctorant"
				fullWidth
			/>

			<TextInput
				source="director_name"
				label="resources.units.fields.director_name"
				fullWidth
			/>
			<TextInput
				source="director_firstname"
				label="resources.units.fields.director_firstname"
				fullWidth
			/>
			<TextInput
				type="email"
				source="director_mail"
				label="resources.units.fields.director_mail"
				fullWidth
			/>

			<TextInput
				source="correspondant_documentaire"
				label="resources.units.fields.correspondant_documentaire"
				fullWidth
			/>
			<TextInput
				source="cd_phone"
				label="resources.units.fields.cd_phone"
				fullWidth
			/>
			<TextInput
				type="email"
				source="cd_mail"
				label="resources.units.fields.cd_mail"
				fullWidth
			/>

			<TextInput
				source="correspondant_informatique"
				label="resources.units.fields.correspondant_informatique"
				fullWidth
			/>
			<TextInput
				source="ci_phone"
				label="resources.units.fields.ci_phone"
				fullWidth
			/>
			<TextInput
				type="email"
				source="ci_mail"
				label="resources.units.fields.ci_mail"
				fullWidth
			/>

			<ReferenceInput
				label="resources.units.fields.main_institute"
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
				label="resources.units.fields.institutes"
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
			<ReferenceArrayInput
				label="resources.units.fields.section_cn"
				source="sections_cn"
				reference="section_cn"
			>
				<AutocompleteArrayInput
					filterToQuery={(searchText) => ({
						name: searchText,
					})}
					optionText="name"
					fullWidth
				/>
			</ReferenceArrayInput>

			<TextInput
				multiline
				source="comment"
				label="resources.inistAccounts.fields.comment"
				fullWidth
			/>

			<BooleanInput
				source="active"
				label="resources.inistAccounts.fields.active"
				defaultValue={true}
			/>
		</SimpleForm>
	</Create>
);

export default UnitsCreate;
