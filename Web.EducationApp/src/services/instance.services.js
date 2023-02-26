//import { instance } from "instance";
import axios from 'axios'
import { useCookies } from 'react-cookie';
import authenticateUser from "../models/authenticateUser.model";
import reqBody from "../models/reqBody.Model";
import { useNavigate } from "react-router-dom";

require('dotenv').config();

const instance = axios.create({
    baseURL: 'http://localhost:2000/api',//process.env.BackendEducationApp_DevBaseUri,
    headers: {
        'content-type': 'application/json',
        'x-api-key': 'test-key'//process.env.BackendEducationApp_Key
    }
});

instance.interceptors.request.use(
    request => {
        
        //console.log('interceptors.request : ' + request.url);
        if (!request.url.includes('AuthenticateUser'))
        {
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


//function refreshToken() {
//    //Create request body
//    authenticateUser.UserName = "";
//    authenticateUser.Password = "";
//    authenticateUser.GrantType = "RefreshToken";
//    authenticateUser.RefreshToken = cookies.refreshToken;

//    reqBody.body = authenticateUser;
//    //console.log(authenticateUser)
//    instance({
//        'method': 'POST',
//        'url': '/AuthenticateUser',
//        'data': reqBody.body
//    }).then((response) => {
//        const data = response.data;
//        console.log(data);
//        if (data.Result) {
//            const resData = data.Data;
//            if (!resData.accessToken) {
//                //alert('Unable to login. Please try after some time.');
//                return navigate('/auth/login');
//            }
//            //localStorage.clear();
//            //localStorage.setItem('accessToken', resData.accessToken);
//            //localStorage.setItem('refreshToken', resData.refreshTokenInfo.refreshToken);
//            deleteAllCookies();
//            //deleteCookie('accessToken');
//            //deleteCookie('refreshToken');

//            let token_expires = new Date(resData.expiryDatetime);
//            setCookie('accessToken', resData.accessToken, { path: '/', token_expires });

//            let refreshToken_expires = new Date(resData.refreshTokenInfo.expiryDatetime);
//            setCookie('refreshToken', resData.refreshTokenInfo.refreshToken, { path: '/', refreshToken_expires });

//            //const expireDate = new Date(2147483647 * 1000).toUTCString();


//            setTimeout(() => {
//                navigate('/');
//            }, 500);
//        }
//        else {
//            return navigate('/auth/login');
//            //alert(data.Message);
//        }
//    }).catch((error) => {
//        //btnPointer.innerHTML = 'Login';
//        //btnPointer.removeAttribute('disabled');
//        //alert("Oops! Some error occured.");
//        return navigate('/auth/login');
//    });
//    return refreshingCall;
//}

export default instance;