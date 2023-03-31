/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Form Role Mappings
 * --------------------------------------------------------------------------
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import APIConfig from "../../../../../config/api.config.json";
import reqBody from "../../../../../models/reqBody.Model";
import useFormValidator from "../../../../../util/useFormValidator";
import CustomDropdown from "../../../../../core/components/dropdown/CustomDropdown";
import CommonFuncs from "../../../../../util/common.funcs";
import GridTable from "../../../../../core/components/table/GridTable";
import { $ } from 'react-jquery-plugin';
import GridRoleRights from "../../../../../core/components/table/GridRoleRights";
require('dotenv').config();


const AddEditMstRole = (props) => {
    let propData = props.dataRow;
    //console.log(propData);
    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    var emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/;
    var phoneRegex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/;
    var numberRegex = /^[0-9]+$/;
    var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    var usernameRegex = /^[a-z0-9_\.]+$/;
    //#endregion



    //#region define use state hooks
    const [HasAPIError, setHasAPIError] = useState(false);
    const [HasAPISuccess, setHasAPISuccess] = useState(false);
    const [HasAPIMessage, setHasAPIMessage] = useState("");
    const [HasAPIDescription, setHasAPIDescription] = useState("");
    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken', 'loggedInUserId']);
    const [AllParentAccountList, setAllParentAccountList] = useState([]);
    const [AllCategoryList, setAllCategoryList] = useState([]);
    const [AllParentFormList, setAllParentFormList] = useState([]);
    const [FormRoleRightsHeaderList, setFormRoleRightsHeaderList] = useState([]);
    const [FormRoleRightsDataList, setFormRoleRightsDataList] = useState([]);
    const [AllRoleList, setAllRoleList] = useState([]);
    const [CurrentId, setCurrentId] = useState(propData ? propData.PK_ID : 0);

    //#endregion

    //#region Role details form: define state, schema & validations
    // Define your state schema
    const stateSchemaRoleDetails = {
        CategoryId: { value: propData ? propData.CategoryId : 0, error: "This role field selection is required!" },
        AccountId: { value: propData ? propData.AccountId : 0, error: "This account field selection is required!" },
        RoleName: { value: propData ? propData.RoleName : '', error: "This role name field is required!!" },
        LandingPage: { value: propData ? propData.LandingPage : '', error: "This landing page field selection is required!" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!!" }
    };
    const [SaveNextRoleDetailsData, setSaveNextRoleDetailsData] = useState(stateSchemaRoleDetails);
    // Create your own validationstateSchemaRoleDetails
    // stateSchemaRoleDetails property should be the same in validationstateSchemaRoleDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaRoleDetails = {
        CategoryId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid role format."
            }
        },
        AccountId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid account format."
            }
        },
        RoleName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid role name format."
            }
        },
        LandingPage: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid landing page format."
            }
        },
        IsActive: {
            required: true
        }
    };
    //#endregion

    //#region Role Rights details form: define state, schema & validations
    // Define your state schema
    const stateSchemaRoleRightsDetails = {
        MappingFor: { value: '', error: "This mapping for field selection is required!" },
        AccountId: { value: propData ? propData.AccountId : 0, error: "This account field selection is required!" },
        RoleId: { value: propData ? propData.PK_ID : 0, error: "This role field selection is required!!" },
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
            required: false,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid account format."
            }
        },
        RoleId: {
            required: false,
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
        values: valuesRoleDetails,
        errors: errorsRoleDetails,
        dirty: dirtyRoleDetails,
        handleOnChange: handleOnChangeRoleDetails,
        handleOnSubmit: handleOnSubmitRoleDetails,
        disable: disableRoleDetails,
        handleOnClear: handleOnClearRoleDetails
    } = useFormValidator(stateSchemaRoleDetails, stateValidatorSchemaRoleDetails, onSubmitFormRoleDetails);
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
        fetchAllCategoryList();
        fetchAllParentFormList();
        fetchGetAllFormRoleMappings();
        fetchAllRoleList();
        //#endregion
        //#region set default value of forms use state hooks
        setSaveNextRoleDetailsData(stateSchemaRoleDetails);
        setFinishRoleRightsDetailsData(stateSchemaRoleRightsDetails);
        //#endregion
        //#region trigger default selection
        let flagNextStep = false;
        if (propData && propData.hasOwnProperty('NextStep')) {
            if (propData.NextStep) {
                $("#" + propData.NextStep).trigger('click');
                flagNextStep = true;
            }
        }
        if (!flagNextStep) {
            $("#Details").trigger('click');
        }

        if (propData && propData.hasOwnProperty('CategoryId')) {
            fetchAllAccountListByCategory(propData.CategoryId);
        }

        //#endregion
    }, []);
    //#region bind funcs to call axios

    const fetchAllRoleList = async () => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllRoleListUri;
        apiUri = apiUri.replace('<CategoryId>', '')
            .replace('<AccountId>', '')
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
            console.log(response);
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


    const fetchAllCategoryList = async () => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllCategoryListUri;

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
                    DataList.push({ ListValue: data.PK_CategoryId, ListText: data.CategoryName });
                });
                setAllCategoryList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    const fetchAllAccountListByCategory = async (CategoryId) => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.AllAccountsListByCategoryUri;
        apiUri = apiUri
            .replace('<CategoryId>', CategoryId)
            .replace('<IsParentAccount>', false)
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
    //Step 1 : Role Details 
    function onSubmitFormRoleDetails(event, valuesRoleDetails) {
        //debugger
        event.preventDefault();
        const btnPointer = document.querySelector('#btnSaveNextRoleDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditRoleDetailsUri = APIConfig.Admin.Role.AddEditRoleDetailsUri;
            const formElement = document.querySelector('#RoleDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["RoleId"] = CurrentId;
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
                'url': AddEditRoleDetailsUri ? AddEditRoleDetailsUri : "",
                'data': reqBody
            }).then((response) => {
                if (response.data && response.data.Result) {
                    btnPointer.innerHTML = 'Save & Next';
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                    $("#RoleRights").removeClass('disabled');
                    $("#RoleRights").trigger('click');
                    setCurrentId(response.data.Data.RoleId);
                    //Reload Created Role
                    fetchAllRoleList();
                    let keys = Object.keys(FinishRoleRightsDetailsData);
                    let obj = new Object();
                    for (var i = 0; i < keys.length; i++) {
                        obj[keys[i]] = FinishRoleRightsDetailsData[keys[i]];
                        if (keys[i] === "AccountId") {
                            obj[keys[i]].value = SaveNextRoleDetailsData.AccountId.value;
                            dirtyRoleRightsDetails.AccountId = true;
                        }
                        else if (keys[i] === "RoleId") {
                            obj[keys[i]].value = response.data.Data.RoleId;
                            dirtyRoleRightsDetails.RoleId = true;
                        }
                        //else if (keys[i] === "MappingFor") {
                        //    obj[keys[i]].value = "WebApp";
                        //    dirtyRoleRightsDetails.MappingFor = true;
                        //}
                    }
                    setFinishRoleRightsDetailsData(obj);

                    fetchGetAllFormRoleMappings();

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
        //setSaveNextRoleDetailsData(formDataJSON);
        //btnPointer.innerHTML = 'Save & Next';
        //btnPointer.removeAttribute('disable');
        //}, 500);
        //document.querySelector('#RoleRights').click();
        //console.log(SaveNextRoleDetailsData);
    }

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
            //const formElement = document.querySelector('#RoleDetailsForm');
            //const formData = new FormData(formElement);
            //const formDataJSON = Object.fromEntries(formData);
            //formDataJSON["CreatedBy"] = Cookie.loggedInRoleId;
            //formDataJSON["RoleId"] = CurrentId;
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
                    btnPointer.innerHTML = 'Finish';
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                    document.querySelector('#RoleRights').click();
                    setTimeout(() => {
                        props.funcBackToIndex();
                    }, 2000);
                }
                else {
                    setHasAPIError(!response.data.Result);
                    setHasAPIMessage(response.data.Message);
                    setHasAPIDescription(response.data.Description);
                }
                btnPointer.innerHTML = 'Finish';
                btnPointer.removeAttribute('disable');
            }).catch((e) => {
                //console.log(e);
                //return e;
                setHasAPIError(true);
                setHasAPIMessage(e.message);
                btnPointer.innerHTML = 'Finish';
                btnPointer.removeAttribute('disable');
            });

        } catch (e) {
            setHasAPIError(true);
            setHasAPIMessage(e.message);
            //console.log(e);
            btnPointer.innerHTML = 'Finish';
            btnPointer.removeAttribute('disable');
        }

        //setTimeout(() => {
        //setSaveNextRoleDetailsData(formDataJSON);
        //btnPointer.innerHTML = 'Save & Next';
        //btnPointer.removeAttribute('disable');
        //}, 500);
        //document.querySelector('#RoleRights').click();
        //console.log(SaveNextRoleDetailsData);
    }
    //#endregion

    //#region clear form data and call axios
    const btnClearRoleDetails = (event) => {
        setSaveNextRoleDetailsData(stateSchemaRoleDetails);
        handleOnClearRoleDetails(event);
    }

    const btnClearRoleRightsDetails = (event) => {

        handleOnClearRoleRightsDetails(event);

        let keys = Object.keys(stateSchemaRoleRightsDetails);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            obj[keys[i]] = stateSchemaRoleRightsDetails[keys[i]];
            if (keys[i] === "AccountId") {
                obj[keys[i]].value = SaveNextRoleDetailsData.AccountId.value;
            }
            else if (keys[i] === "RoleId") {
                obj[keys[i]].value = CurrentId;
            }
        }
        setFinishRoleRightsDetailsData(obj);
        fetchGetAllFormRoleMappings(true);
    }


    //#endregion
    //#region other form control functions
    const onInputChangeControllerRoleDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(SaveNextRoleDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = SaveNextRoleDetailsData[keys[i]];
            } else {
                obj[name] = SaveNextRoleDetailsData[name];
                obj[name].value = value;
            }
        }
        setSaveNextRoleDetailsData(obj);
    };

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
        $("html, body").animate({
            scrollTop: $(document).height()
        }, 9000);
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
                    <h3 className="card-title">{props.pageTitle}</h3>
                    <div className="content-demo">
                        <div className="content-body">
                            <section className="NewformTabs">
                                <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="DetailsTab" data-bs-toggle="tab" data-bs-target="#Details" type="button" role="tab" aria-controls="Details" aria-selected="true">Roles Details</button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className={"nav-link " + (!CurrentId ? 'disabled' : '')} id="RoleRights" data-bs-toggle="tab" data-bs-target="#RoleRightsTab" type="button" role="tab" aria-controls="RoleRightsTab" aria-selected="false">Role Rights</button>
                                    </li>


                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="Details" role="tabpanel" aria-labelledby="DetailsTab">
                                        <form onSubmit={handleOnSubmitRoleDetails} id="RoleDetailsForm">

                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Category{stateValidatorSchemaRoleDetails.CategoryId.required && (<span className="red">*</span>)}</label>
                                                        <select
                                                            className={"form-control " +
                                                                (errorsRoleDetails.CategoryId && dirtyRoleDetails.CategoryId ? 'has-error' :
                                                                    (dirtyRoleDetails.CategoryId ? 'has-success' : ''))
                                                            }
                                                            name="CategoryId"
                                                            value={SaveNextRoleDetailsData.CategoryId.value}
                                                            onChange={e => {
                                                                handleOnChangeRoleDetails(e);
                                                                onInputChangeControllerRoleDetails(e);
                                                                fetchAllAccountListByCategory($(e.target).val());
                                                            }}
                                                        >
                                                            {CommonFuncs.funcBindSelectOptons(AllCategoryList)}
                                                        </select>
                                                    </div>
                                                    {errorsRoleDetails.CategoryId && dirtyRoleDetails.CategoryId && (
                                                        <span className="error-label mt-2">{errorsRoleDetails.CategoryId}</span>
                                                    )}
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Account For{stateValidatorSchemaRoleDetails.AccountId.required && (<span className="red">*</span>)}</label>
                                                        <select
                                                            className={"form-control " +
                                                                (errorsRoleDetails.AccountId && dirtyRoleDetails.AccountId ? 'has-error' :
                                                                    (dirtyRoleDetails.AccountId ? 'has-success' : ''))
                                                            }
                                                            name="AccountId"
                                                            value={SaveNextRoleDetailsData.AccountId.value}
                                                            onChange={e => { handleOnChangeRoleDetails(e); onInputChangeControllerRoleDetails(e) }}
                                                        >
                                                            {CommonFuncs.funcBindSelectOptons(AllParentAccountList)}
                                                        </select>
                                                    </div>
                                                    {errorsRoleDetails.AccountId && dirtyRoleDetails.AccountId && (
                                                        <span className="error-label mt-2">{errorsRoleDetails.AccountId}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row mt-3 mb-3">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Role Name{stateValidatorSchemaRoleDetails.RoleName.required && (<span className="red">*</span>)}</label>
                                                        <input
                                                            className={"form-control " +
                                                                (errorsRoleDetails.RoleName && dirtyRoleDetails.RoleName ? 'has-error' :
                                                                    (dirtyRoleDetails.RoleName ? 'has-success' : ''))
                                                            }
                                                            data-val="true"
                                                            maxLength="50" name="RoleName" placeholder="Role Name"
                                                            type="text"
                                                            value={SaveNextRoleDetailsData.RoleName.value}
                                                            onChange={e => { handleOnChangeRoleDetails(e); onInputChangeControllerRoleDetails(e) }}
                                                        />

                                                    </div>
                                                    {errorsRoleDetails.RoleName && dirtyRoleDetails.RoleName && (
                                                        <span className="error-label mt-2">{errorsRoleDetails.RoleName}</span>
                                                    )}
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Landing Page{stateValidatorSchemaRoleDetails.LandingPage.required && (<span className="red">*</span>)}</label>
                                                        <select
                                                            className={"form-control " +
                                                                (errorsRoleDetails.LandingPage && dirtyRoleDetails.LandingPage ? 'has-error' :
                                                                    (dirtyRoleDetails.LandingPage ? 'has-success' : ''))
                                                            }
                                                            name="LandingPage"
                                                            value={SaveNextRoleDetailsData.LandingPage.value}
                                                            onChange={e => { handleOnChangeRoleDetails(e); onInputChangeControllerRoleDetails(e) }}
                                                        >
                                                            {CommonFuncs.funcBindSelectOptons(AllParentFormList)}
                                                        </select>
                                                    </div>
                                                    {errorsRoleDetails.LandingPage && dirtyRoleDetails.LandingPage && (
                                                        <span className="error-label mt-2">{errorsRoleDetails.LandingPage}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row mt-3 mb-3">

                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Status<span
                                                            className="red">*</span>
                                                        </label>
                                                        <br />
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio1"
                                                                value="true"
                                                                defaultChecked={SaveNextRoleDetailsData.IsActive.value === true}
                                                                onChange={e => { handleOnChangeRoleDetails(e); onInputChangeControllerRoleDetails(e) }}
                                                            />
                                                            <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio2"
                                                                value="false"
                                                                defaultChecked={SaveNextRoleDetailsData.IsActive.value === false}
                                                                onChange={e => { handleOnChangeRoleDetails(e); onInputChangeControllerRoleDetails(e) }}
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
                                                                    className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1"
                                                                    id="btnSaveNextRoleDetails"
                                                                    disabled={disableRoleDetails}
                                                                >
                                                                    Save & Next
                                                                </button>

                                                            </div>
                                                            <div style={{ margin: '10px' }}>
                                                                <button type="button"
                                                                    className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                                    id="btnClearRoleDetails"
                                                                    onClick={btnClearRoleDetails}
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
                                    <div className="tab-pane fade" id="RoleRightsTab" role="tabpanel" aria-labelledby="RoleRights">

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
                                                                handelChangeBindRoleRights(e)
                                                            }}
                                                            disabled="disabled"
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
                                                            disabled="disabled"
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
                                                                    Finish
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

                            </section>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AddEditMstRole;
