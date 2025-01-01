// Imports
import { createSlice } from "@reduxjs/toolkit";



// Initial state
const userInitialState = {
    id:'',
    email:'anonymous@email.com',
    first_name:'Anonymous',
    last_name:'',
    photo: '',    
    user_type:'1',
    is_active:'',
    created:'',
    updated:'',
}



// User slice
const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        login(state, action) {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.photo = action.payload.photo;            
            state.user_type = action.payload.user_type;
            state.is_active = action.payload.is_active;
            state.created = action.payload.created;
            state.updated = action.payload.updated;
        },
        logout(state) {
            state.id = '';
            state.email = '';
            state.first_name = '';
            state.last_name = '';
            state.photo = '';            
            state.user_type = '';
            state.is_active = '';
            state.created = '';
            state.updated = '';
        },
    }
})



// Exports
export const userActions = userSlice.actions;
export default userSlice.reducer;

