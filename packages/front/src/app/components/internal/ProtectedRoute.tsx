import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBibContext } from "../../context/BibContext";
import { RouteRoot } from "../../shared/Routes";
import type { ProtectedRouteProps } from "../../shared/types/props.types";

/**
 * Component which displays authentication modal if the user is not logged-in,
 * and returns the user to the home page if the authentication is canceled
 * @param children - Route content
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const {
		session: { user },
		displayAuthenticationModal,
		showLoginModal,
	} = useBibContext();
	const navigate = useNavigate();

	const [first, setFirst] = useState(true);

	useEffect(() => {
		if (user) {
			return;
		}

		if (!first && !displayAuthenticationModal) {
			navigate(RouteRoot);
			return;
		}

		setFirst(false);
		showLoginModal();
	}, [user, first, displayAuthenticationModal, showLoginModal, navigate]);

	if (!user) {
		return null;
	}

	return children;
};

export default ProtectedRoute;
