/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Add Edit Account Details
 * --------------------------------------------------------------------------
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import APIConfig from "../../../../../config/api.config.json";
import AccountService from "../../../../../services/account.services";
//import AccountDetailsModel from "../../../../../models/accountdetails.model";
import reqBody from "../../../../../models/reqBody.Model";
import useFormValidator from "../../../../../util/useFormValidator";
import CustomDropdown from "../../../../../core/components/dropdown/CustomDropdown";
import { $ } from 'react-jquery-plugin';
require('dotenv').config();

const AddEditMstAccount = (props) => {
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

    //#region account details form: define state, schema & validations
    // Define your state schema
    const stateSchemaAccountDetails = {
        CategoryId: { value: propData ? propData.FK_CategoryId : '', error: "This account category field selection is required!" },
        AccountName: { value: propData ? propData.AccountName : '', error: "This account name field is required!" },
        ParentAccountId: { value: propData ? propData.ParentAccountId : '', error: "This parent account field selection is required!" },
        ContactPerson: { value: propData ? propData.ContactPerson : '', error: "This contact person field is required!!" },
        MobileNo: { value: propData ? propData.MobileNo : '', error: "This mobile no. field is required!!" },
        AlternateMobileNo: { value: propData ? propData.AlternateMobileNo : '', error: "This alternate mobile no. field is required!!" },
        EmailId: { value: propData ? propData.EmailId : '', error: "This email id field is required!!" },
        AlternateEmailId: { value: propData ? propData.AlternateEmailId : '', error: "This alternate email id field is required!!" }
    };
    const [SaveNextAccountDetailsData, setSaveNextAccountDetailsData] = useState(stateSchemaAccountDetails);
    // Create your own validationstateSchemaAccountDetails
    // stateSchemaAccountDetails property should be the same in validationstateSchemaAccountDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaAccountDetails = {
        CategoryId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid account category format."
            }
        },
        AccountName: {
            required: true,
            validator: {
                func: value => name1to50Regex.test(value),
                error: "Invalid account name format."
            }
        },
        ParentAccountId: {
            required: false,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid parent account format."
            }
        },
        ContactPerson: {
            required: false,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid contact person format."
            }
        },
        MobileNo: {
            required: true,
            validator: {
                func: value => phoneRegex.test(value),
                error: "Invalid mobile no. format."
            }
        },
        AlternateMobileNo: {
            required: false,
            validator: {
                func: value => phoneRegex.test(value),
                error: "Invalid alternate mobile no. format."
            }
        },
        EmailId: {
            required: true,
            validator: {
                func: value => emailRegex.test(value),
                error: "Invalid email id format."
            }
        },
        AlternateEmailId: {
            required: false,
            validator: {
                func: value => emailRegex.test(value),
                error: "Invalid alternate email id format."
            }
        }
    };
    //#endregion

    //#region additional info form: define state, schema & validations
    // Define your state schema
    const stateSchemaAdditionalInfo = {
        AccountAddress: { value: propData ? propData.AccountAddress : '', error: "This account address field is required!" },
        ZipCode: { value: propData ? propData.ZipCode : '', error: "This zipcode field is required!" },
        CountryId: { value: propData ? propData.FK_CountryId : '', error: "This country field selection is required!" },
        StateId: { value: propData ? propData.FK_CityId : '', error: "This state field selection is required!!" },
        CityId: { value: propData ? propData.FK_StateId : '', error: "This city field selection is required!!" },
        AccountLogo: { value: File, error: "This account logo field is required!!" },
        AccountLogoUrl: { value: propData ? propData.AccountLogo : '', error: "" },
    };
    //define form hook
    const [SaveNextAdditionalInfoData, setSaveNextAdditionalInfoData] = useState(stateSchemaAdditionalInfo);
    // Create your own validationstateSchemaAccountDetails
    // stateSchemaAccountDetails property should be the same in validationstateSchemaAccountDetails
    // in-order a validation to works in your input.
    const stateValidatorSchemaAdditionalInfo = {
        AccountAddress: {
            required: true
        },
        ZipCode: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid zipcode format."
            }
        },
        CountryId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid country format."
            }
        },
        StateId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid state format."
            }
        },
        CityId: {
            required: true,
            validator: {
                func: value => numberRegex.test(value),
                error: "Invalid city format."
            }
        },
        AccountLogo: {
            required: (SaveNextAdditionalInfoData.AccountLogo ? false : true)
        },
    };

    //#endregion

    //#region credentials form: define state, schema & validations

    // Define your state schema
    const stateSchemaCredentials = {
        Username: { value: propData ? propData.Username : '', error: "This username field is required!" },
        Password: { value: propData ? propData.Password : '', error: "This password field is required!" },
        ReEnterPassword: { value: propData ? propData.Password : '', error: "This re enter password field is required!" },
        IsActive: { value: propData ? propData.IsActive : true, error: "This status field selection is required!!" }
    };
    const [FinishCredentialsData, setFinishCredentialsData] = useState(stateSchemaCredentials);
    // Create your own validationstateSchemaAccountDetails
    // stateSchemaAccountDetails property should be the same in validationstateSchemaAccountDetails
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
    const [AllCountryList, setAllCountryList] = useState([]);
    const [AllStateList, setAllStateList] = useState([]);
    const [AllCityList, setAllCityList] = useState([]);
    const [CurrentId, setCurrentId] = useState(propData ? propData.PK_AccountId : 0);

    //#endregion

    //#region define custom forms validation hooks
    const {
        values: valuesAccountDetails,
        errors: errorsAccountDetails,
        dirty: dirtyAccountDetails,
        handleOnChange: handleOnChangeAccountDetails,
        handleOnSubmit: handleOnSubmitAccountDetails,
        disable: disableAccountDetails,
        handleOnClear: handleOnClearAccountDetails
    } = useFormValidator(stateSchemaAccountDetails, stateValidatorSchemaAccountDetails, onSubmitFormAccountDetails);

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
        //#endregion
        //#region set default value of forms use state hooks
        setSaveNextAccountDetailsData(stateSchemaAccountDetails);
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
            $("#AccountDetails").trigger('click');
        }
        if (propData && propData.hasOwnProperty('FK_CountryId')) {
            fetchStateList(propData.FK_CountryId);
        }

        if (propData && propData.hasOwnProperty('FK_StateId')) {
            fetchCityList(propData.FK_StateId);
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

    const fetchAllParentAccountList = async () => {
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
                    DataList.push({ ListValue: data.Pk_FormId, ListText: data.FormName });
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
                    DataList.push({ ListValue: data.PK_CountryId, ListText: data.CountryName });
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
                    DataList.push({ ListValue: data.PK_StateId, ListText: data.StateName });
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
                    DataList.push({ ListValue: data.PK_CityId, ListText: data.CityName });
                });
                setAllCityList(DataList);
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    //#endregion

    //#region submit form data and call axios
    //Step 1 : Account Details 
    function onSubmitFormAccountDetails(event, valuesAccountDetails) {
        event.preventDefault();
        const btnPointer = document.querySelector('#btnSaveNextAccountDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditAccountDetailsUri = APIConfig.Admin.Account.AddEditAccountDetailsUri;
            const formElement = document.querySelector('#AccountDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["AccountId"] = CurrentId;
            formDataJSON["StepCompleted"] = "AccountDetails";
            formDataJSON["NextStep"] = "AdditionalInfo";

            const bodyFormData = new FormData();
            bodyFormData.append('AccountDetails', JSON.stringify(formDataJSON));

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
                'url': AddEditAccountDetailsUri ? AddEditAccountDetailsUri : "",
                'data': bodyFormData
            }).then((response) => {
                if (response.data && response.data.Result) {
                    btnPointer.innerHTML = 'Save & Next';
                    btnPointer.removeAttribute('disable');
                    setHasAPISuccess(true);
                    setHasAPIError(false);
                    setHasAPIMessage(response.data.Message);
                    document.querySelector('#AdditionalInfo').click();
                    setCurrentId(response.data.Data.CreatedAccountId);
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
        //setSaveNextAccountDetailsData(formDataJSON);
        //btnPointer.innerHTML = 'Save & Next';
        //btnPointer.removeAttribute('disable');
        //}, 500);
        //document.querySelector('#AdditionalInfo').click();
        //console.log(SaveNextAccountDetailsData);
    }
    //Step 2 : Additional Info
    function onSubmitFormAdditionalInfo(event, valuesAdditionalInfo) {
        //debugger;
        event.preventDefault();

        const btnPointer = document.querySelector('#btnSaveNextAdditionalInfo');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditAccountDetailsUri = APIConfig.Admin.Account.AddEditAccountDetailsUri;
            const formElement = document.querySelector('#AdditionalInfoForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);

            formDataJSON["AccountLogoUrl"] = SaveNextAdditionalInfoData.AccountLogoUrl.value;
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["AccountId"] = CurrentId;
            formDataJSON["StepCompleted"] = "AdditionalInfo";
            formDataJSON["NextStep"] = "Credentials";

            const bodyFormData = new FormData();
            bodyFormData.append('AccountDetails', JSON.stringify(formDataJSON));
            bodyFormData.append('AccountLogo', formDataJSON.AccountLogo);

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
                'url': AddEditAccountDetailsUri ? AddEditAccountDetailsUri : "",
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
            let AddEditAccountDetailsUri = APIConfig.Admin.Account.AddEditAccountDetailsUri;
            const formElement = document.querySelector('#CredentialsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = Cookie.loggedInUserId;
            formDataJSON["AccountId"] = CurrentId;
            formDataJSON["StepCompleted"] = "Credentials";
            formDataJSON["NextStep"] = "Completed";

            const bodyFormData = new FormData();
            bodyFormData.append('AccountDetails', JSON.stringify(formDataJSON));

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
                'url': AddEditAccountDetailsUri ? AddEditAccountDetailsUri : "",
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
    const btnClearAccountDetails = (event) => {
        setSaveNextAccountDetailsData(stateSchemaAccountDetails);
        handleOnClearAccountDetails(event);
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
    const onInputChangeControllerAccountDetails = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(SaveNextAccountDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = SaveNextAccountDetailsData[keys[i]];
            } else {
                obj[name] = SaveNextAccountDetailsData[name];
                obj[name].value = value;
            }
        }
        setSaveNextAccountDetailsData(obj);
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

    function funcBindSelectOptons(DataList) {
        //debugger;
        let itemList = [];
        let flag = false;
        if (!DataList) { flag = true; }
        if (!DataList.length > 0) { flag = true; }
        itemList.push(
            <option key={-1} value="">--Select--</option>
        )
        if (!flag) {
            DataList.map((data, i) => {
                itemList.push(
                    <option key={i} value={data.ListValue}>{data.ListText}</option>
                )
            });
        }
        return itemList;
    }
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
                                        <strong>{!HasAPIMessage ? "Opps! Somthing went wrong!" : HasAPIMessage}</strong>
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
                    <div className="content-body content-demo" style={{ backgroundColor: '#FFFFFF' }}>
                        <section className="NewformTabs">
                            <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="AccountDetails" data-bs-toggle="tab" data-bs-target="#AccountDetailsTab" type="button" role="tab" aria-controls="AccountDetailsTab" aria-selected="true">Account Details</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="AdditionalInfo" data-bs-toggle="tab" data-bs-target="#AdditionalInfoTab" type="button" role="tab" aria-controls="AdditionalInfoTab" aria-selected="false">Additional Info</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="Credentials" data-bs-toggle="tab" data-bs-target="#CredentialsTab" type="button" role="tab" aria-controls="Credentials" aria-selected="false">Credentials</button>
                                </li>

                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="AccountDetailsTab" role="tabpanel" aria-labelledby="AccountDetails">
                                    <form onSubmit={handleOnSubmitAccountDetails} id="AccountDetailsForm">

                                        <div className="row">

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2" >Account Category{stateValidatorSchemaAccountDetails.CategoryId.required && (<span className="red">*</span>)}
                                                    </label>
                                                    <select
                                                        className={"form-control " +
                                                            (errorsAccountDetails.CategoryId && dirtyAccountDetails.CategoryId ? 'has-error' :
                                                                (dirtyAccountDetails.CategoryId ? 'has-success' : ''))
                                                        }
                                                        name="CategoryId"
                                                        value={SaveNextAccountDetailsData.CategoryId.value}
                                                        onChange={e => { handleOnChangeAccountDetails(e); onInputChangeControllerAccountDetails(e) }}
                                                    >
                                                        {funcBindSelectOptons(AllCategoryList)}
                                                    </select>
                                                </div>
                                                {errorsAccountDetails.CategoryId && dirtyAccountDetails.CategoryId && (
                                                    <span className="error-label mt-2">{errorsAccountDetails.CategoryId}</span>
                                                )}
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Account Name{stateValidatorSchemaAccountDetails.AccountName.required && (<span className="red">*</span>)}</label>
                                                    <input
                                                        className={"form-control " +
                                                            (errorsAccountDetails.AccountName && dirtyAccountDetails.AccountName ? 'has-error' :
                                                                (dirtyAccountDetails.AccountName ? 'has-success' : ''))
                                                        }
                                                        data-val="true"
                                                        maxLength="50" name="AccountName" placeholder="Account Name"
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.AccountName.value}
                                                        onChange={e => { handleOnChangeAccountDetails(e); onInputChangeControllerAccountDetails(e) }}
                                                    />

                                                </div>
                                                {errorsAccountDetails.AccountName && dirtyAccountDetails.AccountName && (
                                                    <span className="error-label mt-2">{errorsAccountDetails.AccountName}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mt-1 mb-1">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Parent Account{stateValidatorSchemaAccountDetails.ParentAccountId.required && (<span className="red">*</span>)}</label>
                                                    <select
                                                        className={"form-control " +
                                                            (errorsAccountDetails.ParentAccountId && dirtyAccountDetails.ParentAccountId ? 'has-error' :
                                                                (dirtyAccountDetails.ParentAccountId ? 'has-success' : ''))
                                                        }
                                                        name="ParentAccountId"
                                                        value={SaveNextAccountDetailsData.ParentAccountId.value}
                                                        onChange={e => { handleOnChangeAccountDetails(e); onInputChangeControllerAccountDetails(e) }}
                                                    >
                                                        {funcBindSelectOptons(AllParentAccountList)}
                                                    </select>
                                                </div>
                                                {errorsAccountDetails.ParentAccountId && dirtyAccountDetails.ParentAccountId && (
                                                    <span className="error-label mt-2">{errorsAccountDetails.ParentAccountId}</span>
                                                )}
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Contact Person{stateValidatorSchemaAccountDetails.ContactPerson.required && (<span className="red">*</span>)}</label>
                                                    <input
                                                        className={"form-control " +
                                                            (errorsAccountDetails.ContactPerson && dirtyAccountDetails.ContactPerson ? 'has-error' :
                                                                (dirtyAccountDetails.ContactPerson ? 'has-success' : ''))
                                                        }
                                                        data-val="true"
                                                        maxLength="50" name="ContactPerson" placeholder="Contact Person"
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.ContactPerson.value}
                                                        onChange={e => { handleOnChangeAccountDetails(e); onInputChangeControllerAccountDetails(e) }}
                                                    />
                                                </div>
                                                {errorsAccountDetails.ContactPerson && dirtyAccountDetails.ContactPerson && (
                                                    <span className="error-label mt-2">{errorsAccountDetails.ContactPerson}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mt-1 mb-1">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Mobile No.{stateValidatorSchemaAccountDetails.MobileNo.required && (<span className="red">*</span>)}</label>
                                                    <input
                                                        className={"form-control " +
                                                            (errorsAccountDetails.MobileNo && dirtyAccountDetails.MobileNo ? 'has-error' :
                                                                (dirtyAccountDetails.MobileNo ? 'has-success' : ''))
                                                        }
                                                        data-val="true"
                                                        maxLength="20" name="MobileNo" placeholder="Mobile No. (Like: +91 9999999999)"
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.MobileNo.value}
                                                        onChange={e => { handleOnChangeAccountDetails(e); onInputChangeControllerAccountDetails(e) }}
                                                    />
                                                </div>
                                                {errorsAccountDetails.MobileNo && dirtyAccountDetails.MobileNo && (
                                                    <span className="error-label mt-2">{errorsAccountDetails.MobileNo}</span>
                                                )}
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Alternate Mobile No.{stateValidatorSchemaAccountDetails.AlternateMobileNo.required && (<span className="red">*</span>)}</label>
                                                    <input
                                                        className={"form-control " +
                                                            (errorsAccountDetails.AlternateMobileNo && dirtyAccountDetails.AlternateMobileNo ? 'has-error' :
                                                                (dirtyAccountDetails.AlternateMobileNo ? 'has-success' : ''))
                                                        }
                                                        data-val="true"
                                                        maxLength="20" name="AlternateMobileNo" placeholder="Alternate Mobile No. (Like: +91 9999999999)"
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.AlternateMobileNo.value}
                                                        onChange={e => { handleOnChangeAccountDetails(e); onInputChangeControllerAccountDetails(e) }}
                                                    />
                                                </div>
                                                {errorsAccountDetails.AlternateMobileNo && dirtyAccountDetails.AlternateMobileNo && (
                                                    <span className="error-label mt-2">{errorsAccountDetails.AlternateMobileNo}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mt-1 mb-1">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Email{stateValidatorSchemaAccountDetails.EmailId.required && (<span className="red">*</span>)}</label>
                                                    <input
                                                        className={"form-control " +
                                                            (errorsAccountDetails.EmailId && dirtyAccountDetails.EmailId ? 'has-error' :
                                                                (dirtyAccountDetails.EmailId ? 'has-success' : ''))
                                                        }
                                                        data-val="true"
                                                        maxLength="100" name="EmailId" placeholder="Email (Like: somebody@example.com)"
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.EmailId.value}
                                                        onChange={e => { handleOnChangeAccountDetails(e); onInputChangeControllerAccountDetails(e) }}
                                                    />
                                                </div>
                                                {errorsAccountDetails.EmailId && dirtyAccountDetails.EmailId && (
                                                    <span className="error-label mt-2">{errorsAccountDetails.EmailId}</span>
                                                )}
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Alternate Email{stateValidatorSchemaAccountDetails.AlternateEmailId.required && (<span className="red">*</span>)}</label>
                                                    <input
                                                        className={"form-control " +
                                                            (errorsAccountDetails.AlternateEmailId && dirtyAccountDetails.AlternateEmailId ? 'has-error' :
                                                                (dirtyAccountDetails.AlternateEmailId ? 'has-success' : ''))
                                                        }
                                                        data-val="true"
                                                        maxLength="100" name="AlternateEmailId" placeholder="Alternate Email (Like: somebody@example.com)"
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.AlternateEmailId.value}
                                                        onChange={e => { handleOnChangeAccountDetails(e); onInputChangeControllerAccountDetails(e) }}
                                                    />
                                                </div>
                                                {errorsAccountDetails.AlternateEmailId && dirtyAccountDetails.AlternateEmailId && (
                                                    <span className="error-label mt-2">{errorsAccountDetails.AlternateEmailId}</span>
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
                                                                id="btnSaveNextAccountDetails"
                                                                disabled={disableAccountDetails}
                                                            >
                                                                Save & Next
                                                                </button>

                                                        </div>
                                                        <div style={{ margin: '10px' }}>
                                                            <button type="button"
                                                                className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                                id="btnClearAccountDetails"
                                                                onClick={btnClearAccountDetails}
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
                                        <div className="row mt-1 mb-1">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Account Address{stateValidatorSchemaAdditionalInfo.AccountAddress.required && (<span className="red">*</span>)}</label>
                                                    <textarea
                                                        className={"form-control " +
                                                            (errorsAdditionalInfo.AccountAddress && dirtyAdditionalInfo.AccountAddress ? 'has-error' :
                                                                (dirtyAdditionalInfo.AccountAddress ? 'has-success' : ''))
                                                        }
                                                        cols="20" id="AccountAddress"
                                                        maxLength="200" name="AccountAddress" placeholder="Address"
                                                        rows="1"
                                                        value={SaveNextAdditionalInfoData.AccountAddress.value}
                                                        onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}

                                                    ></textarea>
                                                </div>
                                                {errorsAdditionalInfo.AccountAddress && dirtyAdditionalInfo.AccountAddress && (
                                                    <span className="error-label mt-2">{errorsAdditionalInfo.AccountAddress}</span>
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


                                        <div className="row mt-1 mb-1">
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
                                                        {funcBindSelectOptons(AllCountryList)}
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
                                                        {funcBindSelectOptons(AllStateList)}
                                                    </select>
                                                </div>
                                                {errorsAdditionalInfo.StateId && dirtyAdditionalInfo.StateId && (
                                                    <span className="error-label mt-2">{errorsAdditionalInfo.StateId}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row mt-1 mb-1">
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
                                                        {funcBindSelectOptons(AllCityList)}
                                                    </select>


                                                </div>
                                                {errorsAdditionalInfo.CityId && dirtyAdditionalInfo.CityId && (
                                                    <span className="error-label mt-2">{errorsAdditionalInfo.CityId}</span>
                                                )}
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Account Logo{stateValidatorSchemaAdditionalInfo.AccountLogo.required && (<span className="red">*</span>)}</label>
                                                    <input
                                                        className={"form-control " +
                                                            (errorsAdditionalInfo.AccountLogo && dirtyAdditionalInfo.AccountLogo ? 'has-error' :
                                                                (dirtyAdditionalInfo.AccountLogo ? 'has-success' : ''))
                                                        }
                                                        type="file"
                                                        onChange={onInputChangeControllerAdditionalInfo}
                                                        onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}

                                                        name="AccountLogo"
                                                    />
                                                </div>
                                                {errorsAdditionalInfo.AccountLogo && dirtyAdditionalInfo.AccountLogo && (
                                                    <span className="error-label mt-2">{errorsAdditionalInfo.AccountLogo}</span>
                                                )}

                                                {
                                                    SaveNextAdditionalInfoData.AccountLogoUrl.value && (
                                                        <>
                                                            <a href={SaveNextAdditionalInfoData.AccountLogoUrl.value} target="_blank">
                                                                <img
                                                                    src={SaveNextAdditionalInfoData.AccountLogoUrl.value}
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
                                                                onClick={(e) => { document.querySelector('#AccountDetails').click(); }}
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



                        </section>
                    </div>
                </div>
            </div>

            

        </>
    );
};

export default AddEditMstAccount;
