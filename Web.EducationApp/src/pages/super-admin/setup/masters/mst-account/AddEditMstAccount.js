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
    const [SaveNextAccountDetailsData, setSaveNextAccountDetailsData] = useState([]);
    
    useEffect(() => {
        fetchAllParentAccountList();
        fetchAllCategoryList();
        fetchCountryList();
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

    const submitSaveNextAccountDetails = async (event) => {
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
            console.log(formDataJSON);
        }, 500);
    }
    
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
                                                        type="text" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Alternate Mobile No.<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        maxLength="50" name="AlternateMobileNo" placeholder="Alternate Mobile No."
                                                        type="text" />
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
                                                        type="text" />
                                                </div>
                                            </div>
                                            
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Alternate Email<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        maxLength="50" name="AlternateEmailId" placeholder="Alternate Email"
                                                        type="text" />
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
                                                            <a href="../Admin/MstAccount" className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1">Clear</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>

                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">



                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control">Address<span
                                                    className="red">*</span></label>
                                                <textarea className="form-control" cols="20" id="AccountAddress"
                                                    maxLength="200" name="AccountAddress" placeholder="Address"
                                                    rows="1"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Zip Code<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    maxLength="10" name="ZipCode" placeholder="Zip Code" type="text"
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
                                                    onChange={(e) => funcChangeCountrySelection(e)}>
                                                    {funcBindSelectOptons(AllCountryList)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">State<span
                                                    className="red">*</span></label>
                                                <select className="form-control select2-hidden-accessible"
                                                    onChange={(e) => funcChangeStateSelection(e)}
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
                                                            className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1">Save & Next</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <a href="../Admin/MstAccount" className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1">Previous</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile-tab1">


                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control">User Name<span
                                                    className="red">*</span></label>
                                                <input className="form-control valid" data-val="true"
                                                    data-val-required="Please Enter User Name" id="Username"
                                                    maxLength="20" name="Username"
                                                    placeholder="Username" type="text"
                                                    autoComplete="off"
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Re-Enter Password<span
                                                    className="red">*</span></label>
                                                <input className="form-control valid" id="Password"
                                                    maxLength="15" name="Password" placeholder="Enter Password"
                                                    type="password"
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Status<span
                                                    className="red">*</span></label>
                                                <br />
                                                <label className="form-check-label">
                                                    <input className="form-check-input" type="checkbox" name="remember"></input> Active
                                                </label>
                                                &emsp;
                                                <label className="form-check-label">
                                                    <input className="form-check-input" type="checkbox" name="remember"></input> In-Active
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-body">
                                                <div style={{ justifyContent: 'center' }} className="form-actions mt-3 d-flex">

                                                    <div style={{ margin: '10px' }}>
                                                        <button type="submit"
                                                            className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1">Submit</button>
                                                    </div>
                                                    <div style={{ margin: '10px' }}>
                                                        <a href="../Admin/MstAccount" className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1">Previous</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


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
