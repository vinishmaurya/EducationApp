const AcadMstAddEditTeacher = () => {
    return (
        <>
            <div className="card card-demo">
                <div className="card-body">
                    <div className="content-body content-demo" style={{ backgroundColor: '#FFFFFF' }}>
                        <section className="NewformTabs">

                            <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Create Teacher</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab1" data-bs-toggle="tab" data-bs-target="#profile1" type="button" role="tab" aria-controls="profile1" aria-selected="false">Credentials</button>
                                </li>

                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">First Name<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxlength="50" name="AccountName" placeholder="Account Name"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Last Name<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxlength="50" name="AccountName" placeholder="Account Name"
                                                    type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Mobile No<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxlength="50" name="AccountName" placeholder="Account Name"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Gender<span
                                                    className="red">*</span></label>
                                                <br />
                                                <label className="form-check-label">
                                                    <input className="form-check-input" type="checkbox" name="remember"></input> Male
                                                </label>
                                                &emsp;
                                                <label className="form-check-label">
                                                    <input className="form-check-input" type="checkbox" name="remember"></input> Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Image<span
                                                    className="red">*</span></label>
                                                <input class="form-control" type="file" id="formFile" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">DOB<span
                                                    className="red">*</span></label>
                                                <input class="form-control" type="date" id="formDate" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Category<span
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
                                                <label className="label-control mb-2">Registration No<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxlength="50" name="AccountName" placeholder="Account Name"
                                                    type="text" value="2023-S01" readOnly="readOnly" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Caste<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxlength="50" name="AccountName" placeholder="Account Name"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Religion<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxlength="50" name="AccountName" placeholder="Account Name"
                                                    type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Admission Datetime<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxlength="50" name="AccountName" placeholder="Account Name"
                                                    type="text" value="17-02-2023 08:45 AM" readOnly="readOnly" disabled="disabled" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Blood Group<span
                                                    className="red">*</span></label>
                                                <select className="form-control select2-hidden-accessible"
                                                >
                                                    <option value="1">Super Admin</option>
                                                    <option value="2">Admin</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Height<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxlength="50" name="AccountName" placeholder="Account Name"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Weight<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxlength="50" name="AccountName" placeholder="Account Name"
                                                    type="text" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Country<span
                                                    className="red">*</span></label>
                                                <select className="form-control select2-hidden-accessible"
                                                >
                                                    <option value="" data-select2-id="18">--select--</option>
                                                    <option value="" data-select2-id="19">--Vinish--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">State<span
                                                    className="red">*</span></label>
                                                <select className="form-control select2-hidden-accessible"
                                                >
                                                    <option value="" data-select2-id="18">--select--</option>
                                                    <option value="" data-select2-id="19">--UP--</option>
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
                                                    <option value="" data-select2-id="18">--select--</option>
                                                    <option value="" data-select2-id="19">--PRATAPGARH--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">State<span
                                                    className="red">*</span></label>
                                                <select className="form-control select2-hidden-accessible"
                                                >
                                                    <option value="" data-select2-id="18">--select--</option>
                                                    <option value="" data-select2-id="19">--UP--</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Pincode<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxlength="50" name="AccountName" placeholder="Account Name"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Current Address<span
                                                    className="red">*</span></label>
                                                <textarea className="form-control" cols="20" id="AccountAddress"
                                                    maxlength="200" name="AccountAddress" placeholder="Address"
                                                    rows="1"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 mb-3">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Permanent Address<span
                                                    className="red">*</span></label>
                                                <textarea className="form-control" cols="20" id="AccountAddress"
                                                    maxlength="200" name="AccountAddress" placeholder="Address"
                                                    rows="1"></textarea>
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
                                                        <a href="../Admin/MstAccount" className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1">Clear</a>
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
                                                <label className="label-control  mb-2">User Name<span
                                                    className="red">*</span></label>
                                                <input className="form-control valid" data-val="true"
                                                    data-val-required="Please Enter User Name" id="Username"
                                                    maxlength="20" name="Username" onblur="CheckuserName(this)"
                                                    placeholder="Username" type="text" value="2023-S01" readOnly="readOnly" disabled="disabled" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Password<span
                                                    className="red">*</span></label>
                                                <input className="form-control valid" id="Password"
                                                    maxlength="15" name="Password" placeholder="Enter Password"
                                                    type="password" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Re-Enter Password<span
                                                    className="red">*</span></label>
                                                <input className="form-control valid" id="Password"
                                                    maxlength="15" name="Password" placeholder="Enter Password"
                                                    type="password" />
                                            </div>
                                        </div>
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

export default AcadMstAddEditTeacher;
