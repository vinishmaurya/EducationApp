/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit Student Category Details
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

const AddEditAcadMstSetupStudentCategory = (props) => {
    debugger;
    let propData = props.dataRow;
    //console.log(props);

    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    //#endregion

    //#region StudentCategory details form: define state, schema & validations
    // Define your state schema
    const stateSchemaStudentCategoryDetails = {
        StudentCategoryName: { value: propData ? propData.StudentCategoryName : '', error: "This student category name field is required!" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!!" }
    };
    const [StudentCategoryDetailsData, setStudentCategoryDetailsData] = useState(stateSchemaStudentCategoryDetails);
    // Create your own validationstateSchemaStudentCategoryDetails
    // stateSchemaStudentCategoryDetails property should be the same in validationstateSchemaStudentCategoryDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaStudentCategoryDetails = {
        StudentCategoryName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid student category name format."
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
        values: valuesStudentCategoryDetails,
        errors: errorsStudentCategoryDetails,
        dirty: dirtyStudentCategoryDetails,
        handleOnChange: handleOnChangeStudentCategoryDetails,
        handleOnSubmit: handleOnSubmitStudentCategoryDetails,
        disable: disableStudentCategoryDetails,
        handleOnClear: handleOnClearStudentCategoryDetails
    } = useFormValidator(stateSchemaStudentCategoryDetails, stateValidatorSchemaStudentCategoryDetails, onSubmitFormStudentCategoryDetails);

    //#endregion



    useEffect(() => {
        //debugger;
        console.log(propData);
        //console.log(stateSchemaStudentCategoryDetails);
        //#region set default value of forms use state hooks
        setStudentCategoryDetailsData(stateSchemaStudentCategoryDetails);
        setCurrentId(propData ? propData.PK_ID : 0);
        //#endregion

    }, [propData]);


    const isComponentMounted = CommonFuncs.useIsComponentMounted();
    if (!isComponentMounted.current) {
        //After Component Load data
        //console.log(propData);
    }

    //#region submit form data and call axios
    //Step 1 : StudentCategory Details 
    function onSubmitFormStudentCategoryDetails(event, valuesStudentCategoryDetails) {
        debugger;
        $("#divStatusRoot").hide();
        $("#divStatusAddEdit").show();
        event.preventDefault();
        const btnPointer = document.querySelector('#btnStudentCategoryDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditStudentCategoryDetailsUri = APIConfig.Academics.StudentCategory.AddEditStudentCategoryDetailsUri;
            const formElement = document.querySelector('#StudentCategoryDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["StudentCategoryId"] = CurrentId;

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
                'url': AddEditStudentCategoryDetailsUri ? AddEditStudentCategoryDetailsUri : "",
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
                    StudentCategoryDetailsData.StudentCategoryName.value = "";
                    dirtyStudentCategoryDetails.StudentCategoryName = false;
                    StudentCategoryDetailsData.IsActive.value = true;
                    handleOnClearStudentCategoryDetails(event);
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
    const btnClearStudentCategoryDetails = (event) => {
        //Set default values
        let keys = Object.keys(StudentCategoryDetailsData);
        let obj = new Object();
        let currentVal;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'StudentCategoryId') { currentVal = 0 }
            else if (keys[i] === 'StudentCategoryName') { currentVal = '' }
            else if (keys[i] === 'IsActive') { currentVal = true }
            obj[keys[i]] = StudentCategoryDetailsData[keys[i]];
            obj[keys[i]].value = currentVal;
        }
        setStudentCategoryDetailsData(obj);
        handleOnClearStudentCategoryDetails(event);
    }
    //#endregion

    //#region other form control functions
    const onInputChangeControllerStudentCategoryDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(StudentCategoryDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = StudentCategoryDetailsData[keys[i]];
            } else {
                obj[name] = StudentCategoryDetailsData[name];
                obj[name].value = value;
            }
        }
        setStudentCategoryDetailsData(obj);
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
                            <li className="nav-item"> <a className="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Create Student Category</a> </li>
                        </ul>
                        <div className="tab-content px-1 py-1">
                            <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                aria-labelledby="base-tab11">
                                <form onSubmit={handleOnSubmitStudentCategoryDetails} id="StudentCategoryDetailsForm">
                                    <div className="row">
                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Student Category Name{stateValidatorSchemaStudentCategoryDetails.StudentCategoryName.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsStudentCategoryDetails.StudentCategoryName && dirtyStudentCategoryDetails.StudentCategoryName ? 'has-error' :
                                                            (dirtyStudentCategoryDetails.StudentCategoryName ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="StudentCategoryName" placeholder="Student Category Name"
                                                    type="text"
                                                    value={StudentCategoryDetailsData.StudentCategoryName.value}
                                                    onChange={e => { handleOnChangeStudentCategoryDetails(e); onInputChangeControllerStudentCategoryDetails(e) }}
                                                />

                                            </div>
                                            {errorsStudentCategoryDetails.StudentCategoryName && dirtyStudentCategoryDetails.StudentCategoryName && (
                                                <span className="error-label mt-2">{errorsStudentCategoryDetails.StudentCategoryName}</span>
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
                                                        checked={String(StudentCategoryDetailsData.IsActive.value) === String(true)}
                                                        onChange={e => { handleOnChangeStudentCategoryDetails(e); onInputChangeControllerStudentCategoryDetails(e) }}
                                                    />
                                                    <label className="form-check-label" htmlFor="IsActiveTrue">Active</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="IsActiveFalse"
                                                        value="false"
                                                        checked={String(StudentCategoryDetailsData.IsActive.value) === String(false)}
                                                        onChange={e => { handleOnChangeStudentCategoryDetails(e); onInputChangeControllerStudentCategoryDetails(e) }}
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
                                                            id="btnStudentCategoryDetails"
                                                            disabled={disableStudentCategoryDetails}
                                                        >Submit</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            onClick={btnClearStudentCategoryDetails}
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

export default AddEditAcadMstSetupStudentCategory;
