import { memo, useContext } from "react";
import { BibContext } from "../../internal/provider/ContextProvider";
import BookmarkButton from "../button/BookmarkButton";
import OpenAccess from "./OpenAccess";

const DatabaseIcons = ({
	title,
	url,
	oa,
}: { title: string; url: string; oa: boolean }) => {
	const { login } = useContext(BibContext);
	if (!login) {
		return oa ? <OpenAccess className="database-icon-oa" /> : null;
	}
	return (
		<>
			{oa ? (
				<OpenAccess className="database-icon-oa" />
			) : (
				<div className="database-icon-oa" />
			)}
			<BookmarkButton
				className="database-icon-favourite"
				title={title}
				url={url}
			/>
		</>
	);
};

export default memo(DatabaseIcons);
