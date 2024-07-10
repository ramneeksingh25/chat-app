import React, { useContext, useEffect, useId, useState } from "react";
import { BiImage, BiSend } from "react-icons/bi";
import { useSelector } from "react-redux";
import { userContext } from "../../Home";
import { addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
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
        console.log("Message added with ID: ", newMessageRef.id);

        await updateDoc(doc(db,"Chats",chat.id),{
            messages: [...chat.messages,newMessageRef.id]
        })
        console.log("Updated chat with ID: ", chat.id);
        setNewMessage("");
	};
    const sendImage = () => {
        // TODO: Send image to Firebase
        console.log("Sending Image to ",selected);
    }
    const fetchChat = async () => {
        const chatRef = query(collection(db,"Chats"),where("users","array-contains",User.email));
        const data = await getDocs(chatRef);
        if(!data.empty){
            const chat = data.docs.map((doc)=>{return {id:doc.id,...doc.data()}});
            const thisChat = chat.filter((c)=>{
                return c.users.includes(selected) && c.users.includes(User.email);
            })
            console.log(thisChat[0]);
            setChat(thisChat[0]);
        }else{
            const newChatRef = await addDoc(collection(db, "Chats"), {
                lastSent: new Date().getTime(),
                messages:[],
                user1:User.email,
                user2:selected,
                users: [User.email, selected],
              });
              console.log("Created new chat with id "+ newChatRef.id);
        }
    }
    useEffect(()=>{
        fetchChat();
    },[selected])
    chat&&onSnapshot(doc(db,"Chats",chat.id),(change)=>{
        setChat({id:change.id,...change.data()});
    })
	return (
		<div className="bg-white/5 p-2 h-[85vh] w-full rounded-xl flex flex-col items-end justify-end">
            <div className="">
                {selected}
            </div>
            {chat?<>
                {chat.messages.map((message)=>{
                    return <div>{message}</div>
                })}
            </>:"No Messages.."}
			<div className="bg-zinc-800 w-full h-[5vh] rounded-full flex items-center justify-between p-2">
				<input
					type="text"
                    value={newMessage}
					className="w-full rounded-xl bg-transparent outline-none px-2"
					onChange={(e) => {
						setNewMessage(e.target.value);
					}}
                    onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                            sendMessage();
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
		</div>
	);
};

export default Chatroom;
