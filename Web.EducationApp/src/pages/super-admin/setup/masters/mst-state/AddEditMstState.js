"use strict";
/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit State Details
 * --------------------------------------------------------------------------
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import APIConfig from "../../../../../config/api.config.json";
import reqBody from "../../../../../models/reqBody.Model";
import useStateValidator from "../../../../../util/useFormValidator";
import CustomDropdown from "../../../../../core/components/dropdown/CustomDropdown";
import { $ } from 'react-jquery-plugin';
import CommonFuncs from "../../../../../util/common.funcs";

require('dotenv').config();

const AddEditMstState = (props) => {
    let propData = props.dataRow;
    //console.log(propData);
    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    var numberRegex = /^[0-9]+$/;
    var alphanumericRegex = /[A-Za-z0-9]$/;
    //#endregion


    //#region State details State: define state, schema & validations
    // Define your state schema
    const stateSchemaStateDetails = {
        StateName: { value: propData ? propData.StateName : '', error: "This State name field is required!" },
        CountryId: { value: propData ? propData.CountryId : '', error: "This country field selection is required!" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!!" }
    };
    const [StateDetailsData, setStateDetailsData] = useState(stateSchemaStateDetails);
    // Create your own validationstateSchemaStateDetails
    // stateSchemaStateDetails property should be the same in validationstateSchemaStateDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaStateDetails = {
        CountryId: {
            required: true,
            validator: {
                func: value => alphanumericRegex.test(value),
                    error: "Invalid country format."
            }
        },
        StateName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid State name State."
            }
        },
        IsActive: {
            required: false
        }
    };
    //#endregion


    //#region define use state hooks
    const [HasAPIError, setHasAPIError] = useState(false);
    const [HasAPISuccess, setHasAPISuccess] = useState(false);
    const [HasAPIMessage, setHasAPIMessage] = useState("");
    const [HasAPIDescription, setHasAPIDescription] = useState("");
    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken', 'loggedInUserId']);
    const [AllParentStateList, setAllParentStateList] = useState([]);
    const [AllCountryList, setAllCountryList] = useState([]);
    const [CurrentId, setCurrentId] = useState(propData ? propData.PK_ID : "");

    //#endregion


    //#region define custom States validation hooks
    const {
        values: valuesStateDetails,
        errors: errorsStateDetails,
        dirty: dirtyStateDetails,
        handleOnChange: handleOnChangeStateDetails,
        handleOnSubmit: handleOnSubmitStateDetails,
        disable: disableStateDetails,
        handleOnClear: handleOnClearStateDetails
    } = useStateValidator(stateSchemaStateDetails, stateValidatorSchemaStateDetails, onSubmitStateStateDetails);

    //#endregion



    useEffect(() => {
        //debugger;

        //#region bind default data for States
        fetchAllParentStateList();
        fetchCountryList();
        //#endregion

        //#region set default value of States use state hooks
        setStateDetailsData(stateSchemaStateDetails);
        setCurrentId(propData ? propData.PK_ID : "");
        //#endregion
    }, []);
    //#region bind funcs to call axios

    const fetchCountryList = async () => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllCountryListUri;
        //console.log(apiUri);
        const instance = axios.create({
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
        instance({
            'method': 'GET',
            'url': apiUri ? apiUri : ""
        }).then((response) => {
            if (response.data.Result) {
                let DataList = [];
                response.data.Data.map((data, i) => {
                    DataList.push({ ListValue: data.CountryId, ListText: data.CountryName });
                });
                setAllCountryList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };


    const fetchAllParentStateList = async () => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllParentStatesListUri;

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
        instance({
            'method': 'GET',
            'url': apiUri ? apiUri : ""
        }).then((response) => {
            if (response.data.Result) {
                let DataList = [];
                response.data.Data.map((data, i) => {
                    DataList.push({ ListValue: data.StateId, ListText: data.StateName });
                });
                setAllParentStateList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    //#endregion

    //Step 1 : State Details 
    function onSubmitStateStateDetails(event, valuesStateDetails) {
        //debugger;
        event.preventDefault();
        const btnPointer = document.querySelector('#btnStateDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditStateDetailsUri = APIConfig.Admin.State.AddEditStateDetailsUri;
            const StateElement = document.querySelector('#StateDetailsState');
            const StateData = new FormData(StateElement);
            const StateDataJSON = Object.fromEntries(StateData);
            StateDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            StateDataJSON["StateId"] = CurrentId;

            let reqBody = StateDataJSON;

            const instance = axios.create({
                baseURL: process.env.REACT_APP_APIBaseUri,
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': process.env.REACT_APP_APIKey
                }
            });

            instance.interceptors.request.use(
                request => {
                    request.headers['Authorization'] = "Bearer " + Cookie.accessToken;
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
                'url': AddEditStateDetailsUri ? AddEditStateDetailsUri : "",
                'data': reqBody
            }).then((response) => {
                
                if (response.data && response.data.Result) {
                    btnPointer.innerHTML = 'Submit';
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                    setTimeout(() => {
                        props.funcBackToIndex();
                    }, 2000);
                }
                else {
                    setHasAPIError(!response.data.Result);
                    setHasAPIMessage(response.data.Message);
                    setHasAPIDescription(response.data.Description);
                }
                btnPointer.innerHTML = 'Submit';
                btnPointer.removeAttribute('disable');
            }).catch((e) => {
                //console.log(e);
                //return e;
                setHasAPIError(true);
                setHasAPIMessage(e.message);
                btnPointer.innerHTML = 'Submit';
                btnPointer.removeAttribute('disable');
            });

        } catch (e) {
            setHasAPIError(true);
            setHasAPIMessage(e.message);
            //console.log(e);
            btnPointer.innerHTML = 'Submit';
            btnPointer.removeAttribute('disable');
        }

    }

    const onInputChangeControllerStateDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(StateDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = StateDetailsData[keys[i]];
            } else {
                obj[name] = StateDetailsData[name];
                obj[name].value = value;
            }
        }
        setStateDetailsData(obj);
    };

    const btnClearStateDetails = (event) => {
        setStateDetailsData(stateSchemaStateDetails);
        handleOnClearStateDetails(event);
    }
    return (
        <>
            {
                !HasAPIError && HasAPISuccess && (
                    <>
                        <div style={{ display: (!HasAPIError && HasAPISuccess) ? 'block' : 'none' }}>
                            <div className="row">
                                <div className="col-xl-12 col-md-12">
                                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>{HasAPIMessage}</strong>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            {
                HasAPIError && (
                    <>
                        <div style={{ display: HasAPIError && process.env.REACT_APP_ENV == 'development' ? 'block' : 'none' }}>
                            <div className="row">
                                <div className="col-xl-12 col-md-12">
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>{!HasAPIMessage ? "Opps! Somthing went wrong, it's look like backend API has been crashed!" : HasAPIMessage}</strong>
                                        <br />
                                        {HasAPIDescription}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: HasAPIError && process.env.REACT_APP_ENV != 'development' ? 'block' : 'none' }}>
                            <div className="row">
                                <div className="col-xl-12 col-md-12">
                                    <div className="alert alert-danger" role="alert" >
                                        Opps! Somthing went wrong!
                                                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            <div className="card card-demo">
                <div className="card-body">
                    <h3 className="card-title">{props.pageTitle}</h3>
                    <div className="content-demo">
                        <div className="content-body">
                            <section className="NewStateTabs">
                                <ul className="nav nav-tabs nav-top-border no-hover-bg">
                                    <li className="nav-item"> <a className="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">State Details</a> </li>
                                </ul>

                                <div className="tab-content px-1 py-1">
                                    <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                        aria-labelledby="base-tab11">
                                        <form onSubmit={handleOnSubmitStateDetails} id="StateDetailsState">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Country
                                                        {stateValidatorSchemaStateDetails.CountryId.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <select
                                                            className={"form-control " +
                                                                (errorsStateDetails.CountryId && dirtyStateDetails.CountryId ? 'has-error' :
                                                                    (dirtyStateDetails.CountryId ? 'has-success' : ''))
                                                            }
                                                            value={StateDetailsData.CountryId.value}
                                                            onChange={e => { handleOnChangeStateDetails(e); onInputChangeControllerStateDetails(e);}}

                                                            name="CountryId"
                                                        >
                                                            {CommonFuncs.funcBindSelectOptons(AllCountryList)}
                                                        </select>
                                                    </div>
                                                    {errorsStateDetails.CountryId && dirtyStateDetails.CountryId && (
                                                        <span className="error-label mt-2">{errorsStateDetails.CountryId}</span>
                                                    )}
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">State Name
                                                        {stateValidatorSchemaStateDetails.StateName.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <input
                                                            className={"form-control " +
                                                                (errorsStateDetails.StateName && dirtyStateDetails.StateName ? 'has-error' :
                                                                    (dirtyStateDetails.StateName ? 'has-success' : ''))
                                                            }
                                                            data-val="true"
                                                            maxLength="50" name="StateName" placeholder="State Name"
                                                            type="text"
                                                            value={StateDetailsData.StateName.value}
                                                            onChange={e => { handleOnChangeStateDetails(e); onInputChangeControllerStateDetails(e) }}
                                                        />
                                                    </div>
                                                    {errorsStateDetails.StateName && dirtyStateDetails.StateName && (
                                                        <span className="error-label mt-2">{errorsStateDetails.StateName}</span>
                                                    )}
                                                </div>
                                                <div className="col-6 mt-2">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Status
                                                        {stateValidatorSchemaStateDetails.StateName.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <br />
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio1"
                                                                value="true"
                                                                defaultChecked={StateDetailsData.IsActive.value === true}
                                                                onChange={e => { handleOnChangeStateDetails(e); onInputChangeControllerStateDetails(e) }}
                                                            />
                                                            <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio2"
                                                                value="false"
                                                                defaultChecked={StateDetailsData.IsActive.value === false}
                                                                onChange={e => { handleOnChangeStateDetails(e); onInputChangeControllerStateDetails(e) }}
                                                            />
                                                            <label className="form-check-label" htmlFor="inlineRadio2">Inactive</label>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                           

                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-body">
                                                        <div style={{ justifyContent: 'center' }} className="form-actions mt-3 d-flex">

                                                            <div style={{ margin: '10px' }}>
                                                                <button type="submit"
                                                                    id="btnStateDetails"
                                                                    className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1"
                                                                    disabled={disableStateDetails}
                                                                >Submit</button>
                                                            </div>
                                                            <div style={{ margin: '10px' }}>
                                                                <button type="button"
                                                                    className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                                    id="btnClearStateDetails"
                                                                    onClick={btnClearStateDetails}
                                                                >Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>


                                </div>


                            </section>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AddEditMstState;
