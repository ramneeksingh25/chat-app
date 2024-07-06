const Avatar = ({ name }) => {
	const nameArray = name?.split(" ")||[""]
	const initials = nameArray.map((name) => name.charAt(0)).join("");
	return (
		<div className="h-10 w-10 text-sm flex items-center justify-center rounded-full select-none bg-gradient-to-bl from-indigo-200 to-cyan-200 text-black dark:from-indigo-800 dark:to-cyan-800 border dark:border-cyan-100 border-indigo-800 dark:text-cyan-100 p-1 m-0">{initials}</div>
	);
};

export default Avatar;
