import BookmarkIcon from "@mui/icons-material/Bookmark";
import ErrorIcon from "@mui/icons-material/Error";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { MouseEvent, ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBibContext } from "../../../../context/BibContext";
import { colors } from "../../../../context/LocalizedThemeProvider";
import {
	RouteAlert,
	RouteFavourite,
	RouteHistory,
	RouteUserSettings,
	useClickHandler,
} from "../../../../shared/Routes";
import { useTranslator } from "../../../../shared/locales/I18N";

/**
 * Button used to display the user menu
 */
const UserButton = () => {
	const t = useTranslator();

	const {
		session: { user },
		logout,
	} = useBibContext();

	// Anchor used to display or not the drop-down menu
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);
	const history = useClickHandler(RouteHistory);
	const alert = useClickHandler(RouteAlert);
	const favourite = useClickHandler(RouteFavourite);

	// Handle drop-down menu action, like close or click
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	// Run menu action if available and close
	const handleClose = (action: () => void) => {
		if (typeof action === "function") {
			action();
		}
		setAnchorEl(null);
	};

	// Change the color of the avatar if the user is using a legacy account
	const getAvatarButtonClass = () => {
		return open ? " user-button-active-legacy" : " user-button-legacy";
	};

	// Create menu options
	const options: ReactElement[] = [];
	// Add username button
	options.push(
		<MenuItem key="username">
			<ListItemIcon>
				<Avatar sx={{ width: 24, height: 24 }} />
			</ListItemIcon>
			{user?.username ?? "null"}
		</MenuItem>,
		<Divider key="divider-1" />,
	);
	// Add a warning message when using a legacy account
	if (user?.legacy) {
		options.push(
			<MenuItem key="legacy">
				<ListItemIcon>
					<ErrorIcon fontSize="small" sx={{ color: "#a00" }} />
				</ListItemIcon>
				{t("components.header.user.legacy")}
			</MenuItem>,
		);
		// Add user navigation if other case
	} else {
		options.push(
			<MenuItem key="history" onClick={history.handler} href={history.href}>
				<ListItemIcon>
					<HistoryIcon fontSize="small" />
				</ListItemIcon>
				{t("components.header.user.history")}
			</MenuItem>,
			<MenuItem
				key="bookmark"
				onClick={favourite.handler}
				href={favourite.href}
			>
				<ListItemIcon>
					<BookmarkIcon fontSize="small" />
				</ListItemIcon>
				{t("components.header.user.bookmark")}
			</MenuItem>,
			<MenuItem key="notfications" onClick={alert.handler} href={alert.href}>
				<ListItemIcon>
					<NotificationsIcon fontSize="small" />
				</ListItemIcon>
				{t("components.header.user.notifications")}
			</MenuItem>,
			<MenuItem
				key="settings"
				component={Link}
				to={RouteUserSettings}
				aria-label={t("components.header.user.settings")}
			>
				<ListItemIcon>
					<SettingsIcon fontSize="small" />
				</ListItemIcon>
				{t("components.header.user.settings")}
			</MenuItem>,
		);
	}
	// Add logout button at the end
	options.push(
		<Divider key="divider-2" />,
		<MenuItem
			key="logout"
			onClick={() => {
				handleClose(() => logout());
			}}
		>
			<ListItemIcon>
				<LogoutIcon fontSize="small" />
			</ListItemIcon>
			{t("components.header.logout")}
		</MenuItem>,
	);

	return (
		<div className="header-nav">
			<button
				id={open ? "user-button-active" : "user-button"}
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				className={`header-button-icon${
					user?.legacy ? getAvatarButtonClass() : ""
				}`}
				type="button"
			>
				<Avatar
					sx={{
						bgcolor: user?.legacy
							? colors.other.legacy
							: colors.cnrs.secondary.lightBlue,
						color: colors.text.light,
					}}
				>
					{user?.username?.charAt?.(0) || "U"}
				</Avatar>
			</button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{options}
			</Menu>
		</div>
	);
};

export default UserButton;
