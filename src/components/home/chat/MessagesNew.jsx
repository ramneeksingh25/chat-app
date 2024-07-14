import React, { useEffect, useState } from "react";
import { realtimeDB } from "../../../config/firebase";
import { onValue, ref } from "firebase/database";
import Message from "./Message";

const MessagesNew = ({ chat }) => {
    const [messages,setMessages]=useState(null);
    useEffect(() => {
        if (chat) {
            const messagesRef = ref(realtimeDB,`chats/${chat.id}`);
            onValue(messagesRef,(snapshot)=>{
                // console.log(snapshot.val());
                setMessages(Object.values(snapshot.val()))
                const sortedMessages = Object.values(snapshot.val()).sort((a,b)=>a.sentAt-b.sentAt);
                // console.log(sortedMessages)
                setMessages(sortedMessages)
            })
        }
    }, [chat]);
	return (
    <div>
        {messages?.map((message,key)=>{
            return <div key={key}><Message obj={message} chat={chat.id}/></div>
        })}
    </div>
    );
};

export default MessagesNew;
