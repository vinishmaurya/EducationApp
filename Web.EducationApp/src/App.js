import "bootstrap";
import "./assets/styles/styles.scss";
import "./assets/styles/demo.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Todo from "./pages/Todo";
import VinishTest from "./pages/VinishTest";
import data from "./data/data";
import BootstrapComponent from "./pages/BootstrapComponent";
import Login from "./pages/login";

import React, { useState, useEffect } from "react";
import axios from "axios";


function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    //// set the state of the user
    //setUser(response.data);
    //// store the user in localStorage
    //localStorage.setItem('user', response.data);

    const handleSubmit = async e => {
        e.preventDefault();
        const user = { username, password };
        // send the username and password to the server
        const response = await axios.post(
            "http://blogservice.herokuapp.com/api/login",
            user
        );
        // set the state of the user
        setUser(response.data)
        // store the user in localStorage
        localStorage.setItem('user', response.data)
        console.log(response.data)
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);


    // if there's a user show the message below
    if (user) {
        return (
            <BrowserRouter>
                
                <AdminLayout>
                    <Switch>
                        {data.map((val, index) => (
                            <Route path={val.route} key={index}>
                                <BootstrapComponent data={val} />
                            </Route>
                        ))}
                        <Route path="/vinish" component={VinishTest} />
                        <Route path="/Todo" component={Todo} />
                    </Switch>
                </AdminLayout>
            </BrowserRouter>
        );
    }

    // if there's no user, show the login form
    return (
        <BrowserRouter>
            <Route path="/" component={Login} />
        </BrowserRouter>
    );
};

export default App;
