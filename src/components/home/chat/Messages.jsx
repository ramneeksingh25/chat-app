import { db } from "../../../config/firebase";

const Messages = ({ id }) => {
	return <div>{JSON.stringify(id)}</div>;
};

export default Messages;
