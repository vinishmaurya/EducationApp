import { faFileCsv, faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrgMobileAppSetting = () => {
    return (
        <>
            <div class="row">
                <div class="col-xl-12 col-md-12">
                    <div class="card card-demo">
                        <div class="card-body">
                            <div className="row">
                                <div className="col-6 mt-2">
                                    <div className="form-group">
                                        <label className="label-control mb-2">Android App Link<span
                                            className="red">*</span></label>
                                        <input className="form-control" data-val="true"
                                            id="AccountName"
                                            maxlength="50" name="AccountName" placeholder="Class Name"
                                            type="text" />
                                    </div>
                                </div>
                                <div className="col-6 mt-2">
                                    <div className="form-group">
                                        <label className="label-control mb-2">IOS App Link<span
                                            className="red">*</span></label>
                                        <input className="form-control" data-val="true"
                                            id="AccountName"
                                            maxlength="50" name="AccountName" placeholder="Class Name"
                                            type="text" />
                                    </div>
                                </div>
                                <div className="col-6 mt-2">
                                    <div className="form-group">
                                        <label className="label-control mb-2">App Version (Android)<span
                                            className="red">*</span></label>
                                        <input className="form-control" data-val="true"
                                            id="AccountName"
                                            maxlength="50" name="AccountName" placeholder="Class Name"
                                            type="text" />
                                    </div>
                                </div>
                                <div className="col-6 mt-2">
                                    <div className="form-group">
                                        <label className="label-control mb-2">App Version (IOS)<span
                                            className="red">*</span></label>
                                        <input className="form-control" data-val="true"
                                            id="AccountName"
                                            maxlength="50" name="AccountName" placeholder="Class Name"
                                            type="text" />
                                    </div>
                                </div>
                                <div className="col-6 mt-2">
                                    <div className="form-group">
                                        <label className="label-control mb-2">Force Update App<span
                                            className="red">*</span></label>
                                        <br/>
                                        <input className="form-check-input" type="checkbox" />
                                    </div>
                                </div>
                                <div className="col-6 mt-2">
                                    <div className="form-group">
                                        <label className="label-control mb-2">App Maintenance<span
                                            className="red">*</span></label>
                                        <br />
                                        <input className="form-check-input" type="checkbox" />
                                    </div>
                                </div>
                                <div className="col-6 mt-2">
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
                    </div>
                </div>

            </div>
        </>
    );
};

export default OrgMobileAppSetting;
