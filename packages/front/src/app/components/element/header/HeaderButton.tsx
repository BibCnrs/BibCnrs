import Button from "@mui/material/Button";
import { memo } from "react";
import { useClickHandler, useIsMatching } from "../../../shared/Routes";
import type { RoutesType } from "../../../shared/Routes";
import { useTranslator } from "../../../shared/locales/I18N";
import { headerButtonStyle } from "../../page/header/Header";

/**
 * Button used to go to Faq page
 */
const HeaderButton = ({ name, route }: { name: string; route: RoutesType }) => {
	const t = useTranslator();
	const action = useClickHandler(route);
	const active = !!useIsMatching(route);
	return (
		<div className="header-nav">
			<Button
				id={active ? "header-button-active" : undefined}
				className="header-button"
				sx={headerButtonStyle}
				onClick={action.handler}
				href={action.href}
			>
				{t(`components.header.${name}`)}
			</Button>
		</div>
	);
};

export default memo(HeaderButton);
