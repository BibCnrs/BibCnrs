import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuery, environment } from "../services/Environment";
import { updateFavourite } from "../services/user/Favourite";
import { updateAlert } from "../services/user/SearchAlert";
import { useFullTranslator } from "../shared/locales/I18N";
import type {
	FavouriteResourceDataType,
	SessionUserDataType,
	UserSettingsDataType,
} from "../shared/types/data.types";
import type { ThemeType } from "../shared/types/types";

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

const setStorageTheme = (value: ThemeType) => {
	window?.localStorage?.setItem("mode", value);
};

const getStorageTheme = (): ThemeType => {
	const mode = window?.localStorage?.getItem("mode");
	if (mode == null) {
		setStorageTheme("light");
		return "light";
	}
	return mode as ThemeType;
};

export function useSession() {
	const navigate = useNavigate();
	const [session, setSession] = useState<BibSession>(LOADING_USER);
	const [theme, setTheme] = useState<ThemeType>(getStorageTheme());

	const { i18n } = useFullTranslator();

	const _loginUser = useCallback((user: BibSession["user"]) => {
		if (!user) {
			return;
		}
		persistentStorage?.setItem(STORAGE_KEY, JSON.stringify(user));
		setSession({ status: "loggedIn", user });
	}, []);

	const _setupLanguageAndTheme = useCallback(
		(janusUser: SessionUserDataType) => {
			if (!janusUser.settings) return;

			if (janusUser.settings.defaultLanguage !== "auto")
				i18n.changeLanguage(janusUser.settings.defaultLanguage);

			if (janusUser.settings.defaultTheme !== "auto")
				setTheme(janusUser.settings.defaultTheme);
		},
		[i18n],
	);

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
				_setupLanguageAndTheme(user);
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
	}, [_loginUser, _setupLanguageAndTheme]);

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
				setSession(LOGGED_OUT_USER);
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
			navigate("/", {
				unstable_flushSync: true,
			});
			setTimeout(() => {
				persistentStorage?.removeItem(STORAGE_KEY);
				setSession(LOGGED_OUT_USER);
			}, 0);
		});
	}, [navigate]);

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

	const updateUserSettings = useCallback(
		(settings: UserSettingsDataType) => {
			if (session.status !== "loggedIn" || session.user.origin !== "janus") {
				return;
			}

			const newSettings = { ...session.user.settings, ...settings };

			_loginUser({
				...session.user,
				settings: newSettings,
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
		updateUserSettings,
		updateSearchAlert,
		theme,
		setTheme,
	};
}
