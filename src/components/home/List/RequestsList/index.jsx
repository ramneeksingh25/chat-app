import React, { useContext } from 'react'
import { userContext } from '../../../Home'

const RequestList = () => {
  const {user}=useContext(userContext);
  
  return (
    <div>
      {JSON.stringify(user)}
      {console.log(user)}
    </div>
  )
}

export default RequestList