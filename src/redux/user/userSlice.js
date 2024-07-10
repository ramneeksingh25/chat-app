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
        setU: (state, action) => {
            return {
               ...state,
               ...action.payload,
            }
        },
    },  
})

export const {setU} = counterSlice.actions;

export default counterSlice.reducer