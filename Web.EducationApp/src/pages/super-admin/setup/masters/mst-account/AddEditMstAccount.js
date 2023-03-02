import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import apiconfig from "../../../../../config/api.config.json";
import AccountService from "../../../../../services/account.services";
//import AccountDetailsModel from "../../../../../models/accountdetails.model";
import reqBody from "../../../../../models/reqBody.Model";
require('dotenv').config();

const AddEditMstAccount = (props) => {
    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken']);
    const [AllParentAccountList, setAllParentAccountList] = useState([]);
    const [AllCategoryList, setAllCategoryList] = useState([]);
    const [AllCountryList, setAllCountryList] = useState([]);
    const [AllStateList, setAllStateList] = useState([]);
    const [AllCityList, setAllCityList] = useState([]);
    let formDataInitialStateAccountDetails = {
        CategoryId: 0,
        AccountName: "",
        ParentAccountId: 0,
        ContactPerson: "",
        MobileNo: "",
        AlternateMobileNo: "",
        EmailId: "",
        AlternateEmailId: ""
    };
    const [SaveNextAccountDetailsData, setSaveNextAccountDetailsData] = useState(formDataInitialStateAccountDetails);

    let formDataInitialStateAdditionalInfo = {
        AccountAddress: "",
        ZipCode: "",
        CountryId: 0,
        StateId: 0,
        CityId: 0,
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
        setSaveNextAccountDetailsData(formDataInitialStateAccountDetails);
        setSaveNextAdditionalInfoData(formDataInitialStateAdditionalInfo);
        setSaveNextCredentialsData(formDataInitialStateCredentials);
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
            <option key={-1} value={0}>--Select--</option>
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
        btnPointer.setAttribute('disabled', true);

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
                    btnPointer.removeAttribute('disabled');
                }
            }).catch((e) => {
                //console.log(e);
                //return e;
                btnPointer.innerHTML = 'Save & Next';
                btnPointer.removeAttribute('disabled');
            });
        } catch (e) {
            //console.log(e);
            btnPointer.innerHTML = 'Save & Next';
            btnPointer.removeAttribute('disabled');
            alert("Oops! Some error occured please try after sometimes.");
        }

    }

    //Step 1 : Account Details 
    const submitSaveNextAccountDetails = (event) => {
        event.preventDefault();
        const formElement = document.querySelector('#AccountDetailsForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#btnSaveNextAccountDetails');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);

        setTimeout(() => {
            setSaveNextAccountDetailsData(formDataJSON);
            btnPointer.innerHTML = 'Save & Next';
            btnPointer.removeAttribute('disabled');
        }, 500);
        document.querySelector('#profile-tab').click();
        console.log(SaveNextAccountDetailsData);
    }
    //Step 2 : Additional Info
    const submitSaveNextAdditionalInfo = (event) => {
        event.preventDefault();
        const formElement = document.querySelector('#AdditionalInfoForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#btnSaveNextAdditionalInfo');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);

        setTimeout(() => {
            setSaveNextAdditionalInfoData(formDataJSON);
            btnPointer.innerHTML = 'Save & Next';
            btnPointer.removeAttribute('disabled');
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
        btnPointer.setAttribute('disabled', true);

        setTimeout(() => {
            setSaveNextCredentialsData(formDataJSON);
            btnPointer.innerHTML = 'Save & Next';
            btnPointer.removeAttribute('disabled');
        }, 500);
        document.querySelector('#profile-tab1').click();
        console.log(SaveNextCredentialsData);
    }

    
    const btnClearAccountDetails = (event) => {
        setSaveNextAccountDetailsData(formDataInitialStateAccountDetails);
    }
    const btnClearAdditionalInfo = (event) => {
        setSaveNextAdditionalInfoData(formDataInitialStateAdditionalInfo);
    }

    const btnClearCredentials = (event) => {
        setSaveNextCredentialsData(formDataInitialStateCredentials);
    }

    const onInputChangeControllerAccountDetails = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let keys = Object.keys(SaveNextAccountDetailsData);
        let obj = new Object();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != name) {
                obj[keys[i]] = SaveNextAccountDetailsData[keys[i]];
            } else {
                obj[name] = value;
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
                                    <form onSubmit={submitSaveNextAccountDetails} id="AccountDetailsForm">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2" >Account Category<span
                                                        className="red">*</span></label>
                                                    <select className="form-control select2-hidden-accessible"
                                                        name="CategoryId"
                                                        value={SaveNextAccountDetailsData.CategoryId}
                                                        onChange={onInputChangeControllerAccountDetails}
                                                    >
                                                        {funcBindSelectOptons(AllCategoryList)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Account Name<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        maxLength="50" name="AccountName" placeholder="Account Name"
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.AccountName}
                                                        onChange={onInputChangeControllerAccountDetails}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3 mb-3">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Parent Account<span
                                                        className="red">*</span></label>
                                                    <select className="form-control select2-hidden-accessible"
                                                        name="ParentAccountId"
                                                        value={SaveNextAccountDetailsData.ParentAccountId}
                                                        onChange={onInputChangeControllerAccountDetails}
                                                    >
                                                        {funcBindSelectOptons(AllParentAccountList)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Contact Person<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        maxLength="50" name="ContactPerson" placeholder="Contact Person"
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.ContactPerson}
                                                        onChange={onInputChangeControllerAccountDetails}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3 mb-3">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Mobile No.<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        maxLength="50" name="MobileNo" placeholder="Mobile No."
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.MobileNo}
                                                        onChange={onInputChangeControllerAccountDetails}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Alternate Mobile No.<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        maxLength="50" name="AlternateMobileNo" placeholder="Alternate Mobile No."
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.AlternateMobileNo}
                                                        onChange={onInputChangeControllerAccountDetails}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3 mb-3">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Email<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        maxLength="50" name="EmailId" placeholder="Email"
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.EmailId}
                                                        onChange={onInputChangeControllerAccountDetails}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Alternate Email<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        maxLength="50" name="AlternateEmailId" placeholder="Alternate Email"
                                                        type="text"
                                                        value={SaveNextAccountDetailsData.AlternateEmailId}
                                                        onChange={onInputChangeControllerAccountDetails}
                                                    />
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
                                                                id="btnSaveNextAccountDetails"
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
                                    <form onSubmit={submitSaveNextAdditionalInfo} id="AdditionalInfoForm">
                                        <div className="row mt-3 mb-3">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Address<span
                                                        className="red">*</span></label>
                                                    <textarea className="form-control" cols="20" id="AccountAddress"
                                                        maxLength="200" name="AccountAddress" placeholder="Address"
                                                        rows="1"
                                                        value={SaveNextAdditionalInfoData.AccountAddress}
                                                        onChange={onInputChangeControllerAdditionalInfo}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Zip Code<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        maxLength="10" name="ZipCode" placeholder="Zip Code" type="text"
                                                        value={SaveNextAdditionalInfoData.ZipCode}
                                                        onChange={onInputChangeControllerAdditionalInfo}
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mt-3 mb-3">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Country<span
                                                        className="red">*</span></label>
                                                    <select className="form-control select2-hidden-accessible"
                                                        onChange={(e) => { funcChangeCountrySelection(e); onInputChangeControllerAdditionalInfo(e) }}
                                                        value={SaveNextAdditionalInfoData.CountryId}
                                                        name="CountryId"
                                                    >
                                                        {funcBindSelectOptons(AllCountryList)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">State<span
                                                        className="red">*</span></label>
                                                    <select className="form-control select2-hidden-accessible"
                                                        onChange={(e) => { funcChangeStateSelection(e); onInputChangeControllerAdditionalInfo(e)}}
                                                        value={SaveNextAdditionalInfoData.StateId}
                                                        name="StateId"
                                                    >
                                                        {funcBindSelectOptons(AllStateList)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3 mb-3">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">City<span
                                                        className="red">*</span></label>
                                                    <select className="form-control select2-hidden-accessible"
                                                        value={SaveNextAdditionalInfoData.CityId}
                                                        onChange={onInputChangeControllerAdditionalInfo}
                                                        name="CityId"
                                                    >
                                                        {funcBindSelectOptons(AllCityList)}
                                                    </select>


                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Account Logo<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" type="file"
                                                        onChange={onInputChangeControllerAdditionalInfo}
                                                        name="AccountLogo"
                                                    />
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
                                                                id="btnSaveNextAdditionalInfo">Save & Next</button>
                                                        </div>
                                                        <div style={{ margin: '10px' }}>
                                                            <button type="button"
                                                                className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1"
                                                                onClick={btnClearAdditionalInfo}
                                                            >Clear</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile-tab1">

                                    <form onSubmit={submitSaveNextCredentials} id="CredentialsForm">
                                        <div className="row mt-3 mb-3">
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
                                        <div className="row mt-3 mb-3">
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
