import axios from "axios";
import { useCookies } from 'react-cookie';
import { useState, useEffect, useCallback } from 'react';
import ReactDOM from "react-dom";
import React from "react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from './auth/login/Login';
import Register from './auth/login/Register';
import ForgetPassword from './auth/login/ForgetPassword';
import Auth from './auth/Auth';
import AdminLayout from "./components/AdminLayout";
import Todo from "./pages/Todo";
import Blank from "./pages/blank";
import VinishTest from "./pages/VinishTest";
import data from "./data/data";
import CustomRoute from "./custom-route/custom-route";
import BootstrapComponent from "./pages/BootstrapComponent";
import SharedComponent from "./pages/SharedComponent";
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import ProtectedRoute from './util/ProtectedRoute';
import Error404 from "./error/Error404";
import UFContext from "./context/UFContext";
import AuthService from "./services/auth.services";
import { useNavigate } from "react-router-dom";

//let haveData = false;
//function GetUserInfo(required) {
//    debugger;
//    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken']);
//    const navigate = useNavigate();
//    //useEffect(() => {

//    //alert(true);
//    const instance = axios.create({
//        baseURL: 'http://localhost:2000/api',//process.env.BackendEducationApp_DevBaseUri,
//        headers: {
//            'content-type': 'application/json',
//            'x-api-key': 'test-key'//process.env.BackendEducationApp_Key
//        }
//    });

//    instance.interceptors.request.use(
//        request => {
//            if (!request.url.includes('AuthenticateUser')) {
//                console.log(Cookie.accessToken);
//                request.headers['Authorization'] = "Bearer " + Cookie.accessToken;
//            }
//            return request;
//        },
//        error => {
//            return Promise.reject(error);
//        }
//    );

//    instance.interceptors.response.use((response) => {
//        return response;
//    }, (error) => {
//        return Promise.reject(error.message);
//    });

//    return instance({
//        'method': 'POST',
//        'url': '/AuthenticatedUserInfo'
//    }).then((response) => {
//        debugger;
//        haveData = true;
//        return response;
//    })
//        .catch((e) => {
//            console.log(e);
//            //return e;
//        });
//    //}, [required]);

//}


ReactDOM.render(
    <React.StrictMode>
        <UFContext.Provider value={ true}>
            <BrowserRouter basename={'/'}>
                <Routes>
                    <Route path='/auth' element={<Auth />}>
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path='forget-password' element={<ForgetPassword />} />
                    </Route>
                    {
                        <Route path='/' element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <App />
                                </AdminLayout>
                            </ProtectedRoute>
                        }>
                        </Route>
                    }
                    {
                        //Dynamic auth protected component routing for dynamic components
                        data.map((val, index) => (
                            <Route path={val.route} key={index} element={
                                <ProtectedRoute>
                                    <AdminLayout>
                                        <BootstrapComponent data={val} />
                                    </AdminLayout>
                                </ProtectedRoute>
                            }>
                            </Route>
                        ))


                    }
                    {
                        //Super Admin : Dynamic auth protected component routing
                        CustomRoute.map((val, index) => (
                            <Route path={val.route} key={index} element={
                                <ProtectedRoute>
                                    <AdminLayout>
                                        <SharedComponent data={val} />
                                    </AdminLayout>
                                </ProtectedRoute>
                            }>
                            </Route>
                        ))

                    }


                    <Route path="/vinish" element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <VinishTest />
                            </AdminLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/Todo" element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <Todo />
                            </AdminLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/pages/blank" element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <Blank />
                            </AdminLayout>
                        </ProtectedRoute>
                    } />

                    {
                        <Route path="*" element={<Error404 />} />
                    }
                </Routes>
            </BrowserRouter>
        </UFContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
