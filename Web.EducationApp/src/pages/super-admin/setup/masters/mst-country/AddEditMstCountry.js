"use strict";
/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit Country Details
 * --------------------------------------------------------------------------
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import APIConfig from "../../../../../config/api.config.json";
import reqBody from "../../../../../models/reqBody.Model";
import useCountryValidator from "../../../../../util/useFormValidator";
import CustomDropdown from "../../../../../core/components/dropdown/CustomDropdown";
import { $ } from 'react-jquery-plugin';
import CommonFuncs from "../../../../../util/common.funcs";

require('dotenv').config();

const AddEditMstCountry = (props) => {
    let propData = props.dataRow;
    //console.log(propData);
    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    var numberRegex = /^[0-9]+$/;
    //#endregion


    //#region Country details Country: define state, schema & validations
    // Define your state schema
    const stateSchemaCountryDetails = {
        CountryName: { value: propData ? propData.CountryName : '', error: "This Country name field is required!" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!!" }
    };
    const [CountryDetailsData, setCountryDetailsData] = useState(stateSchemaCountryDetails);
    // Create your own validationstateSchemaCountryDetails
    // stateSchemaCountryDetails property should be the same in validationstateSchemaCountryDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaCountryDetails = {
        CountryName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid Country name Countryat."
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
    const [AllParentCountryList, setAllParentCountryList] = useState([]);

    const [CurrentId, setCurrentId] = useState(propData ? propData.PK_ID : 0);

    //#endregion


    //#region define custom Countrys validation hooks
    const {
        values: valuesCountryDetails,
        errors: errorsCountryDetails,
        dirty: dirtyCountryDetails,
        handleOnChange: handleOnChangeCountryDetails,
        handleOnSubmit: handleOnSubmitCountryDetails,
        disable: disableCountryDetails,
        handleOnClear: handleOnClearCountryDetails
    } = useCountryValidator(stateSchemaCountryDetails, stateValidatorSchemaCountryDetails, onSubmitCountryCountryDetails);

    //#endregion



    useEffect(() => {
        //debugger;

        //#region bind default data for Countrys
        fetchAllParentCountryList();
        //#endregion

        //#region set default value of Countrys use state hooks
        setCountryDetailsData(stateSchemaCountryDetails);
        setCurrentId(propData ? propData.PK_ID : 0);
        //#endregion
    }, []);



    const fetchAllParentCountryList = async () => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllParentCountrysListUri;

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
                    DataList.push({ ListValue: data.CountryId, ListText: data.CountryName });
                });
                setAllParentCountryList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };


    //Step 1 : Country Details 
    function onSubmitCountryCountryDetails(event, valuesCountryDetails) {
        //debugger;
        event.preventDefault();
        const btnPointer = document.querySelector('#btnCountryDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditCountryDetailsUri = APIConfig.Admin.Country.AddEditCountryDetailsUri;
            const CountryElement = document.querySelector('#CountryDetailsCountry');
            const CountryData = new FormData(CountryElement);
            const CountryDataJSON = Object.fromEntries(CountryData);
            CountryDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            CountryDataJSON["CountryId"] = CurrentId;

            let reqBody = CountryDataJSON;

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
                'url': AddEditCountryDetailsUri ? AddEditCountryDetailsUri : "",
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

    const onInputChangeControllerCountryDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(CountryDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = CountryDetailsData[keys[i]];
            } else {
                obj[name] = CountryDetailsData[name];
                obj[name].value = value;
            }
        }
        setCountryDetailsData(obj);
    };

    const btnClearCountryDetails = (event) => {
        setCountryDetailsData(stateSchemaCountryDetails);
        handleOnClearCountryDetails(event);
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
                            <section className="NewCountryTabs">
                                <ul className="nav nav-tabs nav-top-border no-hover-bg">
                                    <li className="nav-item"> <a className="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Country Details</a> </li>
                                </ul>

                                <div className="tab-content px-1 py-1">
                                    <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                        aria-labelledby="base-tab11">
                                        <form onSubmit={handleOnSubmitCountryDetails} id="CountryDetailsCountry">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Country Name
                                                        {stateValidatorSchemaCountryDetails.CountryName.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <input
                                                            className={"form-control " +
                                                                (errorsCountryDetails.CountryName && dirtyCountryDetails.CountryName ? 'has-error' :
                                                                    (dirtyCountryDetails.CountryName ? 'has-success' : ''))
                                                            }
                                                            data-val="true"
                                                            maxLength="50" name="CountryName" placeholder="Country Name"
                                                            type="text"
                                                            value={CountryDetailsData.CountryName.value}
                                                            onChange={e => { handleOnChangeCountryDetails(e); onInputChangeControllerCountryDetails(e) }}
                                                        />
                                                    </div>
                                                    {errorsCountryDetails.CountryName && dirtyCountryDetails.CountryName && (
                                                        <span className="error-label mt-2">{errorsCountryDetails.CountryName}</span>
                                                    )}
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Status
                                                        {stateValidatorSchemaCountryDetails.CountryName.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <br />
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio1"
                                                                value="true"
                                                                defaultChecked={CountryDetailsData.IsActive.value === true}
                                                                onChange={e => { handleOnChangeCountryDetails(e); onInputChangeControllerCountryDetails(e) }}
                                                            />
                                                            <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio2"
                                                                value="false"
                                                                defaultChecked={CountryDetailsData.IsActive.value === false}
                                                                onChange={e => { handleOnChangeCountryDetails(e); onInputChangeControllerCountryDetails(e) }}
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
                                                                    id="btnCountryDetails"
                                                                    className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1"
                                                                    disabled={disableCountryDetails}
                                                                >Submit</button>
                                                            </div>
                                                            <div style={{ margin: '10px' }}>
                                                                <button type="button"
                                                                    className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                                    id="btnClearCountryDetails"
                                                                    onClick={btnClearCountryDetails}
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

export default AddEditMstCountry;
