// Imports
import { createSlice } from "@reduxjs/toolkit";



// Initial state
const navBarInitialState = {
    width:'20%',
    display:'flex',
}



// User slice
const navBarSlice = createSlice({
    name: 'navBar',
    initialState: navBarInitialState,
    reducers: {
        changeWidth(state, action) {            
            state.width = action.payload.width;
        },
        changeDisplay(state, action) {
            state.display = action.payload.display;
        }
    }
})



// Exports
export const navBarActions = navBarSlice.actions;
export default navBarSlice.reducer;

