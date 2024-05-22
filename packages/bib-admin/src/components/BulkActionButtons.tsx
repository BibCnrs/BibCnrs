import { BulkDeleteWithConfirmButton } from "react-admin";

const BulkActionButtons = () => (
	<>
		<BulkDeleteWithConfirmButton mutationMode="undoable" />
	</>
);

export default BulkActionButtons;
