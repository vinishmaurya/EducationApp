const IndexMstUser = (props) => {
    return (
        <>
            <div className="card card-demo">
                <div className="card-body">
                    <h3 className="card-title">Using dropdowns</h3>
                    <div className="content-demo">

                        <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">User Details</button>
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
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Name<span
                                                className="red">*</span></label>
                                            <input className="form-control" data-val="true"
                                                id="AccountName"
                                                maxLength="50" name="AccountName" placeholder="Account Name"
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Mobile No.<span
                                                className="red">*</span></label>
                                            <input className="form-control" data-val="true"
                                                id="AccountName"
                                                maxLength="50" name="AccountName" placeholder="Account Name"
                                                type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3 mb-3">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Email ID<span
                                                className="red">*</span></label>
                                            <input className="form-control" data-val="true"
                                                id="AccountName"
                                                maxLength="50" name="AccountName" placeholder="Account Name"
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control">Role Name*<span
                                                className="red">*</span></label>
                                            <input className="form-control" data-val="true"
                                                maxLength="10" name="ZipCode" placeholder="Zip Code" type="text"
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
                                                    <a href="../Admin/MstAccount" className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1">Clear</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row mt-3 mb-3">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Gender<span
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
                                            <label className="label-control mb-2">Date of Birth<span
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
                                            <label className="label-control mb-2">Alternate Mobile No.<span
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
                                            <label className="label-control mb-2">Address<span
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
                                            <label className="label-control  mb-2">User Name<span
                                                className="red">*</span></label>
                                            <input className="form-control valid" data-val="true"
                                                data-val-required="Please Enter User Name" id="Username"
                                                maxLength="20" name="Username" onBlur="CheckuserName(this)"
                                                placeholder="Username" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Re-Enter Password<span
                                                className="red">*</span></label>
                                            <input className="form-control valid" id="Password"
                                                maxLength="15" name="Password" placeholder="Enter Password"
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


                    </div>
                </div>
            </div>
        </>
    );
};

export default IndexMstUser;
