import { Card, CardContent, Link, Stack, Tooltip } from "@mui/material";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import DatabaseIcons from "../../../components/element/icon/DatabaseIcons";
import { useBibContext } from "../../../context/BibContext";
import type { DatabaseItemProps } from "../../../shared/types/data.types";

export function DatabaseItem(props: DatabaseItemProps) {
	const {
		session: { user },
	} = useBibContext();
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
							height: "100%",
						},
					}}
				>
					<Stack
						gap={1}
						sx={{
							height: "100%",
							justifyContent: "space-between",
						}}
					>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							gap={1}
						>
							<Link fontWeight={700} href={props.url}>
								{props.name}
							</Link>
							{user && (
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
