import { faBook, faFileCsv, faFileExcel, faFilePdf, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AcadMstSetupMedium = () => {
    return (
        <>
            <div class="row">
                <div class="col-xl-6 col-md-6">
                    <div class="card card-demo">
                        <div class="card-body">
                            <ul className="nav nav-tabs nav-top-border no-hover-bg">
                                <li className="nav-item"> <a className="nav-link active" id="base-tab11" data-toggle="tab" aria-controls="tab11" href="#tab11" aria-expanded="true">Create Medium</a> </li>
                            </ul>
                            <div className="tab-content px-1 py-1">
                                <div role="tabpanel" className="tab-pane active show" id="tab11" aria-expanded="true"
                                    aria-labelledby="base-tab11">

                                    <div className="row">
                                        <div className="col-12 mt-2">
                                            <div className="form-group">
                                                <label className="label-control mb-2">Medium Name<span
                                                    className="red">*</span></label>
                                                <input className="form-control" data-val="true"
                                                    id="AccountName"
                                                    maxLength="50" name="AccountName" placeholder="Medium Name"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div className="col-2 mt-2">
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
                </div>
                <div class="col-xl-6 col-md-6">
                    <div class="card card-demo">
                        <div class="card-body">
                            <h3 class="card-title">Medium List</h3>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content collapse show" style={{ 'cursor': 'auto' }}>
                                            <div className="card-body card-dashboard">
                                                <div className="dataTables_wrapper">
                                                    <div className="row d-flex">
                                                        <div className="col-sm-12 col-md-6">
                                                            <div id="" className="dataTables_filter">
                                                                <fieldset>
                                                                    <div className="input-group listSearch">
                                                                        <div className="input-group-prepend">
                                                                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                                <li>
                                                                                    <a className="dropdown-item" id="Excel" >Account Category</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a className="dropdown-item active" id="Excel" >Account Name</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a className="dropdown-item" id="Excel" >User Name</a>
                                                                                </li>
                                                                            </ul>
                                                                            <div className="dropdown-menu" id="tableMenu">
                                                                                <a className="dropdown-item" href="#" val="UserName" style={{ backgroundColor: '#393B4A', color: '#FFF' }}>User Name</a>
                                                                                <a className="dropdown-item" href="#" val="MobileNo" >Mobile No</a>
                                                                                <a className="dropdown-item" href="#" val="EmailId" >Email ID</a>
                                                                                <a className="dropdown-item" href="#" val="AccountCategory" >Account Category</a>
                                                                                <a className="dropdown-item" href="#" val="Role" >Roles</a>
                                                                                <a className="dropdown-item" href="#" val="AccountName" >Account Name</a>
                                                                            </div>
                                                                        </div>
                                                                        <input type="text" className="form-control" id="SearchValue" placeholder="User Name" aria-label="Amount (to the nearest dollar)" />
                                                                        <div className="input-group-append"> <span className="input-group-text" ><i className="ficon ft-search" style={{ lineHeight: '0px' }}></i><span>&#128269;</span></span> </div>
                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 text-right">
                                                            <div className="dataTables_length d-flex" style={{ justifyContent: 'space-between' }} id="exportdiv">
                                                                <div className="mr-2 d-flex" style={{ justifyContent: 'space-between', width: '30%' }}>

                                                                </div>

                                                                <div className="dropdown">
                                                                    <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Export</button>
                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                        <li>
                                                                            <a className="dropdown-item" id="Excel" >
                                                                                <FontAwesomeIcon icon={faFileExcel} />
                                                                        &emsp;
                                                                        Excel
                                                                        </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="dropdown-item" id="CSV" >
                                                                                <FontAwesomeIcon icon={faFileCsv} />
                                                                        &emsp;
                                                                        CSV
                                                                        </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="dropdown-item" id="PDF" >
                                                                                <FontAwesomeIcon icon={faFilePdf} />
                                                                        &emsp;
                                                                        PDF
                                                                        </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="GridDiv ">
                                                        <div className="row mb-2">
                                                            <div className="col-sm-12 col-md-12">
                                                                <div className="table-responsive mt-4" style={{ maxHeight: '465px' }}>
                                                                    <table cellSpacing="0" cellPadding="0" border="0" className="table table-bordered table-hover" width="100%" style={{ cursor: 'auto' }}>
                                                                        <thead>
                                                                            <tr>

                                                                                <th className="text-center">
                                                                                    <input id="checkAll_Id" name="checkAll_Id" type="checkbox" value="true" />
                                                                                    <input name="checkAll_Id" type="hidden" value="false" /></th>
                                                                                <th className="text-center">No.</th>
                                                                                <th className="text-center">Account Category</th>
                                                                                <th className="text-center">Account Name</th>
                                                                                <th className="text-center">User Name</th>
                                                                                <th className="text-center">Roles</th>
                                                                                <th className="text-center">Email ID</th>
                                                                                <th className="text-center">Mobile No</th>
                                                                                <th className="text-center">Country</th>
                                                                                <th className="text-center">State</th>
                                                                                <th className="text-center">City</th>
                                                                                <th className="text-center">Created Date</th>

                                                                                <th className="text-center">Status</th>
                                                                                <th className="text-center">Action</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="text-center" style={{ display: 'none' }}>
                                                                                    2
                                                                        </td>
                                                                                <td className="text-center"><input type="checkbox" value="" id="2" /></td>
                                                                                <td align="center">1</td>
                                                                                <td className="text-center">Admin</td>
                                                                                <td className="text-center">Test</td>
                                                                                <td className="text-center">admin</td>
                                                                                <td className="text-center">Admin</td>
                                                                                <td className="text-center">admin@gyanmitras.com </td>
                                                                                <td className="text-center">09876546644 </td>
                                                                                <td className="text-center">India </td>
                                                                                <td className="text-center"> Haryana</td>
                                                                                <td className="text-center"> Gurgaon </td>
                                                                                <td className="text-center"> 01/05/2020 17:06 </td>
                                                                                <td align="center" className="success text-success text-bold-600">Active</td>
                                                                                <td className="text-center text-nowrap">
                                                                                    <a className="btn btn-icon btn-dark btn-sm" style={{ marginRight: "1px" }} href="../Admin/MstUser/AddEditUser/2"><i className="la la-pencil"></i><span>&#9998;</span></a>
                                                                                    <a className="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" ><i className="la la-trash-o"></i><span>&#x2421;</span></a><br />
                                                                                </td>
                                                                            </tr>

                                                                        </tbody>


                                                                    </table>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row d-flex">
                                                            <div className="col-sm-12 col-md-6">
                                                                <div className="col-sm-12 col-md-9">
                                                                    <div className="dataTables_info" id="" style={{ marginTop: "5px" }} role="status" aria-live="polite">Page 1 of 1 ( 2 Records ) </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-md-6 ">

                                                                <div className="col-sm-12 col-md-3">

                                                                    <nav aria-label="Page navigation example">
                                                                        <ul className="pagination">
                                                                            <li className="page-item">
                                                                                <a className="page-link" href="#" aria-label="Previous">
                                                                                    <span aria-hidden="true">
                                                                                        { "<<"}
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className="page-item">
                                                                                <a className="page-link" href="#">1</a>
                                                                            </li>
                                                                            <li className="page-item">
                                                                                <a className="page-link" href="#">2</a>
                                                                            </li>
                                                                            <li className="page-item">
                                                                                <a className="page-link" href="#">3</a>
                                                                            </li>
                                                                           
                                                                            <li className="page-item">
                                                                                <a className="page-link" href="#" aria-label="Next">
                                                                                    <span aria-hidden="true">
                                                                                        {">>"}
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </nav>
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
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AcadMstSetupMedium;
