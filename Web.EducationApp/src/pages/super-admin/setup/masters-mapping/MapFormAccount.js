const MapFormAccount = () => {
    return (
        <>
            <div className="card card-demo">
                <div className="card-body">
                    <div className="content-demo">
                        <div class="content-body">

                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="label-control mb-2">Select Account<span
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
                                        <label className="label-control mb-2">Select Form<span
                                            className="red">*</span></label>
                                        <select class="form-control select2 select2-hidden-accessible" data-val="true" data-val-number="The field Role For must be a number." data-val-required="Please Select Role For" id="RoleForId" name="RoleForId" tabindex="-1" aria-hidden="true"><option value="">--select--</option>
                                            <option value="2">Admin</option>
                                            <option value="1">Super Admin</option>
                                            <option value="2">Gyanmitras Admin</option></select>
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
                </div>
            </div>

        </>
    );
};

export default MapFormAccount;
