import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { memo, useEffect, useState } from "react";
import { useTranslator } from "../../../shared/locales/I18N";
import type { BookmarkButtonProps } from "../../../shared/types/props.types";
import "./scss/BookmarkButton.scss";
import { useBibContext } from "../../../context/BibContext";
import { useFavourites } from "../../../pages/user/favourite/useFavourites";

const BookmarkButton = ({
	title,
	url,
	className = "",
}: BookmarkButtonProps) => {
	const {
		session: { user },
	} = useBibContext();
	const t = useTranslator();
	const { allFavourites, addFavourite, removeFavourite } = useFavourites();
	const [inBookmark, setInBookmark] = useState(false);

	useEffect(() => {
		if (user) {
			if (
				allFavourites.some(
					(value) => value.title === title || value.url === url,
				)
			) {
				setInBookmark(true);
				return;
			}
		}
	}, [user, allFavourites, title, url]);

	const handleClick = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!inBookmark) {
			addFavourite({
				title,
				url,
				personal: false,
			});
			setInBookmark(true);
			return;
		}
		removeFavourite({
			title,
			url,
		});
		setInBookmark(false);
	};

	return (
		<Tooltip title={t("components.button.favourite.tooltip")} arrow>
			<IconButton onClick={handleClick} type="button" size="small">
				{inBookmark ? <FavoriteIcon color="primary" /> : <FavoriteOutlined />}
			</IconButton>
		</Tooltip>
	);
};

export default memo(BookmarkButton);
