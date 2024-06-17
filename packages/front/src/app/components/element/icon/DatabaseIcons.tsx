import { Stack, Tooltip } from "@mui/material";
import { memo, useContext } from "react";
import type { DatabaseItemProps } from "../../../shared/types/data.types";
import { BibContext } from "../../internal/provider/ContextProvider";
import BookmarkButton from "../button/BookmarkButton";
import { NotCompleteIcon } from "./NotCompleteIcon";
import OpenAccess from "./OpenAccess";

const DatabaseIcons = ({ oa, is_completed }: DatabaseItemProps) => {
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

			{!is_completed && <NotCompleteIcon />}
		</Stack>
	);
};

export default memo(DatabaseIcons);
