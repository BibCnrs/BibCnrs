import { Box } from "@mui/system";
import { useMemo, useState } from "react";
import { useTranslator } from "../../../shared/locales/I18N";
import type { DatabaseItemProps } from "../../../shared/types/data.types";
import { PlatformCardItem } from "./PlatformCardItem";
import { PlatformCardViewPagination } from "./PlatformCardViewPagination";

type PlatformCardViewProps = {
	platforms: DatabaseItemProps[];
};

export function PlatformCardView({ platforms }: PlatformCardViewProps) {
	const t = useTranslator();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [databasePerPage, setDatabasePerPage] = useState<number>(200);

	const pageCount = useMemo(
		() => Math.ceil(platforms.length / databasePerPage),
		[platforms, databasePerPage],
	);

	return (
		<>
			<Box
				display="grid"
				gridTemplateColumns={{
					xs: "repeat(1, 1fr)",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					lg: "repeat(4, 1fr)",
				}}
				gap={2}
				// biome-ignore lint/a11y/useSemanticElements: <explanation>
				role="listitem"
				aria-label={t("pages.database.title")}
			>
				{platforms
					.slice(
						(currentPage - 1) * databasePerPage,
						currentPage * databasePerPage,
					)
					.map((item) => (
						<PlatformCardItem key={item.id} {...item} />
					))}
			</Box>
			<PlatformCardViewPagination
				pageCount={pageCount}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				databasePerPage={databasePerPage}
				setDatabasePerPage={setDatabasePerPage}
			/>
		</>
	);
}
