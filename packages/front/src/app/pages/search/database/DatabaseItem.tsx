import { Card, CardContent, Link, Stack, Tooltip } from "@mui/material";
import { useContext } from "react";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import DatabaseIcons from "../../../components/element/icon/DatabaseIcons";
import { BibContext } from "../../../components/internal/provider/ContextProvider";
import type { DatabaseItemProps } from "../../../shared/types/data.types";

export function DatabaseItem(props: DatabaseItemProps) {
	const { login } = useContext(BibContext);
	return (
		<Tooltip
			title={props.text}
			arrow
			enterDelay={1000}
			enterNextDelay={1000}
			leaveDelay={200}
		>
			<Card role="listitem" aria-label={props.name}>
				<CardContent
					sx={{
						"&:last-child": {
							paddingBottom: 2,
						},
					}}
				>
					<Stack gap={1}>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							gap={1}
						>
							<Link fontWeight={700} href={props.url}>
								{props.name}
							</Link>
							{login && (
								<BookmarkButton
									className="database-icon-favourite"
									title={props.name}
									url={props.url}
								/>
							)}
						</Stack>
						<DatabaseIcons {...props} />
					</Stack>
				</CardContent>
			</Card>
		</Tooltip>
	);
}
