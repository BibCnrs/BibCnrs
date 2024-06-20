import type { TestNewDataType } from "../../shared/types/data.types";
import type { TestsNewsDataType } from "../../shared/types/data.types";
import { createQuery, environment, json, throwIfNotOk } from "../Environment";

export type Pages = "news" | "tests";

export const news = async ({
	domains,
	limit,
}: {
	domains?: string[] | null;
	limit?: number;
} = {}): Promise<TestsNewsDataType> => {
	const query = createQuery(environment.get.account.testsNews, {
		domains: domains?.join(","),
		limit: limit ? limit.toString() : undefined,
	});

	const response: Response = await fetch(query, {
		credentials: "include",
	});

	throwIfNotOk(response);

	return json<TestsNewsDataType>(response);
};

export const newsHome = async (
	domains: string[],
): Promise<TestsNewsDataType> => {
	const query = createQuery(environment.get.account.testNewsHome, {
		domains: domains?.join(","),
	});

	const response: Response = await fetch(query, {
		credentials: "include",
	});

	throwIfNotOk(response);

	return json<TestsNewsDataType>(response);
};

export const newsById = async (id: number): Promise<TestNewDataType> => {
	const query = createQuery(`${environment.get.account.testsNews}/${id}`);

	const response: Response = await fetch(query, {
		credentials: "include",
	});

	throwIfNotOk(response);

	return json<TestNewDataType>(response);
};
