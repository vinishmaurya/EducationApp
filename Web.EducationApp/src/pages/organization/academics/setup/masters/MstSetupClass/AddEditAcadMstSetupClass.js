/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit Class Details
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

const AddEditAcadMstSetupClass = (props) => {
    //debugger;
    let propData = props.dataRow;
    //console.log(propData ? propData.IsActive : '');

    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    var numberRegex = /^[0-9]+$/;
    //#endregion

    //#region Class details form: define state, schema & validations
    // Define your state schema
    const stateSchemaClassDetails = {
        MediumId: { value: propData ? propData.MediumId : 0, error: "This medium field selection is required!" },
        ClassName: { value: propData ? propData.ClassName : '', error: "This class name field is required!" },
        SectionIds: { value: propData ? propData.SectionIds : '', error: "This section field selection is required!" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!" }
    };
    const [ClassDetailsData, setClassDetailsData] = useState(stateSchemaClassDetails);
    // Create your own validationstateSchemaClassDetails
    // stateSchemaClassDetails property should be the same in validationstateSchemaClassDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaClassDetails = {
        MediumId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid medium id format."
            }
        },
        ClassName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid Class name format."
            }
        },
        SectionIds: {
            required: true,
            //validator: {
            //    func: value => name1to50Regex.test(value),
            //    error: "Invalid Class type format."
            //}
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
    const [BtnSubmitText, setBtnSubmitText] = useState(propData ? 'Update' : 'Submit');
    const [AllMediumList, setAllMediumList] = useState([]);
    const [AllSectionList, setAllSectionList] = useState([]);

    //#endregion

    //#region define custom forms validation hooks
    const {
        values: valuesClassDetails,
        errors: errorsClassDetails,
        dirty: dirtyClassDetails,
        handleOnChange: handleOnChangeClassDetails,
        handleOnSubmit: handleOnSubmitClassDetails,
        disable: disableClassDetails,
        handleOnClear: handleOnClearClassDetails
    } = useFormValidator(stateSchemaClassDetails, stateValidatorSchemaClassDetails, onSubmitFormClassDetails);

    //#endregion



    useEffect(() => {
        //debugger;
        //#region set default value of forms use state hooks
        setClassDetailsData(stateSchemaClassDetails);
        setCurrentId(propData ? propData.PK_ID : 0);
        setBtnSubmitText(propData ? 'Update' : 'Submit');
        //if prop present to edit make form dirty
        if (propData) {
            let keys = Object.keys(dirtyClassDetails);
            for (var i = 0; i < keys.length; i++) {
                dirtyClassDetails[keys[i]] = true;
                errorsClassDetails[keys[i]] = false;
            }
        }
        //#endregion

        //#region bind default data for forms
        fetchAllMediumList();
        fetchAllSectionList();
        //#endregion

    }, [propData]);


    const isComponentMounted = CommonFuncs.useIsComponentMounted();
    if (!isComponentMounted.current) {
        //After Component Load data
        //console.log(propData);
    }

    //#region bind funcs to call axios
    const fetchAllMediumList = async () => {
        //debugger;
        let apiUri = APIConfig.Academics.Common.GetAllMediumListUri;

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
            //console.log(response);
            if (response.data.Result) {
                let MediumList = [];
                response.data.Data.map((data, i) => {
                    MediumList.push({ ListValue: data.MediumId, ListText: data.MediumName });
                });
                setAllMediumList(MediumList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    const fetchAllSectionList = async () => {
        //debugger;
        let apiUri = APIConfig.Academics.Common.GetAllSectionListUri;

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
            //console.log(response);
            if (response.data.Result) {
                let SectionList = [];
                response.data.Data.map((data, i) => {
                    SectionList.push({ ListValue: data.SectionId, ListText: data.SectionName });
                });
                setAllSectionList(SectionList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    //#endregion

    //#region submit form data and call axios
    //Step 1 : Class Details 
    function onSubmitFormClassDetails(event, valuesClassDetails) {
        debugger;
        $("#divStatusRoot").hide();
        $("#divStatusAddEdit").show();
        event.preventDefault();
        const btnPointer = document.querySelector('#btnClassDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditClassDetailsUri = APIConfig.Academics.Class.AddEditClassDetailsUri;
            const formElement = document.querySelector('#ClassDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["SectionIds"] = ClassDetailsData.SectionIds.value;
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["ClassId"] = CurrentId;

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
                'url': AddEditClassDetailsUri ? AddEditClassDetailsUri : "",
                'data': reqBody
            }).then((response) => {
                if (response.data && response.data.Result) {
                    //btnPointer.innerHTML = BtnSubmitText;
                    setBtnSubmitText('Submit');
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                    setCurrentId(0);

                    //Clear form
                    let keys = Object.keys(dirtyClassDetails);
                    for (var i = 0; i < keys.length; i++) {
                        if (keys[i] === "MediumId") {
                            ClassDetailsData[keys[i]].value = 0;
                        }
                        else if (keys[i] === "IsActive") {
                            ClassDetailsData[keys[i]].value = true;
                        }
                        else {
                            ClassDetailsData[keys[i]].value = '';
                        }
                    }
                    for (var i = 0; i < keys.length; i++) {
                        dirtyClassDetails[keys[i]] = false;
                    }
                    handleOnClearClassDetails(event);
                    //Reload Grid
                    props.funcBackToIndex();
                }
                else {
                    setHasAPIError(!response.data.Result);
                    setHasAPIMessage(response.data.Message);
                    setHasAPIDescription(response.data.Description);
                }
                btnPointer.innerHTML = BtnSubmitText;
                btnPointer.removeAttribute('disable');
            }).catch((e) => {
                //console.log(e);
                //return e;
                setHasAPIError(true);
                setHasAPIMessage(e.message);
                btnPointer.innerHTML = BtnSubmitText;
                btnPointer.removeAttribute('disable');
            });

        } catch (e) {
            setHasAPIError(true);
            setHasAPIMessage(e.message);
            //console.log(e);
            btnPointer.innerHTML = BtnSubmitText;
            btnPointer.removeAttribute('disable');
        }

    }

    //#endregion


    //#region clear form data and call axios
    const btnClearClassDetails = (event) => {
        debugger;
        //Set default values
        let keys = Object.keys(ClassDetailsData);
        let obj = new Object();
        let currentVal;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'ClassId') { currentVal = 0 }
            else if (keys[i] === 'IsActive') { currentVal = true }
            else { currentVal = '' }
            obj[keys[i]] = ClassDetailsData[keys[i]];
            obj[keys[i]].value = currentVal;
        }
        setClassDetailsData(obj);
        handleOnClearClassDetails(event);
    }
    //#endregion

    //#region other form control functions
    const onInputChangeControllerClassDetails = (event) => {
        debugger;
        const target = event.target;
        let value = target.value;
        if (target.type === 'checkbox') {
            let SectionIds = '';
            $("#divSectionCheckBoxes > input").each(function () {
                if ($(this).is(':checked')) {
                    SectionIds += $.trim($(this).val()) + ",";
                }
            });
            SectionIds = SectionIds.substr(0, SectionIds.length - 1);
            value = SectionIds;
        }
        const name = target.name;
        let keys = Object.keys(ClassDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = ClassDetailsData[keys[i]];
            } else {
                obj[name] = ClassDetailsData[name];
                obj[name].value = value;
            }
        }
        setClassDetailsData(obj);
    };
    const funcFindRadioButtons = (event) => {
        return AllMediumList.map((data, i) => {
            //console.log(data);
            let uniqueKey = CommonFuncs.funcUniqueKey(i);
            let uniqueKey1 = CommonFuncs.funcUniqueKey(i + AllMediumList.length + 1);
            let uniqueKey2 = CommonFuncs.funcUniqueKey(i + AllMediumList.length + 2);
            return (
                <div key={uniqueKey} className="form-check form-check-inline">
                    <input key={uniqueKey1} className="form-check-input" type="radio" name="MediumId" id={"MediumnId_" + data.ListValue}
                        value={data.ListValue}
                        checked={Number(ClassDetailsData.MediumId.value) === data.ListValue}
                        onChange={e => { handleOnChangeClassDetails(e); onInputChangeControllerClassDetails(e) }}
                    />
                    <label key={uniqueKey2} className="form-check-label" htmlFor={"MediumnId_" + data.ListValue}>{data.ListText}</label>
                </div>
            );
        });
    };

    const funcBindSectionCheckBoxes = (event) => {
        return AllSectionList.map((data, i) => {
            //console.log(data);
            let uniqueKey = CommonFuncs.funcUniqueKey(i);
            let uniqueKey1 = CommonFuncs.funcUniqueKey(i + AllSectionList.length + 1);
            let uniqueKey2 = CommonFuncs.funcUniqueKey(i + AllSectionList.length + 2);
            return (
                <div key={uniqueKey} className="form-check" id="divSectionCheckBoxes">
                    <input key={uniqueKey1} className="form-check-input" type="checkbox"
                        value={data.ListValue} id={"SectionId_" + data.ListValue}
                        name="SectionIds"
                        checked={ClassDetailsData.SectionIds.value.split(',').includes(String(data.ListValue))}
                        onChange={e => { handleOnChangeClassDetails(e); onInputChangeControllerClassDetails(e) }}
                    />
                    <label key={uniqueKey2} className="form-check-label" htmlFor={"SectionId_" + data.ListValue}>{data.ListText}</label>
                </div>
            );
        });
    }

   
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
                            <li className="nav-item"> <a className="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Create Class</a> </li>
                        </ul>
                        <div className="tab-content px-1 py-1">
                            <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                aria-labelledby="base-tab11">
                                <form onSubmit={handleOnSubmitClassDetails} id="ClassDetailsForm">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Medium
                                                    {stateValidatorSchemaClassDetails.MediumId.required && (<span className="red">*</span>)}
                                                </label>
                                                <br />
                                                {funcFindRadioButtons()}
                                                {errorsClassDetails.MediumId && dirtyClassDetails.MediumId && (
                                                    <span className="error-label mt-2">{errorsClassDetails.MediumId}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Class Name{stateValidatorSchemaClassDetails.ClassName.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsClassDetails.ClassName && dirtyClassDetails.ClassName ? 'has-error' :
                                                            (dirtyClassDetails.ClassName ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="ClassName" placeholder="Class Name"
                                                    type="text"
                                                    value={ClassDetailsData.ClassName.value}
                                                    onChange={e => { handleOnChangeClassDetails(e); onInputChangeControllerClassDetails(e) }}
                                                />

                                            </div>
                                            {errorsClassDetails.ClassName && dirtyClassDetails.ClassName && (
                                                <span className="error-label mt-2">{errorsClassDetails.ClassName}</span>
                                            )}
                                        </div>

                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Sections
                                                    {stateValidatorSchemaClassDetails.SectionIds.required && (<span className="red">*</span>)}
                                                </label>
                                                <br />
                                                {funcBindSectionCheckBoxes()}
                                                {errorsClassDetails.SectionIds && dirtyClassDetails.SectionIds && (
                                                    <span className="error-label mt-2">{errorsClassDetails.SectionIds}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Status
                                                </label>
                                                <br />
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="IsActiveTrue"
                                                        value="true"
                                                        checked={String(ClassDetailsData.IsActive.value) === String(true)}
                                                        onChange={e => { handleOnChangeClassDetails(e); onInputChangeControllerClassDetails(e) }}
                                                    />
                                                    <label className="form-check-label" htmlFor="IsActiveTrue">Active</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="IsActiveFalse"
                                                        value="false"
                                                        checked={String(ClassDetailsData.IsActive.value) === String(false)}
                                                        onChange={e => { handleOnChangeClassDetails(e); onInputChangeControllerClassDetails(e) }}
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
                                                            id="btnClassDetails"
                                                            disabled={disableClassDetails}
                                                        >{BtnSubmitText}</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            onClick={btnClearClassDetails}
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

export default AddEditAcadMstSetupClass;
