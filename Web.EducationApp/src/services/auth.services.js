import axios from "axios";
import instance from "../services/instance.service";
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";

//const register = (username, email, password) => {
//    return axios.post(API_URL + "signup", {
//        username,
//        email,
//        password,
//    });
//};

const Login = (reqBody) => {
    return instance({
        'method': 'POST',
        'url': '/AuthenticateUser',
        'data': reqBody.body
    }).then((response) => {
        return response;
    }).catch((e) => {
        return e;
    });
};


const GetUserInfoService = () => {
    return instance({
        'method': 'POST',
        'url': '/AuthenticatedUserInfo'
    }).then((response) => {
        debugger;
        return response;
    })
    //.catch((e) => {
    //    //return e;
    //});
};

const Logout = () => {
    
    //return axios.post(API_URL + "signout").then((response) => {
    //    return response.data;
    //});
};

//const getCurrentUser = () => {
//    return JSON.parse(localStorage.getItem("user"));
//};

const AuthService = {
    //register,
    Login,
    Logout,
    GetUserInfoService 
    //getCurrentUser,
}

export default AuthService;