import "bootstrap";
import "./assets/styles/styles.scss";
import "./assets/styles/demo.scss";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function App() {
    //const location = useLocation();
    //console.log("App : " + JSON.stringify(location));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    );
};

export default App;
