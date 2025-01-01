// Imports
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userRedux"
import navBarReducer from "./navBarRedux";
import topNavBarReducer from "./topNavBarRedux";



// Store
const store = configureStore({
    reducer: {
        user: userReducer,
        navBar: navBarReducer,
        topNavBar: topNavBarReducer
    }
});



// Exports
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch