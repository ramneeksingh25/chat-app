import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import Loading from "./Loading";
import List from "./home/List";
import Chats from "./home/chat";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Details from "./home/details";
import { useDispatch } from "react-redux";
import { setU } from "../redux/user/userSlice";
export const userContext = createContext({
  uid:"1234",
  displayName:"John Doe",
  email:"johndoe@example.com",
  photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s",
  friends:["12345","12"],
  requests:["http@example.com"],
  sentReq:["abc@abc.com"]
});
const Home = () => {
	const dispatch = useDispatch();
	const [email,setEmail]=useState(null);
	const [id,setId]=useState(null);
	const [loading, setLoading] = useState(true);
	const [rerender,setRerender]=useState(false);
	const navigate = useNavigate();
	const [selected,setSelected] = useState(null);
	const fetchUserFromDB = async () => {
		const q = query(collection(db,"Users"),where("email","==",auth.currentUser.email));
		const querySnapshot = await getDocs(q);
		const data=querySnapshot.docs.map(doc=>doc.data());
		dispatch(setU(data[0]));
	}
	auth.onAuthStateChanged((user)=>{
		if (!user) {
			navigate("/")			
		}
	})
	useEffect(()=>{
		console.log("Home rendered");
		setTimeout(() => {
			setEmail(auth?.currentUser?.email);
			setId(auth?.currentUser?.uid);
			fetchUserFromDB()
			
		},1000);
	},[rerender])
	useEffect(()=>{
		if (email) {
			setLoading(false);
		}
	},[email])
	useEffect(()=>{
		if (selected==null) {
			setProfileVisible(false);
		}
	},[selected])
	onSnapshot(query(collection(db,"Users"),where("email","==",email)),(snapshot)=>{
		snapshot.docChanges().forEach((change)=>{
			if (change.type === "modified") {
				console.log(
					change.doc
				);
                setRerender(!rerender);
            }
		})
	})
	const setUserChat = (s)=>{
		console.log("selecting ",s);
		setSelected(s);
	}
	const [profileVisible, setProfileVisible] = useState(true);
	const toggleProfile = (s)=>{
		setProfileVisible(s);
	}
	const provider = {
		id,email,selected,setUserChat,setRerender,profileVisible,toggleProfile
	}
	return loading ? (
    <div className="flex items-center justify-center h-screen text-[10vh]">
      <Loading />
    </div>
	) : (
		<>
			<userContext.Provider value={provider}>
				<div className=" h-screen w-[100%] grid grid-cols-4 gap-3 p-3 text-sm sm:text-sm md:text-md lg:text-lg text-indigo-900 dark:text-indigo-200 select-none">
					<List />
					<div className={`col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 relative transition-all duration-500 ${profileVisible?" ":"lg:col-span-3"}`}>
						<Chats/>
					</div>
					<Details visible={profileVisible}/>
				</div>
			</userContext.Provider>
		</>
	);
};

export default Home;
