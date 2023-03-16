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
import APIConfig from "../../../../../config/api.config.json";
import reqBody from "../../../../../models/reqBody.Model";
import useFormValidator from "../../../../../util/useFormValidator";
import CustomDropdown from "../../../../../core/components/dropdown/CustomDropdown";
import { $ } from 'react-jquery-plugin';
require('dotenv').config();


const AddEditMstRole = (props) => {
    let propData = props.dataRow;

    //#region define regular expressions (regex)
    var name1to50Regex = /^[a-z A-Z]{1,50}$/;
    var emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/;
    var phoneRegex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/;
    var numberRegex = /^[0-9]+$/;
    var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    var usernameRegex = /^[a-z0-9_\.]+$/;
    //#endregion

    return (
        <>
            <div className="card card-demo">
                <div className="card-body">
                    <h3 className="card-title">Using dropdowns</h3>
                    <div className="content-demo">
                        <div class="content-body">
                            <section class="NewformTabs">
                                <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Roles Details</button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Role Rights</button>
                                    </li>


                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Role For<span
                                                        className="red">*</span></label>
                                                    <select className="form-control select2-hidden-accessible"
                                                    >
                                                        <option value="1">Super Admin</option>
                                                        <option value="2">Admin</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Select Account Name<span
                                                        className="red">*</span></label>
                                                    <select class="form-control select2 select2-hidden-accessible" data-val="true" data-val-number="The field Role For must be a number." data-val-required="Please Select Role For" id="RoleForId" name="RoleForId" tabindex="-1" aria-hidden="true"><option value="">--select--</option>
                                                        <option value="2">Admin</option>
                                                        <option value="1">Super Admin</option>
                                                        <option value="2">Gyanmitras Admin</option></select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3 mb-3">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Role Name<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        id="AccountName"
                                                        maxLength="50" name="AccountName" placeholder="Account Name"
                                                        type="text" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Landing Page<span
                                                        className="red">*</span></label>
                                                    <select class="form-control select2 select2-hidden-accessible" data-val="true" data-val-number="The field Landing Page must be a number." data-val-required="Please Select  Landing Page" id="FK_FormId" name="FK_FormId" tabindex="-1" aria-hidden="true"><option value="">--Select Landing Page--</option>
                                                        <option value="2">Account Management</option>
                                                        <option value="9">Accounts</option>
                                                        <option value="8">Admin Dashboard</option>
                                                        <option value="20">City Master</option>
                                                        <option value="27">Counselor Management</option>
                                                        <option value="19">Country Master</option>
                                                        <option value="1">Dashboard</option>
                                                        <option value="14">Form Account Mapping</option>
                                                        <option value="18">Form Column Assignment</option>
                                                        <option value="17">Form Column Configuration</option>
                                                        <option value="16">Form Language Mapping</option>
                                                        <option value="12">Form Master</option>
                                                        <option value="22">Form Role Mapping</option>
                                                        <option value="33">Manage Feed</option>
                                                        <option value="32">Manage Feedback</option>
                                                        <option value="23">Manage Pages Content</option>
                                                        <option value="5">Mapping</option>
                                                        <option value="31">Model Help Desk</option>
                                                        <option value="26">Module Management</option>
                                                        <option value="10">Roles</option>
                                                        <option value="7">Setting</option>
                                                        <option value="24">Site Management</option>
                                                        <option value="25">Site Users</option>
                                                        <option value="21">State Master</option>
                                                        <option value="28">Student Management</option>
                                                        <option value="6">System Configuration</option>
                                                        <option value="13">User Account Mapping</option>
                                                        <option value="3">User Management</option>
                                                        <option value="15">Users</option>
                                                        <option value="29">Volunteer Management</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3 mb-3">

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Status<span
                                                        className="red">*</span>
                                                    </label>
                                                    <br />
                                                    <div class="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                        <label className="form-check-label" for="inlineRadio1">Active</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                        <label className="form-check-label" for="inlineRadio2">Inactive</label>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">

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
                                                                <a href="../Admin/MstAccount" className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1">Clear</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">



                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Role For<span
                                                        className="red">*</span></label>
                                                    <select className="form-control select2-hidden-accessible"
                                                    >
                                                        <option value="1">Super Admin</option>
                                                        <option value="2">Admin</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Select Account Name<span
                                                        className="red">*</span></label>
                                                    <select class="form-control select2 select2-hidden-accessible" data-val="true" data-val-number="The field Role For must be a number." data-val-required="Please Select Role For" id="RoleForId" name="RoleForId" tabindex="-1" aria-hidden="true"><option value="">--select--</option>
                                                        <option value="2">Admin</option>
                                                        <option value="1">Super Admin</option>
                                                        <option value="2">Gyanmitras Admin</option></select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3 mb-3">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Role Name<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        id="AccountName"
                                                        maxLength="50" name="AccountName" placeholder="Account Name"
                                                        type="text" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Landing Page<span
                                                        className="red">*</span></label>
                                                    <select class="form-control select2 select2-hidden-accessible" data-val="true" data-val-number="The field Landing Page must be a number." data-val-required="Please Select  Landing Page" id="FK_FormId" name="FK_FormId" tabindex="-1" aria-hidden="true"><option value="">--Select Landing Page--</option>
                                                        <option value="2">Account Management</option>
                                                        <option value="9">Accounts</option>
                                                        <option value="8">Admin Dashboard</option>
                                                        <option value="20">City Master</option>
                                                        <option value="27">Counselor Management</option>
                                                        <option value="19">Country Master</option>
                                                        <option value="1">Dashboard</option>
                                                        <option value="14">Form Account Mapping</option>
                                                        <option value="18">Form Column Assignment</option>
                                                        <option value="17">Form Column Configuration</option>
                                                        <option value="16">Form Language Mapping</option>
                                                        <option value="12">Form Master</option>
                                                        <option value="22">Form Role Mapping</option>
                                                        <option value="33">Manage Feed</option>
                                                        <option value="32">Manage Feedback</option>
                                                        <option value="23">Manage Pages Content</option>
                                                        <option value="5">Mapping</option>
                                                        <option value="31">Model Help Desk</option>
                                                        <option value="26">Module Management</option>
                                                        <option value="10">Roles</option>
                                                        <option value="7">Setting</option>
                                                        <option value="24">Site Management</option>
                                                        <option value="25">Site Users</option>
                                                        <option value="21">State Master</option>
                                                        <option value="28">Student Management</option>
                                                        <option value="6">System Configuration</option>
                                                        <option value="13">User Account Mapping</option>
                                                        <option value="3">User Management</option>
                                                        <option value="15">Users</option>
                                                        <option value="29">Volunteer Management</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mt-3 mb-3">
                                            <div class="col-md-12">
                                                <div class="table-responsive">
                                                    <table id="table" class="table table-bordered table-hover" cellspacing="0" cellpadding="0" border="0">
                                                        <thead className="table-dark">
                                                            <tr>
                                                                <th rowspan="2" class="text-center">Menu</th>
                                                                <th colspan="6" class="text-center">Rights</th>
                                                            </tr>
                                                            <tr>
                                                                <th class="text-center">All</th>
                                                                <th class="text-center">View</th>
                                                                <th class="text-center">Add </th>
                                                                <th class="text-center">Edit </th>
                                                                <th class="text-center">Delete </th>
                                                                <th class="text-center">Export </th>
                                                            </tr>
                                                        </thead>

                                                        <tbody id="tableBody">
                                                            <tr valign="middle">
                                                                <td align="center">
                                                                    Roles
                                                                    </td>
                                                                <td align="center">
                                                                    <input checked="checked" type="checkbox" value="true" />
                                                                </td>
                                                                <td align="center">
                                                                    <input checked="checked" type="checkbox" value="true" />
                                                                </td>
                                                                <td align="center">
                                                                    <input checked="checked" type="checkbox" value="true" />
                                                                </td>
                                                                <td align="center">
                                                                    <input checked="checked" type="checkbox" value="true" />
                                                                </td>
                                                                <td align="center">
                                                                    <input checked="checked" type="checkbox" value="true" />
                                                                </td>
                                                                <td align="center">
                                                                    <input class="chbExport" type="checkbox" value="true" />
                                                                </td>
                                                            </tr>

                                                        </tbody>


                                                    </table>
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
                                                            <a href="../Admin/MstAccount" className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1">Cancel</a>
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
            </div>

        </>
    );
};

export default AddEditMstRole;
