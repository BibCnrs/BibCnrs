import Checkbox from "@mui/material/Checkbox";
import { memo, useContext } from "react";
import type { ChangeEvent } from "react";
import { ArticleContext } from "../../../pages/search/article/ArticlePage";
import type { ArticleContentGetter } from "../../../services/search/Article";

const ExportArticleCheckbox = ({
	getter,
}: { getter: ArticleContentGetter }) => {
	const { exports, setExports } = useContext(ArticleContext);
	const id = getter.getId();
	const exportLinks = getter.getExportLink() ?? { bibtex: "", ris: "" };

	const handleOnChange = (
		event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => {
		if (checked) {
			setExports([
				...exports,
				{
					id,
					...exportLinks,
				},
			]);
			return;
		}
		setExports(exports.filter((value) => value.id !== id));
	};

	return (
		<Checkbox
			sx={{ padding: 0, marginTop: "-2px", marginRight: 1 }}
			size="small"
			onChange={handleOnChange}
			checked={exports.findIndex((value) => value.id === id) >= 0}
		/>
	);
};

export default memo(ExportArticleCheckbox);
