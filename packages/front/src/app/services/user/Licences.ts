import type { LicencesDataType } from "../../shared/types/data.types";
import { createQuery, environment, json, throwIfNotOk } from "../Environment";

export const licences = async (
	domains?: string[],
): Promise<LicencesDataType> => {
	const response = await fetch(
		createQuery(environment.get.account.licences, {
			domains: domains?.join(","),
		}),
		{
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		},
	);
	throwIfNotOk(response);
	return json<LicencesDataType>(response);
};
