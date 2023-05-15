/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Root Page Form Details
 * --------------------------------------------------------------------------
 */
import IndexMstForm from "../../../../../pages/super-admin/setup/masters/mst-form/IndexMstForm";
import AddEditMstForm from "../../../../../pages/super-admin/setup/masters/mst-form/AddEditMstForm";
import { faArrowCircleLeft, faBook, faPlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Login from "../../../../../auth/login/Login";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import APIConfig from "../../../../../config/api.config.json";
import CommonFuncs from "../../../../../util/common.funcs";

require('dotenv').config();

const MstForm = (props) => {
    //debugger;
    const data = props.data;
    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken']);
    // Declare a new state variable, which we'll call "Component"
    const [MyComponent, setMyComponent] = useState(data.landingComponent);
    const [MyInnerComponentName, setMyInnerComponentName] = useState(data.innerComponentName);
    const [DefaultDynamicAPIResponse, setDefaultDynamicAPIResponse] = useState(null);
    const [HasAPIError, setHasAPIError] = useState(false);
    const [HasAPIFailed, setHasAPIFailed] = useState(null);
    const [HasAPISuccess, setHasAPISuccess] = useState(false);
    const [HasAPIMessage, setHasAPIMessage] = useState(null);
    const [HasAPIDescription, setHasAPIDescription] = useState(null);
    const [FormId, setFormId] = useState("");
    const [RowPerPage, setRowPerPage] = useState(process.env.REACT_APP_DefaultRowPerPage);
    const [CurrentPage, setCurrentPage] = useState(process.env.REACT_APP_DefaultCurrentPage);
    const [SearchBy, setSearchBy] = useState("");
    const [SearchValue, setSearchValue] = useState("");
    const [DataRow, setDataRow] = useState(null);

    useEffect(() => {
        if (MyComponent == "IndexMstForm") {
            fetchParentDefaultData(FormId, RowPerPage, CurrentPage, SearchBy, SearchValue);
        }
        else if (MyComponent == "AddEditMstForm") {
            fetchParentDefaultData(FormId, RowPerPage, CurrentPage, SearchBy, SearchValue);
        }
    }, []);



    const fetchParentDefaultData = async (parmFormId, parmRowPerPage, parmCurrentPage, parmSearchBy, parmSearchValue) => {
        setRowPerPage(parmRowPerPage);
        setCurrentPage(parmCurrentPage);
        setSearchBy(parmSearchBy);
        setSearchValue(parmSearchValue);
        setFormId(parmFormId);

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
        let GetFormDetailsUri = APIConfig.Admin.Form.GetFormDetailsUri;
        GetFormDetailsUri = GetFormDetailsUri
            .replace('<FormId>', parmFormId)
            .replace('<RowPerPage>', parmRowPerPage)
            .replace('<CurrentPage>', parmCurrentPage)
            .replace('<SearchBy>', parmSearchBy)
            .replace('<SearchValue>', parmSearchValue);

        instance({
            'method': 'GET',
            'url': GetFormDetailsUri
        }).then((response) => {
            //debugger;
            //console.log(response.data);
            if (response.data && response.data.Result) {
                setDefaultDynamicAPIResponse(response.data.Data);
            }
            else {
                setHasAPIError(!response.data.Result);
                setHasAPIMessage(response.data.Message);
                setHasAPIDescription(JSON.stringify(response.data.Description));
            }
        }).catch((e) => {
            setHasAPIError(false);
            setHasAPIMessage(e.essage);
            setHasAPIDescription(JSON.stringify(e));
            console.log(e);
        });
    };
    function loadComponent(rowData) {
        //debugger;
        if (MyComponent == data.landingComponent) {
            //Go to add mode component
            setMyInnerComponentName(data.backMainComponentName);
            setMyComponent(data.innerComponentList);
            if (rowData) {
                setDataRow(DefaultDynamicAPIResponse.DataList.filter(e => e.PK_ID === CommonFuncs.decryptCryptoJSAES(rowData))[0]);
            }

        }
        else {
            //Back to index component
            fetchParentDefaultData("", RowPerPage, CurrentPage, '', '');////Trigger for reload index component
            setMyInnerComponentName(data.innerComponentName);
            setMyComponent(data.landingComponent);
        }
    }


    async function funcDeleteRecord(rowData) {
        let id = CommonFuncs.decryptCryptoJSAES(rowData);

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
        let DeleteFormsDetailsUri = APIConfig.Admin.Form.DeleteFormsDetailsUri;
        DeleteFormsDetailsUri = DeleteFormsDetailsUri
            .replace('<FormId>', id)
            .replace('<DeletedBy>', Cookie.loggedInUserId)

        instance({
            'method': 'DELETE',
            'url': DeleteFormsDetailsUri
        }).then((response) => {
            setHasAPIError(false);
            //debugger;
            //console.log(response.data);
            if (response.data && response.data.Result) {
                fetchParentDefaultData("", RowPerPage, CurrentPage, '', '');////Trigger for reload index component

                //setDefaultDynamicAPIResponse(response.data.Data);
                setHasAPISuccess(true);
                setHasAPIMessage(response.data.Message);
                setHasAPIDescription(response.data.Description);
            }
            else {
                setHasAPIFailed(true);
                setHasAPIMessage(response.data.Message);
                setHasAPIDescription(response.data.Description);
            }
        }).catch((e) => {
            setHasAPIError(false);
            setHasAPIFailed(true);
            setHasAPIMessage(e.message);
            setHasAPIDescription(JSON.stringify(e));
            console.log(e);
        });
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
                if (!DefaultDynamicAPIResponse && !HasAPIError) {
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
                                    {" Loading..."}
                                </Button>
                            </div>
                        </>
                    );
                }
                if (HasAPIError) {
                    return (
                        <>
                            <div style={{ display: HasAPIError && process.env.REACT_APP_ENV == 'development' ? 'block' : 'none' }}>
                                <div className="row">
                                    <div className="col-xl-12 col-md-12">
                                        <div className="alert alert-danger" role="alert" >
                                            {HasAPIMessage}
                                        </div>
                                        <div className="alert alert-danger" role="alert" style={{ display: HasAPIDescription ? 'block' : 'none' }}>
                                            <h6 className="alert-heading">Error Description!</h6>
                                            <p className="error-desc">{HasAPIDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: HasAPIError && process.env.REACT_APP_ENV != 'development' ? 'block' : 'none' }}>
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
                    if (MyComponent == "IndexMstForm") {
                        return (
                            <>
                                <div className="full-doc">
                                    <button className="btn btn-primary btn-sm"
                                        type="button"
                                        id="btnTopnavigation"
                                        onClick={loadComponent}>
                                        <FontAwesomeIcon icon={faPlusSquare} />
                                        {" " + MyInnerComponentName}

                                    </button>

                                </div>

                                {
                                    !HasAPIError && (HasAPISuccess || HasAPIFailed) && (
                                        <>
                                            <div style={{ display: (!HasAPIError && HasAPISuccess && !HasAPIFailed) ? 'block' : 'none' }}>
                                                <div className="row">
                                                    <div className="col-xl-12 col-md-12">
                                                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                                                            <strong>{HasAPIMessage}</strong>
                                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: (!HasAPIError && HasAPIFailed && !HasAPISuccess) ? 'block' : 'none' }}>
                                                <div className="row">
                                                    <div className="col-xl-12 col-md-12">
                                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>{HasAPIMessage}</strong>
                                                            <div style={{ display: HasAPIDescription ? 'block' : 'none' }}>
                                                                <p className="error-desc">{HasAPIDescription}</p>
                                                            </div>
                                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }

                                <IndexMstForm
                                    defaultDynamicAPIResponse={DefaultDynamicAPIResponse}
                                    fetchParentDefaultData={fetchParentDefaultData}
                                    RowPerPage={RowPerPage}
                                    CurrentPage={CurrentPage}
                                    SearchBy={SearchBy}
                                    SearchValue={SearchValue}
                                    setFormId={FormId}
                                    funcLoadComponent={loadComponent}
                                    funcDeleteRecord={funcDeleteRecord}
                                />
                            </>
                        );
                    }
                    else if (MyComponent == "AddEditMstForm") {
                        return (
                            <>
                                <div className="full-doc">
                                    <button className="btn btn-primary btn-sm"
                                        type="button"
                                        id="btnTopnavigation"
                                        onClick={loadComponent}>
                                        <FontAwesomeIcon icon={faArrowCircleLeft} />
                                        {" " + MyInnerComponentName}
                                    </button>
                                </div>
                                <AddEditMstForm pageTitle={data.innerComponentName} dataRow={DataRow} funcBackToIndex={loadComponent} />
                            </>
                        );
                    }
                }
                else {
                    <Login />
                }
            })()}
        </>
    );
};

export default MstForm;
