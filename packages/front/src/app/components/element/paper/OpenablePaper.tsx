import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Paper, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { type MouseEvent, type ReactElement, useState } from "react";

type OpenablePaperProps = {
	title: ReactElement | string | null;
	summary: ReactElement | null;
	content: ReactElement | null;

	defaultOpenState?: boolean;
	onChange?: (isOpen: boolean) => void;

	leftAction?: ReactElement | null;
	rightAction?: ReactElement | null;
};

export default function OpenablePaper({
	title: Title,
	summary: SmallBody,
	content: FullBody,
	defaultOpenState = false,
	onChange,
	leftAction,
	rightAction,
}: OpenablePaperProps) {
	const [open, setOpen] = useState<boolean>(defaultOpenState);

	const toggleOpen = (e: MouseEvent) => {
		if (e.target instanceof HTMLLinkElement) {
			return;
		}

		setOpen((open) => {
			onChange?.(!open);
			return !open;
		});
	};

	return (
		<Paper
			sx={{
				display: "flex",
				padding: 1,
				backgroundColor: (theme) => theme.palette.info.light,
				flexDirection: "row",
				flexFlow: "row nowrap",
				gap: 2,
				alignItems: "flex-start",
			}}
		>
			{leftAction && (
				<Stack
					sx={{
						gap: 1,
					}}
				>
					{leftAction}
				</Stack>
			)}

			<Stack sx={{ gap: 1, flexGrow: 1, flexShrink: 1 }}>
				<Typography
					variant="h4"
					sx={{
						fontSize: 20,
						display: "flex",
						alignItems: "center",
						height: "34px",
						color: (theme) => theme.palette.primary.main,
						fontWeight: 700,
						cursor: "pointer",
					}}
					onClick={toggleOpen}
				>
					{Title}
				</Typography>

				{!open && SmallBody && <Stack sx={{ gap: 1 }}>{SmallBody}</Stack>}
				{open && FullBody && <Stack sx={{ gap: 1 }}>{FullBody}</Stack>}
			</Stack>

			<Stack
				sx={{
					gap: 1,
				}}
			>
				<IconButton size="small" color="primary" onClick={toggleOpen}>
					<ArrowForwardIosIcon
						sx={{
							transition: "transform 100ms ease-in-out",
							transform: open ? "rotate(90deg)" : undefined,
						}}
					/>
				</IconButton>

				{rightAction}
			</Stack>
		</Paper>
	);
}
