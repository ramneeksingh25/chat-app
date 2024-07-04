const Avatar = ({ name }) => {
	const nameArray = name.split(" ");
	const initials = nameArray.map((name) => name.charAt(0)).join("");
	return (
		<div className="rounded-full bg-black text-white w-fit p-2">{initials}</div>
	);
};

export default Avatar;
