import { useContext } from "react"
import { userContext } from "../../Home"

const Chats = () => {
  const {selected,user,profileVisible,toggleProfile}=useContext(userContext);
  return (
    <div className='h-[98vh] p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30'>
      <div className="absolute top-1 right-2 hover:underline cursor-pointer" onClick={()=>{
        toggleProfile(!profileVisible);        
      }}>
        Show/Hide Details
      </div>
      <div className="inline-block w-full text-center font-extrabold p-2 pb-5 m-0">
        <h1 className="mb-4 text-3xl bg-gradient-to-l from-blue-700 to-purple-700 text-transparent bg-clip-text underline hover:from-blue-6 cursor-auto 00 hover:to-purple-600">ChatterBox - Chat, Share, Connect</h1>
      <h2 className="font-extralight">
        {selected||"Select User from List to begin Chatting..."}  
      </h2>
      {user?.displayName}
      </div>
    </div>
  )
}

export default Chats