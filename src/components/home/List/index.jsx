import React, { useContext } from "react";
import ProfileInfo from "./Profile";
import FriendList from "./FriendList";
import { userContext } from "../../Home";
import AddFriend from "./AddFriend";

const List = () => {
	const user = useContext(userContext);
	return (
		<div className="h-[100vh]">
			<ProfileInfo name={user.displayName} />
			<AddFriend />
			<FriendList />
		</div>
	);
};

export default List;
