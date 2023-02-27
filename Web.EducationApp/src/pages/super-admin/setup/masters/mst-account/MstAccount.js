import IndexMstAccount from "../../../../../pages/super-admin/setup/masters/mst-account/IndexMstAccount";
import AddEditMstAccount from "../../../../../pages/super-admin/setup/masters/mst-account/AddEditMstAccount";
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import AccountService from "../../../../../services/account.services";
//import instance from "../../../../../services/instance.services";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Login from "../../../../../auth/login/Login";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import apiconfig from "../../../../../config/api.config.json";

require('dotenv').config();

const MstAccount = (props) => {
    //debugger;
    const data = props.data;
    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken']);
    // Declare a new state variable, which we'll call "Component"
    const [MyComponent, setMyComponent] = useState(data.landingComponent);
    const [MyInnerComponentName, setMyInnerComponentName] = useState(data.innerComponentName);
    const [DefaultDynamicAPIResponse, setDefaultDynamicAPIResponse] = useState(null);
    const [HaveAPIError, setHaveAPIError] = useState(false);
    const [HaveAPIMessage, setHaveAPIMessage] = useState(null);
    const [HaveAPIDescription, setHaveAPIDescription] = useState(null);
    const [AccountId, setAccountId] = useState(0);
    const [RowPerPage, setRowPerPage] = useState(process.env.REACT_APP_DefaultRowPerPage);
    const [CurrentPage, setCurrentPage] = useState(process.env.REACT_APP_DefaultCurrentPage);
    const [SearchBy, setSearchBy] = useState("");
    const [SearchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (MyComponent == "IndexMstAccount") {
            fetchParentDefaultData(AccountId, RowPerPage, CurrentPage, SearchBy, SearchValue);
        }
        else if (MyComponent == "AddEditMstAccount") {
            fetchParentDefaultData(AccountId, RowPerPage, CurrentPage, SearchBy, SearchValue);
        }
    }, []);



    const fetchParentDefaultData = async (parmAccountId, parmRowPerPage, parmCurrentPage, parmSearchBy, parmSearchValue) => {
        setRowPerPage(parmRowPerPage);
        setCurrentPage(parmCurrentPage);
        setSearchBy(parmSearchBy);
        setSearchValue(parmSearchValue);
        setAccountId(parmAccountId);

        const instance = await axios.create({
            baseURL: process.env.REACT_APP_APIBaseUri,
            headers: {
                'content-type': 'application/json',
                'x-api-key': process.env.REACT_APP_APIKey
            }
        });

        instance.interceptors.request.use(
            request => {
                if (!request.url.includes('AuthenticateUser')) {
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
        let reqParams = "?AccountId=" + parmAccountId
            + "&RowPerPage=" + parmRowPerPage
            + "&CurrentPage=" + parmCurrentPage
            + "&SearchBy=" + parmSearchBy
            + "&SearchValue=" + parmSearchValue;
        instance({
            'method': 'GET',
            'url': '/admin/Account/GetAccountDetails' + reqParams
        }).then((response) => {
            //debugger;
            //console.log(response.data);
            if (response.data && response.data.Result) {
                setDefaultDynamicAPIResponse(response.data.Data);
            }
            else {
                setHaveAPIError(!response.data.Result);
                setHaveAPIMessage(response.data.Message);
                setHaveAPIDescription(JSON.stringify(response.data.Description));
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    function loadComponent() {
        if (MyComponent == data.landingComponent) {
            //Go to add/edit component
            setMyInnerComponentName(data.backMainComponentName);
            setMyComponent(data.innerComponentList);
        }
        else {
            //Back to index component
            setMyInnerComponentName(data.innerComponentName);
            setMyComponent(data.landingComponent);
        }
    }
    return (
        <>
            <div>
                {
                    //<Spinner animation="grow" />
                    //<div className="card-body">
                    //    <div className="h1 card-title placeholder-glow">
                    //        <span className="placeholder col-xl-12 col-md-12"></span>
                    //    </div>

                    //</div>
                }

            </div>

            {(() => {
                if (!DefaultDynamicAPIResponse) {
                    return (
                        <>

                            <div className="alert alert-warning" role="alert">
                                <Spinner animation="grow" className="load-component-spinner" />
                                <span>  Please wait while loading data...</span>
                            </div>
                            <div className="full-doc">
                                <Button variant="primary" disabled>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                Loading...
                                </Button>
                            </div>
                        </>
                    );
                }
                if (HaveAPIError) {
                    return (
                        <>
                            <div style={{ display: HaveAPIError && process.env.REACT_APP_ENV == 'development' ? 'block' : 'none' }}>
                                <div className="row">
                                    <div className="col-xl-12 col-md-12">
                                        <div className="alert alert-danger" role="alert" >
                                            {HaveAPIMessage}
                                        </div>
                                        <div className="alert alert-danger" role="alert">
                                            <h4 className="alert-heading">Error Description!</h4>
                                            <p>{HaveAPIDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: HaveAPIError && process.env.REACT_APP_ENV != 'development' ? 'block' : 'none' }}>
                                <div className="row">
                                    <div className="col-xl-12 col-md-12">
                                        <div className="alert alert-danger" role="alert" >
                                            Opps! Somthing went wrong!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                if (DefaultDynamicAPIResponse) {
                    if (MyComponent == "IndexMstAccount") {
                        return (
                            <>
                                <div className="full-doc">
                                    <input type="button"
                                        href="#"
                                        className="btn btn-primary btn-sm"
                                        rel="noreferrer"
                                        onClick={loadComponent}
                                        value={MyInnerComponentName}
                                    />
                                </div>
                                <IndexMstAccount
                                    defaultDynamicAPIResponse={DefaultDynamicAPIResponse}
                                    fetchParentDefaultData={fetchParentDefaultData}
                                    RowPerPage={RowPerPage}
                                    CurrentPage={CurrentPage}
                                    SearchBy={SearchBy}
                                    SearchValue={SearchValue}
                                    setAccountId={AccountId}
                                />
                            </>
                        );
                    }
                    else if (MyComponent == "AddEditMstAccount") {
                        return <AddEditMstAccount pageTitle={data.innerComponentName} />
                    }
                }
                else {
                    <Login />
                }
            })()}
        </>
    );
};

export default MstAccount;
