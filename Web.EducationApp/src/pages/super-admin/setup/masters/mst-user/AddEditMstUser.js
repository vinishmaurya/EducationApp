/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit User Details
 * --------------------------------------------------------------------------
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import APIConfig from "../../../../../config/api.config.json";
import useFormValidator from "../../../../../util/useFormValidator";
import CommonFuncs from "../../../../../util/common.funcs";
import { $ } from 'react-jquery-plugin';
require('dotenv').config();
const IndexMstUser = (props) => {
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

    //#region User details form: define state, schema & validations
    // Define your state schema
    const stateSchemaUserDetails = {
        FullName: { value: propData ? propData.FullName : '', error: "This full name field is required!" },
        MobileNo: { value: propData ? propData.MobileNo : '', error: "This mobile no. field is required!!" },
        EmailId: { value: propData ? propData.EmailId : '', error: "This email id field is required!!" },
        CategoryId: { value: propData ? propData.CategoryId : '', error: "This User category field selection is required!" },
        AccountId: { value: propData ? propData.AccountId : '', error: "This account field selection is required!" },
        RoleId: { value: propData ? propData.RoleId : '', error: "This account field selection is required!" },
    };
    const [SaveNextUserDetailsData, setSaveNextUserDetailsData] = useState(stateSchemaUserDetails);
    // Create your own validationstateSchemaUserDetails
    // stateSchemaUserDetails property should be the same in validationstateSchemaUserDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaUserDetails = {
        FullName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid role name format."
            }
        },
        MobileNo: {
            required: true,
            validator: {
                func: value => phoneRegex.test(value),
                error: "Invalid mobile no. format."
            }
        },
        EmailId: {
            required: true,
            validator: {
                func: value => emailRegex.test(value),
                error: "Invalid email id format."
            }
        },
        CategoryId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid user category format."
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
    };
    //#endregion

    //#region additional info form: define state, schema & validations
    // Define your state schema
    const stateSchemaAdditionalInfo = {
        Gender: { value: propData ? propData.Gender : '', error: "This gender field is required!" },
        DateOfBirth: { value: propData ? propData.DateOfBirth : '', error: "This date of birth field is required!" },
        AlternateMobileNo: { value: propData ? propData.AlternateMobileNo : '', error: "This alternate mobile no. field is required!!" },
        AlternateEmailId: { value: propData ? propData.AlternateEmailId : '', error: "This alternate email id field is required!!" },
        UserAddress: { value: propData ? propData.UserAddress : '', error: "This User address field is required!" },
        ZipCode: { value: propData ? propData.ZipCode : '', error: "This zipcode field is required!" },
        CountryId: { value: propData ? propData.CountryId : '', error: "This country field selection is required!" },
        StateId: { value: propData ? propData.CityId : '', error: "This state field selection is required!!" },
        CityId: { value: propData ? propData.StateId : '', error: "This city field selection is required!!" },
        UserLogo: { value: File, error: "This User logo field is required!!" },
        UserLogoUrl: { value: propData ? propData.UserLogo : '', error: "" },
    };
    //define form hook
    const [SaveNextAdditionalInfoData, setSaveNextAdditionalInfoData] = useState(stateSchemaAdditionalInfo);
    // Create your own validationstateSchemaUserDetails
    // stateSchemaUserDetails property should be the same in validationstateSchemaUserDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaAdditionalInfo = {
        Gender: {
            required: false,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid gender format."
            }
        },
        DateOfBirth: {
            required: false,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid date of birth format."
            }
        },
        AlternateMobileNo: {
            required: false,
            validator: {
                func: value => phoneRegex.test(value),
                error: "Invalid alternate mobile no. format."
            }
        },
        AlternateEmailId: {
            required: false,
            validator: {
                func: value => emailRegex.test(value),
                error: "Invalid alternate email id format."
            }
        },
        UserAddress: {
            required: false
        },
        ZipCode: {
            required: false,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid zipcode format."
            }
        },
        CountryId: {
            required: false,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid country format."
            }
        },
        StateId: {
            required: false,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid state format."
            }
        },
        CityId: {
            required: false,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid city format."
            }
        },
        UserLogo: {
            required: (SaveNextAdditionalInfoData.UserLogo ? false : true)
        },
    };

    //#endregion

    //#region credentials form: define state, schema & validations

    // Define your state schema
    const stateSchemaCredentials = {
        Username: { value: propData ? propData.UserName : '', error: "This username field is required!" },
        Password: { value: propData ? propData.UserPassword : '', error: "This password field is required!" },
        ReEnterPassword: { value: propData ? propData.UserPassword : '', error: "This re enter password field is required!" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!!" }
    };
    const [FinishCredentialsData, setFinishCredentialsData] = useState(stateSchemaCredentials);
    // Create your own validationstateSchemaUserDetails
    // stateSchemaUserDetails property should be the same in validationstateSchemaUserDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaCredentials = {
        Username: {
            required: true,
            validator: {
                func: value => usernameRegex.test(value),
                error: "Invalid username format only contains (Lowercase Letters (a-z), Numbers(0 - 9), Dots(.), Underscores(_))"
            }
        },
        Password: {
            required: true,
            validator: {
                func: value => passwordRegex.test(value),
                error: "Invalid password format must contains min 8 letter password, with at least a symbol, upper and lower case letters and a number."
            }
        },
        ReEnterPassword: {
            required: true,
            validator: {
                func: value => {
                    //debugger;
                    if (!FinishCredentialsData.Password.value || FinishCredentialsData.Password.value != value)
                        return false;
                    else
                        return true;
                },
                error: "Password validation has failed."
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
    const [AllParentAccountList, setAllParentAccountList] = useState([]);
    const [AllCategoryList, setAllCategoryList] = useState([]);
    const [AllRoleList, setAllRoleList] = useState([]);
    const [AllCountryList, setAllCountryList] = useState([]);
    const [AllStateList, setAllStateList] = useState([]);
    const [AllCityList, setAllCityList] = useState([]);
    const [CurrentId, setCurrentId] = useState(propData ? propData.PK_ID : 0);

    //#endregion

    //#region define custom forms validation hooks
    const {
        values: valuesUserDetails,
        errors: errorsUserDetails,
        dirty: dirtyUserDetails,
        handleOnChange: handleOnChangeUserDetails,
        handleOnSubmit: handleOnSubmitUserDetails,
        disable: disableUserDetails,
        handleOnClear: handleOnClearUserDetails
    } = useFormValidator(stateSchemaUserDetails, stateValidatorSchemaUserDetails, onSubmitFormUserDetails);

    const {
        values: valuesAdditionalInfo,
        errors: errorsAdditionalInfo,
        dirty: dirtyAdditionalInfo,
        handleOnChange: handleOnChangeAdditionalInfo,
        handleOnSubmit: handleOnSubmitAdditionalInfo,
        disable: disableAdditionalInfo,
        handleOnClear: handleOnClearAdditionalInfo
    } = useFormValidator(stateSchemaAdditionalInfo, stateValidatorSchemaAdditionalInfo, onSubmitFormAdditionalInfo);

    const {
        values: valuesCredentials,
        errors: errorsCredentials,
        dirty: dirtyCredentials,
        handleOnChange: handleOnChangeCredentials,
        handleOnSubmit: handleOnSubmitCredentials,
        disable: disableCredentials,
        handleOnClear: handleOnClearCredentials
    } = useFormValidator(stateSchemaCredentials, stateValidatorSchemaCredentials, onSubmitFormCredentials);

    //#endregion


    useEffect(() => {
        //debugger;
        //#region bind default data for forms
        fetchAllParentAccountList();
        fetchAllCategoryList();
        fetchCountryList();
        fetchAllRoleList();
        //#endregion
        //#region set default value of forms use state hooks
        setSaveNextUserDetailsData(stateSchemaUserDetails);
        setSaveNextAdditionalInfoData(stateSchemaAdditionalInfo);
        setFinishCredentialsData(stateSchemaCredentials);
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
        if (propData && propData.hasOwnProperty('CountryId')) {
            fetchStateList(propData.CountryId);
        }

        if (propData && propData.hasOwnProperty('StateId')) {
            fetchCityList(propData.StateId);
        }
        //#endregion
    }, []);
    //#region bind funcs to call axios
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

    const fetchAllRoleList = async () => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllRoleListUri;

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

    const fetchCountryList = async () => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllCountryListUri;
        //console.log(apiUri);
        const instance = axios.create({
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
                    DataList.push({ ListValue: data.CountryId, ListText: data.CountryName });
                });
                setAllCountryList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    const fetchStateList = async (CountryId) => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllStateListCountryIdUri;
        const instance = axios.create({
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
            'url': apiUri ? apiUri + "?CountryId=" + CountryId : ""
        }).then((response) => {
            if (response.data.Result) {
                let DataList = [];
                response.data.Data.map((data, i) => {
                    DataList.push({ ListValue: data.StateId, ListText: data.StateName });
                });
                setAllStateList(DataList);
            }

        }).catch((e) => {
            console.log(e);
        });
    };

    const fetchCityList = async (StateId) => {
        //debugger;
        let apiUri = APIConfig.Admin.Common.GetAllCityListByStateUri;
        const instance = axios.create({
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
            'url': apiUri ? apiUri + "?StateId=" + StateId : ""
        }).then((response) => {

            if (response.data.Result) {
                let DataList = [];
                response.data.Data.map((data, i) => {
                    DataList.push({ ListValue: data.CityId, ListText: data.CityName });
                });
                setAllCityList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    //#endregion

    //#region submit form data and call axios
    //Step 1 : User Details 
    function onSubmitFormUserDetails(event, valuesUserDetails) {
        debugger
        event.preventDefault();
        const btnPointer = document.querySelector('#btnSaveNextUserDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditUserDetailsUri = APIConfig.Admin.User.AddEditUserDetailsUri;
            const formElement = document.querySelector('#UserDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["UserId"] = CurrentId;
            formDataJSON["StepCompleted"] = "UserDetails";
            formDataJSON["NextStep"] = "AdditionalInfo";

            const bodyFormData = new FormData();
            bodyFormData.append('UserDetails', JSON.stringify(formDataJSON));

            //bodyFormData.append('image', imageFile);

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
                'url': AddEditUserDetailsUri ? AddEditUserDetailsUri : "",
                'data': bodyFormData
            }).then((response) => {
                if (response.data && response.data.Result) {
                    btnPointer.innerHTML = 'Save & Next';
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                    document.querySelector('#AdditionalInfo').click();
                    setCurrentId(response.data.Data.CreatedUserId);
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
        //setSaveNextUserDetailsData(formDataJSON);
        //btnPointer.innerHTML = 'Save & Next';
        //btnPointer.removeAttribute('disable');
        //}, 500);
        //document.querySelector('#AdditionalInfo').click();
        //console.log(SaveNextUserDetailsData);
    }
    //Step 2 : Additional Info
    function onSubmitFormAdditionalInfo(event, valuesAdditionalInfo) {
        //debugger;
        event.preventDefault();

        const btnPointer = document.querySelector('#btnSaveNextAdditionalInfo');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditUserDetailsUri = APIConfig.Admin.User.AddEditUserDetailsUri;
            const formElement = document.querySelector('#AdditionalInfoForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);

            formDataJSON["UserLogoUrl"] = SaveNextAdditionalInfoData.UserLogoUrl.value;
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["UserId"] = CurrentId;
            formDataJSON["StepCompleted"] = "AdditionalInfo";
            formDataJSON["NextStep"] = "Credentials";

            const bodyFormData = new FormData();
            bodyFormData.append('UserDetails', JSON.stringify(formDataJSON));
            bodyFormData.append('UserLogo', formDataJSON.UserLogo);

            //bodyFormData.append('image', imageFile);

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
                'url': AddEditUserDetailsUri ? AddEditUserDetailsUri : "",
                'data': bodyFormData
            }).then((response) => {
                if (response.data && response.data.Result) {
                    btnPointer.innerHTML = 'Save & Next';
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                    document.querySelector('#Credentials').click();
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

    }

    //Step 3 : Credentials
    function onSubmitFormCredentials(event, valuesCredentials) {
        //debugger;
        event.preventDefault();

        const btnPointer = document.querySelector('#btnSaveNextCredentials');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditUserDetailsUri = APIConfig.Admin.User.AddEditUserDetailsUri;
            const formElement = document.querySelector('#CredentialsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["UserId"] = CurrentId;
            formDataJSON["StepCompleted"] = "Credentials";
            formDataJSON["NextStep"] = "Completed";

            const bodyFormData = new FormData();
            bodyFormData.append('UserDetails', JSON.stringify(formDataJSON));

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
                'url': AddEditUserDetailsUri ? AddEditUserDetailsUri : "",
                'data': bodyFormData
            }).then((response) => {
                if (response.data && response.data.Result) {
                    btnPointer.innerHTML = 'Finish';
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                    document.querySelector('#Credentials').click();
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
    }
    //#endregion

    //#region clear form data and call axios
    const btnClearUserDetails = (event) => {
        setSaveNextUserDetailsData(stateSchemaUserDetails);
        handleOnClearUserDetails(event);
    }
    const btnClearAdditionalInfo = (event) => {
        setSaveNextAdditionalInfoData(stateSchemaAdditionalInfo);
        handleOnClearAdditionalInfo(event);
    }
    const btnClearCredentials = (event) => {
        setFinishCredentialsData(stateSchemaCredentials);
        handleOnClearCredentials(event);
    }
    //#endregion
    //#region other form control functions
    const onInputChangeControllerUserDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(SaveNextUserDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = SaveNextUserDetailsData[keys[i]];
            } else {
                obj[name] = SaveNextUserDetailsData[name];
                obj[name].value = value;
            }
        }
        setSaveNextUserDetailsData(obj);
    };
    const onInputChangeControllerAdditionalInfo = (event) => {
        const target = event.target;
        const value = target.type === 'file' ? target.files[0] : target.value;
        const name = target.name;
        let keys = Object.keys(SaveNextAdditionalInfoData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = SaveNextAdditionalInfoData[keys[i]];
            } else {
                obj[name] = SaveNextAdditionalInfoData[name];
                obj[name].value = value;
            }
        }
        setSaveNextAdditionalInfoData(obj);
    };
    const onInputChangeControllerCredentials = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(FinishCredentialsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = FinishCredentialsData[keys[i]];
            } else {
                obj[name] = FinishCredentialsData[name];
                obj[name].value = value;
            }
        }
        setFinishCredentialsData(obj);
    };


    const funcChangeCountrySelection = (e) => {
        //alert('country changes');
        let CountryId = Number(e.target.value);
        fetchStateList(CountryId);
    }
    const funcChangeStateSelection = (e) => {
        //debugger;
        let StateId = Number(e.target.value);
        fetchCityList(StateId);
    }

    const checkUserExistence = (e) => {
        console.log(e);
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

                        <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="Details" data-bs-toggle="tab" data-bs-target="#DetailsTab" type="button" role="tab" aria-controls="DetailsTab" aria-selected="true">User Details</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="AdditionalInfo" data-bs-toggle="tab" data-bs-target="#AdditionalInfoTab" type="button" role="tab" aria-controls="AdditionalInfoTab" aria-selected="false">Additional Info</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="Credentials" data-bs-toggle="tab" data-bs-target="#CredentialsTab" type="button" role="tab" aria-controls="CredentialsTab" aria-selected="false">Credentials</button>
                            </li>

                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="DetailsTab" role="tabpanel" aria-labelledby="Details">
                                <form onSubmit={handleOnSubmitUserDetails} id="UserDetailsForm">

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Full Name{stateValidatorSchemaUserDetails.FullName.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsUserDetails.FullName && dirtyUserDetails.FullName ? 'has-error' :
                                                            (dirtyUserDetails.FullName ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="FullName" placeholder="User Name"
                                                    type="text"
                                                    value={SaveNextUserDetailsData.FullName.value}
                                                    onChange={e => { handleOnChangeUserDetails(e); onInputChangeControllerUserDetails(e) }}
                                                />

                                            </div>
                                            {errorsUserDetails.FullName && dirtyUserDetails.FullName && (
                                                <span className="error-label mt-2">{errorsUserDetails.FullName}</span>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Mobile No.{stateValidatorSchemaUserDetails.MobileNo.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsUserDetails.MobileNo && dirtyUserDetails.MobileNo ? 'has-error' :
                                                            (dirtyUserDetails.MobileNo ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="MobileNo" placeholder="User Name"
                                                    type="text"
                                                    value={SaveNextUserDetailsData.MobileNo.value}
                                                    onChange={e => { handleOnChangeUserDetails(e); onInputChangeControllerUserDetails(e) }}
                                                />

                                            </div>
                                            {errorsUserDetails.MobileNo && dirtyUserDetails.MobileNo && (
                                                <span className="error-label mt-2">{errorsUserDetails.MobileNo}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Email ID{stateValidatorSchemaUserDetails.EmailId.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsUserDetails.EmailId && dirtyUserDetails.EmailId ? 'has-error' :
                                                            (dirtyUserDetails.EmailId ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="EmailId" placeholder="User Name"
                                                    type="text"
                                                    value={SaveNextUserDetailsData.EmailId.value}
                                                    onChange={e => { handleOnChangeUserDetails(e); onInputChangeControllerUserDetails(e) }}
                                                />

                                            </div>
                                            {errorsUserDetails.EmailId && dirtyUserDetails.EmailId && (
                                                <span className="error-label mt-2">{errorsUserDetails.EmailId}</span>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2" >User Category{stateValidatorSchemaUserDetails.CategoryId.required && (<span className="red">*</span>)}
                                                </label>
                                                <select
                                                    className={"form-control " +
                                                        (errorsUserDetails.CategoryId && dirtyUserDetails.CategoryId ? 'has-error' :
                                                            (dirtyUserDetails.CategoryId ? 'has-success' : ''))
                                                    }
                                                    name="CategoryId"
                                                    value={SaveNextUserDetailsData.CategoryId.value}
                                                    onChange={e => { handleOnChangeUserDetails(e); onInputChangeControllerUserDetails(e) }}
                                                >
                                                    {CommonFuncs.funcBindSelectOptons(AllCategoryList)}
                                                </select>
                                            </div>
                                            {errorsUserDetails.CategoryId && dirtyUserDetails.CategoryId && (
                                                <span className="error-label mt-2">{errorsUserDetails.CategoryId}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Account For{stateValidatorSchemaUserDetails.AccountId.required && (<span className="red">*</span>)}</label>
                                                <select
                                                    className={"form-control " +
                                                        (errorsUserDetails.AccountId && dirtyUserDetails.AccountId ? 'has-error' :
                                                            (dirtyUserDetails.AccountId ? 'has-success' : ''))
                                                    }
                                                    name="AccountId"
                                                    value={SaveNextUserDetailsData.AccountId.value}
                                                    onChange={e => { handleOnChangeUserDetails(e); onInputChangeControllerUserDetails(e) }}
                                                >
                                                    {CommonFuncs.funcBindSelectOptons(AllParentAccountList)}
                                                </select>
                                            </div>
                                            {errorsUserDetails.AccountId && dirtyUserDetails.AccountId && (
                                                <span className="error-label mt-2">{errorsUserDetails.AccountId}</span>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Role For{stateValidatorSchemaUserDetails.RoleId.required && (<span className="red">*</span>)}</label>
                                                <select
                                                    className={"form-control " +
                                                        (errorsUserDetails.RoleId && dirtyUserDetails.RoleId ? 'has-error' :
                                                            (dirtyUserDetails.RoleId ? 'has-success' : ''))
                                                    }
                                                    name="RoleId"
                                                    value={SaveNextUserDetailsData.RoleId.value}
                                                    onChange={e => { handleOnChangeUserDetails(e); onInputChangeControllerUserDetails(e) }}
                                                >
                                                    {CommonFuncs.funcBindSelectOptons(AllRoleList)}
                                                </select>
                                            </div>
                                            {errorsUserDetails.RoleId && dirtyUserDetails.RoleId && (
                                                <span className="error-label mt-2">{errorsUserDetails.RoleId}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-body">
                                                <div style={{ justifyContent: 'center' }} className="form-actions mt-3 d-flex">

                                                    <div style={{ margin: '10px' }}>
                                                        <button type="submit"
                                                            className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            id="btnSaveNextUserDetails"
                                                            disabled={disableUserDetails}
                                                        >
                                                            Save & Next
                                                                </button>

                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            id="btnClearUserDetails"
                                                            onClick={btnClearUserDetails}
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
                            <div className="tab-pane fade" id="AdditionalInfoTab" role="tabpanel" aria-labelledby="AdditionalInfo">
                                <form onSubmit={handleOnSubmitAdditionalInfo} id="AdditionalInfoForm">
                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Gender
                                                        {stateSchemaAdditionalInfo.Gender.required && (<span className="red">*</span>)}
                                                </label>
                                                <select
                                                    className={"form-control " +
                                                        (errorsAdditionalInfo.Gender && dirtyAdditionalInfo.Gender ? 'has-error' :
                                                            (dirtyAdditionalInfo.Gender ? 'has-success' : ''))
                                                    }
                                                    name="Gender"
                                                    value={SaveNextAdditionalInfoData.Gender.value}
                                                    onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}
                                                >
                                                    <option value="">--Select--</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                            {errorsAdditionalInfo.Gender && dirtyAdditionalInfo.Gender && (
                                                <span className="error-label mt-2">{errorsAdditionalInfo.Gender}</span>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Date of Birth
                                            {stateSchemaAdditionalInfo.DateOfBirth.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsAdditionalInfo.DateOfBirth && dirtyAdditionalInfo.DateOfBirth ? 'has-error' :
                                                            (dirtyAdditionalInfo.DateOfBirth ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="50" name="DateOfBirth" placeholder="Date Of Birth"
                                                    type="text"
                                                    value={SaveNextAdditionalInfoData.DateOfBirth.value}
                                                    onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}
                                                />

                                            </div>
                                            {errorsAdditionalInfo.DateOfBirth && dirtyAdditionalInfo.DateOfBirth && (
                                                <span className="error-label mt-2">{errorsAdditionalInfo.DateOfBirth}</span>
                                            )}
                                        </div>

                                    </div>

                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Alternate Mobile No.{stateValidatorSchemaAdditionalInfo.AlternateMobileNo.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsAdditionalInfo.AlternateMobileNo && dirtyAdditionalInfo.AlternateMobileNo ? 'has-error' :
                                                            (dirtyAdditionalInfo.AlternateMobileNo ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="20" name="AlternateMobileNo" placeholder="Alternate Mobile No. (Like: +91 9999999999)"
                                                    type="text"
                                                    value={SaveNextAdditionalInfoData.AlternateMobileNo.value}
                                                    onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}
                                                />
                                            </div>
                                            {errorsAdditionalInfo.AlternateMobileNo && dirtyAdditionalInfo.AlternateMobileNo && (
                                                <span className="error-label mt-2">{errorsAdditionalInfo.AlternateMobileNo}</span>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Alternate Email{stateValidatorSchemaAdditionalInfo.AlternateEmailId.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsAdditionalInfo.AlternateEmailId && dirtyAdditionalInfo.AlternateEmailId ? 'has-error' :
                                                            (dirtyAdditionalInfo.AlternateEmailId ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="100" name="AlternateEmailId" placeholder="Alternate Email (Like: somebody@example.com)"
                                                    type="text"
                                                    value={SaveNextAdditionalInfoData.AlternateEmailId.value}
                                                    onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}
                                                />
                                            </div>
                                            {errorsAdditionalInfo.AlternateEmailId && dirtyAdditionalInfo.AlternateEmailId && (
                                                <span className="error-label mt-2">{errorsAdditionalInfo.AlternateEmailId}</span>
                                            )}
                                        </div>

                                    </div>

                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Country{stateValidatorSchemaAdditionalInfo.CountryId.required && (<span className="red">*</span>)}</label>
                                                <select
                                                    className={"form-control " +
                                                        (errorsAdditionalInfo.CountryId && dirtyAdditionalInfo.CountryId ? 'has-error' :
                                                            (dirtyAdditionalInfo.CountryId ? 'has-success' : ''))
                                                    }
                                                    value={SaveNextAdditionalInfoData.CountryId.value}
                                                    onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e); funcChangeCountrySelection(e) }}

                                                    name="CountryId"
                                                >
                                                    {CommonFuncs.funcBindSelectOptons(AllCountryList)}
                                                </select>
                                            </div>
                                            {errorsAdditionalInfo.CountryId && dirtyAdditionalInfo.CountryId && (
                                                <span className="error-label mt-2">{errorsAdditionalInfo.CountryId}</span>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">State{stateValidatorSchemaAdditionalInfo.StateId.required && (<span className="red">*</span>)}</label>
                                                <select
                                                    className={"form-control " +
                                                        (errorsAdditionalInfo.StateId && dirtyAdditionalInfo.StateId ? 'has-error' :
                                                            (dirtyAdditionalInfo.StateId ? 'has-success' : ''))
                                                    }

                                                    value={SaveNextAdditionalInfoData.StateId.value}
                                                    onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e); funcChangeStateSelection(e) }}

                                                    name="StateId"
                                                >
                                                    {CommonFuncs.funcBindSelectOptons(AllStateList)}
                                                </select>
                                            </div>
                                            {errorsAdditionalInfo.StateId && dirtyAdditionalInfo.StateId && (
                                                <span className="error-label mt-2">{errorsAdditionalInfo.StateId}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">City{stateValidatorSchemaAdditionalInfo.CityId.required && (<span className="red">*</span>)}</label>
                                                <select
                                                    className={"form-control " +
                                                        (errorsAdditionalInfo.CityId && dirtyAdditionalInfo.CityId ? 'has-error' :
                                                            (dirtyAdditionalInfo.CityId ? 'has-success' : ''))
                                                    }

                                                    value={SaveNextAdditionalInfoData.CityId.value}
                                                    onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}

                                                    name="CityId"
                                                >
                                                    {CommonFuncs.funcBindSelectOptons(AllCityList)}
                                                </select>


                                            </div>
                                            {errorsAdditionalInfo.CityId && dirtyAdditionalInfo.CityId && (
                                                <span className="error-label mt-2">{errorsAdditionalInfo.CityId}</span>
                                            )}
                                        </div>

                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Zip Code{stateValidatorSchemaAdditionalInfo.ZipCode.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsAdditionalInfo.ZipCode && dirtyAdditionalInfo.ZipCode ? 'has-error' :
                                                            (dirtyAdditionalInfo.ZipCode ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="10"
                                                    name="ZipCode" placeholder="Zip Code" type="text"
                                                    value={SaveNextAdditionalInfoData.ZipCode.value}
                                                    onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}

                                                />
                                            </div>
                                            {errorsAdditionalInfo.ZipCode && dirtyAdditionalInfo.ZipCode && (
                                                <span className="error-label mt-2">{errorsAdditionalInfo.ZipCode}</span>
                                            )}
                                        </div>

                                    </div>

                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">User Address{stateValidatorSchemaAdditionalInfo.UserAddress.required && (<span className="red">*</span>)}</label>
                                                <textarea
                                                    className={"form-control " +
                                                        (errorsAdditionalInfo.UserAddress && dirtyAdditionalInfo.UserAddress ? 'has-error' :
                                                            (dirtyAdditionalInfo.UserAddress ? 'has-success' : ''))
                                                    }
                                                    cols="20" id="UserAddress"
                                                    maxLength="200" name="UserAddress" placeholder="Address"
                                                    rows="1"
                                                    value={SaveNextAdditionalInfoData.UserAddress.value}
                                                    onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}

                                                ></textarea>
                                            </div>
                                            {errorsAdditionalInfo.UserAddress && dirtyAdditionalInfo.UserAddress && (
                                                <span className="error-label mt-2">{errorsAdditionalInfo.UserAddress}</span>
                                            )}
                                        </div>


                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">User Logo{stateValidatorSchemaAdditionalInfo.UserLogo.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsAdditionalInfo.UserLogo && dirtyAdditionalInfo.UserLogo ? 'has-error' :
                                                            (dirtyAdditionalInfo.UserLogo ? 'has-success' : ''))
                                                    }
                                                    type="file"
                                                    onChange={onInputChangeControllerAdditionalInfo}
                                                    onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}

                                                    name="UserLogo"
                                                />
                                            </div>
                                            {errorsAdditionalInfo.UserLogo && dirtyAdditionalInfo.UserLogo && (
                                                <span className="error-label mt-2">{errorsAdditionalInfo.UserLogo}</span>
                                            )}

                                            {
                                                SaveNextAdditionalInfoData.UserLogoUrl.value && (
                                                    <>
                                                        <a href={SaveNextAdditionalInfoData.UserLogoUrl.value} target="_blank">
                                                            <img
                                                                src={SaveNextAdditionalInfoData.UserLogoUrl.value}
                                                                style={{ maxWidth: "40px" }}
                                                                className="img-thumbnail mt-1"
                                                            />
                                                        </a>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-body">
                                                <div style={{ justifyContent: 'center' }} className="form-actions mt-3 d-flex">

                                                    <div style={{ margin: '10px' }}>
                                                        <button type="submit"
                                                            className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            id="btnSaveNextAdditionalInfo"
                                                            disabled={disableAdditionalInfo}
                                                        >Save & Next</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            onClick={btnClearAdditionalInfo}
                                                        >Clear</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-light box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            onClick={(e) => { document.querySelector('#Details').click(); }}
                                                        >
                                                            Previous
                                                                </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="CredentialsTab" role="tabpanel" aria-labelledby="Credentials">

                                <form onSubmit={handleOnSubmitCredentials} id="CredentialsForm">
                                    <div className="row mt-1 mb-1">


                                        <div className="col-6">


                                            <div className="form-group">
                                                <label className="label-control mb-2">Username{stateValidatorSchemaCredentials.Username.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsCredentials.Username && dirtyCredentials.Username ? 'has-error' :
                                                            (dirtyCredentials.Username ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="100" name="Username" placeholder="Username"
                                                    type="text"
                                                    autoComplete="off"
                                                    value={FinishCredentialsData.Username.value}
                                                    onChange={e => { handleOnChangeCredentials(e); onInputChangeControllerCredentials(e) }}
                                                />
                                            </div>
                                            {errorsCredentials.Username && dirtyCredentials.Username && (
                                                <span className="error-label mt-2">{errorsCredentials.Username}</span>
                                            )}


                                        </div>
                                        <div className="col-6">


                                            <div className="form-group">
                                                <label className="label-control mb-2">Password{stateValidatorSchemaCredentials.Password.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsCredentials.Password && dirtyCredentials.Password ? 'has-error' :
                                                            (dirtyCredentials.Password ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="100" name="Password" placeholder="Password"
                                                    type="password"
                                                    autoComplete="off"
                                                    value={FinishCredentialsData.Password.value}
                                                    onChange={e => { handleOnChangeCredentials(e); onInputChangeControllerCredentials(e) }}
                                                />
                                            </div>
                                            {errorsCredentials.Password && dirtyCredentials.Password && (
                                                <span className="error-label mt-2">{errorsCredentials.Password}</span>
                                            )}


                                        </div>
                                    </div>
                                    <div className="row mt-1 mb-1">
                                        <div className="col-6">

                                            <div className="form-group">
                                                <label className="label-control mb-2">Re Enter Password{stateValidatorSchemaCredentials.ReEnterPassword.required && (<span className="red">*</span>)}</label>
                                                <input
                                                    className={"form-control " +
                                                        (errorsCredentials.ReEnterPassword && dirtyCredentials.ReEnterPassword ? 'has-error' :
                                                            (dirtyCredentials.ReEnterPassword ? 'has-success' : ''))
                                                    }
                                                    data-val="true"
                                                    maxLength="100" name="ReEnterPassword" placeholder="Re Enter Password"
                                                    type="password"
                                                    autoComplete="off"
                                                    value={FinishCredentialsData.ReEnterPassword.value}
                                                    onChange={e => { handleOnChangeCredentials(e); onInputChangeControllerCredentials(e) }}
                                                />
                                            </div>
                                            {errorsCredentials.ReEnterPassword && dirtyCredentials.ReEnterPassword && (
                                                <span className="error-label mt-2">{errorsCredentials.ReEnterPassword}</span>
                                            )}

                                        </div>


                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Status<span
                                                    className="red">*</span>
                                                </label>
                                                <br />
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio1"
                                                        value="true"
                                                        defaultChecked={FinishCredentialsData.IsActive.value === true}
                                                        onChange={e => { handleOnChangeCredentials(e); onInputChangeControllerCredentials(e) }}
                                                    />
                                                    <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio2"
                                                        value="false"
                                                        defaultChecked={FinishCredentialsData.IsActive.value === false}
                                                        onChange={e => { handleOnChangeCredentials(e); onInputChangeControllerCredentials(e) }}
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
                                                            id="btnSaveNextCredentials"
                                                            disabled={disableCredentials}
                                                        >Finish</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            onClick={btnClearCredentials}
                                                        >Clear</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="button"
                                                            className="btn btn-light box-shadow-1 round btn-min-width mr-1 mb-1"
                                                            onClick={(e) => { document.querySelector('#AdditionalInfo').click(); }}
                                                        >
                                                            Previous
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
            </div>
        </>
    );
};

export default IndexMstUser;
