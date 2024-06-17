import type { AutoCompleteDataType } from "../../shared/types/data.types";
import { createQuery, json, throwIfNotOk } from "../Environment";

export const autoComplete = async (value: string): Promise<string[]> => {
	const response = await fetch(
		createQuery(
			"https://widgets.ebscohost.com/prod/simplekey/autocomplete/autocomplete.php",
			{
				userid: "!Qw0.nnkOvwtnfBHjZ37",
				q: value,
			},
			true,
		),
	);
	throwIfNotOk(response);
	const autoCompleteData = await json<AutoCompleteDataType>(response);
	return autoCompleteData.terms.map((term) => term.term);
};
