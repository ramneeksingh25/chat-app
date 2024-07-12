import React, {
	useContext,
	useEffect,
	useState,
} from "react";
import { useSelector } from "react-redux";
import { userContext } from "../../Home";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import Messages from "./Messages";
import Input from "./Input";
const Chatroom = () => {
	const User = useSelector((state) => state.user);
	const [chat, setChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const { selected } = useContext(userContext);
	const fetchChat = async () => {
		const chatRef = query(collection(db,"Chats").where())
		// const chatRef = query(
		// 	collection(db, "Chats"),
		// 	where("users", "array-contains", User.email)
		// );
		// const data = await getDocs(chatRef);
		// if (!data.empty) {
		// 	const chat = data.docs.map((doc) => {
		// 		return { id: doc.id, ...doc.data() };
		// 	});
		// 	const thisChat = chat.filter((c) => {
		// 		return c.users.includes(selected) && c.users.includes(User.email);
		// 	});
		// 	console.log(thisChat[0]);
		// 	setChat(thisChat[0]);
		// } else {
		// 	const newChatRef = await addDoc(collection(db, "Chats"), {
		// 		lastSent: new Date().getTime(),
		// 		messages: [],
		// 		user1: User.email,
		// 		user2: selected,
		// 		users: [User.email, selected],
		// 	});
		// 	setChat(newChatRef);
		// 	console.log("Created new chat with id " + newChatRef.id);
		// }
	};
	useEffect(() => {
		fetchChat();
	}, [selected]);
	chat &&
		onSnapshot(doc(db, "Chats", chat.id), (change) => {
			setChat({ id: change.id, ...change.data() });
		});
	return (
		<>
			<div className="">{selected}</div>
			<div className="bg-white/5 p-2 h-[85vh] w-full rounded-xl flex flex-col items-end justify-end">
				<Messages />
                <Input chat={chat}/>
				{/* <div className="bg-zinc-800 w-full h-[5vh] rounded-full flex items-center justify-between p-2">
					<input
						type="text"
						id="messageInput"
						placeholder="Enter Message here..."
						value={inputValue}
						className="w-full rounded-xl bg-transparent outline-none px-2"
						onChange={(e) => {
							setNewMessage(e.target.value);
							setInputValue(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								sendMessage();
								setInputValue("");
							}
						}}
					/>
					<div className="flex items-center gap-2">
						<BiSend
							className="cursor-pointer"
							onClick={sendMessage}
						/>
						<BiImage
							className="cursor-pointer"
							onClick={sendImage}
						/>
					</div>
				</div> */}
			</div>
		</>
	);
};

export default Chatroom;
