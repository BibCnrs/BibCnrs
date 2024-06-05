import { decode as htmlEntitiesDecode } from "html-entities";

function cleanXml(data: string) {
	return data
		.replace(/&lt;/g, "<") // unescape '<'
		.replace(/&gt;/g, ">") // and '>'
		.replace(/<br.?\/?>/gi, "\n") // replace br tag by linefeed
		.replace(/<.*?>/g, ""); // remove xml tag if any;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function decoder(extractor: (input: any) => any) {
	return (result: string) => clean(extractor(result));
}

export function clean(text: string) {
	return htmlEntitiesDecode(cleanXml(text));
}

export const defaultTo =
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	(defaultValue: any) => (extractor: any) => (result: any) => {
		try {
			return extractor(result) || defaultValue;
		} catch (error) {
			return defaultValue;
		}
	};

export const defaultToNull = defaultTo(null);
export const defaultToEmptyArray = defaultTo([]);
export const defaultToEmptyObject = defaultTo({});
