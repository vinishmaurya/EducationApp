const MapUserAccount = () => {
    return (
        <>
            <div className="card card-demo">
                <div className="card-body">
                    <div className="content-demo">
                        <div class="content-body">

                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="label-control mb-2">Select User<span
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
                                        <label className="label-control mb-2">Select Account<span
                                            className="red">*</span></label>
                                        <select class="form-control select2 select2-hidden-accessible" data-val="true" data-val-number="The field Role For must be a number." data-val-required="Please Select Role For" id="RoleForId" name="RoleForId" tabindex="-1" aria-hidden="true"><option value="">--select--</option>
                                            <option value="2">Admin</option>
                                            <option value="1">Super Admin</option>
                                            <option value="2">Gyanmitras Admin</option></select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 mt-2">
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

        </>
    );
};

export default MapUserAccount;
