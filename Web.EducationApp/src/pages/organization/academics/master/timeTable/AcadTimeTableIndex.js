const AcadMstAddEditClassTeacherTimeTable = () => {
    return (
        <>
            <div className="card card-demo">
                <div className="card-body">
                    <div className="content-body content-demo" style={{ backgroundColor: '#FFFFFF' }}>
                        <section className="NewformTabs">

                            <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Class Timetable List</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home1" type="button" role="tab" aria-controls="home" aria-selected="true">Teacher Timetable List</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Select Class<span
                                                    className="red">*</span></label>
                                                <select className="form-control select2-hidden-accessible"
                                                >
                                                    <option value="1">Super Admin</option>
                                                    <option value="2">Admin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">

                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-lg-12">
                                            <div className="form-body">
                                                <section className="NewformTabs">

                                                    <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="monday" aria-selected="true">Monday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="tuesday" aria-selected="true">Tuesday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="wednessday" aria-selected="true">Wednessday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="thursday" aria-selected="true">Thursday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="friday" aria-selected="true">Friday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="saturday" aria-selected="true">Saturday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="sunday" aria-selected="true">Sunday</button>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content" id="myTabContent1">
                                                        <div className="tab-pane fade show active" id="monday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible" disabled="disabled"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible" disabled="disabled"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" disabled="disabled" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" disabled="disabled" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1" disabled="disabled"> Testing ........</textarea>
                                                                    </div>
                                                                </div>
                                                               
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane fade" id="tuesday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="wednessday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="thursday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="friday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane fade" id="saturday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane fade" id="sunday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>



                                                </section>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="home1" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Select Teacher<span
                                                    className="red">*</span></label>
                                                <select className="form-control select2-hidden-accessible"
                                                >
                                                    <option value="1">Super Admin</option>
                                                    <option value="2">Admin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">

                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-lg-12">
                                            <div className="form-body">
                                                <section className="NewformTabs">

                                                    <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="monday" aria-selected="true">Monday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="tuesday" aria-selected="true">Tuesday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="wednessday" aria-selected="true">Wednessday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="thursday" aria-selected="true">Thursday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="friday" aria-selected="true">Friday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="saturday" aria-selected="true">Saturday</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="sunday" aria-selected="true">Sunday</button>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content" id="myTabContent1">
                                                        <div className="tab-pane fade show active" id="monday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane fade" id="tuesday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="wednessday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="thursday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="friday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane fade" id="saturday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane fade" id="sunday" role="tabpanel" aria-labelledby="home-tab">

                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Subject<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Teacher<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Start Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">End Time<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <label className="label-control mb-2">Note<span
                                                                            className="red">*</span></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2">
                                                                            <span>&#43;</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <select className="form-control select2-hidden-accessible"
                                                                        >
                                                                            <option value="1">Super Admin</option>
                                                                            <option value="2">Admin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="form-group">
                                                                        <input class="form-control" type="time" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="form-group">
                                                                        <textarea className="form-control" cols="20" id="AccountAddress"
                                                                            maxLength="200" name="AccountAddress" placeholder="Address"
                                                                            rows="1"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1">
                                                                    <div className="form-group">
                                                                        <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><span>&#10539;</span></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>



                                                </section>
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

export default AcadMstAddEditClassTeacherTimeTable;
