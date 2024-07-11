import { useContext } from "react"
import { userContext } from "../../Home"
import Chatroom from "./Chatroom";
import { BsFillPersonLinesFill } from "react-icons/bs";
const Chats = () => {
  const {selected,profileVisible,toggleProfile}=useContext(userContext);
  return (
    <div className='h-[98vh] p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30'>
      {selected&&
        <div className={`absolute top-1 right-2 cursor-pointer ${profileVisible&&"bg-zinc-700 rounded-full p-2 text-xl"}`} onClick={()=>{
        toggleProfile(!profileVisible);        
      }}>
        <BsFillPersonLinesFill/>
      </div>}
      <div className="inline-block w-full text-center font-extrabold p-2 pb-5 m-0">
        <h1 className="mb-4 text-3xl bg-gradient-to-l from-blue-700 to-purple-700 text-transparent bg-clip-text underline hover:from-blue-6 cursor-auto 00 hover:to-purple-600">ChatterBox - Chat, Share, Connect</h1>
      <h2 className="font-extralight">
        {selected?<Chatroom/>:"Select User from List to begin Chatting..."}  
      </h2>
      </div>
    </div>
  )
}

export default Chats