/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit Form Details
 * --------------------------------------------------------------------------
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import APIConfig from "../../../../../config/api.config.json";
import reqBody from "../../../../../models/reqBody.Model";
import useFormValidator from "../../../../../util/useFormValidator";
import CustomDropdown from "../../../../../core/components/dropdown/CustomDropdown";
import { $ } from 'react-jquery-plugin';
import CommonFuncs from "../../../../../util/common.funcs";

require('dotenv').config();

const AddEditMstForm = (props) => {
    let propData = props.dataRow;
    //console.log(propData);
    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    var numberRegex = /^[0-9]+$/;
    //#endregion


    //#region Form details form: define state, schema & validations
    // Define your state schema
    const stateSchemaFormDetails = {
        FormName: { value: propData ? propData.FormName : '', error: "This form name field is required!" },
        ComponentName: { value: propData ? propData.ComponentName : '', error: "This component name field is required!" },
        ComponentPath: { value: propData ? propData.ComponentPath : '', error: "This component path field is required!" },
        ParentFormId: { value: propData ? propData.ParentId : '', error: "This parent form field selection is required!" },
        LandingComponentName: { value: propData ? propData.ActionName : '', error: "This landing component name field is required!" },
        //SolutionId: { value: propData ? propData.SolutionId : '', error: "This Form name field is required!" },
        ClassName: { value: propData ? propData.ClassName : '', error: "This class name field is required!" },
        Area: { value: propData ? propData.Area : '', error: "This parent area is required!" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!!" },
        PlatFormType: { value: propData ? propData.PlatFormType : '', error: "This platform type field is required!!" }
    };
    const [FormDetailsData, setFormDetailsData] = useState(stateSchemaFormDetails);
    // Create your own validationstateSchemaFormDetails
    // stateSchemaFormDetails property should be the same in validationstateSchemaFormDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaFormDetails = {
        FormName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid form name format."
            }
        },
        ComponentName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid component name format."
            }
        },
        ComponentPath: {
            required: true
        },
        ParentFormId: {
            required: false,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid parent form selection format."
            }
        },
        LandingComponentName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid landing component name format."
            }
        },
        ClassName: {
            required: false,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid class name format."
            }
        },
        Area: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid area format."
            }
        },
        IsActive: {
            required: false
        },
        PlatFormType: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid email id format."
            }
        }
    };
    //#endregion


    //#region define use state hooks
    const [HasAPIError, setHasAPIError] = useState(false);
    const [HasAPISuccess, setHasAPISuccess] = useState(false);
    const [HasAPIMessage, setHasAPIMessage] = useState("");
    const [HasAPIDescription, setHasAPIDescription] = useState("");
    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken', 'loggedInUserId']);
    const [AllParentFormList, setAllParentFormList] = useState([]);

    const [CurrentId, setCurrentId] = useState(propData ? propData.PK_ID : 0);

    //#endregion


    //#region define custom forms validation hooks
    const {
        values: valuesFormDetails,
        errors: errorsFormDetails,
        dirty: dirtyFormDetails,
        handleOnChange: handleOnChangeFormDetails,
        handleOnSubmit: handleOnSubmitFormDetails,
        disable: disableFormDetails,
        handleOnClear: handleOnClearFormDetails
    } = useFormValidator(stateSchemaFormDetails, stateValidatorSchemaFormDetails, onSubmitFormFormDetails);

    //#endregion



    useEffect(() => {
        //debugger;

        //#region bind default data for forms
        fetchAllParentFormList();
        //#endregion

        //#region set default value of forms use state hooks
        setFormDetailsData(stateSchemaFormDetails);
        setCurrentId(propData ? propData.PK_ID : 0);
        //#endregion
    }, []);



    const fetchAllParentFormList = async () => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllParentFormsListUri;

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
                    DataList.push({ ListValue: data.FormId, ListText: data.FormName });
                });
                setAllParentFormList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };


    //Step 1 : Form Details 
    function onSubmitFormFormDetails(event, valuesFormDetails) {
        //debugger;
        event.preventDefault();
        const btnPointer = document.querySelector('#btnFormDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditFormDetailsUri = APIConfig.Admin.Form.AddEditFormDetailsUri;
            const formElement = document.querySelector('#FormDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["FormId"] = CurrentId;

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
                'url': AddEditFormDetailsUri ? AddEditFormDetailsUri : "",
                'data': reqBody
            }).then((response) => {
                
                if (response.data && response.data.Result) {
                    btnPointer.innerHTML = 'Save & Next';
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
                btnPointer.innerHTML = 'Save & Next';
                btnPointer.removeAttribute('disable');
            }).catch((e) => {
                //console.log(e);
                //return e;
                setHasAPIError(true);
                setHasAPIMessage(e.message);
                btnPointer.innerHTML = 'Save & Next';
                btnPointer.removeAttribute('disable');
            });

        } catch (e) {
            setHasAPIError(true);
            setHasAPIMessage(e.message);
            //console.log(e);
            btnPointer.innerHTML = 'Save & Next';
            btnPointer.removeAttribute('disable');
        }

        //setTimeout(() => {
        //setFormDetailsData(formDataJSON);
        //btnPointer.innerHTML = 'Save & Next';
        //btnPointer.removeAttribute('disable');
        //}, 500);
        //document.querySelector('#AdditionalInfo').click();
        //console.log(FormDetailsData);
    }

    const onInputChangeControllerFormDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(FormDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = FormDetailsData[keys[i]];
            } else {
                obj[name] = FormDetailsData[name];
                obj[name].value = value;
            }
        }
        setFormDetailsData(obj);
    };

    const btnClearFormDetails = (event) => {
        setFormDetailsData(stateSchemaFormDetails);
        handleOnClearFormDetails(event);
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
                            <section className="NewformTabs">
                                <ul className="nav nav-tabs nav-top-border no-hover-bg">
                                    <li className="nav-item"> <a className="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Form Details</a> </li>
                                </ul>

                                <div className="tab-content px-1 py-1">
                                    <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                        aria-labelledby="base-tab11">
                                        <form onSubmit={handleOnSubmitFormDetails} id="FormDetailsForm">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Form Name
                                                        {stateValidatorSchemaFormDetails.FormName.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <input
                                                            className={"form-control " +
                                                                (errorsFormDetails.FormName && dirtyFormDetails.FormName ? 'has-error' :
                                                                    (dirtyFormDetails.FormName ? 'has-success' : ''))
                                                            }
                                                            data-val="true"
                                                            maxLength="50" name="FormName" placeholder="Form Name"
                                                            type="text"
                                                            value={FormDetailsData.FormName.value}
                                                            onChange={e => { handleOnChangeFormDetails(e); onInputChangeControllerFormDetails(e) }}
                                                        />
                                                    </div>
                                                    {errorsFormDetails.FormName && dirtyFormDetails.FormName && (
                                                        <span className="error-label mt-2">{errorsFormDetails.FormName}</span>
                                                    )}
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Component Name
                                                        {stateValidatorSchemaFormDetails.ComponentName.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <input
                                                            className={"form-control " +
                                                                (errorsFormDetails.ComponentName && dirtyFormDetails.ComponentName ? 'has-error' :
                                                                    (dirtyFormDetails.ComponentName ? 'has-success' : ''))
                                                            }
                                                            data-val="true"
                                                            maxLength="50" name="ComponentName" placeholder="Component Name"
                                                            type="text"
                                                            value={FormDetailsData.ComponentName.value}
                                                            onChange={e => { handleOnChangeFormDetails(e); onInputChangeControllerFormDetails(e) }}
                                                        />
                                                    </div>
                                                    {errorsFormDetails.ComponentName && dirtyFormDetails.ComponentName && (
                                                        <span className="error-label mt-2">{errorsFormDetails.ComponentName}</span>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="row mt-3 mb-3">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Component Path
                                                        {stateValidatorSchemaFormDetails.ComponentPath.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <input
                                                            className={"form-control " +
                                                                (errorsFormDetails.ComponentPath && dirtyFormDetails.ComponentPath ? 'has-error' :
                                                                    (dirtyFormDetails.ComponentPath ? 'has-success' : ''))
                                                            }
                                                            data-val="true"
                                                            maxLength="200" name="ComponentPath" placeholder="Component Path"
                                                            type="text"
                                                            value={FormDetailsData.ComponentPath.value}
                                                            onChange={e => { handleOnChangeFormDetails(e); onInputChangeControllerFormDetails(e) }}
                                                        />
                                                    </div>
                                                    {errorsFormDetails.ComponentPath && dirtyFormDetails.ComponentPath && (
                                                        <span className="error-label mt-2">{errorsFormDetails.ComponentPath}</span>
                                                    )}
                                                </div>

                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Landing Component Name
                                                        {stateValidatorSchemaFormDetails.LandingComponentName.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <input
                                                            className={"form-control " +
                                                                (errorsFormDetails.LandingComponentName && dirtyFormDetails.LandingComponentName ? 'has-error' :
                                                                    (dirtyFormDetails.LandingComponentName ? 'has-success' : ''))
                                                            }
                                                            data-val="true"
                                                            maxLength="50" name="LandingComponentName" placeholder="Landing Component Name"
                                                            type="text"
                                                            value={FormDetailsData.LandingComponentName.value}
                                                            onChange={e => { handleOnChangeFormDetails(e); onInputChangeControllerFormDetails(e) }}
                                                        />
                                                    </div>
                                                    {errorsFormDetails.LandingComponentName && dirtyFormDetails.LandingComponentName && (
                                                        <span className="error-label mt-2">{errorsFormDetails.LandingComponentName}</span>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="row mt-3 mb-3">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Parent Component
                                                        {stateValidatorSchemaFormDetails.ParentFormId.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <select
                                                            className={"form-control " +
                                                                (errorsFormDetails.ParentFormId && dirtyFormDetails.ParentFormId ? 'has-error' :
                                                                    (dirtyFormDetails.ParentFormId ? 'has-success' : ''))
                                                            }
                                                            name="ParentFormId"
                                                            value={FormDetailsData.ParentFormId.value}
                                                            onChange={e => { handleOnChangeFormDetails(e); onInputChangeControllerFormDetails(e) }}
                                                        >
                                                            {CommonFuncs.funcBindSelectOptons(AllParentFormList)}
                                                        </select>
                                                    </div>
                                                    {errorsFormDetails.ParentFormId && dirtyFormDetails.ParentFormId && (
                                                        <span className="error-label mt-2">{errorsFormDetails.ParentFormId}</span>
                                                    )}
                                                </div>

                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Class Name
                                                        {stateValidatorSchemaFormDetails.ClassName.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <input
                                                            className={"form-control " +
                                                                (errorsFormDetails.ClassName && dirtyFormDetails.ClassName ? 'has-error' :
                                                                    (dirtyFormDetails.ClassName ? 'has-success' : ''))
                                                            }
                                                            data-val="true"
                                                            maxLength="50" name="ClassName" placeholder="Class Name"
                                                            type="text"
                                                            value={FormDetailsData.ClassName.value}
                                                            onChange={e => { handleOnChangeFormDetails(e); onInputChangeControllerFormDetails(e) }}
                                                        />
                                                    </div>
                                                    {errorsFormDetails.ClassName && dirtyFormDetails.ClassName && (
                                                        <span className="error-label mt-2">{errorsFormDetails.ClassName}</span>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="row mt-3 mb-3">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Area
                                                        {stateValidatorSchemaFormDetails.Area.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <select
                                                            className={"form-control " +
                                                                (errorsFormDetails.Area && dirtyFormDetails.Area ? 'has-error' :
                                                                    (dirtyFormDetails.Area ? 'has-success' : ''))
                                                            }
                                                            name="Area"
                                                            value={FormDetailsData.Area.value}
                                                            onChange={e => { handleOnChangeFormDetails(e); onInputChangeControllerFormDetails(e) }}
                                                        >
                                                            <option value="">--Select--</option>
                                                            <option value="Admin">Admin</option>
                                                        </select>
                                                    </div>
                                                    {errorsFormDetails.Area && dirtyFormDetails.Area && (
                                                        <span className="error-label mt-2">{errorsFormDetails.Area}</span>
                                                    )}
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Platform Type (Web/Mobile)
                                                        {stateValidatorSchemaFormDetails.PlatFormType.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <select
                                                            className={"form-control " +
                                                                (errorsFormDetails.PlatFormType && dirtyFormDetails.PlatFormType ? 'has-error' :
                                                                    (dirtyFormDetails.PlatFormType ? 'has-success' : ''))
                                                            }
                                                            name="PlatFormType"
                                                            value={FormDetailsData.PlatFormType.value}
                                                            onChange={e => { handleOnChangeFormDetails(e); onInputChangeControllerFormDetails(e) }}
                                                        >
                                                            <option value="">--Select--</option>
                                                            <option value="Web">Web</option>
                                                            <option value="Mobile">Mobile</option>
                                                        </select>
                                                    </div>
                                                    {errorsFormDetails.PlatFormType && dirtyFormDetails.PlatFormType && (
                                                        <span className="error-label mt-2">{errorsFormDetails.PlatFormType}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row mt-3 mb-3">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Status
                                                        {stateValidatorSchemaFormDetails.FormName.required && (<span className="red">*</span>)}
                                                        </label>
                                                        <br />
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio1"
                                                                value="true"
                                                                defaultChecked={FormDetailsData.IsActive.value === true}
                                                                onChange={e => { handleOnChangeFormDetails(e); onInputChangeControllerFormDetails(e) }}
                                                            />
                                                            <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio2"
                                                                value="false"
                                                                defaultChecked={FormDetailsData.IsActive.value === false}
                                                                onChange={e => { handleOnChangeFormDetails(e); onInputChangeControllerFormDetails(e) }}
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
                                                                    id="btnFormDetails"
                                                                    className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1"
                                                                    disabled={disableFormDetails}
                                                                >Submit</button>
                                                            </div>
                                                            <div style={{ margin: '10px' }}>
                                                                <button type="button"
                                                                    className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                                    id="btnClearFormDetails"
                                                                    onClick={btnClearFormDetails}
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

export default AddEditMstForm;
