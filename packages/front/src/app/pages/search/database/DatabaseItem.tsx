import { Card, CardContent, Link, Stack, Tooltip } from "@mui/material";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import DatabaseIcons from "../../../components/element/icon/DatabaseIcons";
import { useBibContext } from "../../../context/BibContext";
import { useMatomo } from "../../../shared/matomo";
import type { DatabaseItemProps } from "../../../shared/types/data.types";

export function DatabaseItem(props: DatabaseItemProps) {
	const {
		session: { user },
	} = useBibContext();
	const { trackEvent } = useMatomo();

	const handleClick = () => {
		trackEvent("Database", "click", props.name, props.id);
	};

	return (
		<Tooltip
			title={props.text}
			arrow
			enterDelay={1000}
			enterNextDelay={1000}
			leaveDelay={200}
		>
			<Card role="listitem" aria-label={props.name} elevation={3}>
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
						<Link
							fontWeight={700}
							href={props.url}
							target="_blank"
							rel="noopener noreferrer"
							onClick={handleClick}
						>
							{props.name}
						</Link>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
						>
							<DatabaseIcons {...props} />
							{user && (
								<BookmarkButton
									className="database-icon-favourite"
									title={props.name}
									url={props.url}
									source="database"
								/>
							)}
						</Stack>
					</Stack>
				</CardContent>
			</Card>
		</Tooltip>
	);
}
