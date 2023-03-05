import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import apiconfig from "../../../../../config/api.config.json";
import AccountService from "../../../../../services/account.services";
//import AccountDetailsModel from "../../../../../models/accountdetails.model";
import reqBody from "../../../../../models/reqBody.Model";
import useForm from "../../../../../pages/super-admin/setup/masters/mst-account/useForm";

require('dotenv').config();

const AddEditMstAccount = (props) => {
    
    const [HasAPIError, setHasAPIError] = useState(false);
    const [HasAPISuccess, setHasAPISuccess] = useState(false);
    const [HasAPIMessage, setHasAPIMessage] = useState("");
    const [HasAPIDescription, setHasAPIDescription] = useState("");

    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken']);
    const [AllParentAccountList, setAllParentAccountList] = useState([]);
    const [AllCategoryList, setAllCategoryList] = useState([]);
    const [AllCountryList, setAllCountryList] = useState([]);
    const [AllStateList, setAllStateList] = useState([]);
    const [AllCityList, setAllCityList] = useState([]);

    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    var emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/;
    var phoneRegex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/;
    var numberRegex = /^[0-9]+$/;

    // Define your state schema
    const stateSchemaAccountDetails = {
        CategoryId: { value: 1, error: "This account category field is required!" },
        AccountName: { value: "jahsdh", error: "This account name field is required!" },
        ParentAccountId: { value: 1, error: "This parent account field is required!" },
        ContactPerson: { value: "823781739", error: "This contact person field is required!!" },
        MobileNo: { value: "+447838665686", error: "This mobile no. field is required!!" },
        AlternateMobileNo: { value: "+447838665686", error: "This alternate mobile no. field is required!!" },
        EmailId: { value: "vinishmaurya@gmail.com", error: "This email id field is required!!" },
        AlternateEmailId: { value: "vinishmaurya@gmail.com", error: "This alternate email id field is required!!" }
    };

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


    // Define your state schema
    const stateSchemaAdditionalInfo = {
        AccountAddress: { value: 1, error: "This account address field is required!" },
        ZipCode: { value: "jahsdh", error: "This zipcode field is required!" },
        CountryId: { value: 1, error: "This country field is required!" },
        StateId: { value: "823781739", error: "This state field is required!!" },
        CityId: { value: "+447838665686", error: "This city field is required!!" },
        AccountLogo: { value: File, error: "This alternate mobile no. field is required!!" }
    };

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
            required: true
        },
    };



    const {
        values: valuesAccountDetails,
        errors: errorsAccountDetails,
        dirty: dirtyAccountDetails,
        handleOnChange: handleOnChangeAccountDetails,
        handleOnSubmit: handleOnSubmitAccountDetails,
        disable: disableAccountDetails,
        handleOnClear: handleOnClearAccountDetails
    } = useForm(stateSchemaAccountDetails, stateValidatorSchemaAccountDetails, onSubmitFormAccountDetails);

    const {
        values: valuesAdditionalInfo,
        errors: errorsAdditionalInfo,
        dirty: dirtyAdditionalInfo,
        handleOnChange: handleOnChangeAdditionalInfo,
        handleOnSubmit: handleOnSubmitAdditionalInfo,
        disable: disableAdditionalInfo,
        handleOnClear: handleOnClearAdditionalInfo
    } = useForm(stateSchemaAdditionalInfo, stateValidatorSchemaAdditionalInfo, onSubmitFormAdditionalInfo);


    const [SaveNextAccountDetailsData, setSaveNextAccountDetailsData] = useState(stateSchemaAccountDetails);

    let formDataInitialStateAdditionalInfo = {
        AccountAddress: "",
        ZipCode: "",
        CountryId: "",
        StateId: "",
        CityId: "",
        AccountLogo: File
    };
    const [SaveNextAdditionalInfoData, setSaveNextAdditionalInfoData] = useState(formDataInitialStateAdditionalInfo);

    let formDataInitialStateCredentials = {
        UserName: "",
        Password: "",
        ReEnterPassword: "",
        IsActive: "true"
    };
    const [SaveNextCredentialsData, setSaveNextCredentialsData] = useState(formDataInitialStateCredentials);


    useEffect(() => {
        fetchAllParentAccountList();
        fetchAllCategoryList();
        fetchCountryList();
        setSaveNextAccountDetailsData(stateSchemaAccountDetails);
        setSaveNextAdditionalInfoData(formDataInitialStateAdditionalInfo);
        setSaveNextCredentialsData(formDataInitialStateCredentials);
        console.log(disableAccountDetails);
    }, []);
    const fetchAllCategoryList = async () => {
        //debugger;
        let apiUri = apiconfig.admin.common.GetAllCategoryListUri;

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
        let apiUri = apiconfig.admin.common.GetAllParentFormsListUri;

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
        let apiUri = apiconfig.admin.common.GetAllCountryListUri;
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
        let apiUri = apiconfig.admin.common.GetAllStateListCountryIdUri;
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
        let apiUri = apiconfig.admin.common.GetAllCityListByStateUri;
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

    function funcChangeCountrySelection(e) {
        let CountryId = Number(e.target.value);
        fetchStateList(CountryId);
    }

    function funcChangeStateSelection(e) {
        //debugger;
        let StateId = Number(e.target.value);
        fetchCityList(StateId);
    }

    const submitAccountFinalData = async (event) => {
        event.preventDefault();
        let apiUri = apiconfig.admin.common.AddEditAccountDetailsUri;
        const formElement = document.querySelector('#AccountDetailsForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#btnSaveNextAccountDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);

        ////Create request body
        //AccountDetailsModel.UserName = 'dadmin';
        //AccountDetailsModel.Password = 'Pass@123';
        //AccountDetailsModel.GrantType = "Password";
        //AccountDetailsModel.RefreshToken = "";

        //reqBody.body = AccountDetailsModel;
        ////console.log(authenticateUser)

        try {
            const instance = await axios.create({
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
                'url': apiUri ? apiUri : ""
            }).then((response) => {
                //debugger;
                if (response.data) {
                    btnPointer.innerHTML = 'Save & Next';
                    btnPointer.removeAttribute('disable');
                }
            }).catch((e) => {
                //console.log(e);
                //return e;
                btnPointer.innerHTML = 'Save & Next';
                btnPointer.removeAttribute('disable');
            });
        } catch (e) {
            //console.log(e);
            btnPointer.innerHTML = 'Save & Next';
            btnPointer.removeAttribute('disable');
            alert("Oops! Some error occured please try after sometimes.");
        }

    }

    //Step 1 : Account Details 
    function onSubmitFormAccountDetails(event, valuesAccountDetails) {
        event.preventDefault();
        const btnPointer = document.querySelector('#btnSaveNextAccountDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);
        try {
            let AddEditAccountDetailsUri = apiconfig.admin.account.AddEditAccountDetailsUri;
            const formElement = document.querySelector('#AccountDetailsForm');
            const formData = new FormData(formElement);
            const formDataJSON = Object.fromEntries(formData);
            formDataJSON["CreatedBy"] = "0";
            formDataJSON["Step"] = "AccountDetails";

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
                    setHasAPIMessage(response.data.Message);
                    document.querySelector('#profile-tab').click();
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
        //document.querySelector('#profile-tab').click();
        //console.log(SaveNextAccountDetailsData);
    }
    //Step 2 : Additional Info
    function onSubmitFormAdditionalInfo(event, valuesAdditionalInfo){
        event.preventDefault();
        const formElement = document.querySelector('#AdditionalInfoForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#btnSaveNextAdditionalInfo');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);

        setTimeout(() => {
            //setSaveNextAdditionalInfoData(formDataJSON);
            btnPointer.innerHTML = 'Save & Next';
            btnPointer.removeAttribute('disable');
        }, 500);
        document.querySelector('#profile-tab1').click();
        console.log(SaveNextAdditionalInfoData);
    }

    //Step 3 : Credentials
    const submitSaveNextCredentials = (event) => {
        event.preventDefault();
        const formElement = document.querySelector('#CredentialsForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#btnSaveNextCredentials');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disable', true);

        setTimeout(() => {
            setSaveNextCredentialsData(formDataJSON);
            btnPointer.innerHTML = 'Save & Next';
            btnPointer.removeAttribute('disable');
        }, 500);
        document.querySelector('#profile-tab1').click();
        console.log(SaveNextCredentialsData);
    }


    const btnClearAccountDetails = (event) => {
        setSaveNextAccountDetailsData(stateSchemaAccountDetails);
        handleOnClearAccountDetails(event);
    }
    const btnClearAdditionalInfo = (event) => {
        setSaveNextAdditionalInfoData(stateSchemaAdditionalInfo);
        handleOnClearAdditionalInfo(event);
    }

    const btnClearCredentials = (event) => {
        setSaveNextCredentialsData(formDataInitialStateCredentials);
    }

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
                obj[name] = value;
            }
        }
        setSaveNextAdditionalInfoData(obj);
    };
    const onInputChangeControllerCredentials = (event) => {
        //debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(SaveNextCredentialsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = SaveNextCredentialsData[keys[i]];
            } else {
                obj[name] = value;
            }
        }
        setSaveNextCredentialsData(obj);
    };

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
                                        <strong>{HasAPIMessage}</strong>
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
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Account Details</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Additional Info</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab1" data-bs-toggle="tab" data-bs-target="#profile1" type="button" role="tab" aria-controls="profile1" aria-selected="false">Credentials</button>
                                </li>

                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
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

                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
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
                                                        onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}

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
                                                        onChange={e => { handleOnChangeAdditionalInfo(e); onInputChangeControllerAdditionalInfo(e) }}

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
                                                                onClick={(e) => { document.querySelector('#home-tab').click(); }}
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
                                <div className="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile-tab1">

                                    <form onSubmit={submitSaveNextCredentials} id="CredentialsForm">
                                        <div className="row mt-1 mb-1">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">User Name<span
                                                        className="red">*</span></label>
                                                    <input className="form-control valid" data-val="true"
                                                        data-val-required="Please Enter User Name" id="UserName"
                                                        maxLength="20" name="UserName"
                                                        placeholder="Username" type="text"
                                                        autoComplete="off"
                                                        value={SaveNextCredentialsData.UserName}
                                                        onChange={onInputChangeControllerCredentials}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Password<span
                                                        className="red">*</span></label>
                                                    <input className="form-control valid" id="Password"
                                                        maxLength="15" name="Password" placeholder="Enter Password"
                                                        type="password"
                                                        autoComplete="off"
                                                        value={SaveNextCredentialsData.Password}
                                                        onChange={onInputChangeControllerCredentials}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-1 mb-1">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Re-Enter Password<span
                                                        className="red">*</span></label>
                                                    <input className="form-control valid" id="ReEnterPassword"
                                                        maxLength="15" name="ReEnterPassword" placeholder="Enter Password"
                                                        type="password"
                                                        autoComplete="off"
                                                        value={SaveNextCredentialsData.ReEnterPassword}
                                                        onChange={onInputChangeControllerCredentials}
                                                    />
                                                </div>
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
                                                            defaultChecked={SaveNextCredentialsData.IsActive === "true"}
                                                            onChange={onInputChangeControllerCredentials}
                                                        />
                                                        <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="IsActive" id="inlineRadio2"
                                                            value="false"
                                                            defaultChecked={SaveNextCredentialsData.IsActive === "false"}
                                                            onChange={onInputChangeControllerCredentials}
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
                                                                id="btnSaveNextCredentials">Submit</button>
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
                                                                onClick={(e) => { document.querySelector('#profile-tab').click(); }}
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
