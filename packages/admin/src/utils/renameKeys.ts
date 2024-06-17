import type { RaRecord } from "react-admin";
import locale from "../i18n/fr";

type PageName = keyof Omit<typeof locale.resources, "notification">;

export const renameKeys = (obj: RaRecord, pageName: PageName) => {
	if (obj?.totalcount) {
		obj.totalcount = undefined;
	}
	const keyValues = Object.keys(obj).map((key) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const newKey = locale.resources[pageName].fields[key] || key;
		return { [newKey]: obj[key] };
	});
	return Object.assign({}, ...keyValues);
};
