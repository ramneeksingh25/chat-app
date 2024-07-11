import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../config/firebase";
import { userContext } from "../../Home";
import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = () => {
	const [chat, setChat] = useState(null);
	const messagesRef = useRef(null);
	const { selected } = useContext(userContext);
	const User = useSelector((state) => state.user);
	const fetchChat = async () => {
		const chatRef = query(
			collection(db, "Chats"),
			where("users", "array-contains", User.email)
		);
		const data = await getDocs(chatRef);
		if (!data.empty) {
			const chat = data.docs.map((doc) => {
				return { id: doc.id, ...doc.data() };
			});
			const thisChat = chat.filter((c) => {
				return c.users.includes(selected) && c.users.includes(User.email);
			});
			console.log(thisChat[0]);
			setChat(thisChat[0]);
		} else {
			const newChatRef = await addDoc(collection(db, "Chats"), {
				lastSent: new Date().getTime(),
				messages: [],
				user1: User.email,
				user2: selected,
				users: [User.email, selected],
			});
			console.log("Created new chat with id " + newChatRef.id);
		}
	};
	chat &&
		onSnapshot(doc(db, "Chats", chat.id), (change) => {
			setChat({ id: change.id, ...change.data() });
		});
	useEffect(() => {
		fetchChat();
	}, [selected]);
	const scrollToBottom = () => {
        console.log("scrolling to bottom");
		messagesRef.current?.scrollIntoView({ behavior: "smooth" });
	};
    useEffect(()=>{
        scrollToBottom();
        console.log("messages rerendered");
    },[])
	return (
		<>
			{chat ? (
				<div className="overflow-y-scroll w-full">
					{chat.messages.map((message) => {
						return (
							<Message
								key={message}
								MID={message}
							/>
						);
					})}
                <div ref={messagesRef} className="h-1 my-2 w-full"></div>
				</div>
			) : (
				"No Messages.."
			)}
		</>
	);
};

export default Messages;
