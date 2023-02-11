const MstRole = () => {
    return (
        <>
            <div className="card card-demo">
                <div className="card-body">
                    <h3 className="card-title">Using dropdowns</h3>
                    <div className="content-demo">
                        <div class="content-body">
                            <section class="NewformTabs">
                                <ul class="nav nav-tabs nav-top-border no-hover-bg">
                                    <li class="nav-item"> <a class="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Roles</a> </li>
                                    <li class="nav-item"> <a class="nav-link" id="base-tab12" data-toggle="tab" aria-controls="tab12" href="#tab12" aria-expanded="false">Role Rights</a> </li>
                                </ul>

                                <div className="tab-content px-1 py-1">
                                    <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                        aria-labelledby="base-tab11">

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
                                                        maxlength="50" name="AccountName" placeholder="Account Name"
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
                                                        className="red">*</span></label>
                                                    <br />
                                                    <label className="form-check-label">
                                                        <input className="form-check-input" type="checkbox" name="remember"></input> Active
                                                </label>
                                                    <label className="form-check-label">
                                                        <input className="form-check-input" type="checkbox" name="remember"></input> In-Active
                                                </label>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">

                                                </div>
                                            </div>
                                        </div>


                                        <div className="row ">
                                            <div className="col-lg-12">

                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h4>Role Rights</h4>
                                                            <hr className="my-hr" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


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
                                                        maxlength="50" name="AccountName" placeholder="Account Name"
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

export default MstRole;
