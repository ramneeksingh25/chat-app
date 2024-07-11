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
			className="cursor-pointer hover:underline absolute hover:text-white hover:dark:bg-indigo-400 dark:text-indigo-400 hover:bg-orange-400 text-orange-400 bg-zinc-900 transition-colors duration-500 rounded-full p-2 right-1 bottom-2 z-10"
			onClick={()=>{setTheme(!theme)}}>
			{theme?<FaMoon/>:<FaSun/>}
		</div>
	);
};

export default ThemeSwitch;
