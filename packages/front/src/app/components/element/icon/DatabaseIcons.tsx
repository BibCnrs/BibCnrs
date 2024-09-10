import { Stack } from "@mui/material";
import { memo } from "react";
import type { DatabaseItemProps } from "../../../shared/types/data.types";
import { CompleteIcon } from "./CompleteIcon";
import { EmbargoIcon } from "./EmbargoIcon";
import OpenAccess from "./OpenAccess";

const DatabaseIcons = ({
	oa,
	is_completed,
	without_embargo,
}: DatabaseItemProps) => {
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

			{is_completed && <CompleteIcon />}
			{!without_embargo && <EmbargoIcon />}
		</Stack>
	);
};

export default memo(DatabaseIcons);
