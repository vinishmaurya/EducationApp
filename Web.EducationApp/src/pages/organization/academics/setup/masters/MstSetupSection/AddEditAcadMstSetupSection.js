/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit Section Details
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

const AddEditAcadMstSetupSection = (props) => {
    debugger;
    let propData = props.dataRow;
    //console.log(props);

    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    //#endregion

    //#region Section details form: define state, schema & validations
    // Define your state schema
    const stateSchemaSectionDetails = {
        SectionName: { value: propData ? propData.SectionName : '', error: "This Section name field is required!" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!!" }
    };
    const [SectionDetailsData, setSectionDetailsData] = useState(stateSchemaSectionDetails);
    // Create your own validationstateSchemaSectionDetails
    // stateSchemaSectionDetails property should be the same in validationstateSchemaSectionDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaSectionDetails = {
        SectionName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid Section name format."
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
        values: valuesSectionDetails,
        errors: errorsSectionDetails,
        dirty: dirtySectionDetails,
        handleOnChange: handleOnChangeSectionDetails,
        handleOnSubmit: handleOnSubmitSectionDetails,
        disable: disableSectionDetails,
        handleOnClear: handleOnClearSectionDetails
    } = useFormValidator(stateSchemaSectionDetails, stateValidatorSchemaSectionDetails, onSubmitFormSectionDetails);

    //#endregion



    useEffect(() => {
        //debugger;
        console.log(propData);
        //console.log(stateSchemaSectionDetails);
        //#region set default value of forms use state hooks
        setSectionDetailsData(stateSchemaSectionDetails);
        setCurrentId(propData ? propData.PK_ID : 0);
        //#endregion

    }, [propData]);


    const isComponentMounted = CommonFuncs.useIsComponentMounted();
    if (!isComponentMounted.current) {
        //After Component Load data
        //console.log(propData);
    }

    //#region submit form data and call axios
    //Step 1 : Section Details 
    function onSubmitFormSectionDetails(event, valuesSectionDetails) {
        debugger;
        $("#divStatusRoot").hide();
        $("#divStatusAddEdit").show();
        event.preventDefault();
        const btnPointer = document.querySelector('#btnSectionDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditSectionDetailsUri = APIConfig.Academics.Section.AddEditSectionDetailsUri;
            const formElement = document.querySelector('#SectionDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["SectionId"] = CurrentId;

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
                'url': AddEditSectionDetailsUri ? AddEditSectionDetailsUri : "",
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
                    SectionDetailsData.SectionName.value = "";
                    dirtySectionDetails.SectionName = false;
                    SectionDetailsData.IsActive.value = true;
                    handleOnClearSectionDetails(event);
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
    const btnClearSectionDetails = (event) => {
        //Set default values
        let keys = Object.keys(SectionDetailsData);
        let obj = new Object();
        let currentVal;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'SectionId') { currentVal = 0 }
            else if (keys[i] === 'SectionName') { currentVal = '' }
            else if (keys[i] === 'IsActive') { currentVal = true }
            obj[keys[i]] = SectionDetailsData[keys[i]];
            obj[keys[i]].value = currentVal;
        }
        setSectionDetailsData(obj);
        handleOnClearSectionDetails(event);
    }
    //#endregion

    //#region other form control functions
    const onInputChangeControllerSectionDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(SectionDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = SectionDetailsData[keys[i]];
            } else {
                obj[name] = SectionDetailsData[name];
                obj[name].value = value;
            }
        }
        setSectionDetailsData(obj);
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
                            <li className="nav-item"> <a className="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Create Section</a> </li>
                        </ul>
                        <div className="tab-content px-1 py-1">
                            <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                aria-labelledby="base-tab11">
                                <form onSubmit={handleOnSubmitSectionDetails} id="SectionDetailsForm">
                                    <div className="row">
                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Section Name{stateValidatorSchemaSectionDetails.SectionName.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsSectionDetails.SectionName && dirtySectionDetails.SectionName ? 'has-error' :
                                                            (dirtySectionDetails.SectionName ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="SectionName" placeholder="Section Name"
                                                    type="text"
                                                    value={SectionDetailsData.SectionName.value}
                                                    onChange={e => { handleOnChangeSectionDetails(e); onInputChangeControllerSectionDetails(e) }}
                                                />

                                            </div>
                                            {errorsSectionDetails.SectionName && dirtySectionDetails.SectionName && (
                                                <span className="error-label mt-2">{errorsSectionDetails.SectionName}</span>
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
                                                        checked={String(SectionDetailsData.IsActive.value) === String(true)}
                                                        onChange={e => { handleOnChangeSectionDetails(e); onInputChangeControllerSectionDetails(e) }}
                                                    />
                                                    <label className="form-check-label" htmlFor="IsActiveTrue">Active</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="IsActiveFalse"
                                                        value="false"
                                                        checked={String(SectionDetailsData.IsActive.value) === String(false)}
                                                        onChange={e => { handleOnChangeSectionDetails(e); onInputChangeControllerSectionDetails(e) }}
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
                                                            id="btnSectionDetails"
                                                            disabled={disableSectionDetails}
                                                        >Finish</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            onClick={btnClearSectionDetails}
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

export default AddEditAcadMstSetupSection;
