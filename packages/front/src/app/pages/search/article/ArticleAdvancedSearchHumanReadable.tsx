import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Fragment } from "react/jsx-runtime";
import {
	type AdvancedSearchItem,
	FIELDS,
	OPERATORS,
	type Operator,
} from "../../../context/AdvancedSearchContext";
import { useTranslator } from "../../../shared/locales/I18N";

type ArticleAdvancedSearchHumanReadableProps = {
	operator: Operator | null;
	searchLines: AdvancedSearchItem[][];
};

export default function ArticleAdvancedSearchHumanReadable({
	operator,
	searchLines,
}: ArticleAdvancedSearchHumanReadableProps) {
	const t = useTranslator();

	return (
		<>
			{operator && (
				<Divider>
					<Chip
						label={t(`components.advancedSearch.${OPERATORS[operator]}`)}
						size="small"
						color="primary"
					/>
				</Divider>
			)}

			<Stack gap={1}>
				{searchLines.map((line, index) => (
					<Stack
						key={line.at(0).id}
						gap={1}
						direction="row"
						sx={{
							marginInlineStart: index > 0 ? 4 : 0,
							flexWrap: "nowrap",
							whiteSpace: "nowrap",
						}}
					>
						{line.map((item, index) => (
							<Fragment key={item.id}>
								{item.operator && (
									<Typography fontWeight={700} color="primary">
										{t(`components.advancedSearch.${OPERATORS[item.operator]}`)}
									</Typography>
								)}
								<Typography fontWeight={700}>
									{t(`components.advancedSearch.${FIELDS[item.field]}`)}:
								</Typography>
								<Typography>{item.value}</Typography>
							</Fragment>
						))}
					</Stack>
				))}
			</Stack>
		</>
	);
}
