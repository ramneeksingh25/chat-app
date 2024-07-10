import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "email@example.com",
    displayName: "NAME",
    photoURL:"",
    friends:[],
    requests: [],
    sentReq: [],
}

const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //add user functions
    },  
})

export default counterSlice.reducer