/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit Role Details
 * --------------------------------------------------------------------------
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import APIConfig from "../../../../config/api.config.json";
import useFormValidator from "../../../../util/useFormValidator";
import CustomDropdown from "../../../../core/components/dropdown/CustomDropdown";
import CommonFuncs from "../../../../util/common.funcs";
import GridTable from "../../../../core/components/table/GridTable";
import { $ } from 'react-jquery-plugin';
import GridRoleRights from "../../../../core/components/table/GridRoleRights";
require('dotenv').config();

const MapFormRole = (props) => {
    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
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
    const [FormRoleRightsHeaderList, setFormRoleRightsHeaderList] = useState([]);
    const [FormRoleRightsDataList, setFormRoleRightsDataList] = useState([]);
    const [AllRoleList, setAllRoleList] = useState([]);

    //#endregion

    //#region Role Rights details form: define state, schema & validations
    // Define your state schema
    const stateSchemaRoleRightsDetails = {
        MappingFor: { value: '', error: "This mapping for field selection is required!" },
        AccountId: { value: 0, error: "This account field selection is required!" },
        RoleId: { value: 0, error: "This role field selection is required!!" },
        ParentFormId: { value: 0, error: "This parent form field selection is required!" }
    };
    const [FinishRoleRightsDetailsData, setFinishRoleRightsDetailsData] = useState(stateSchemaRoleRightsDetails);
    // Create your own validationstateSchemaRoleRightsDetails
    // stateSchemaRoleRightsDetails property should be the same in validationstateSchemaRoleRightsDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaRoleRightsDetails = {
        MappingFor: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid mapping for format."
            }
        },
        AccountId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid account format."
            }
        },
        RoleId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid role format."
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
        values: valuesRoleRightsDetails,
        errors: errorsRoleRightsDetails,
        dirty: dirtyRoleRightsDetails,
        handleOnChange: handleOnChangeRoleRightsDetails,
        handleOnSubmit: handleOnSubmitRoleRightsDetails,
        disable: disableRoleRightsDetails,
        handleOnClear: handleOnClearRoleRightsDetails
    } = useFormValidator(stateSchemaRoleRightsDetails, stateValidatorSchemaRoleRightsDetails, onSubmitFormRoleRightsDetails);
    //#endregion

    useEffect(() => {
        //debugger;
        //#region bind default data for forms
        fetchAllParentAccountList();
        fetchAllParentFormList();
        fetchGetAllFormRoleMappings();
        fetchAllRoleList();
        //#endregion
        //#region set default value of forms use state hooks
        setFinishRoleRightsDetailsData(stateSchemaRoleRightsDetails);
        //#endregion

    }, []);

    //#region bind funcs to call axios

    const fetchAllRoleList = async (AccountId) => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllRoleListUri;
        apiUri = apiUri.replace('<RoleName>', '')
            .replace('<CategoryId>', 0)
            .replace('<AccountId>', AccountId ? AccountId : 0);
        console.log(apiUri);
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
                let DataList = [];
                response.data.Data.map((data, i) => {
                    DataList.push({ ListValue: data.PK_RoleId, ListText: data.RoleName });
                });
                setAllRoleList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };

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
        let apiUri = APIConfig.Admin.Common.GetAllParentAccountListUri;

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
        //debugger;
        let apiUri = APIConfig.Admin.FormRoleMappings.GetAllFormRoleMappingsUri;
        apiUri = apiUri
            .replace('<RoleId>', FinishRoleRightsDetailsData.RoleId.value)
            .replace('<FormId>', FinishRoleRightsDetailsData.ParentFormId.value)
            .replace('<MappingFor>', !refresh ? FinishRoleRightsDetailsData.MappingFor.value : "")
            .replace('<AccountId>', FinishRoleRightsDetailsData.AccountId.value)

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
            //debugger;
            if (response.data.Result) {
                setFormRoleRightsHeaderList(response.data.Data.HeaderList);
                setFormRoleRightsDataList(response.data.Data.DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    //#endregion


    //#region submit form data and call axios
    //Step 1 : Role Rights Details 
    function onSubmitFormRoleRightsDetails(event, valuesRoleDetails) {
        //debugger
        //console.log(FormRoleRightsDataList);
        event.preventDefault();
        const btnPointer = document.querySelector('#btnRoleRightsDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let reqUri = APIConfig.Admin.FormRoleMappings.AddEditFormRoleMappingsUri;
            for (var i = 0; i < FormRoleRightsDataList.length; i++) {
                FormRoleRightsDataList[i]["CreatedBy"] = Cookie.loggedInUserId;
            }

            let reqBody = FormRoleRightsDataList;


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

    const btnClearRoleRightsDetails = (event) => {
        handleOnClearRoleRightsDetails(event);
        setFinishRoleRightsDetailsData(stateSchemaRoleRightsDetails);
        fetchGetAllFormRoleMappings(true);
    }


    //#endregion

    //#region other form control functions
    const onInputChangeControllerRoleRightsDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(FinishRoleRightsDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = FinishRoleRightsDetailsData[keys[i]];
            } else {
                obj[name] = FinishRoleRightsDetailsData[name];
                obj[name].value = value;
            }
        }
        setFinishRoleRightsDetailsData(obj);
    };
    function onChangeRoleRights(DataList) {
        setFormRoleRightsDataList(DataList);
    }
    const handelChangeBindRoleRights = (event) => {
        let elementChanges = $(event.target).attr('element-type');
        //console.log(elementChanges);

        fetchGetAllFormRoleMappings();
    }

    const handelChangeBindRoleList = (e) => {
        fetchAllRoleList($(e.target).val());
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

                            <form onSubmit={handleOnSubmitRoleRightsDetails} id="RoleRightsDetailsForm">

                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Mapping For{stateValidatorSchemaRoleRightsDetails.MappingFor.required && (<span className="red">*</span>)}</label>
                                            <select
                                                className={"form-control " +
                                                    (errorsRoleRightsDetails.MappingFor && dirtyRoleRightsDetails.MappingFor ? 'has-error' :
                                                        (dirtyRoleRightsDetails.MappingFor ? 'has-success' : ''))
                                                }
                                                name="MappingFor"
                                                value={FinishRoleRightsDetailsData.MappingFor.value}
                                                element-type="mapping-for"
                                                onChange={e => {
                                                    handleOnChangeRoleRightsDetails(e);
                                                    onInputChangeControllerRoleRightsDetails(e);
                                                    handelChangeBindRoleRights(e);
                                                }}
                                            >
                                                <option value="">--Select--</option>
                                                <option value="WebApp">Web App</option>
                                                <option value="MobileApp">Mobile App</option>
                                            </select>
                                        </div>
                                        {errorsRoleRightsDetails.MappingFor && dirtyRoleRightsDetails.MappingFor && (
                                            <span className="error-label mt-2">{errorsRoleRightsDetails.MappingFor}</span>
                                        )}
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Account For{stateValidatorSchemaRoleRightsDetails.AccountId.required && (<span className="red">*</span>)}</label>
                                            <select
                                                className={"form-control " +
                                                    (errorsRoleRightsDetails.AccountId && dirtyRoleRightsDetails.AccountId ? 'has-error' :
                                                        (dirtyRoleRightsDetails.AccountId ? 'has-success' : ''))
                                                }
                                                name="AccountId"
                                                element-type="account"
                                                value={FinishRoleRightsDetailsData.AccountId.value}
                                                onChange={e => {
                                                    handleOnChangeRoleRightsDetails(e);
                                                    onInputChangeControllerRoleRightsDetails(e);
                                                    handelChangeBindRoleRights(e);
                                                    handelChangeBindRoleList(e);
                                                }}
                                            >
                                                {CommonFuncs.funcBindSelectOptons(AllParentAccountList)}
                                            </select>
                                        </div>
                                        {errorsRoleRightsDetails.AccountId && dirtyRoleRightsDetails.AccountId && (
                                            <span className="error-label mt-2">{errorsRoleRightsDetails.AccountId}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="row mt-3 mb-3">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Role{stateValidatorSchemaRoleRightsDetails.RoleId.required && (<span className="red">*</span>)}</label>
                                            <select
                                                className={"form-control " +
                                                    (errorsRoleRightsDetails.RoleId && dirtyRoleRightsDetails.RoleId ? 'has-error' :
                                                        (dirtyRoleRightsDetails.RoleId ? 'has-success' : ''))
                                                }
                                                name="RoleId"
                                                element-type="role"
                                                value={FinishRoleRightsDetailsData.RoleId.value}
                                                onChange={e => {
                                                    handleOnChangeRoleRightsDetails(e);
                                                    onInputChangeControllerRoleRightsDetails(e);
                                                    handelChangeBindRoleRights(e)
                                                }}
                                            >
                                                {CommonFuncs.funcBindSelectOptons(AllRoleList)}
                                            </select>
                                        </div>
                                        {errorsRoleRightsDetails.RoleId && dirtyRoleRightsDetails.RoleId && (
                                            <span className="error-label mt-2">{errorsRoleRightsDetails.RoleId}</span>
                                        )}
                                    </div>

                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Parent Form{stateValidatorSchemaRoleRightsDetails.ParentFormId.required && (<span className="red">*</span>)}</label>
                                            <select
                                                className={"form-control " +
                                                    (errorsRoleRightsDetails.ParentFormId && dirtyRoleRightsDetails.ParentFormId ? 'has-error' :
                                                        (dirtyRoleRightsDetails.ParentFormId ? 'has-success' : ''))
                                                }
                                                name="ParentFormId"
                                                element-type="parent-form"
                                                value={FinishRoleRightsDetailsData.ParentFormId.value}
                                                onChange={e => {
                                                    handleOnChangeRoleRightsDetails(e);
                                                    onInputChangeControllerRoleRightsDetails(e);
                                                    handelChangeBindRoleRights(e)
                                                }}
                                            >
                                                {CommonFuncs.funcBindSelectOptons(AllParentFormList)}
                                            </select>
                                        </div>
                                        {errorsRoleRightsDetails.ParentFormId && dirtyRoleRightsDetails.ParentFormId && (
                                            <span className="error-label mt-2">{errorsRoleRightsDetails.ParentFormId}</span>
                                        )}
                                    </div>

                                </div>


                                <div className="row mt-3 mb-3">
                                    <div className="col-md-12">
                                        <GridRoleRights
                                            DataList={FormRoleRightsDataList}
                                            HeaderList={FormRoleRightsHeaderList}
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
                                                        id="btnRoleRightsDetails"
                                                        disabled={disableRoleRightsDetails}
                                                    >
                                                        Update Mappings
                                                                </button>

                                                </div>
                                                <div style={{ margin: '10px' }}>
                                                    <button type="button"
                                                        className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                        id="btnClearRoleRightsDetails"
                                                        onClick={btnClearRoleRightsDetails}
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

export default MapFormRole;
