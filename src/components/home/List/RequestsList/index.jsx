import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../Home';
import Friend from '../../components/Friend';

const RequestList = () => {
  const [requests,setRequests]= useState(null);
  const {userRequestsArray}=useContext(userContext);
  useEffect(()=>{
    setRequests(userRequestsArray);
  },[userRequestsArray])
  return (
    <div>
      {requests?<>
        {requests.map((request)=>{
          return<div key={request}>
            <Friend request={request}/>
          </div>
        })}
      </>
        :"No Requests"}
    </div>
  )
}

export default RequestList