import { useEffect, useState } from "react";
import Friend from "../../components/Friend";
import { useSelector } from "react-redux";
const FriendList = ({f}) => {
	return (
		<div className=" mt-5 max-h-[80%] overflow-y-scroll rounded-lg overflow-x-hidden">
			{f?f.map((friend, index) => {
						return (
							<Friend
								key={index}
								email={friend}
							/>
						);
				  })
				: "No Friends... Add Some"}
		</div>
	);
};
export default FriendList;
