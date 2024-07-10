import React from 'react'
import Friend from '../../components/Friend';

const ChatList =({f}) => {
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
export default ChatList