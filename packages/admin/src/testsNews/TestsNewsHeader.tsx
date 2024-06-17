import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { Labeled, useGetList, useRecordContext } from "react-admin";
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
	const [selectedDomains, setSelectedDomains] = useState<string[]>(
		record?.domains || [],
	);
	useEffect(() => {
		setSelectedPage(record?.page || "");
		setSelectedDomains(record?.domains || []);
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

	const handleCommunityClick = (communityName: string) => {
		if (!communityName) {
			return;
		}
		if (selectedDomains.includes(communityName)) {
			if (selectedDomains.length <= 1) {
				return;
			}
			const domains = selectedDomains.filter(
				(value) => value !== communityName,
			);
			setSelectedDomains(domains);
			setValue("domains", domains, {
				shouldDirty: true,
			});
			return;
		}
		const domains = [...selectedDomains, communityName];
		setSelectedDomains(domains);
		setValue("domains", domains, {
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
			<Labeled label="Communautés">
				<Stack direction="row" spacing={1}>
					{communities.map((community) => (
						<Chip
							key={community.name}
							label={community.name}
							onClick={() => handleCommunityClick(community.name)}
							color={
								selectedDomains.includes(community.name) ? "primary" : "default"
							}
						/>
					))}
				</Stack>
			</Labeled>
		</>
	);
};

export default TestsNewsHeader;
