"use strict";
/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Form Account Mappings
 * --------------------------------------------------------------------------
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import APIConfig from "../../../../config/api.config.json";
import useFormValidator from "../../../../util/useFormValidator";
import CommonFuncs from "../../../../util/common.funcs";
import { $ } from 'react-jquery-plugin';
import GridRoleRights from "../../../../core/components/table/GridRoleRights";
require('dotenv').config();


const MapFormAccount = (props) => {
    //#region define regular expressions (regex)
    var numberRegex = /^[0-9]+$/;
    //#endregion

    //#region define use state hooks
    const [HasAPIError, setHasAPIError] = useState(false);
    const [HasAPISuccess, setHasAPISuccess] = useState(false);
    const [HasAPIMessage, setHasAPIMessage] = useState("");
    const [HasAPIDescription, setHasAPIDescription] = useState("");
    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken', 'loggedInUserId']);
    const [AllParentAccountList, setAllParentAccountList] = useState([]);
    const [AllParentFormList, setAllParentFormList] = useState([]);
    const [FormFormAccountRightsHeaderList, setFormFormAccountRightsHeaderList] = useState([]);
    const [FormFormAccountRightsDataList, setFormFormAccountRightsDataList] = useState([]);

    //#endregion

    //#region Role Rights details form: define state, schema & validations
    // Define your state schema
    const stateSchemaFormAccountRightsDetails = {
        AccountId: { value: 0, error: "This account field selection is required!" },
        ParentFormId: { value: 0, error: "This parent form field selection is required!" }
    };
    const [FinishFormAccountRightsDetailsData, setFinishFormAccountRightsDetailsData] = useState(stateSchemaFormAccountRightsDetails);
    // Create your own validationstateSchemaFormAccountRightsDetails
    // stateSchemaFormAccountRightsDetails property should be the same in validationstateSchemaFormAccountRightsDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaFormAccountRightsDetails = {
        
        AccountId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid account format."
            }
        },
        ParentFormId: {
            required: false,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid parent form format."
            }
        }
    };
    //#endregion

    //#region define custom forms validation hooks
    const {
        values: valuesFormAccountRightsDetails,
        errors: errorsFormAccountRightsDetails,
        dirty: dirtyFormAccountRightsDetails,
        handleOnChange: handleOnChangeFormAccountRightsDetails,
        handleOnSubmit: handleOnSubmitFormAccountRightsDetails,
        disable: disableFormAccountRightsDetails,
        handleOnClear: handleOnClearFormAccountRightsDetails
    } = useFormValidator(stateSchemaFormAccountRightsDetails, stateValidatorSchemaFormAccountRightsDetails, onSubmitFormFormAccountRightsDetails);
    //#endregion

    useEffect(() => {
        //debugger;
        //#region bind default data for forms
        fetchAllParentAccountList();
        fetchAllParentFormList();
        fetchGetAllFormRoleMappings();
        //#endregion
        //#region set default value of forms use state hooks
        setFinishFormAccountRightsDetailsData(stateSchemaFormAccountRightsDetails);
        //#endregion

    }, []);

    //#region bind funcs to call axios

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


    const fetchAllParentAccountList = async () => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.AllAccountsListUri;

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
                    DataList.push({ ListValue: data.AccountId, ListText: data.AccountName });
                });
                setAllParentAccountList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    const fetchGetAllFormRoleMappings = async (refresh) => {
        debugger;
        let apiUri = APIConfig.Admin.FormAccountMappings.GetAllFormAccountMappingsUri;
        apiUri = apiUri
            .replace('<FormId>', FinishFormAccountRightsDetailsData.ParentFormId.value)
            .replace('<AccountId>', !refresh ? FinishFormAccountRightsDetailsData.AccountId.value : 0)

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
            debugger;
            if (response.data.Result) {
                setFormFormAccountRightsHeaderList(response.data.Data.HeaderList);
                setFormFormAccountRightsDataList(response.data.Data.DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    //#endregion


    //#region submit form data and call axios
    //Step 1 : Role Rights Details 
    function onSubmitFormFormAccountRightsDetails(event, valuesRoleDetails) {
        //debugger
        //console.log(FormFormAccountRightsDataList);
        event.preventDefault();
        const btnPointer = document.querySelector('#btnFormAccountRightsDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let reqUri = APIConfig.Admin.FormAccountMappings.AddEditFormAccountMappingsUri;
            for (var i = 0; i < FormFormAccountRightsDataList.length; i++) {
                FormFormAccountRightsDataList[i]["CreatedBy"] = Cookie.loggedInUserId;
            }

            let reqBody = FormFormAccountRightsDataList;


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
                'url': reqUri ? reqUri : "",
                'data': reqBody
            }).then((response) => {
                if (response.data && response.data.Result) {
                    btnPointer.innerHTML = 'Update Mappings';
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                }
                else {
                    setHasAPIError(!response.data.Result);
                    setHasAPIMessage(response.data.Message);
                    setHasAPIDescription(response.data.Description);
                }
                btnPointer.innerHTML = 'Update Mappings';
                btnPointer.removeAttribute('disable');
            }).catch((e) => {
                //console.log(e);
                //return e;
                setHasAPIError(true);
                setHasAPIMessage(e.message);
                btnPointer.innerHTML = 'Update Mappings';
                btnPointer.removeAttribute('disable');
            });

        } catch (e) {
            setHasAPIError(true);
            setHasAPIMessage(e.message);
            //console.log(e);
            btnPointer.innerHTML = 'Update Mappings';
            btnPointer.removeAttribute('disable');
        }

    }
    //#endregion

    //#region clear form data and call axios

    const btnClearFormAccountRightsDetails = (event) => {
        handleOnClearFormAccountRightsDetails(event);
        setFinishFormAccountRightsDetailsData(stateSchemaFormAccountRightsDetails);
        fetchGetAllFormRoleMappings(true);
    }


    //#endregion

    //#region other form control functions
    const onInputChangeControllerFormAccountRightsDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(FinishFormAccountRightsDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = FinishFormAccountRightsDetailsData[keys[i]];
            } else {
                obj[name] = FinishFormAccountRightsDetailsData[name];
                obj[name].value = value;
            }
        }
        setFinishFormAccountRightsDetailsData(obj);
    };
    function onChangeRoleRights(DataList) {
        setFormFormAccountRightsDataList(DataList);
    }
    const handelChangeBindFormAccountRights = (event) => {
        let elementChanges = $(event.target).attr('element-type');
        //console.log(elementChanges);

        fetchGetAllFormRoleMappings();
        
    }
    //#endregion


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
                    <div className="content-demo">
                        <h3 className="card-title">{props.pageTitle}</h3>
                        <div className="content-body">

                            <form onSubmit={handleOnSubmitFormAccountRightsDetails} id="FormAccountRightsDetailsForm">

                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Account For{stateValidatorSchemaFormAccountRightsDetails.AccountId.required && (<span className="red">*</span>)}</label>
                                            <select
                                                className={"form-control " +
                                                    (errorsFormAccountRightsDetails.AccountId && dirtyFormAccountRightsDetails.AccountId ? 'has-error' :
                                                        (dirtyFormAccountRightsDetails.AccountId ? 'has-success' : ''))
                                                }
                                                name="AccountId"
                                                element-type="account"
                                                value={FinishFormAccountRightsDetailsData.AccountId.value}
                                                onChange={e => {
                                                    handleOnChangeFormAccountRightsDetails(e);
                                                    onInputChangeControllerFormAccountRightsDetails(e);
                                                    handelChangeBindFormAccountRights(e)
                                                }}
                                            >
                                                {CommonFuncs.funcBindSelectOptons(AllParentAccountList)}
                                            </select>
                                        </div>
                                        {errorsFormAccountRightsDetails.AccountId && dirtyFormAccountRightsDetails.AccountId && (
                                            <span className="error-label mt-2">{errorsFormAccountRightsDetails.AccountId}</span>
                                        )}
                                    </div>

                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Parent Form{stateValidatorSchemaFormAccountRightsDetails.ParentFormId.required && (<span className="red">*</span>)}</label>
                                            <select
                                                className={"form-control " +
                                                    (errorsFormAccountRightsDetails.ParentFormId && dirtyFormAccountRightsDetails.ParentFormId ? 'has-error' :
                                                        (dirtyFormAccountRightsDetails.ParentFormId ? 'has-success' : ''))
                                                }
                                                name="ParentFormId"
                                                element-type="parent-form"
                                                value={FinishFormAccountRightsDetailsData.ParentFormId.value}
                                                onChange={e => {
                                                    handleOnChangeFormAccountRightsDetails(e);
                                                    onInputChangeControllerFormAccountRightsDetails(e);
                                                    handelChangeBindFormAccountRights(e)
                                                }}
                                            >
                                                {CommonFuncs.funcBindSelectOptons(AllParentFormList)}
                                            </select>
                                        </div>
                                        {errorsFormAccountRightsDetails.ParentFormId && dirtyFormAccountRightsDetails.ParentFormId && (
                                            <span className="error-label mt-2">{errorsFormAccountRightsDetails.ParentFormId}</span>
                                        )}
                                    </div>
                                </div>
                               
                                <div className="row mt-3 mb-3">
                                    <div className="col-md-12">
                                        <GridRoleRights
                                            DataList={FormFormAccountRightsDataList}
                                            HeaderList={FormFormAccountRightsHeaderList}
                                            onChangeRoleRights={onChangeRoleRights}
                                        />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-body">
                                            <div style={{ justifyContent: 'center' }} className="form-actions mt-3 d-flex">

                                                <div style={{ margin: '10px' }}>
                                                    <button type="submit"
                                                        className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1"
                                                        id="btnFormAccountRightsDetails"
                                                        disabled={disableFormAccountRightsDetails}
                                                    >
                                                        Update Mappings
                                                                </button>

                                                </div>
                                                <div style={{ margin: '10px' }}>
                                                    <button type="button"
                                                        className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                        id="btnClearFormAccountRightsDetails"
                                                        onClick={btnClearFormAccountRightsDetails}
                                                    >
                                                        Clear
                                                                </button>
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

        </>
    );
};

export default MapFormAccount;
