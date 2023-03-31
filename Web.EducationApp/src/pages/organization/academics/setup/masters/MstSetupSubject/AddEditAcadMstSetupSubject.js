/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit Subject Details
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

const AddEditAcadMstSetupSubject = (props) => {
    //debugger;
    let propData = props.dataRow;
    console.log(propData ? propData.IsActive : '');

    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    var numberRegex = /^[0-9]+$/;
    //#endregion

    //#region Subject details form: define state, schema & validations
    // Define your state schema
    const stateSchemaSubjectDetails = {
        MediumId: { value: propData ? propData.MediumId : 0, error: "This medium field selection is required!" },
        SubjectName: { value: propData ? propData.SubjectName : '', error: "This Subject name field is required!" },
        SubjectType: { value: propData ? propData.SubjectType : '', error: "This subject type field selection is required!!" },
        SubjectCode: { value: propData ? propData.SubjectCode : '', error: "This subject code field is required!" },
        BackgroundColorCode: { value: propData ? propData.BackgroundColorCode : '#ffffff', error: "This background color code field is required!" },
        SubjectImage: { value: File, error: "This subject image selection field is required!" },
        SubjectImageUrl: { value: propData ? propData.SubjectImageUrl : '', error: "" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!" }
    };
    const [SubjectDetailsData, setSubjectDetailsData] = useState(stateSchemaSubjectDetails);
    // Create your own validationstateSchemaSubjectDetails
    // stateSchemaSubjectDetails property should be the same in validationstateSchemaSubjectDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaSubjectDetails = {
        MediumId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid medium id format."
            }
        },
        SubjectName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid subject name format."
            }
        },
        SubjectType: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid subject type format."
            }
        },
        SubjectCode: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid subject code format."
            }
        },
        BackgroundColorCode: {
            required: false
        },
        SubjectImage: {
            required: ((propData ? propData.SubjectImageUrl : false) ? false : true)
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

    //#endregion

    //#region define custom forms validation hooks
    const {
        values: valuesSubjectDetails,
        errors: errorsSubjectDetails,
        dirty: dirtySubjectDetails,
        handleOnChange: handleOnChangeSubjectDetails,
        handleOnSubmit: handleOnSubmitSubjectDetails,
        disable: disableSubjectDetails,
        handleOnClear: handleOnClearSubjectDetails
    } = useFormValidator(stateSchemaSubjectDetails, stateValidatorSchemaSubjectDetails, onSubmitFormSubjectDetails);

    //#endregion



    useEffect(() => {
        //debugger;
        //#region set default value of forms use state hooks
        setSubjectDetailsData(stateSchemaSubjectDetails);
        setCurrentId(propData ? propData.PK_ID : 0);
        setBtnSubmitText(propData ? 'Update' : 'Submit');
        //if prop present to edit make form dirty
        if (propData) {
            let keys = Object.keys(dirtySubjectDetails);
            for (var i = 0; i < keys.length; i++) {
                dirtySubjectDetails[keys[i]] = true;
                errorsSubjectDetails[keys[i]] = false;
            }
        }
        //#endregion

        //#region bind default data for forms
        fetchAllMediumList();
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
    //#endregion

    //#region submit form data and call axios
    //Step 1 : Subject Details 
    function onSubmitFormSubjectDetails(event, valuesSubjectDetails) {
        //debugger;
        $("#divStatusRoot").hide();
        $("#divStatusAddEdit").show();
        event.preventDefault();
        const btnPointer = document.querySelector('#btnSubjectDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditSubjectDetailsUri = APIConfig.Academics.Subject.AddEditSubjectDetailsUri;
            const formElement = document.querySelector('#SubjectDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["SubjectImageUrl"] = SubjectDetailsData.SubjectImageUrl.value;
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["SubjectId"] = CurrentId;

            const bodyFormData = new FormData();
            bodyFormData.append('SubjectDetails', JSON.stringify(formDataJSON));
            bodyFormData.append('SubjectImage', formDataJSON.SubjectImage);

            const instance = axios.create({
                baseURL: process.env.REACT_APP_APIBaseUri,
                headers: {
                    'content-type': 'multipart/form-data',
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
                'url': AddEditSubjectDetailsUri ? AddEditSubjectDetailsUri : "",
                'data': bodyFormData
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
                    SubjectDetailsData.MediumId.value = 0;
                    SubjectDetailsData.SubjectName.value = "";
                    SubjectDetailsData.SubjectType.value = "";
                    SubjectDetailsData.SubjectCode.value = "";
                    SubjectDetailsData.BackgroundColorCode.value = "";
                    SubjectDetailsData.SubjectImage.value = File;
                    SubjectDetailsData.SubjectImageUrl.value = "";
                    SubjectDetailsData.IsActive.value = true;

                    dirtySubjectDetails.MediumId = false;
                    dirtySubjectDetails.SubjectName = false;
                    dirtySubjectDetails.SubjectType = false;
                    dirtySubjectDetails.SubjectCode = false;
                    dirtySubjectDetails.BackgroundColorCode = false;
                    dirtySubjectDetails.SubjectImage = false;
                    dirtySubjectDetails.SubjectImageUrl = false;
                    dirtySubjectDetails.SubjectDetailsData = false;
                    dirtySubjectDetails.IsActive = false;

                    handleOnClearSubjectDetails(event);
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
    const btnClearSubjectDetails = (event) => {
        debugger;
        //Set default values
        let keys = Object.keys(SubjectDetailsData);
        let obj = new Object();
        let currentVal;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'MediumId') { currentVal = 0 }
            else if (keys[i] === 'SubjectName') { currentVal = '' }
            else if (keys[i] === 'SubjectType') { currentVal = '' }
            else if (keys[i] === 'SubjectCode') { currentVal = '' }
            else if (keys[i] === 'BackgroundColorCode') { currentVal = '' }
            else if (keys[i] === 'SubjectImage') { currentVal = File }
            else if (keys[i] === 'SubjectImageUrl') { currentVal = '' }
            else if (keys[i] === 'IsActive') { currentVal = true }
            obj[keys[i]] = SubjectDetailsData[keys[i]];
            obj[keys[i]].value = currentVal;
        }
        setSubjectDetailsData(obj);
        handleOnClearSubjectDetails(event);
    }
    //#endregion

    //#region other form control functions
    const onInputChangeControllerSubjectDetails = (event) => {
        debugger;
        const target = event.target;
        const value = target.type === 'file' ? target.files[0] : target.value;
        const name = target.name;
        let keys = Object.keys(SubjectDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = SubjectDetailsData[keys[i]];
            } else {
                obj[name] = SubjectDetailsData[name];
                obj[name].value = value;
            }
        }
        setSubjectDetailsData(obj);
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
                        checked={Number(SubjectDetailsData.MediumId.value) === data.ListValue}
                        onChange={e => { handleOnChangeSubjectDetails(e); onInputChangeControllerSubjectDetails(e) }}
                    />
                    <label key={uniqueKey2} className="form-check-label" htmlFor={"MediumnId_" + data.ListValue}>{data.ListText}</label>
                </div>
            );
        });
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
                            <li className="nav-item"> <a className="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Create Subject</a> </li>
                        </ul>
                        <div className="tab-content px-1 py-1">
                            <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                aria-labelledby="base-tab11">
                                <form onSubmit={handleOnSubmitSubjectDetails} id="SubjectDetailsForm">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Medium
                                                    {stateValidatorSchemaSubjectDetails.MediumId.required && (<span className="red">*</span>)}
                                                </label>
                                                <br />
                                                {funcFindRadioButtons()}
                                                {errorsSubjectDetails.MediumId && dirtySubjectDetails.MediumId && (
                                                    <span className="error-label mt-2">{errorsSubjectDetails.MediumId}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Subject Name{stateValidatorSchemaSubjectDetails.SubjectName.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsSubjectDetails.SubjectName && dirtySubjectDetails.SubjectName ? 'has-error' :
                                                            (dirtySubjectDetails.SubjectName ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="SubjectName" placeholder="Subject Name"
                                                    type="text"
                                                    value={SubjectDetailsData.SubjectName.value}
                                                    onChange={e => { handleOnChangeSubjectDetails(e); onInputChangeControllerSubjectDetails(e) }}
                                                />

                                            </div>
                                            {errorsSubjectDetails.SubjectName && dirtySubjectDetails.SubjectName && (
                                                <span className="error-label mt-2">{errorsSubjectDetails.SubjectName}</span>
                                            )}
                                        </div>



                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Subject Type
                                                    {stateValidatorSchemaSubjectDetails.SubjectType.required && (<span className="red">*</span>)}
                                                </label>
                                                <br />
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="SubjectType" id="SubjectTypeTheory"
                                                        value="Theory"
                                                        checked={String(SubjectDetailsData.SubjectType.value) === 'Theory'}
                                                        onChange={e => { handleOnChangeSubjectDetails(e); onInputChangeControllerSubjectDetails(e) }}
                                                    />
                                                    <label className="form-check-label" htmlFor="SubjectTypeTheory">Theory</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="SubjectType" id="SubjectTypePractical"
                                                        value="Practical"
                                                        checked={String(SubjectDetailsData.SubjectType.value) === 'Practical'}
                                                        onChange={e => { handleOnChangeSubjectDetails(e); onInputChangeControllerSubjectDetails(e) }}
                                                    />
                                                    <label className="form-check-label" htmlFor="SubjectTypePractical">Practical</label>
                                                </div>

                                            </div>
                                            {errorsSubjectDetails.SubjectType && dirtySubjectDetails.SubjectType && (
                                                <span className="error-label mt-2">{errorsSubjectDetails.SubjectType}</span>
                                            )}
                                        </div>


                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Subject Code{stateValidatorSchemaSubjectDetails.SubjectCode.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsSubjectDetails.SubjectCode && dirtySubjectDetails.SubjectCode ? 'has-error' :
                                                            (dirtySubjectDetails.SubjectCode ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="SubjectCode" placeholder="Subject Code"
                                                    type="text"
                                                    value={SubjectDetailsData.SubjectCode.value}
                                                    onChange={e => { handleOnChangeSubjectDetails(e); onInputChangeControllerSubjectDetails(e) }}
                                                />

                                            </div>
                                            {errorsSubjectDetails.SubjectCode && dirtySubjectDetails.SubjectCode && (
                                                <span className="error-label mt-2">{errorsSubjectDetails.SubjectCode}</span>
                                            )}
                                        </div>

                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Background Color Code{stateValidatorSchemaSubjectDetails.BackgroundColorCode.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsSubjectDetails.BackgroundColorCode && dirtySubjectDetails.BackgroundColorCode ? 'has-error' :
                                                            (dirtySubjectDetails.BackgroundColorCode ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="BackgroundColorCode" placeholder="Background Color Code"
                                                    type="color"
                                                    value={SubjectDetailsData.BackgroundColorCode.value}
                                                    onChange={e => { handleOnChangeSubjectDetails(e); onInputChangeControllerSubjectDetails(e) }}
                                                />

                                            </div>
                                            {errorsSubjectDetails.BackgroundColorCode && dirtySubjectDetails.BackgroundColorCode && (
                                                <span className="error-label mt-2">{errorsSubjectDetails.BackgroundColorCode}</span>
                                            )}
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Image{stateValidatorSchemaSubjectDetails.SubjectImage.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsSubjectDetails.SubjectImage && dirtySubjectDetails.SubjectImage ? 'has-error' :
                                                            (dirtySubjectDetails.SubjectImage ? 'has-success' : ''))
                                                    }
                                                    type="file"
                                                    onChange={e => { handleOnChangeSubjectDetails(e); onInputChangeControllerSubjectDetails(e) }}

                                                    name="SubjectImage"
                                                />
                                            </div>
                                            {errorsSubjectDetails.SubjectImage && dirtySubjectDetails.SubjectImage && (
                                                <span className="error-label mt-2">{errorsSubjectDetails.SubjectImage}</span>
                                            )}

                                            {
                                                SubjectDetailsData.SubjectImageUrl.value && (
                                                    <>
                                                        <a href={SubjectDetailsData.SubjectImageUrl.value} target="_blank">
                                                            <img
                                                                src={SubjectDetailsData.SubjectImageUrl.value}
                                                                style={{ maxWidth: "40px" }}
                                                                className="img-thumbnail mt-1"
                                                            />
                                                        </a>
                                                    </>
                                                )
                                            }

                                        </div>


                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Status
                                                </label>
                                                <br />
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="IsActiveTrue"
                                                        value="true"
                                                        checked={String(SubjectDetailsData.IsActive.value) === String(true)}
                                                        onChange={e => { handleOnChangeSubjectDetails(e); onInputChangeControllerSubjectDetails(e) }}
                                                    />
                                                    <label className="form-check-label" htmlFor="IsActiveTrue">Active</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="IsActiveFalse"
                                                        value="false"
                                                        checked={String(SubjectDetailsData.IsActive.value) === String(false)}
                                                        onChange={e => { handleOnChangeSubjectDetails(e); onInputChangeControllerSubjectDetails(e) }}
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
                                                            id="btnSubjectDetails"
                                                            disabled={disableSubjectDetails}
                                                        >{BtnSubmitText}</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            onClick={btnClearSubjectDetails}
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

export default AddEditAcadMstSetupSubject;
