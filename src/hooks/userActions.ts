// Imports
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from "../components/models/UserModel";
import { userActions } from "../store/userRedux";
import { useAppDispatch } from "./hooks";



// Base url
const BASE_URL = process.env.REACT_APP_API_URL;



// User actions
function useUserActions() {
    // Constants
    const navigate = useNavigate();
    const baseUrl = BASE_URL;
    const dispatch = useAppDispatch()


    // Return
    return {
        login,
        register,
        logout,
    };    


    // Login
    function login(data:{email:string, password:string}) {        
        return (
            axios
                .post(`${baseUrl}/auth/login/`, data)
                .then((res) => {
                    setUserData(res.data);
                    dispatch(userActions.login(res.data.user));
                    navigate("/home");
                })
                .catch(error => {
                    console.log("Error login in: ", error)
                })
        )
    }


    // Logout
    function logout() {
        localStorage.removeItem("auth");
        dispatch(userActions.logout());
        navigate("/");
    }


    // Register the user
    function register(data:
        {email:string, password:string, first_name:string, last_name:string}) {
            return (
                axios
                    .post(`${BASE_URL}/auth/register/`, data)
                    .then((res) => {                    
                        // Registering the account and tokens in the store
                        setUserData(res.data);
                        dispatch(userActions.login(res.data.user));
                        navigate("/home");
                    })
            )
        }
};



// Get the user
function getUser() {        
    const auth = JSON.parse(localStorage.getItem("auth") || '"');
    return auth.user;
};



// Get access token
function getAccessToken() {    
    const auth = JSON.parse(localStorage.getItem("auth") || '"');
    return auth.access;
};



// Get refresh token
function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem("auth") || '"');
    return auth.refresh;
};



// Set user data
function setUserData(data:{access:string, refresh:string,user:User}) {
    localStorage.setItem(
        "auth",
        JSON.stringify({
            access: data.access,
            refresh: data.refresh,
            user: data.user,
        })
    )
};



// Exports
export {
    useUserActions,
    getUser,
    getAccessToken,
    getRefreshToken,
    setUserData
}




