import Friend from "../../components/Friend";
const RequestList = ({ r }) => {
  console.log(r);
	return (
		<div>
			{r == [] ? (
				<h1 className=" text-center">No Requests</h1>
			): (
				<>
					{r?.map((request,key) => {
						return (
							<div key={key}>
								<Friend request={request} />
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

export default RequestList;
