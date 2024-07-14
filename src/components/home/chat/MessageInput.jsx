import React, { useContext, useState } from "react";
import { IoSend } from "react-icons/io5";
import { db, realtimeDB } from "../../../config/firebase";
import { ref, update } from "firebase/database";
import { v4 } from "uuid";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { userContext } from "../../Home";
import { IoMdImage } from "react-icons/io";
const MessageInput = ({ chatID }) => {
	const [inputValue, setInputValue] = useState("");
	const [message, setMessage] = useState("");
	const User = useSelector((state) => state.user);
	const { selected } = useContext(userContext);
	const sendMessage = async () => {
		setInputValue("");
        if (message != ""){
            const messageID = v4();
            const time = new Date();
            const seconds = time.getTime();
            const newMessage = {
                id: messageID,
                sender: User.email,
                receiver: selected,
                text: message,
                sentAt: seconds,
                image: "",
                photoURL: User.photoURL,
                senderName: User.displayName,
            };
            update(ref(realtimeDB, "chats/" + chatID + "/" + messageID), newMessage);
            await updateDoc(doc(db, "Chats", chatID), {
                messages: arrayUnion(messageID),
                lastSent: seconds,
            });
        }
	};
    const sendImage = () => {
        // TODO: Send image to Firebase

    }
	return (
		<div className="bg-zinc-200/40 dark:bg-zinc-800/40 w-full rounded-t-2xl flex items-center justify-between px-2 py-1 focus-within:bg-zinc-100 focus-within:dark:bg-zinc-800 transition-colors duration-300">
			<input
				type="text"
				autoComplete="false"
				id="messageInput"
				placeholder="Enter Message Here..."
				value={inputValue}
				className="w-full bg-transparent outline-none px-2 placeholder-zinc-900/50 dark:placeholder-zinc-200/50"
				onChange={(e) => {
					setMessage(e.target.value);
					setInputValue(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						sendMessage();
						setInputValue("");
					}
				}}
			/>
			<div className="flex items-center text-4xl">
				<IoSend
					className="cursor-pointer hover:bg-zinc-200/70 p-2 hover:rounded-full hover:dark:bg-zinc-900/70"
					onClick={sendMessage} />
                <IoMdImage
					className="cursor-pointer hover:bg-zinc-200/70 p-2 hover:rounded-full hover:dark:bg-zinc-900/70"
					onClick={sendImage}/>
			</div>
		</div>
	);
};

export default MessageInput;
