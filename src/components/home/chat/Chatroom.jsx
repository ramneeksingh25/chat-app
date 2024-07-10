import React, { useContext, useEffect, useId, useState } from "react";
import { BiImage, BiSend } from "react-icons/bi";
import { useSelector } from "react-redux";
import { userContext } from "../../Home";
import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

const Chatroom = () => {
    const User = useSelector((state)=>state.user)
	const [newMessage, setNewMessage] = useState("");
    const [chat,setChat]=useState(null);
    const {selected}=useContext(userContext);
	const sendMessage = async () => {
        console.log("Sending Message: ",newMessage," from ",User.email," to ",selected);
        const newMessageRef= await addDoc(collection(db,"Messages"),{
            sender:User.email,
            receiver:selected,
            text:newMessage,
            sentAt: new Date(),
            image:"",
            photoURL:User.photoURL
        })
        console.log("Document written with ID: ", newMessageRef.id);
        setNewMessage("");
        const chatRef = await updateDoc(collection(db,"Chats",chat),{
            messages: [...chat.messages,newMessageRef.id]
        })
        console.log("Updated chat with ID: ", chatRef.id);
	};
    const sendImage = () => {
        // TODO: Send image to Firebase
        console.log("Sending Image to ",selected);
    }
    const fetchChat = async () => {
        const chatRef = query(collection(db,"Chats"),where("users","array-contains",User.email));
        const data = await getDocs(chatRef);
        if(!data.empty){
            const chat = data.docs.map((doc)=>doc.data());
            const thisChat = chat.filter((c)=>{
                return c.users.includes(selected) && c.users.includes(User.email);
            })
            console.log(thisChat);
            setChat(thisChat);
        }else{
            console.log("No chat found");
        }
    }
    useEffect(()=>{
        fetchChat();
    },[selected])
	return (
		<div className="bg-white/5 p-2 h-[85vh] w-full rounded-xl flex flex-col items-end justify-end">
            {/* Render messages */}
            <div className="">
                {selected}
            </div>
                {JSON.stringify(chat&&chat[0].messages)}
                {/* {console.log(chat?.messages)} */}
			<div className="bg-zinc-800 w-full h-[5vh] rounded-full flex items-center justify-between p-2">
				<input
					type="text"
                    value={newMessage}
					className="w-full rounded-xl bg-transparent"
					onChange={(e) => {
						setNewMessage(e.target.value);
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
		</div>
	);
};

export default Chatroom;
