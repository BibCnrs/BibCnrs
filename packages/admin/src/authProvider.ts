import type { AuthProvider } from "react-admin";

const apiUrl = `${import.meta.env.VITE_BIBAPI_HOST}/admin`;

const authProvider: AuthProvider = {
	// called when the user attempts to log in
	login: ({ username, password }) => {
		const request = new Request(`${apiUrl}/login`, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: new Headers({
				"Content-Type": "application/json",
				Accept: "application/json",
			}),
		});

		return fetch(request)
			.then((response) => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(({ token }) => {
				localStorage.setItem("token", token);
			});
	},
	// called when the user clicks on the logout button
	logout: () => {
		localStorage.removeItem("token");
		return Promise.resolve();
	},
	// called when the user navigates to a new location
	checkAuth: () => {
		return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
	},
	// called when the API returns an error
	checkError: (error) => {
		const status = error.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem("token");
			return Promise.reject();
		}
		return Promise.resolve();
	},

	getPermissions: () => {
		return Promise.resolve();
	},
};

export default authProvider;
