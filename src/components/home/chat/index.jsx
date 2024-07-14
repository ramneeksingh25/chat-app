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
			console.log("Couldn't find");
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
		<div className="h-[98vh] p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30 flex flex-col">
			<div className="inline-block w-full text-center font-extrabold m-0 flex-none">
				<h1 className={`hidden sm:block md:block lg:block bg-gradient-to-l from-blue-700 to-purple-700 text-transparent bg-clip-text underline hover:from-blue-6 cursor-auto hover:to-purple-600 dark:from-blue-600 dark:to-purple-600 dark:hover:to-purple-700 transition-all duration-300 ${selected?"text-2xl":"text-5xl"}`}>
					ChatSpot - Chat, Share, Connect
				</h1>
			</div>
			<div className="font-light  h-full">
				{selected ? (
					<Chatroom room={chat} />
				) : (
					<div className="flex items-center justify-center h-full text-2xl">
						Select User from List to begin Chatting...
					</div>
				)}
			</div>
		</div>
	);
};

export default Chats;
