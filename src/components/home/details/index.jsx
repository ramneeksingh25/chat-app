import { useContext, useEffect } from "react"
import { userContext } from "../../Home"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

const Details = ({visible}) => {
  const {selected}=useContext(userContext);
  const fetchUserDetails = async ()=>{
    const q = query(collection(db,"Users"),where("email","==",selected))
    const querySnapshot = await getDocs(q);
    const data=querySnapshot.docs.map(doc=>doc.data());
    console.log(data[0]);
  }
  useEffect(()=>{
    if (selected) {
      fetchUserDetails();      
    }
  },[])
  return (
    <div className={`h-[98vh] p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30 transition-all duration-700 ${visible?"w-full":"w-0 opacity-0"}`}>


    </div>
  )
}

export default Details