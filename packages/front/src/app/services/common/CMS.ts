import type { CMSResultDataType } from "../../shared/types/data.types";
import { createQuery, environment, json, throwIfNotOk } from "../Environment";

type Pages = "about" | "alert" | "faq" | "home" | "legal" | "privacy";

const doQuery = async <Page extends Pages>(
	page: Page,
	first = true,
): Promise<CMSResultDataType> => {
	const query = first
		? createQuery(environment.get.cms, {
				page,
				first,
			})
		: createQuery(environment.get.cms, {
				page,
			});
	const response: Response = await fetch(query);
	throwIfNotOk(response);
	return json<CMSResultDataType>(response);
};

export const alert = (): Promise<CMSResultDataType> => doQuery("alert");

export const home = (): Promise<CMSResultDataType> => doQuery("home");

export const legal = (): Promise<CMSResultDataType> => doQuery("legal");

export const privacy = (): Promise<CMSResultDataType> => doQuery("privacy");

export const faq = (): Promise<CMSResultDataType> => doQuery("faq", false);

export const about = (): Promise<CMSResultDataType> => doQuery("about");
