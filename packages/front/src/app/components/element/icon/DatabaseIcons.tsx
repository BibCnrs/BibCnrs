import { Stack } from "@mui/material";
import { memo } from "react";
import type { DatabaseItemProps } from "../../../shared/types/data.types";
import { CompleteIcon } from "./CompleteIcon";
import Diamond from "./Diamond";
import { EmbargoIcon } from "./EmbargoIcon";
import OpenAccess from "./OpenAccess";

const DatabaseIcons = ({
	oa,
	is_completed,
	without_embargo,
	diamond,
}: DatabaseItemProps) => {
	return (
		<Stack
			gap={1}
			direction="row"
			alignItems="center"
			sx={{
				height: "1em",
			}}
		>
			{oa && <OpenAccess />}
			{diamond && <Diamond />}

			{is_completed && <CompleteIcon style={{ height: "0.8em" }} />}
			{!without_embargo && <EmbargoIcon />}
		</Stack>
	);
};

export default memo(DatabaseIcons);
