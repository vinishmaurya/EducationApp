import axios from "axios";
//import instance from "../services/instance.service";
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";

require('dotenv').config();

//const [cookies] = useCookies(['accessToken', 'refreshToken']);
////const { deleteCookie, deleteAllCookies } = useCookies();
//const navigate = useNavigate();

const instance = axios.create({
    baseURL: process.env.REACT_APP_APIBaseUri,
    headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.REACT_APP_APIKey
    }
});

instance.interceptors.request.use(
    request => {

        //console.log('interceptors.request : ' + request.url);
        if (!request.url.includes('AuthenticateUser')) {
            const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken']);
            console.log(Cookie.accessToken);
            request.headers['Authorization'] = "Bearer " + Cookie.accessToken;
        }

        return request;

    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use((response) => {
    //console.log('interceptors.response : ' + JSON.stringify(response));
    //if (response.config.parse) {
    //    //perform the manipulation here and change the response object
    //    console.log('interceptors.response : ' + response);
    //}
    return response;
}, (error) => {
    //const status = error.response ? error.response.status : null
    //console.log(status);
    //if (status === 401) {

    //    return refreshToken().then(_ => {
    //        error.config.headers['Authorization'] = 'Bearer ' + store.state.auth.token;
    //        error.config.baseURL = undefined;
    //        return Axios.request(error.config);
    //    });
    //}
    return Promise.reject(error.message);
});



//const register = (username, email, password) => {
//    return axios.post(API_URL + "signup", {
//        username,
//        email,
//        password,
//    });
//};

const Login = async (reqBody) => {
    return instance({
        'method': 'POST',
        'url': '/AuthenticateUser',
        'data': reqBody.body
    }).then((response) => {
        return response;
    })
    //    .catch((e) => {
    //    return e;
    //});
};


const GetUserInfoService = async () => {
    return instance({
        'method': 'POST',
        'url': '/AuthenticatedUserInfo'
    }).then((response) => {
        return response;
    })
    //    .catch((e) => {
    //    return e;
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

async function getHeros(name) {
    return axios.get(
        `https://www.superheroapi.com/api.php/1589015884770221/search/${name}`
    );
}


async function GetUserInfoServiceNew(name) {
    return instance({
        'method': 'POST',
        'url': '/AuthenticatedUserInfo'
    }).then((response) => {
        return response;
    })
}



const AuthService = {
    //register,
    Login,
    Logout,
    GetUserInfoService,
    getHeros,
    GetUserInfoServiceNew
    //getCurrentUser,
}

export default AuthService;