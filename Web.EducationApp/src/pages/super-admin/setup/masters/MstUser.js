const MstUser = () => {
    return (
        <>
            <div className="card card-demo">
                <div className="card-body">
                    <h3 className="card-title">Using dropdowns</h3>
                    <div className="content-demo">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" id="pillsUserDetails" data-toggle="pill" aria-current="UserDetails" href="#UserDetails" aria-selected="true">User Details</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pillsAdditionalInfo" data-toggle="pill" aria-current="AdditionalInfo" href="#AdditionalInfo" aria-selected="false">Additional Info</a>
                            </li>
                        </ul>

                        <div className="tab-content px-1 py-1">
                            <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                aria-labelledby="base-tab11">

                                <div className="row">
                                    <div className="col-lg-12">

                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-12 mt-1 mb-2">
                                                    <h4>User Master Details</h4>
                                                    <hr className="my-hr" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Name<span
                                                className="red">*</span></label>
                                            <input className="form-control" data-val="true"
                                                id="AccountName"
                                                maxlength="50" name="AccountName" placeholder="Account Name"
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Mobile No.<span
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
                                            <label className="label-control mb-2">Email ID<span
                                                className="red">*</span></label>
                                            <input className="form-control" data-val="true"
                                                id="AccountName"
                                                maxlength="50" name="AccountName" placeholder="Account Name"
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control">Role Name*<span
                                                className="red">*</span></label>
                                            <input className="form-control" data-val="true"
                                                maxlength="10" name="ZipCode" placeholder="Zip Code" type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row ">
                                    <div className="col-lg-12">

                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h4>Credentials</h4>
                                                    <hr className="my-hr" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row mt-3 mb-3">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control  mb-2">User Name<span
                                                className="red">*</span></label>
                                            <input className="form-control valid" data-val="true"
                                                data-val-required="Please Enter User Name" id="Username"
                                                maxlength="20" name="Username" onblur="CheckuserName(this)"
                                                placeholder="Username" type="text" />
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

                                <div className="row ">
                                    <div className="col-lg-12">

                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h4>Additional Info</h4>
                                                    <hr className="my-hr" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                                maxlength="10" name="ZipCode" placeholder="Zip Code" type="text"
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
                                                maxlength="10" name="ZipCode" placeholder="Zip Code" type="text"
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
                                            <label className="label-control">Address<span
                                                className="red">*</span></label>
                                            <textarea className="form-control" cols="20" id="AccountAddress"
                                                maxlength="200" name="AccountAddress" placeholder="Address"
                                                rows="1"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="label-control mb-2">Zip Code<span
                                                className="red">*</span></label>
                                            <input className="form-control" data-val="true"
                                                maxlength="10" name="ZipCode" placeholder="Zip Code" type="text"
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default MstUser;
