import Friend from "../../components/Friend";
const RequestList = ({ r }) => {
  console.log(r);
	return (
		<div>
			{r == [] ? (
				<h1 className=" text-center">No Requests</h1>
			): (
				<>
					{r?.map((request) => {
						return (
								<Friend request={request} />
						);
					})}
				</>
			)}
		</div>
	);
};

export default RequestList;
