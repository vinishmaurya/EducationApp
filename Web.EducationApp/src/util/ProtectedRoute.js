import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import AuthService from "../services/auth.services";
import UFContext from "../context/UFContext";
import { useLocation } from 'react-router-dom';


const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken','haveSideBar']);
    //const { deleteCookie, deleteAllCookies } = useCookies();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [UserInfo, setUserInfo] = useState(async () => {
    //    try {
    //        debugger
    //        //return 'asd';
    //        await AuthService.GetUserInfo().then(
    //            (response) => {
    //                const data = response.data;
    //                console.log(response);

    //                if (data) {
    //                    if (data.Result) {
    //                        return data;
    //                        //const resData = data.Data;
    //                        //bool = true;
    //                    }
    //                }
    //                //if (!bool) {
    //                //    //navigate('/auth/login');
    //                //}
    //            },
    //            (error) => {
    //                console.log(error);
    //                //navigate('/auth/login');
    //            }
    //        );



    //    } catch (e) {
    //        console.log(e);
    //        //navigate('/auth/login');
    //    }
    //});

    const checkUserToken = () => {
        //debugger
        const userToken = Cookie.accessToken;
        //console.log(userToken);
        //console.log(cookies.load('exp') - new Date().getTime());
        //console.log(cookies.get('accessToken'));
        if (!userToken || userToken === 'undefined') {
            //deleteAllCookies();
            setIsLoggedIn(false);
            return navigate('/auth/login');
        }
        else {
            //Check Token Validation from api...
            const instance = axios.create({
                baseURL: 'http://localhost:2000/api',//process.env.BackendEducationApp_DevBaseUri,
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': 'test-key'//process.env.BackendEducationApp_Key
                }
            });

            instance.interceptors.request.use(
                request => {
                    if (!request.url.includes('AuthenticateUser')) {
                        //console.log(Cookie.accessToken);
                        request.headers['Authorization'] = "Bearer " + Cookie.accessToken;
                    }
                    return request;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            instance.interceptors.response.use((response) => {
                return response;
            }, (error) => {
                return Promise.reject(error.message);
            });

            instance({
                'method': 'POST',
                'url': '/AuthenticatedUserTokenValidation'
            }).then((response) => {
                //console.log(response.data.Result);
                if (!response.data.Result) {
                    setIsLoggedIn(false);
                    return navigate('/auth/login');
                }
                else {
                    //console.log(response);
                }
                
            }).catch((e) => {
                setIsLoggedIn(false);
                return navigate('/auth/login');
            });
        }
       
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (

        <React.Fragment key={1}>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>

    );
}

export default ProtectedRoute;