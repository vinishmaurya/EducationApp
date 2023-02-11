import { faBook, faFileCsv, faFileExcel, faFilePdf, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const IndexMstAccount = (props) => {
    return (
        <>
            <div className="content-demo">
                <section id="stats-icon-subtitle">
                    <div className="row match-height">
                        <div className="col-xl-3 col-md-6">
                            <div className="card overflow-hidden" >
                                <div className="card-content" id="total">
                                    <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                        <div className="media-body p-2">
                                            <h4>Total </h4>
                                        </div>
                                        <div className="media-right p-2 media-middle">
                                            <h2 className="info font-weight-bold" id="totalValue">2</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card" >
                                <div className="card-content" id="active">
                                    <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                        <div className="media-body p-2">
                                            <h4>Active</h4>
                                        </div>
                                        <div className="media-right p-2 media-middle">
                                            <h2 className="success font-weight-bold" id="totalActiveValue">2</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card overflow-hidden">
                                <div className="card-content" id="inactive">
                                    <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                        <div className="media-body p-2">
                                            <h4>Inactive</h4>
                                        </div>
                                        <div className="media-right p-2 media-middle">
                                            <h2 className="danger font-weight-bold" id="totalTotalInactiveValue">0</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card" >
                                <div className="card-content" id="this_month">
                                    <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                        <div className="media-body p-2">
                                            <h4>This Month</h4>
                                        </div>
                                        <div className="media-right p-2 media-middle">
                                            <h2 className="warning font-weight-bold" id="totalThisMonthValue">0</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </section>
                <section className="mt-3">
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
                                                            <label  >
                                                                Show
                                                                    </label>
                                                            <div style={{ width: '35%' }}>
                                                                <select name="DataTables_Table_0_length" id="Select_NoRecord" className="custom-select custom-select-sm form-control form-control-sm">
                                                                    <option value="10">10</option>
                                                                    <option value="25">25</option>
                                                                    <option value="50">50</option>
                                                                    <option value="100">100</option>
                                                                </select>
                                                            </div>
                                                            <label>Entries</label>
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


                                                <div className="row">
                                                    <div className="col-sm-12 col-md-9">
                                                        <div className="dataTables_info" id="" style={{ marginTop: "5px" }} role="status" aria-live="polite">Page 1 of 1 ( 2 Records ) </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-3">
                                                        <div className="dataTables_paginate paging_simple_numbers" id="">
                                                            <ul className="pagination pagination-flat" style={{ paddingLeft: "56px " }}>



                                                                <li className="paginate_button page-item previous disabled"><a href="#" className="page-link">Previous</a></li>

                                                                <li className="paginate_button page-item active"><a href="#" className="page-link">1</a></li>

                                                                <li className="paginate_button page-item next"><a href="#" className="page-link">Next</a></li>


                                                            </ul>
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
                </section>


            </div>

        </>
    );
};

export default IndexMstAccount;
