import { Stack, Tooltip } from "@mui/material";
import { memo, useContext } from "react";
import type { DatabaseItemProps } from "../../../shared/types/data.types";
import { BibContext } from "../../internal/provider/ContextProvider";
import BookmarkButton from "../button/BookmarkButton";
import { NotCompleteIcon } from "./NotCompleteIcon";
import OpenAccess from "./OpenAccess";

const DatabaseIcons = ({ name, url, oa, complete }: DatabaseItemProps) => {
	const { login } = useContext(BibContext);

	return (
		<Stack
			gap={1}
			direction="row"
			alignItems="center"
			sx={{
				height: "32px",
			}}
		>
			{oa ? (
				<OpenAccess className="database-icon-oa" />
			) : (
				<div className="database-icon-oa" />
			)}
			{login && (
				<BookmarkButton
					className="database-icon-favourite"
					title={name}
					url={url}
				/>
			)}
			{!complete && <NotCompleteIcon />}
		</Stack>
	);
};

export default memo(DatabaseIcons);
