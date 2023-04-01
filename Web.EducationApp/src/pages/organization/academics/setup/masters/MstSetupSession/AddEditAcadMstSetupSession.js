/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit Session Details
 * --------------------------------------------------------------------------
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import APIConfig from "../../../../../../config/api.config.json";
import useFormValidator from "../../../../../../util/useFormValidator";
import { $ } from 'react-jquery-plugin';
import CommonFuncs from "../../../../../../util/common.funcs";
require('dotenv').config();

const AddEditAcadMstSetupSession = (props) => {
    //debugger;
    let propData = props.dataRow;
    //console.log(props);

    //#region define regular expressions (regex)
    var number1to10Regex = /^[0-9]{1,10}$/;
    var dateRegex = /^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/;//yyyy-MM-dd
    //#region Date format regex
    ////dd/mm/yyyy
    //var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    ////dd-mm-yyyy
    //var date_regex = /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(19|20)\d{2}$/;
    //alert(date_regex.test("02-12-1991")); 
    ////mm/dd/yyyy
    //var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    //alert(date_regex.test("12/02/1991")); 
    ////yyyy.MM.dd
    //var date_regex = /^((19|20)\d{2})\.(0[1-9]|1[0-2])\.(0[1-9]|1\d|2\d|3[01])$/;
    //alert(date_regex.test("1991.12.02")); 
    ////yyyy/MM/dd
    //var date_regex = /^((19|20)\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])$/;
    ////yyyy-MM-dd
    //var date_regex = /^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/;
    //#endregion
    //#endregion

    //#region Session details form: define state, schema & validations
    // Define your state schema
    const stateSchemaSessionDetails = {
        SessionName: { value: propData ? propData.SessionName : '', error: "This Session name field is required!" },
        StartDate: { value: propData ? propData.StartDate : '', error: "This start date field selection is required!" },
        EndDate: { value: propData ? propData.EndDate : '', error: "This end date field selection is required!" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!!" }
    };
    const [SessionDetailsData, setSessionDetailsData] = useState(stateSchemaSessionDetails);
    // Create your own validationstateSchemaSessionDetails
    // stateSchemaSessionDetails property should be the same in validationstateSchemaSessionDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaSessionDetails = {
        SessionName: {
            required: true,
            validator: {
                func: value => number1to10Regex.test(value),
                error: "Invalid session name format."
            }
        },
        StartDate: {
            required: true,
            validator: {
                func: value => dateRegex.test(value),
                error: "Invalid end date format."
            }
        },
        EndDate: {
            required: true,
            validator: {
                func: value => dateRegex.test(value),
                error: "Invalid Session name format."
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
    const [CurrentId, setCurrentId] = useState(propData ? propData.PK_ID : 0);

    //#endregion

    //#region define custom forms validation hooks
    const {
        values: valuesSessionDetails,
        errors: errorsSessionDetails,
        dirty: dirtySessionDetails,
        handleOnChange: handleOnChangeSessionDetails,
        handleOnSubmit: handleOnSubmitSessionDetails,
        disable: disableSessionDetails,
        handleOnClear: handleOnClearSessionDetails
    } = useFormValidator(stateSchemaSessionDetails, stateValidatorSchemaSessionDetails, onSubmitFormSessionDetails);

    //#endregion



    useEffect(() => {
        //debugger;
        //console.log(propData);
        //console.log(stateSchemaSessionDetails);
        //#region set default value of forms use state hooks
        setSessionDetailsData(stateSchemaSessionDetails);
        setCurrentId(propData ? propData.PK_ID : 0);
        //#endregion

    }, [propData]);


    const isComponentMounted = CommonFuncs.useIsComponentMounted();
    if (!isComponentMounted.current) {
        //After Component Load data
        //console.log(propData);
    }

    //#region submit form data and call axios
    //Step 1 : Session Details 
    function onSubmitFormSessionDetails(event, valuesSessionDetails) {
        debugger;
        $("#divStatusRoot").hide();
        $("#divStatusAddEdit").show();
        event.preventDefault();
        const btnPointer = document.querySelector('#btnSessionDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditSessionDetailsUri = APIConfig.Academics.Session.AddEditSessionDetailsUri;
            const formElement = document.querySelector('#SessionDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["SessionId"] = CurrentId;

            let reqBody = formDataJSON;

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
                'url': AddEditSessionDetailsUri ? AddEditSessionDetailsUri : "",
                'data': reqBody
            }).then((response) => {
                if (response.data && response.data.Result) {
                    btnPointer.innerHTML = 'Submit';
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                    setCurrentId(0);

                    //Clear form
                    SessionDetailsData.SessionName.value = "";
                    SessionDetailsData.StartDate.value = "";
                    SessionDetailsData.EndDate.value = "";
                    SessionDetailsData.IsActive.value = true;

                    dirtySessionDetails.SessionName = false;
                    dirtySessionDetails.StartDate = false;
                    dirtySessionDetails.EndDate = false;
                    handleOnClearSessionDetails(event);
                    //Reload Grid
                    props.funcBackToIndex();
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

    //#endregion


    //#region clear form data and call axios
    const btnClearSessionDetails = (event) => {
        //Set default values
        let keys = Object.keys(SessionDetailsData);
        let obj = new Object();
        let currentVal;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'SessionId') { currentVal = 0 }
            else if (keys[i] === 'SessionName') { currentVal = '' }
            else if (keys[i] === 'IsActive') { currentVal = true }
            obj[keys[i]] = SessionDetailsData[keys[i]];
            obj[keys[i]].value = currentVal;
        }
        setSessionDetailsData(obj);
        handleOnClearSessionDetails(event);
    }
    //#endregion

    //#region other form control functions
    const onInputChangeControllerSessionDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(SessionDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = SessionDetailsData[keys[i]];
            } else {
                obj[name] = SessionDetailsData[name];
                obj[name].value = value;
            }
        }
        setSessionDetailsData(obj);
    };
    //#endregion


    return (
        <>
            {
                !HasAPIError && HasAPISuccess && (
                    <>
                        <div id="divStatusAddEdit">
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
            <div className="col-xl-6 col-md-6">
                <div className="card card-demo">
                    <div className="card-body">
                        <h3 className="card-title">{props.pageTitle}</h3>
                        <ul className="nav nav-tabs nav-top-border no-hover-bg">
                            <li className="nav-item"> <a className="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Create Session</a> </li>
                        </ul>
                        <div className="tab-content px-1 py-1">
                            <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                aria-labelledby="base-tab11">
                                <form onSubmit={handleOnSubmitSessionDetails} id="SessionDetailsForm">
                                    <div className="row">
                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Session Name{stateValidatorSchemaSessionDetails.SessionName.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsSessionDetails.SessionName && dirtySessionDetails.SessionName ? 'has-error' :
                                                            (dirtySessionDetails.SessionName ? 'has-success' : ''))
                                                    }
                                                    maxLength="50" name="SessionName" placeholder="Session Name"
                                                    type="text"
                                                    value={SessionDetailsData.SessionName.value}
                                                    onChange={e => { handleOnChangeSessionDetails(e); onInputChangeControllerSessionDetails(e) }}
                                                />

                                            </div>
                                            {errorsSessionDetails.SessionName && dirtySessionDetails.SessionName && (
                                                <span className="error-label mt-2">{errorsSessionDetails.SessionName}</span>
                                            )}
                                        </div>


                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Start Date{stateValidatorSchemaSessionDetails.StartDate.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsSessionDetails.StartDate && dirtySessionDetails.StartDate ? 'has-error' :
                                                            (dirtySessionDetails.StartDate ? 'has-success' : ''))
                                                    }
                                                    maxLength="50" name="StartDate" placeholder="Session Name"
                                                    type="date"
                                                    value={SessionDetailsData.StartDate.value}
                                                    onChange={e => { handleOnChangeSessionDetails(e); onInputChangeControllerSessionDetails(e) }}
                                                />

                                            </div>
                                            {errorsSessionDetails.StartDate && dirtySessionDetails.StartDate && (
                                                <span className="error-label mt-2">{errorsSessionDetails.StartDate}</span>
                                            )}
                                        </div>

                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">End Date{stateValidatorSchemaSessionDetails.EndDate.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsSessionDetails.EndDate && dirtySessionDetails.EndDate ? 'has-error' :
                                                            (dirtySessionDetails.EndDate ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="EndDate" placeholder="Session Name"
                                                    type="date"
                                                    value={SessionDetailsData.EndDate.value}
                                                    onChange={e => { handleOnChangeSessionDetails(e); onInputChangeControllerSessionDetails(e) }}
                                                />

                                            </div>
                                            {errorsSessionDetails.EndDate && dirtySessionDetails.EndDate && (
                                                <span className="error-label mt-2">{errorsSessionDetails.EndDate}</span>
                                            )}
                                        </div>

                                        
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Status
                                                </label>
                                                <br />
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="IsActiveTrue"
                                                        value="true"
                                                        checked={String(SessionDetailsData.IsActive.value) === String(true)}
                                                        onChange={e => { handleOnChangeSessionDetails(e); onInputChangeControllerSessionDetails(e) }}
                                                    />
                                                    <label className="form-check-label" htmlFor="IsActiveTrue">Active</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="IsActiveFalse"
                                                        value="false"
                                                        checked={String(SessionDetailsData.IsActive.value) === String(false)}
                                                        onChange={e => { handleOnChangeSessionDetails(e); onInputChangeControllerSessionDetails(e) }}
                                                    />
                                                    <label className="form-check-label" htmlFor="IsActiveFalse">Inactive</label>
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
                                                            className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            id="btnSessionDetails"
                                                            disabled={disableSessionDetails}
                                                        >Finish</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            onClick={btnClearSessionDetails}
                                                        >Clear</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEditAcadMstSetupSession;
