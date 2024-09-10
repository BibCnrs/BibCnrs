import BookmarkIcon from "@mui/icons-material/Bookmark";
import ErrorIcon from "@mui/icons-material/Error";
import GroupsIcon from "@mui/icons-material/Groups";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { MouseEvent, ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBibContext } from "../../../../context/BibContext";
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

	// Create menu options
	const options: ReactElement[] = [];
	// Add username button
	options.push(
		<MenuItem
			sx={{
				"&:hover": { backgroundColor: "inherit" },
				cursor: "default",
			}}
			disableRipple
			key="username"
		>
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
			<MenuItem
				key="history"
				onClick={(event) => {
					history.handler(event);
					setAnchorEl(null);
				}}
				href={history.href}
			>
				<ListItemIcon>
					<HistoryIcon fontSize="small" />
				</ListItemIcon>
				{t("components.header.user.history")}
			</MenuItem>,
			<MenuItem
				key="bookmark"
				onClick={(event) => {
					favourite.handler(event);
					setAnchorEl(null);
				}}
				href={favourite.href}
			>
				<ListItemIcon>
					<BookmarkIcon fontSize="small" />
				</ListItemIcon>
				{t("components.header.user.bookmark")}
			</MenuItem>,
			<MenuItem
				key="notfications"
				onClick={(event) => {
					alert.handler(event);
					setAnchorEl(null);
				}}
				href={alert.href}
			>
				<ListItemIcon>
					<NotificationsIcon fontSize="small" />
				</ListItemIcon>
				{t("components.header.user.notifications")}
			</MenuItem>,
			<MenuItem
				key="settings"
				component={Link}
				to={RouteUserSettings}
				onClick={() => {
					setAnchorEl(null);
				}}
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
		<>
			<IconButton
				aria-label={t("components.header.user.profile")}
				size="medium"
				onClick={handleClick}
				sx={{ marginBottom: "-5px", border: "1px solid" }}
				color={user?.legacy ? "inherit" : "primary"}
			>
				{user?.legacy && <GroupsIcon fontSize="inherit" />}
				{!user?.legacy && <PersonIcon fontSize="inherit" />}
			</IconButton>

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
		</>
	);
};

export default UserButton;
