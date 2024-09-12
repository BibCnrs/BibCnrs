import { createQuery, environment, json, throwIfNotOk } from "../Environment";

export const updateAlert = async (
	userId: number,
	historyId: number,
	frequency: string,
) => {
	const response: Response = await fetch(
		createQuery(`${environment.put.account.searchAlert}`),
		{
			credentials: "include",
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId,
				historyId,
				frequence: frequency,
			}),
		},
	);
	throwIfNotOk(response);
	return json(response);
};

export const toggleSearchAlert = async (historyId: number) => {
	const response: Response = await fetch(
		createQuery(`${environment.get.account.toggleSearchAlert}/${historyId}`),
		{
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		},
	);
	throwIfNotOk(response);
	return json(response);
};

export const enableAllSearchAlerts = async () => {
	const response: Response = await fetch(
		createQuery(environment.get.account.enableSearchAlert),
		{
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		},
	);
	throwIfNotOk(response);
	return json(response);
};

export const disableAllSearchAlerts = async () => {
	const response: Response = await fetch(
		createQuery(environment.get.account.disableSearchAlert),
		{
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		},
	);
	throwIfNotOk(response);
	return json(response);
};
