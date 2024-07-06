import { useContext } from "react"
import { userContext } from "../../Home"

const Chats = () => {
  const {selected}=useContext(userContext)
  return (
    <div className='h-[98vh] p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30'>
      {selected}
    </div>
  )
}

export default Chats