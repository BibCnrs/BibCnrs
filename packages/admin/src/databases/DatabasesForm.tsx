import {
	AutocompleteArrayInput,
	BooleanInput,
	ReferenceArrayInput,
	SelectArrayInput,
	TextInput,
	required,
} from "react-admin";

import Grid from "@mui/material/Grid";

export const DatabasesForm = () => {
	return (
		<>
			<TextInput
				source="name_fr"
				label="resources.databases.fields.name_fr"
				validate={required()}
				fullWidth
			/>
			<TextInput
				source="name_en"
				label="resources.databases.fields.name_en"
				fullWidth
			/>
			<TextInput
				source="url_fr"
				label="resources.databases.fields.url_fr"
				validate={required()}
				fullWidth
			/>
			<TextInput
				source="url_en"
				label="resources.databases.fields.url_en"
				validate={required()}
				fullWidth
			/>
			<TextInput
				multiline
				source="text_fr"
				label="resources.databases.fields.text_fr"
				validate={required()}
				fullWidth
			/>
			<TextInput
				multiline
				source="text_en"
				label="resources.databases.fields.text_en"
				validate={required()}
				fullWidth
			/>
			<ReferenceArrayInput
				label="resources.institutes.fields.communities"
				source="communities"
				reference="communities"
			>
				<AutocompleteArrayInput
					filterToQuery={(searchText) => ({ name: searchText })}
					optionText="name"
					fullWidth
				/>
			</ReferenceArrayInput>

			<SelectArrayInput
				source="type"
				fullWidth
				choices={[
					{ id: "news", name: "Revues" },
					{ id: "book", name: "Livres" },
					{ id: "database", name: "Bases de données" },
					{ id: "data", name: "Données" },
				]}
			/>

			<Grid container spacing={3}>
				<Grid item xs={4}>
					<BooleanInput
						source="active"
						label="resources.databases.fields.active"
					/>
					<BooleanInput
						source="oa"
						label="resources.databases.fields.open_access"
					/>
					<BooleanInput
						source="use_proxy"
						label="resources.databases.fields.use_proxy"
					/>
				</Grid>
				<Grid item xs={4}>
					<BooleanInput
						source="is_text_integral"
						label="resources.databases.fields.is_text_integral"
					/>
					<BooleanInput
						source="without_embargo"
						label="resources.databases.fields.without_embargo"
					/>
					<BooleanInput
						source="is_completed"
						label="resources.databases.fields.is_completed"
					/>
				</Grid>
				<Grid item xs={4}>
					<BooleanInput
						source="is_archived"
						label="resources.databases.fields.is_archived"
					/>
					<BooleanInput
						source="diamond"
						label="resources.databases.fields.diamond"
					/>
				</Grid>
			</Grid>
		</>
	);
};
