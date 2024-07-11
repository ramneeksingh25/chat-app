import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useContext, useState } from "react";
import { userContext } from "../../Home";
import { useSelector } from "react-redux";
import { BiImage, BiSend } from "react-icons/bi";
const Input = ({chat}) => {
    const User = useSelector((state) => state.user);
    const [newMessage, setNewMessage] = useState("");
    const [inputValue, setInputValue] = useState("");
    const {selected}=useContext(userContext);
	const sendMessage = async () => {
		const newMessageRef = await addDoc(collection(db, "Messages"), {
			sender: User.email,
			receiver: selected,
			text: newMessage,
			sentAt: new Date(),
			image: "",
			photoURL: User.photoURL,
		});
		console.log(
			"Sending Message: ",
			newMessage,
			" from ",
			User.email,
			" to ",
			selected
		);
		console.log("Message added with ID: ", newMessageRef.id);
		await updateDoc(doc(db, "Chats", chat.id), {
			messages: arrayUnion(newMessageRef.id),
		});
		setNewMessage("");
	};
	const sendImage = () => {
		// TODO: Send image to Firebase
		console.log("Sending Image to ", selected);
        
	};
	return (
		<div className="bg-zinc-200/40 dark:bg-zinc-800/40 w-full h-[5vh] rounded-full flex items-center justify-between p-2">
			<input
				type="text"
                autoComplete="false"
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
		</div>
	);
};

export default Input;
