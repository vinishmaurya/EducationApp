import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import AuthService from "../services/auth.services";
import UFContext from "../context/UFContext";


const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken']);
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
        const userToken = Cookie.accessToken;
        //console.log(userToken);
        //console.log(cookies.load('exp') - new Date().getTime());
        //console.log(cookies.get('accessToken'));
        if (!userToken || userToken === 'undefined') {
            //deleteAllCookies();
            setIsLoggedIn(false);
            return navigate('/auth/login');
        }
        setIsLoggedIn(true);

    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (

            <React.Fragment key={123}>
                {
                    isLoggedIn ? props.children : null
                }
            </React.Fragment>

    );
}

export default ProtectedRoute;