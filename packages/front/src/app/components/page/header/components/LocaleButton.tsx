import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useBibContext } from "../../../../context/BibContext";
import { useSettingsUpdate } from "../../../../pages/user/UserSettings/useSettingsUpdate";
import {
	supportedLanguages,
	useFullTranslator,
} from "../../../../shared/locales/I18N";
import type { SupportedLanguageKeys } from "../../../../shared/types/types";

/**
 * Local Button component used by the header.
 * This element is used to change the application language
 */
const LocaleButton = () => {
	const { i18n } = useFullTranslator();
	const { language } = useBibContext();
	const { handleToggleChange } = useSettingsUpdate();

	// Anchor used to display or not the drop-down menu
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	// Handle drop-down menu action, like close or click
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	// Change lang if a language was chosen, and close the drop-down menu
	const handleClose = (key: SupportedLanguageKeys) => {
		handleToggleChange("defaultLanguage")(null, key);
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open || undefined}
				onClick={handleClick}
				className="header-button header-button-icon"
				sx={{
					color: (theme) => theme.palette.text.primary,
					position: "relative",
					top: 4,
					paddingBottom: 0.5,
					paddingTop: 0.5,
					display: "flex",
					flexDirection: "row",
					gap: "4px",
				}}
			>
				<LanguageIcon fontSize="small" />

				{language.toUpperCase()}

				<KeyboardArrowDownIcon fontSize="small" />
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{supportedLanguages.map((lang) => (
					<MenuItem
						key={lang.key}
						onClick={() => {
							handleClose(lang.key);
						}}
						sx={{
							borderLeftStyle: "solid",
							borderLeftWidth: "4px",
							borderLeftColor: (theme) =>
								i18n.language.includes(lang.key)
									? theme.palette.primary.main
									: "#00000000",
						}}
					>
						{i18n.language.includes(lang.key) ? (
							<b>{lang.label}</b>
						) : (
							lang.label
						)}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default LocaleButton;
