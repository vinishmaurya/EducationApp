/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit Chapter Details
 * --------------------------------------------------------------------------
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import APIConfig from "../../../../../../config/api.config.json";
import useFormValidator from "../../../../../../util/useFormValidator";
import { $ } from 'react-jquery-plugin';
import CommonFuncs from "../../../../../../util/common.funcs";
import pdfSample from "../../../../../../assets/images/pdf.png";
import videoSample from "../../../../../../assets/images/video.png";
import youtubeVideoSample from "../../../../../../assets/images/youtube-video.png";
require('dotenv').config();

const AddEditAcadMstSetupChapter = (props) => {
    debugger;
    let propData = props.dataRow;
    //console.log(props);

    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    var numberRegex = /^[0-9]+$/;
    //#endregion

    //#region Chapter details form: define state, schema & validations
    // Define your state schema
    const stateSchemaChapterDetails = {
        SubjectId: { value: propData ? propData.SubjectId : '', error: "This subject field selection is required!" },
        ChapterName: { value: propData ? propData.ChapterName : '', error: "This chapter name field is required!" },
        ChapterDescription: { value: propData ? propData.ChapterDescription : '', error: "This chapter description field is required!" },
        ChapterFile: { value: File, error: "This chapter file selection field is required!" },
        ChapterVideo: { value: File, error: "This chapter video field is required!" },
        ChapterYoutubeVideoLink: { value: propData ? propData.ChapterYoutubeVideoLink : '', error: "This chapter youtube video link field is required!" },
        ChapterFileUri: { value: propData ? propData.ChapterFileUri : '', error: "" },
        ChapterVideoUri: { value: propData ? propData.ChapterVideoUri : '', error: "" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!!" }
    };
    const [ChapterDetailsData, setChapterDetailsData] = useState(stateSchemaChapterDetails);
    // Create your own validationstateSchemaChapterDetails
    // stateSchemaChapterDetails property should be the same in validationstateSchemaChapterDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaChapterDetails = {
        SubjectId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid subject id format."
            }
        },
        ChapterName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid Chapter name format."
            }
        },
        ChapterDescription: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                    error: "Invalid Chapter name format."
            }
        },
        ChapterFile: {
            required: false
        },
        ChapterVideo: {
            required: false
        },
        ChapterYoutubeVideoLink: {
            required: false
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
    const [AllSubjectList, setAllSubjectList] = useState([]);
    const [CurrentId, setCurrentId] = useState(propData ? propData.PK_ID : 0);

    //#endregion

    //#region define custom forms validation hooks
    const {
        values: valuesChapterDetails,
        errors: errorsChapterDetails,
        dirty: dirtyChapterDetails,
        handleOnChange: handleOnChangeChapterDetails,
        handleOnSubmit: handleOnSubmitChapterDetails,
        disable: disableChapterDetails,
        handleOnClear: handleOnClearChapterDetails
    } = useFormValidator(stateSchemaChapterDetails, stateValidatorSchemaChapterDetails, onSubmitFormChapterDetails);

    //#endregion



    useEffect(() => {
        //debugger;
        fetchAllSubjectList();
        //#region set default value of forms use state hooks
        setChapterDetailsData(stateSchemaChapterDetails);
        setCurrentId(propData ? propData.PK_ID : 0);
        //#endregion

    }, [propData]);


    const isComponentMounted = CommonFuncs.useIsComponentMounted();
    if (!isComponentMounted.current) {
        //After Component Load data
        //console.log(propData);
    }

    //#region bind funcs to call axios
    const fetchAllSubjectList = async () => {
        //debugger;
        let apiUri = APIConfig.Academics.Common.GetAllSubjectListUri;
      
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
                    DataList.push({ ListValue: data.SubjectId, ListText: data.SubjectName });
                });
                setAllSubjectList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    //#endregion


    //#region submit form data and call axios
    //Step 1 : Chapter Details 
    function onSubmitFormChapterDetails(event, valuesChapterDetails) {
        debugger;
        $("#divStatusRoot").hide();
        $("#divStatusAddEdit").show();
        event.preventDefault();
        const btnPointer = document.querySelector('#btnChapterDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditChapterDetailsUri = APIConfig.Academics.Chapter.AddEditChapterDetailsUri;
            const formElement = document.querySelector('#ChapterDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["ChapterId"] = CurrentId;

            const bodyFormData = new FormData();
            bodyFormData.append('ChapterDetails', JSON.stringify(formDataJSON));
            bodyFormData.append('ChapterFile', formDataJSON.ChapterFile);
            bodyFormData.append('ChapterVideo', formDataJSON.ChapterVideo);

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
                'url': AddEditChapterDetailsUri ? AddEditChapterDetailsUri : "",
                'data': bodyFormData
            }).then((response) => {
                if (response.data && response.data.Result) {
                    btnPointer.innerHTML = 'Submit';
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                    setCurrentId(0);

                    //Clear form
                    
                    ChapterDetailsData.SubjectId.value = "";
                    ChapterDetailsData.ChapterName.value = "";
                    ChapterDetailsData.ChapterDescription.value = "";
                    ChapterDetailsData.ChapterFile.value = File;
                    ChapterDetailsData.ChapterVideo.value = File;
                    ChapterDetailsData.ChapterYoutubeVideoLink.value = "";
                    ChapterDetailsData.ChapterFileUri.value = "";
                    ChapterDetailsData.ChapterVideoUri.value = "";

                    dirtyChapterDetails.SubjectId = false;
                    dirtyChapterDetails.ChapterName = false;
                    dirtyChapterDetails.ChapterDescription = false;
                    dirtyChapterDetails.ChapterFile = false;
                    dirtyChapterDetails.ChapterVideo = false;
                    dirtyChapterDetails.ChapterYoutubeVideoLink = false;
                    dirtyChapterDetails.ChapterFileUri = false;
                    dirtyChapterDetails.ChapterVideoUri = false;
                    ChapterDetailsData.IsActive.value = true;
                    handleOnClearChapterDetails(event);
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
    const btnClearChapterDetails = (event) => {
        //Set default values
        let keys = Object.keys(ChapterDetailsData);
        let obj = new Object();
        let currentVal;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'ChapterId') { currentVal = 0 }
            else if (keys[i] === 'ChapterName') { currentVal = '' }
            else if (keys[i] === 'IsActive') { currentVal = true }
            obj[keys[i]] = ChapterDetailsData[keys[i]];
            obj[keys[i]].value = currentVal;
        }
        setChapterDetailsData(obj);
        handleOnClearChapterDetails(event);
    }
    //#endregion

    //#region other form control functions
    const onInputChangeControllerChapterDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(ChapterDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = ChapterDetailsData[keys[i]];
            } else {
                obj[name] = ChapterDetailsData[name];
                obj[name].value = value;
            }
        }
        setChapterDetailsData(obj);
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
                            <li className="nav-item"> <a className="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Create Chapter</a> </li>
                        </ul>
                        <div className="tab-content px-1 py-1">
                            <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                aria-labelledby="base-tab11">
                                <form onSubmit={handleOnSubmitChapterDetails} id="ChapterDetailsForm">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="label-control mb-2" >Subject{stateValidatorSchemaChapterDetails.SubjectId.required && (<span className="red">*</span>)}
                                                </label>
                                                <select
                                                    className={"form-control " +
                                                        (errorsChapterDetails.SubjectId && dirtyChapterDetails.SubjectId ? 'has-error' :
                                                        (dirtyChapterDetails.SubjectId ? 'has-success' : ''))
                                                    }
                                                    name="SubjectId"
                                                    value={ChapterDetailsData.SubjectId.value}
                                                    onChange={e => {
                                                        handleOnChangeChapterDetails(e);
                                                        onInputChangeControllerChapterDetails(e);
                                                    }}
                                                >
                                                    {CommonFuncs.funcBindSelectOptons(AllSubjectList)}
                                                </select>
                                            </div>
                                            {errorsChapterDetails.SubjectId && dirtyChapterDetails.SubjectId && (
                                                <span className="error-label mt-2">{errorsChapterDetails.SubjectId}</span>
                                            )}
                                        </div>

                                        
                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Chapter Name{stateValidatorSchemaChapterDetails.ChapterName.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsChapterDetails.ChapterName && dirtyChapterDetails.ChapterName ? 'has-error' :
                                                            (dirtyChapterDetails.ChapterName ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="ChapterName" placeholder="Chapter Name"
                                                    type="text"
                                                    value={ChapterDetailsData.ChapterName.value}
                                                    onChange={e => { handleOnChangeChapterDetails(e); onInputChangeControllerChapterDetails(e) }}
                                                />

                                            </div>
                                            {errorsChapterDetails.ChapterName && dirtyChapterDetails.ChapterName && (
                                                <span className="error-label mt-2">{errorsChapterDetails.ChapterName}</span>
                                            )}
                                        </div>
                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Chapter Description{stateValidatorSchemaChapterDetails.ChapterDescription.required && (<span className="red">*</span>)}</label>
                                                <textarea
                                                    className={"form-control " +
                                                        (errorsChapterDetails.ChapterDescription && dirtyChapterDetails.ChapterDescription ? 'has-error' :
                                                        (dirtyChapterDetails.ChapterDescription ? 'has-success' : ''))
                                                    }
                                                    cols="20" id="ChapterDescription"
                                                    maxLength="200" name="ChapterDescription" placeholder="Chapter Description"
                                                    rows="3"
                                                    value={ChapterDetailsData.ChapterDescription.value}
                                                    onChange={e => { handleOnChangeChapterDetails(e); onInputChangeControllerChapterDetails(e) }}

                                                ></textarea>
                                                
                                            </div>
                                            {errorsChapterDetails.ChapterDescription && dirtyChapterDetails.ChapterDescription && (
                                                <span className="error-label mt-2">{errorsChapterDetails.ChapterDescription}</span>
                                            )}
                                        </div>


                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Chapter File{stateValidatorSchemaChapterDetails.ChapterFile.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsChapterDetails.ChapterFile && dirtyChapterDetails.ChapterFile ? 'has-error' :
                                                            (dirtyChapterDetails.ChapterFile ? 'has-success' : ''))
                                                    }
                                                    type="file"
                                                    onChange={onInputChangeControllerChapterDetails}
                                                    onChange={e => { handleOnChangeChapterDetails(e); onInputChangeControllerChapterDetails(e) }}

                                                    name="ChapterFile"
                                                />
                                            </div>
                                            {errorsChapterDetails.ChapterFile && dirtyChapterDetails.ChapterFile && (
                                                <span className="error-label mt-2">{errorsChapterDetails.ChapterFile}</span>
                                            )}

                                            {
                                                ChapterDetailsData.ChapterFileUri.value && (
                                                    <>
                                                        <a href={ChapterDetailsData.ChapterFileUri.value} target="_blank">
                                                            <img
                                                                src={pdfSample}
                                                                style={{ maxWidth: "40px" }}
                                                                className="img-thumbnail mt-1"
                                                            />
                                                        </a>
                                                    </>
                                                )
                                            }

                                        </div>



                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Chapter Video File{stateValidatorSchemaChapterDetails.ChapterVideo.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsChapterDetails.ChapterVideo && dirtyChapterDetails.ChapterVideo ? 'has-error' :
                                                        (dirtyChapterDetails.ChapterVideo ? 'has-success' : ''))
                                                    }
                                                    type="file"
                                                    onChange={onInputChangeControllerChapterDetails}
                                                    onChange={e => { handleOnChangeChapterDetails(e); onInputChangeControllerChapterDetails(e) }}

                                                    name="ChapterVideo"
                                                />
                                            </div>
                                            {errorsChapterDetails.ChapterVideo && dirtyChapterDetails.ChapterVideo && (
                                                <span className="error-label mt-2">{errorsChapterDetails.ChapterVideo}</span>
                                            )}

                                            {
                                                ChapterDetailsData.ChapterVideoUri.value && (
                                                    <>
                                                        <a href={ChapterDetailsData.ChapterVideoUri.value} target="_blank">
                                                            <img
                                                                src={videoSample}
                                                                style={{ maxWidth: "40px" }}
                                                                className="img-thumbnail mt-1"
                                                            />
                                                        </a>
                                                    </>
                                                )
                                            }

                                        </div>

                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Chapter Youtube Video Link{stateValidatorSchemaChapterDetails.ChapterYoutubeVideoLink.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsChapterDetails.ChapterYoutubeVideoLink && dirtyChapterDetails.ChapterYoutubeVideoLink ? 'has-error' :
                                                        (dirtyChapterDetails.ChapterYoutubeVideoLink ? 'has-success' : ''))
                                                    }
                                                    type="text"
                                                    onChange={onInputChangeControllerChapterDetails}
                                                    onChange={e => { handleOnChangeChapterDetails(e); onInputChangeControllerChapterDetails(e) }}
                                                    placeholder="Chapter Youtube Video Link"
                                                    name="ChapterYoutubeVideoLink"
                                                    value={ChapterDetailsData.ChapterYoutubeVideoLink.value}
                                                />
                                            </div>
                                            {errorsChapterDetails.ChapterYoutubeVideoLink && dirtyChapterDetails.ChapterYoutubeVideoLink && (
                                                <span className="error-label mt-2">{errorsChapterDetails.ChapterYoutubeVideoLink}</span>
                                            )}

                                            {
                                                ChapterDetailsData.ChapterYoutubeVideoLink.value && (
                                                    <>
                                                        <a href={ChapterDetailsData.ChapterYoutubeVideoLink.value} target="_blank">
                                                            <img
                                                                src={youtubeVideoSample}
                                                                style={{ maxWidth: "40px" }}
                                                                className="img-thumbnail mt-1"
                                                            />
                                                        </a>
                                                    </>
                                                )
                                            }

                                        </div>

                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Status
                                                </label>
                                                <br />
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="IsActiveTrue"
                                                        value="true"
                                                        checked={String(ChapterDetailsData.IsActive.value) === String(true)}
                                                        onChange={e => { handleOnChangeChapterDetails(e); onInputChangeControllerChapterDetails(e) }}
                                                    />
                                                    <label className="form-check-label" htmlFor="IsActiveTrue">Active</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="IsActiveFalse"
                                                        value="false"
                                                        checked={String(ChapterDetailsData.IsActive.value) === String(false)}
                                                        onChange={e => { handleOnChangeChapterDetails(e); onInputChangeControllerChapterDetails(e) }}
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
                                                            id="btnChapterDetails"
                                                            disabled={disableChapterDetails}
                                                        >Submit</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            onClick={btnClearChapterDetails}
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

export default AddEditAcadMstSetupChapter;
