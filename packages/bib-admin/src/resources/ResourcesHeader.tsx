import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { Labeled, useGetList, useRecordContext } from "react-admin";
import { useFormContext } from "react-hook-form";

const ContentManagementHeader = () => {
	const record = useRecordContext();
	const { setValue } = useFormContext();
	const { data: communities } = useGetList("communities");
	const [selectedCommunity, setSelectedCommunity] = useState(
		record?.community || "other",
	);
	useEffect(() => setSelectedCommunity(record?.community || "other"), [record]);

	const handleClick = (communityName: string) => {
		if (!communityName) {
			return;
		}
		if (communityName === selectedCommunity) {
			setSelectedCommunity("other");
			setValue("community", "other", {
				shouldDirty: true,
			});
			return;
		}
		setSelectedCommunity(communityName);
		setValue("community", communityName, {
			shouldDirty: true,
		});
	};

	if (!communities) {
		return null;
	}

	return (
		<Labeled label="Communautés (Utilisé pour les couleur côté utilisateur connecté ou non)">
			<Stack direction="row" spacing={1}>
				{communities.map((community) => (
					<Chip
						key={community.name}
						label={community.name}
						onClick={() => handleClick(community.name)}
						color={selectedCommunity === community.name ? "primary" : "default"}
					/>
				))}
			</Stack>
		</Labeled>
	);
};

export default ContentManagementHeader;
