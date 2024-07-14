import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Home";
import Chatroom from "./Chatroom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useSelector } from "react-redux";
const Chats = () => {
	const { selected } = useContext(userContext);
	const User = useSelector((state) => state.user);
	const [chat, setChat] = useState(null);
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
			setChat(thisChat[0]);
			if (thisChat.length == 0) {
				console.log("No active chat found, creating new one");
                const newChatRef = await addDoc(collection(db, "Chats"), {
                    lastSent: new Date().getTime(),
                    messages: [],
                    user1: User.email,
                    user2: selected,
                    users: [User.email, selected],
                });
                setChat(newChatRef);
                console.log("Created new chat with id " + newChatRef.id);
			}
		} else {
			console.log('Couldn\'t find');
			const newChatRef = await addDoc(collection(db, "Chats"), {
				lastSent: new Date().getTime(),
				messages: [],
				user1: User.email,
				user2: selected,
				users: [User.email, selected],
			});
			setChat(newChatRef);
			console.log("Created new chat with id " + newChatRef.id);
		}
	};
	useEffect(() => {
		if (selected) {
			fetchChat();
		} else {
			setChat(null);
		}
	}, [selected]);
	return (
		<div className="h-[98vh] p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30">
			<div className="inline-block w-full text-center font-extrabold p-2 pb-5 m-0">
				<h1 className="mb-4 text-3xl bg-gradient-to-l from-blue-700 to-purple-700 text-transparent bg-clip-text underline hover:from-blue-6 cursor-auto 00 hover:to-purple-600">
					ChatSpot - Chat, Share, Connect
				</h1>
				<h2 className="font-extralight">
					{selected ? (
						<Chatroom room={chat} />
					) : (
						"Select User from List to begin Chatting..."
					)}
				</h2>
			</div>
		</div>
	);
};

export default Chats;
