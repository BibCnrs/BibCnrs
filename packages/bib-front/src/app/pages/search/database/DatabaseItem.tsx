import {
	Card,
	CardContent,
	Link,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import DatabaseIcons from "../../../components/element/icon/DatabaseIcons";
import type { DatabaseItemProps } from "../../../shared/types/data.types";

export function DatabaseItem(props: DatabaseItemProps) {
	return (
		<Tooltip title={props.text} arrow>
			<Card>
				<CardContent>
					<Stack gap={1}>
						<Link fontWeight={700} href={props.url}>
							{props.name}
						</Link>
						<DatabaseIcons {...props} />
					</Stack>
				</CardContent>
			</Card>
		</Tooltip>
	);
}
