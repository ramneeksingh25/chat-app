import { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitch = () => {
    const [theme,setTheme]=useState(true);
    useEffect(()=>{
        if (theme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    },[theme])
	return (
		<div
			className="cursor-pointer hover:underline absolute dark:text-indigo-400 text-orange-400 bg-zinc-900 transition-transform duration-1000 rounded-full p-2 right-1 top-2 z-10"
			onClick={()=>{setTheme(!theme)}}>
			{theme?<FaMoon/>:<FaSun/>}
		</div>
	);
};

export default ThemeSwitch;
