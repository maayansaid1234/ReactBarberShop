import { createSlice } from "@reduxjs/toolkit"

    const initialState = {
    currentUser:null
    }


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      saveUser:(state,action) =>{
     state.currentUser=action.payload
    
        }
        ,resetUser:(state)=>{
            state.currentUser=null  
        }
    }
})

export const { saveUser,resetUser} = userSlice.actions;
export default userSlice.reducer;