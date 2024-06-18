import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import {
	AutocompleteArrayInput,
	Labeled,
	ReferenceArrayInput,
	useGetList,
	useRecordContext,
} from "react-admin";
import { useFormContext } from "react-hook-form";

export const pages = [
	{ id: "news", name: "Actualités" },
	{ id: "tests", name: "Tests" },
];

const TestsNewsHeader = () => {
	const record = useRecordContext();
	const { setValue } = useFormContext();
	const { data: communities } = useGetList("communities");
	const [selectedPage, setSelectedPage] = useState(record?.page || "");

	useEffect(() => {
		setSelectedPage(record?.page || "");
	}, [record]);

	const handlePageClick = (pageId: string) => {
		if (!pageId) {
			return;
		}
		setSelectedPage(pageId);
		setValue("page", pageId, {
			shouldDirty: true,
		});
	};

	if (!communities) {
		return null;
	}

	return (
		<>
			<Labeled label="Page">
				<Stack direction="row" spacing={1}>
					{pages.map((page) => (
						<Chip
							key={page.id}
							label={page.name}
							onClick={() => handlePageClick(page.id)}
							color={selectedPage === page.id ? "primary" : "default"}
						/>
					))}
				</Stack>
			</Labeled>
			<Labeled label="Communautés" fullWidth>
				<ReferenceArrayInput source="communities" reference="communities">
					<AutocompleteArrayInput optionText="name" fullWidth />
				</ReferenceArrayInput>
			</Labeled>
		</>
	);
};

export default TestsNewsHeader;
