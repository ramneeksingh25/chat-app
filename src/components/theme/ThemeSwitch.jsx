import { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitch = () => {
    const [theme,setTheme]=useState(true);
    useEffect(()=>{
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    },[theme])
	return (
		<div
			className="cursor-pointer hover:underline absolute bg-black text-white rounded-full p-2 right-1 top-2 z-10"
			onClick={()=>{setTheme(!theme)}}>
			{theme?<FaMoon/>:<FaSun/>}
		</div>
	);
};

export default ThemeSwitch;
