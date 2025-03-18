import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import type React from "react";
import { useState } from "react";

interface PasswordFieldProps {
	name: string;
	label: string;
	size: "small" | "medium";
	helperText?: string;
	error?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
	name,
	label,
	size,
	helperText,
	error,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	return (
		<TextField
			name={name}
			type={showPassword ? "text" : "password"}
			label={label}
			size={size}
			helperText={helperText}
			error={error}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							color="primary"
						>
							{showPassword ? (
								<VisibilityOff fontSize="small" />
							) : (
								<Visibility fontSize="small" />
							)}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default PasswordField;
