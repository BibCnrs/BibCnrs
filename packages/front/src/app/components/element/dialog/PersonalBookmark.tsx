import { Button, FormHelperText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { useFavourites } from "../../../pages/user/favourite/useFavourites";
import { useTranslator } from "../../../shared/locales/I18N";
import type { DialogProps } from "../../../shared/types/props.types";

const PersonalBookmark = ({ open, onClose }: DialogProps) => {
	const t = useTranslator();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const { addFavourite } = useFavourites();

	const [formError, setFormError] = useState<string[]>([]);
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");

	const handleCancel = () => {
		onClose();
	};

	const handleSave = () => {
		const errors: string[] = [];
		if (!title) {
			errors.push("title");
		}

		if (!url) {
			errors.push("url");
		} else {
			try {
				new URL(url);
			} catch (e) {
				errors.push("url");
			}
		}

		setFormError(errors);

		if (errors.length) {
			return;
		}

		addFavourite({
			title,
			url,
			source: "personal",
		});
		onClose();
	};

	const handleFormChange = (name: "title" | "url") => {
		if (name === "title") {
			return (event: ChangeEvent<HTMLInputElement>) => {
				setTitle(event.target.value);
			};
		}
		if (name === "url") {
			return (event: ChangeEvent<HTMLInputElement>) => {
				setUrl(event.target.value);
			};
		}
	};

	return (
		<Dialog fullScreen={fullScreen} open={open} fullWidth maxWidth="xs">
			<DialogTitle>{t("components.dialog.title.bookmark")}</DialogTitle>
			<DialogContent>
				<FormControl fullWidth>
					<TextField
						value={title}
						onChange={handleFormChange("title")}
						error={formError.includes("title")}
						label={t("components.dialog.fields.title")}
						size="small"
					/>
					{formError.includes("title") && (
						<FormHelperText error={true}>
							{t("components.dialog.fields.invalidTitle")}
						</FormHelperText>
					)}
					<TextField
						sx={{ marginTop: "20px" }}
						value={url}
						onChange={handleFormChange("url")}
						error={formError.includes("url")}
						label={t("components.dialog.fields.url")}
						size="small"
					/>
					{formError.includes("url") && (
						<FormHelperText error={true}>
							{t("components.dialog.fields.invalidUrl")}
						</FormHelperText>
					)}
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel}>{t("components.dialog.cancel")}</Button>
				<Button variant="contained" onClick={handleSave}>
					{t("components.dialog.save")}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PersonalBookmark;
