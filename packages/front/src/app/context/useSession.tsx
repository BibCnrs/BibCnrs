import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuery, environment } from "../services/Environment";
import { updateFavourite } from "../services/user/Favourite";
import { updateAlert } from "../services/user/SearchAlert";
import type { UserSettingsType } from "../services/user/UserSettings";
import i18next, { useFullTranslator } from "../shared/locales/I18N";
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

const getSystemTheme = (): ThemeType => {
	const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
	return darkMode ? "dark" : "light";
};

const setStorageTheme = (value: ThemeType) => {
	window?.localStorage?.setItem("mode", value);
};

const getStorageTheme = (): ThemeType => {
	if (!window.localStorage) {
		return "light";
	}

	if (!window.localStorage.getItem("mode")) {
		// TODO: use getSystemTheme() once it is implemented
		setStorageTheme("light");
	}

	return window.localStorage.getItem("mode") as ThemeType;
};

const DEFAULT_USER_SETTINGS: UserSettingsType = {
	displayFavorites: true,
	displayTestNews: true,
	articleLinkType: "oa",
	defaultLanguage: "auto",
	defaultTheme: "auto",
	defaultSearchMode: "article",
	hasSeenPopup: false,
};

export function useSession() {
	const navigate = useNavigate();
	const { i18n } = useFullTranslator();

	const [session, setSession] = useState<BibSession>(LOADING_USER);
	const [localTheme, setLocalTheme] = useState<ThemeType>(getStorageTheme());

	const _setupLanguageAndTheme = useCallback(
		(janusUser: SessionUserDataType) => {
			if (!janusUser.settings) return;

			if (janusUser.settings.defaultLanguage !== "auto") {
				i18n.changeLanguage(janusUser.settings.defaultLanguage);
			} else {
				window.localStorage.removeItem("i18nextLng");
				i18next.changeLanguage();
			}
		},
		[i18n],
	);

	const _loginUser = useCallback(
		(user: BibSession["user"]) => {
			if (!user) {
				return;
			}
			persistentStorage?.setItem(STORAGE_KEY, JSON.stringify(user));
			setSession({ status: "loggedIn", user });

			if (user.origin === "janus") {
				_setupLanguageAndTheme(user);
			}
		},
		[_setupLanguageAndTheme],
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
			const user = JSON.parse(userJson) as SessionUserDataType;
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
						user: {
							...user,
							settings:
								user.origin === "janus"
									? { ...DEFAULT_USER_SETTINGS, ...user.settings }
									: undefined,
						},
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

				if (response.status === 401) {
					throw new Error("Invalid credentials");
				}

				_loginUser({
					...(await response.json()),
					fetch: false,
					legacy: true,
				});
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

	const closeUserPopup = useCallback(async () => {
		if (session.status !== "loggedIn" || session.user.origin !== "janus") {
			return;
		}
		const response = await fetch(
			createQuery(`${environment.put.account.settings}/${session.user.id}`),
			{
				credentials: "include",
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					hasSeenPopup: true,
				}),
			},
		);
		if (response.status === 401) {
			throw new Error("Invalid credentials");
		}

		updateUserSettings({ ...session.user.settings, hasSeenPopup: true });
	}, [session.user, session.status, updateUserSettings]);

	const updateSearchAlert = useCallback(
		(historyId: number, frequency: string) => {
			if (!session.user) {
				return Promise.resolve();
			}
			return updateAlert(session.user.id, historyId, frequency);
		},
		[session.user],
	);

	const theme = useMemo(() => {
		if (session.user?.origin !== "janus") {
			return localTheme;
		}

		if (session.user.settings.defaultTheme === "auto") {
			return getSystemTheme();
		}
		return session.user.settings.defaultTheme;
	}, [localTheme, session.user]);

	const setTheme = useCallback(
		(theme: ThemeType) => {
			if (session.user?.origin === "janus") {
				updateUserSettings({ ...session.user.settings, defaultTheme: theme });
				return;
			}
			setLocalTheme(theme);
			setStorageTheme(theme);
		},
		[session.user, updateUserSettings],
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
		displayUserPopup: session.user?.settings?.hasSeenPopup === false,
		closeUserPopup,
	};
}
