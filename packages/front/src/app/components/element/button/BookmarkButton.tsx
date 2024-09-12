import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useBibContext } from "../../../context/BibContext";
import { useFavourites } from "../../../pages/user/favourite/useFavourites";
import { useTranslator } from "../../../shared/locales/I18N";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";

const AnimatedIconButton = styled(IconButton)`
  padding: 0;
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

	if (user?.origin !== "janus") {
		return null;
	}

	return (
		<Tooltip title={t("components.button.favourite.tooltip", { title })} arrow>
			<AnimatedIconButton
				className={animate ? "animate" : ""}
				onClick={handleClick}
				type="button"
				size="small"
				aria-label={t("components.button.favourite.tooltip", { title })}
			>
				{inBookmark ? (
					<FavoriteIcon
						sx={{
							fontSize: "1.2em",
						}}
						color="primary"
					/>
				) : (
					<FavoriteBorderOutlined
						sx={{
							fontSize: "1.2em",
						}}
					/>
				)}
			</AnimatedIconButton>
		</Tooltip>
	);
};

export default BookmarkButton;
