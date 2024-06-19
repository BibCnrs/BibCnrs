import { useCallback, useEffect, useState } from "react";
import { createQuery, environment } from "../services/Environment";
import type { SessionUserDataType } from "../shared/types/data.types";

export type BibUser =
	| {
			type: "loading";
			user: null;
	  }
	| {
			type: "loggedOut";
			user: null;
	  }
	| {
			type: "loggedIn";
			user: SessionUserDataType;
	  };

type LegacyLoginForm = { username: string; password: string };

const LOADING_USER: BibUser = { type: "loading", user: null };
const LOGGED_OUT_USER: BibUser = { type: "loggedOut", user: null };

const storage = window?.localStorage;
const STORAGE_KEY = "user";

export function useSession() {
	const [user, setUser] = useState<BibUser>(LOADING_USER);

	useEffect(() => {
		const userJson = storage?.getItem(STORAGE_KEY);
		if (userJson) {
			const user = JSON.parse(userJson);
			// We ensure that user token is not expired here
			fetch(
				createQuery(environment.get.account.licences, {
					domains: (user.domains ?? []).join(","),
				}),
			)
				.then((response) => {
					if (response.status !== 200) {
						throw new Error("Error fetching licences");
					}
					setUser({
						type: "loggedIn",
						user,
					});
				})
				.catch(() => logout());
		} else {
			setUser(LOGGED_OUT_USER);
		}
	}, []);

	const _loginUser = useCallback((user: BibUser["user"]) => {
		if (!user) {
			return;
		}
		storage?.setItem(STORAGE_KEY, JSON.stringify(user));
		setUser({ type: "loggedIn", user });
	}, []);

	const loginToJanus = useCallback(() => {
		if (user.type === "loggedIn") {
			return;
		}
		const janusUrl = createQuery(environment.get.account.janus, {
			origin: window.location.href,
		});
		window.location.assign(janusUrl);
	}, [user]);

	const loginToLegacy = useCallback(
		async (form: LegacyLoginForm): Promise<boolean> => {
			if (user.type === "loggedIn") {
				return false;
			}

			setUser(LOADING_USER);

			try {
				const response = await fetch(
					createQuery(environment.post.account.legacy),
					{
						method: "POST",
						credentials: "include",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						body: JSON.stringify(form),
					},
				);

				const loggedInUser = {
					...(await response.json()),
					fetch: false,
					legacy: true,
				};

				// If response return an error, abort login
				if (loggedInUser.error) {
					throw new Error(`Error logging in: ${loggedInUser.error}`);
				}

				_loginUser(loggedInUser);
				return true;
			} catch (e) {
				setUser(LOADING_USER);
				return false;
			}
		},
		[user, _loginUser],
	);

	const logout = useCallback(() => {
		setUser(LOADING_USER);
		void fetch(createQuery(environment.post.account.logout), {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).finally(() => {
			setUser(LOGGED_OUT_USER);
		});
	}, []);

	return {
		user,
		loginToJanus,
		loginToLegacy,
		logout,
	};
}
