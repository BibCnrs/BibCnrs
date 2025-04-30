import { stringify } from "query-string";
import jsonServerProvider from "ra-data-json-server";
import { type DataProvider, type Options, fetchUtils } from "react-admin";

const apiUrl = `${import.meta.env.VITE_BIBAPI_HOST}/admin`;

const httpClient = (url: string, options: Options = {}) => {
	const requestHeaders = (options.headers ||
		new Headers({
			Accept: "application/json",
		})) as Headers;
	if (!options.headers) {
		options.headers = new Headers({ Accept: "application/json" });
	}

	requestHeaders.set(
		"Authorization",
		`Bearer ${localStorage.getItem("token")}`,
	);
	return fetchUtils.fetchJson(url, { ...options, headers: requestHeaders });
};

const jsonServerDataProvider = jsonServerProvider(apiUrl, httpClient);

const upsertFile = async (
	name: string,
	file: File,
	tags?: string,
	id?: number,
) => {
	const formData = new FormData();
	formData.append("name", name);
	formData.append("file", file);
	formData.append("tags_id", tags);
	const mediaRoute = id ? `/medias/${id}` : "/medias";

	return await fetch(`${apiUrl}${mediaRoute}`, {
		method: id ? "PUT" : "POST",
		body: formData,
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	}).then((response) => response.json());
};

const dataProvider: DataProvider = {
	...jsonServerDataProvider,
	getList: (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const filters = fetchUtils.flattenObject(params.filter);

		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		const query: any = {
			_page: page || 1,
			_perPage: perPage || 10,
		};

		query._sortField = field;
		query._sortDir = order.toLocaleLowerCase() || "asc";

		if (Object.keys(filters).length > 0) {
			query._filters = JSON.stringify(filters);
		}

		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => ({
			data: json,
			total: Number.parseInt(
				headers?.get("content-range")?.split("/")?.pop() ?? "0",
				10,
			),
		}));
	},
	update: async (resource, params) => {
		if (
			resource === "news" ||
			resource === "contentManagement" ||
			resource === "licenses" ||
			resource === "resources"
		) {
			let mediaID = params.data.media_id;
			if (params.data.file) {
				const file = await upsertFile(
					params.data.file.title,
					params.data.file.rawFile,
					JSON.stringify(params.data.tags),
				);

				mediaID = file.id;
				// biome-ignore lint/performance/noDelete: <explanation>
				delete params.data.file;
			}

			return jsonServerDataProvider.update(resource, {
				...params,
				data: {
					...params.data,
					media_id: mediaID,
					tags: JSON.stringify(params.data.tags),
				},
			});
		}

		if (resource === "medias") {
			if (params.data.file2) {
				const file = await upsertFile(
					params.data.name,
					params.data.file2.rawFile,
					params.id,
				);

				// biome-ignore lint/performance/noDelete: <explanation>
				delete params.data.file2;
				return { data: { ...file } };
			}
			if (params.data.url2) {
				const url = params.data.url2;
				// biome-ignore lint/performance/noDelete: <explanation>
				delete params.data.url2;
				return jsonServerDataProvider.update(resource, {
					...params,
					data: {
						...params.data,
						url: url,
					},
				});
			}
		}
		// fallback to the default implementation
		return jsonServerDataProvider.update(resource, params);
	},

	create: async (resource, params) => {
		if (resource === "medias") {
			if (params.data.url == null) {
				const file = await upsertFile(
					params.data.name,
					params.data.file.rawFile,
					params.data.tags,
				);
				return { data: { ...file } };
			}
		}
		if (
			resource === "news" ||
			resource === "contentManagement" ||
			resource === "licenses" ||
			resource === "resources"
		) {
			let mediaID = params.data.media_id;
			if (params.data.file) {
				const file = await upsertFile(
					params.data.file.title,
					params.data.file.rawFile,
				);

				mediaID = file.id;
			}

			// biome-ignore lint/performance/noDelete: <explanation>
			delete params.data.file;

			return jsonServerDataProvider.create(resource, {
				...params,
				data: {
					...params.data,
					media_id: mediaID,
				},
			});
		}

		return jsonServerDataProvider.create(resource, {
			...params,
			data: {
				...params.data,
			},
		});
	},
	setCommonLicense: (licenseId: number) => {
		return fetch(`${apiUrl}/licenses/${licenseId}/common`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
	},
};

export default dataProvider;
