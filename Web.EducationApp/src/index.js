import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from './auth/login/Login';
import Register from './auth/login/Register';
import ForgetPassword from './auth/login/ForgetPassword';
import Auth from './auth/Auth';
import AdminLayout from "./components/AdminLayout";
import Todo from "./pages/Todo";
import Blank from "./pages/Blank";
import VinishTest from "./pages/VinishTest";
import data from "./data/data";
import BootstrapComponent from "./pages/BootstrapComponent";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './util/ProtectedRoute';
import Error404 from "./error/Error404";
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={'/'}>
            <Routes>
                <Route path='/auth' element={<Auth />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='forget-password' element={<ForgetPassword />} />
                </Route>
                <Route path='/' element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <App/>
                        </AdminLayout>
                    </ProtectedRoute>
                }>
                </Route>
                {
                    //Dynamic auth protected component routing
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
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
