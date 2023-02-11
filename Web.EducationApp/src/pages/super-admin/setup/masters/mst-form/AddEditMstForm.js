const AddEditMstForm = (props) => {
    return (
        <>
            <div className="card card-demo">
                <div className="card-body">
                    <h3 className="card-title">{props.pageTitle}</h3>
                    <div className="content-demo">
                        <div class="content-body">
                            <section class="NewformTabs">
                                <ul class="nav nav-tabs nav-top-border no-hover-bg">
                                    <li class="nav-item"> <a class="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Form Details</a> </li>
                                </ul>

                                <div className="tab-content px-1 py-1">
                                    <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                        aria-labelledby="base-tab11">

                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Form Name<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        id="AccountName"
                                                        maxlength="50" name="AccountName" placeholder="Account Name"
                                                        type="text" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Component Name<span
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
                                                    <label className="label-control mb-2">Landing Component Name<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        id="AccountName"
                                                        maxlength="50" name="AccountName" placeholder="Account Name"
                                                        type="text" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Class Name<span
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
                                                    <label className="label-control mb-2">Parent Component<span
                                                        className="red">*</span></label>
                                                    <input className="form-control" data-val="true"
                                                        id="AccountName"
                                                        maxlength="50" name="AccountName" placeholder="Account Name"
                                                        type="text" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label className="label-control mb-2">Area Name<span
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
                                                    <label className="label-control mb-2">Web/Mobile*<span
                                                        className="red">*</span></label>
                                                    <select className="form-control select2-hidden-accessible"
                                                    >
                                                        <option value="1">Web</option>
                                                        <option value="2">Mobile</option>
                                                    </select>
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

export default AddEditMstForm;
