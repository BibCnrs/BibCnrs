import Button from "@mui/material/Button";
import { memo } from "react";
import { useClickHandler, useIsMatching } from "../../../../shared/Routes";
import type { RoutesType } from "../../../../shared/Routes";
import { useTranslator } from "../../../../shared/locales/I18N";

/**
 * Button used to go to Faq page
 */
const HeaderButton = ({ name, route }: { name: string; route: RoutesType }) => {
	const t = useTranslator();
	const action = useClickHandler(route);
	const active = !!useIsMatching(route);
	return (
		<Button
			id={active ? "header-button-active" : undefined}
			onClick={action.handler}
			href={action.href}
			sx={{
				color: (theme) => theme.palette.text.primary,
				textTransform: "none",
				display: { xs: "none", md: "block" },
				paddingBottom: 0,
				textAlign: "center",
				minWidth: 0,
			}}
		>
			{t(`components.header.${name}`)}
		</Button>
	);
};

export default memo(HeaderButton);
