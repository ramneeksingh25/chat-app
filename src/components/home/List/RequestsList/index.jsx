import Friend from '../../components/Friend';
const RequestList = ({r}) => {
  return (
    <div>
      {r==[]?<>
        {r.map((request)=>{
          return<div key={request}>
            <Friend request={request}/>
          </div>
        })}
      </>
        :
        <h1 className=' text-center'>
          No Requests
        </h1>
}
    </div>
  )
}

export default RequestList