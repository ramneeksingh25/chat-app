import React, { useContext, useEffect, useRef, useState } from "react";
import { realtimeDB } from "../../../config/firebase";
import { onValue, ref } from "firebase/database";
import Message from "./Message";
import { userContext } from "../../Home";

const Messages = ({ chat }) => {
	const [messages, setMessages] = useState(null);
	const { selected } = useContext(userContext);
	const divRef = useRef();

	const scrollToElement = () => {
		const { current } = divRef;
		if (current !== null) {
			current.scrollIntoView({ behavior: "smooth"});
		}
	};
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
		scrollToElement();
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
							scrollToElement()
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
				<div ref={divRef} className="pt-2"></div>
			</div>
		</>
	);
};

export default Messages;
