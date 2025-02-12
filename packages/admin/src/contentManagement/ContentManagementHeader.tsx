import Chip from "@mui/material/Chip";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { Labeled, ValidationError, useRecordContext } from "react-admin";
import { useFormContext } from "react-hook-form";

export const pages = [
	{ id: "alert", name: "Alerte" },
	{ id: "home", name: "Accueil" },
	{ id: "faq", name: "FAQ" },
	{ id: "legal", name: "Mentions légales" },
	{ id: "about", name: "A propos" },
	{ id: "privacy", name: "Politique de confidentialité" },
	{ id: "accessibility", name: "Accessibilité" },
	{ id: "plan", name: "plan" },
];

const ContentManagementHeader = () => {
	const record = useRecordContext();
	const { formState, setValue } = useFormContext();
	const [selectedPage, setSelectedPage] = useState(record?.page || "");
	useEffect(() => setSelectedPage(record?.page || ""), [record]);

	const handleClick = (pageId: string) => {
		if (!pageId) {
			return;
		}
		setSelectedPage(pageId);
		setValue("page", pageId, {
			shouldDirty: true,
		});
	};

	const errorMessage = formState.errors?.page?.message;

	return (
		<Labeled label="Page" isRequired>
			<Stack direction="column" spacing={1}>
				<Stack direction="row" spacing={1}>
					{pages.map((page) => (
						<Chip
							key={page.id}
							label={page.name}
							onClick={() => handleClick(page.id)}
							color={selectedPage === page.id ? "primary" : "default"}
						/>
					))}
				</Stack>
				{errorMessage && (
					<FormHelperText error>
						{typeof errorMessage === "string" ? (
							<ValidationError error={errorMessage} />
						) : (
							<ValidationError error={errorMessage.message.toString()} />
						)}
					</FormHelperText>
				)}
			</Stack>
		</Labeled>
	);
};

export default ContentManagementHeader;
