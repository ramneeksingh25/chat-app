const Avatar = ({ name }) => {
	const nameArray = name.split(" ");
	const initials = nameArray.map((name) => name.charAt(0)).join("");
	return (
		<div className="h-10 w-10 text-sm flex items-center justify-center rounded-full select-none bg-white text-black dark:bg-black dark:text-white p-1 m-0">{initials}</div>
	);
};

export default Avatar;
