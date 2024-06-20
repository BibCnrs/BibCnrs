import { useCallback, useEffect, useState } from "react";
import { createQuery, environment } from "../services/Environment";
import { updateFavourite } from "../services/user/Favourite";
import { updateAlert } from "../services/user/SearchAlert";
import type {
	FavouriteResourceDataType,
	SessionUserDataType,
} from "../shared/types/data.types";

export type BibSession =
	| {
			status: "loading";
			user: null;
	  }
	| {
			status: "loggedOut";
			user: null;
	  }
	| {
			status: "loggedIn";
			user: SessionUserDataType;
	  };

type LegacyLoginForm = { username: string; password: string };

const LOADING_USER: BibSession = { status: "loading", user: null };
const LOGGED_OUT_USER: BibSession = { status: "loggedOut", user: null };

const persistentStorage = window?.localStorage;

const STORAGE_KEY = "user";
const JANUS_STORAGE_KEY = "janus_callback";

export function useSession() {
	const [session, setSession] = useState<BibSession>(LOADING_USER);

	const _loginUser = useCallback((user: BibSession["user"]) => {
		if (!user) {
			return;
		}
		persistentStorage?.setItem(STORAGE_KEY, JSON.stringify(user));
		setSession({ status: "loggedIn", user });
	}, []);

	const _janusLogin = useCallback(() => {
		setSession(LOADING_USER);
		void fetch(createQuery(environment.post.account.user), {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status !== 201) {
					throw res;
				}
				return res.json();
			})
			.then((user) => {
				_loginUser({ ...user, fetch: false, legacy: false });
			})
			.catch((res) => {
				// This fixes the dual request on getLogin in dev mode
				if (res.status !== 409) {
					setSession(LOGGED_OUT_USER);
				}
			})
			.finally(() => {
				persistentStorage?.removeItem(JANUS_STORAGE_KEY);
			});
	}, [_loginUser]);

	const _storageLogin = useCallback(() => {
		if (persistentStorage?.getItem(JANUS_STORAGE_KEY)) {
			return;
		}
		const userJson = persistentStorage?.getItem(STORAGE_KEY);
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
					setSession({
						status: "loggedIn",
						user,
					});
				})
				.catch(() => logout());
		} else {
			setSession(LOGGED_OUT_USER);
		}
	}, []);

	useEffect(() => {
		if (persistentStorage?.getItem(JANUS_STORAGE_KEY)) {
			_janusLogin();
		} else {
			_storageLogin();
		}
	}, [_janusLogin, _storageLogin]);

	const loginToJanus = useCallback(() => {
		if (session.status === "loggedIn") {
			return;
		}
		const janusUrl = createQuery(environment.get.account.janus, {
			origin: window.location.href,
		});

		persistentStorage?.setItem(JANUS_STORAGE_KEY, "true");

		window.location.assign(janusUrl);
	}, [session]);

	const loginToLegacy = useCallback(
		async (form: LegacyLoginForm): Promise<boolean> => {
			if (session.status === "loggedIn") {
				return false;
			}

			setSession(LOADING_USER);

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
				setSession(LOADING_USER);
				return false;
			}
		},
		[session, _loginUser],
	);

	const logout = useCallback(() => {
		setSession(LOADING_USER);
		void fetch(createQuery(environment.post.account.logout), {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).finally(() => {
			persistentStorage?.removeItem(STORAGE_KEY);
			setSession(LOGGED_OUT_USER);
		});
	}, []);

	const updateFavouriteResources = useCallback(
		(favouriteResources: FavouriteResourceDataType[] | null) => {
			if (session.status !== "loggedIn" || session.user.origin !== "janus") {
				return;
			}

			updateFavourite(session.user.id, favouriteResources).then(() => {
				_loginUser({
					...session.user,
					favouriteResources: favouriteResources ?? [],
				});
			});
		},
		[session.user, session.status, _loginUser],
	);

	const updateSearchAlert = useCallback(
		(historyId: number, frequency: string) => {
			if (!session.user) {
				return Promise.resolve();
			}
			return updateAlert(session.user.id, historyId, frequency);
		},
		[session.user],
	);

	return {
		session,
		loginToJanus,
		loginToLegacy,
		logout,
		updateFavouriteResources,
		updateSearchAlert,
	};
}
