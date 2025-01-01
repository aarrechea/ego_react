// Imports
import { createSlice } from "@reduxjs/toolkit";



// Initial state
const topNavBarInitialState = {
    menu:'home',
}



// Slice
const topNavBarSlice = createSlice({
    name: 'topNavBar',
    initialState: topNavBarInitialState,
    reducers: {
        change(state, action) {
            state.menu = action.payload.menu;
        }
    }
});



// Exports
export const topNavBarActions = topNavBarSlice.actions;
export default topNavBarSlice.reducer;

