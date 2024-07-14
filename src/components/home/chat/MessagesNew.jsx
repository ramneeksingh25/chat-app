import React, { useContext, useEffect, useState } from "react";
import { realtimeDB } from "../../../config/firebase";
import { onValue, ref } from "firebase/database";
import Message from "./Message";
import { userContext } from "../../Home";

const MessagesNew = ({ chat }) => {
	const [messages, setMessages] = useState(null);
	const { selected } = useContext(userContext);
	useEffect(() => {
		if (chat) {
			const messagesRef = ref(realtimeDB, `chats/${chat.id}`);
			onValue(messagesRef, (snapshot) => {
				setMessages(Object.values(snapshot.val()));
				const sortedMessages = Object.values(snapshot.val()).sort(
					(a, b) => a.sentAt - b.sentAt
				);
				setMessages(sortedMessages);
			});
		}
	}, [chat, selected]);
	return (
		<>
			<div className="overflow-y-scroll w-full px-4 flex-shrink-0 flex-1 mt-2">
				{messages == null ? (
					<div className="h-full w-full flex items-center justify-center">
						No Messages..Start a new Conversation
					</div>
				) : (
					<>
						{messages?.map((message, key) => {
							return (
								<div key={key}>
									<Message
										obj={message}
										chat={chat.id}
									/>
								</div>
							);
						})}
					</>
				)}
			</div>
		</>
	);
};

export default MessagesNew;
