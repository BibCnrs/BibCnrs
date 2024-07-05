import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import { memo, useEffect, useState } from "react";
import { useBibContext } from "../../../context/BibContext";
import { useFavourites } from "../../../pages/user/favourite/useFavourites";
import { useTranslator } from "../../../shared/locales/I18N";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";

const AnimatedIconButton = styled(IconButton)`
  &.animate {
    animation: bounce 0.3s;
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;

type BookmarkButtonProps = {
	title: string;
	url: string;
	source: FavouriteResourceDataType["source"];
	className?: string;
};

const BookmarkButton = ({ title, url, source }: BookmarkButtonProps) => {
	const {
		session: { user },
	} = useBibContext();
	const t = useTranslator();
	const { allFavourites, addFavourite, removeFavourite } = useFavourites();
	const [inBookmark, setInBookmark] = useState(false);

	const [animate, setAnimate] = useState(false);

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
		setAnimate(true);
		event.preventDefault();
		event.stopPropagation();
		if (!inBookmark) {
			addFavourite({
				title,
				url,
				source,
			});
			setInBookmark(true);
			return;
		}
		removeFavourite({
			title,
			url,
		});
		setInBookmark(false);
		setTimeout(() => setAnimate(false), 300);
	};

	return (
		<Tooltip title={t("components.button.favourite.tooltip")} arrow>
			<AnimatedIconButton
				className={animate ? "animate" : ""}
				onClick={handleClick}
				type="button"
				size="small"
				aria-label={t("components.button.favourite.tooltip", { title })}
			>
				{inBookmark ? <FavoriteIcon color="primary" /> : <FavoriteOutlined />}
			</AnimatedIconButton>
		</Tooltip>
	);
};

export default memo(BookmarkButton);
