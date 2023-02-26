const OrgWebSiteContentSetup = () => {
    return (
        <>
            <div class="row">
                <div class="col-xl-12 col-md-12">
                    <div class="card card-demo">
                        <div class="card-body">
                            <div className="content-body content-demo" style={{ backgroundColor: '#FFFFFF' }}>
                                <section className="NewformTabs">

                                    <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Privacy-Policy</button>
                                        </li>

                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab1" data-bs-toggle="tab" data-bs-target="#profile1" type="button" role="tab" aria-controls="profile1" aria-selected="false">Contact Us</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab1" data-bs-toggle="tab" data-bs-target="#profile1" type="button" role="tab" aria-controls="profile1" aria-selected="false">About Us</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab1" data-bs-toggle="tab" data-bs-target="#profile1" type="button" role="tab" aria-controls="profile1" aria-selected="false">Term  & Conditions</button>
                                        </li>

                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Content<span
                                                            className="red">*</span></label>
                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                            rows="3"></textarea>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row mt-2">
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
                                                        <div className="form-actions mt-3 d-flex">

                                                            <div >
                                                                <button type="submit"
                                                                    className="btn btn-primary box-shadow-1 round btn-min-width mr-1 mb-1">Submit</button>
                                                            </div>
                                                            <div >
                                                                <a href="../Admin/MstAccount" className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1">Cancel</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile-tab1">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label className="label-control mb-2">Content<span
                                                            className="red">*</span></label>
                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                            rows="3"></textarea>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row mt-2">
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
                                                                <a href="../Admin/MstAccount" className="btn btn-dark box-shadow-1 round btn-min-width mr-1 mb-1">Clear</a>
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

            </div>
        </>
    );
};

export default OrgWebSiteContentSetup;
