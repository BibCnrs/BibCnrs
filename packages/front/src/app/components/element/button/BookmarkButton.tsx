import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { memo, useEffect, useState } from "react";
import { useFavouriteResources } from "../../../shared/hook";
import { useTranslator } from "../../../shared/locales/I18N";
import type { BookmarkButtonProps } from "../../../shared/types/props.types";
import "./scss/BookmarkButton.scss";
import { useBibContext } from "../../../context/BibContext";

const BookmarkButton = ({
	title,
	url,
	className = "",
}: BookmarkButtonProps) => {
	const {
		session: { user },
	} = useBibContext();
	const t = useTranslator();
	const { favouriteResources, addFavourite, removeFavourite } =
		useFavouriteResources();
	const [inBookmark, setInBookmark] = useState(false);
	const [animated, setAnimated] = useState(false);

	useEffect(() => {
		if (user) {
			if (
				favouriteResources.some(
					(value) => value.title === title || value.url === url,
				)
			) {
				setInBookmark(true);
				return;
			}
		}
	}, [user, favouriteResources, title, url]);

	const handleClick = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setAnimated(true);
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
		<div
			className={`favourite-button-container ${className} ${
				animated ? "favourite-button-container-animation" : ""
			}`}
			onAnimationEnd={() => {
				setAnimated(false);
			}}
		>
			<Tooltip title={t("components.button.favourite.tooltip")} arrow>
				<button
					className="favourite-button"
					onClick={handleClick}
					type="button"
				>
					<FavoriteIcon
						className={`favourite-button-icon ${
							inBookmark ? "favourite-button-icon-active" : ""
						}`}
						fontSize="small"
					/>
				</button>
			</Tooltip>
		</div>
	);
};

export default memo(BookmarkButton);
