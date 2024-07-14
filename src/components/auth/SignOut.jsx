import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const SignOut = () => {
	const navigate = useNavigate();
	const [isSignedIn, setSignedIn] = useState(true);
	useEffect(() => {
		if (!isSignedIn) {
			navigate("/signin");
		}
	}, [isSignedIn, navigate]);
    
	return <button onClick={() => {auth.signOut();
        setSignedIn(false);
      }}
	  className={`text-white w-28 flex items-center justify-center gap-x-3 py-1 sm:py-2 md:py-2 lg:py-2.5 rounded-lg text-[100%]
		 font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:text-zinc-200 hover:shadow-xl transition-all duration-300 ml-3`}
	  >Sign Out</button>;
};

export default SignOut;
