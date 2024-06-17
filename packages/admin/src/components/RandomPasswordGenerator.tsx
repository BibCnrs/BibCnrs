import { TextInput, type TextInputProps } from "react-admin";

const RandomPasswordGenerator = (props: TextInputProps) => {
	const password = Math.random().toString(36).slice(-6).toUpperCase();

	return <TextInput defaultValue={password} {...props} />;
};

export default RandomPasswordGenerator;
