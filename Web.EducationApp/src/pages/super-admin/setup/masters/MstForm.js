const MstForm = () => {
    return (
        <>
           
                    <div className="content-demo">
                        <section id="stats-icon-subtitle">
                            <div class="row match-height">
                                <div class="col-xl-3 col-md-6">
                                    <div class="card overflow-hidden" >
                                        <div class="card-content" id="total">
                                            <div style={{ justifyContent: 'space-between' }} class="media align-items-stretch d-flex">
                                                <div class="media-body p-2">
                                                    <h4>Total </h4>
                                                </div>
                                                <div class="media-right p-2 media-middle">
                                                    <h2 class="info font-weight-bold" id="totalValue">2</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card" >
                                        <div class="card-content" id="active">
                                            <div style={{ justifyContent: 'space-between' }} class="media align-items-stretch d-flex">
                                                <div class="media-body p-2">
                                                    <h4>Active</h4>
                                                </div>
                                                <div class="media-right p-2 media-middle">
                                                    <h2 class="success font-weight-bold" id="totalActiveValue">2</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card overflow-hidden">
                                        <div class="card-content" id="inactive">
                                            <div style={{ justifyContent: 'space-between' }} class="media align-items-stretch d-flex">
                                                <div class="media-body p-2">
                                                    <h4>Inactive</h4>
                                                </div>
                                                <div class="media-right p-2 media-middle">
                                                    <h2 class="danger font-weight-bold" id="totalTotalInactiveValue">0</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card" >
                                        <div class="card-content" id="this_month">
                                            <div style={{ justifyContent: 'space-between' }} class="media align-items-stretch d-flex">
                                                <div class="media-body p-2">
                                                    <h4>This Month</h4>
                                                </div>
                                                <div class="media-right p-2 media-middle">
                                                    <h2 class="warning font-weight-bold" id="totalThisMonthValue">0</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </section>
                        <section className="mt-3">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-content collapse show" style={{ 'cursor': 'auto' }}>
                                            <div class="card-body card-dashboard">
                                                <div class="dataTables_wrapper">
                                                    <div class="row d-flex">
                                                        <div class="col-sm-12 col-md-6">
                                                            <div id="" class="dataTables_filter">
                                                                <fieldset>
                                                                    <div class="input-group listSearch">
                                                                        <div class="input-group-prepend">
                                                                            <button id="SearchCreteria" type="button" val="UserName" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                                            <div class="dropdown-menu" id="tableMenu">
                                                                                <a class="dropdown-item" href="javascript:void(0)" val="UserName" onclick="paging(1,this)" style={{ backgroundColor: '#393B4A', color: '#FFF' }}>User Name</a>
                                                                                <a class="dropdown-item" href="javascript:void(0)" val="MobileNo" onclick="paging(1,this)">Mobile No</a>
                                                                                <a class="dropdown-item" href="javascript:void(0)" val="EmailId" onclick="paging(1,this)">Email ID</a>
                                                                                <a class="dropdown-item" href="javascript:void(0)" val="AccountCategory" onclick="paging(1,this)">Account Category</a>
                                                                                <a class="dropdown-item" href="javascript:void(0)" val="Role" onclick="paging(1,this)">Roles</a>
                                                                                <a class="dropdown-item" href="javascript:void(0)" val="AccountName" onclick="paging(1,this)">Account Name</a>
                                                                            </div>
                                                                        </div>
                                                                        <input type="text" class="form-control" id="SearchValue" placeholder="User Name" aria-label="Amount (to the nearest dollar)" />
                                                                        <div class="input-group-append"> <span class="input-group-text" onclick="paging(1)"><i class="ficon ft-search" style={{ lineHeight: '0px' }}></i><span>&#128269;</span></span> </div>
                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                <div class="col-sm-12 col-md-6 text-right">
                                                            <div class="dataTables_length d-flex" style={{ justifyContent: 'space-between' }} id="exportdiv">
                                                                <div class="mr-2 d-flex" style={{ justifyContent: 'space-between', width: '30%' }}>
                                                                    <label  >
                                                                        Show
                                                                    </label>
                                                                    <div style={{ width: '35%' }}>
                                                                        <select name="DataTables_Table_0_length" id="Select_NoRecord" class="custom-select custom-select-sm form-control form-control-sm">
                                                                            <option value="10">10</option>
                                                                            <option value="25">25</option>
                                                                            <option value="50">50</option>
                                                                            <option value="100">100</option>
                                                                        </select>
                                                                    </div>
                                                                    <label>Entries</label>
                                                                </div>
                                                                <div class="dropdown display-inline">
                                                                    <a class="dropdown-toggle btn btn-dark" id="exportdiv" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="">Export</span></a>
                                                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-flag">
                                                                        <a class="dropdown-item" id="Excel" onclick="ExportToExcelOrCsvFile('Excel')"><i class="la la-file-excel-o"></i> Excel</a>
                                                                        <a class="dropdown-item" id="CSV" onclick="ExportToExcelOrCsvFile('CSV')"><i class="la la-file-text"></i> CSV</a>
                                                                        <a class="dropdown-item" id="PDF" onclick="ExportToExcelOrCsvFile('PDF')"><i class="la la-file-pdf-o"></i> PDF</a> </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="GridDiv ">
                                                        <div class="table-responsive mt-4" style={{ maxHeight: '465px' }}>
                                                            <table cellspacing="0" cellpadding="0" border="0" class="table table-bordered table-hover" width="100%" style={{ cursor: 'auto' }}>
                                                                <thead>
                                                                    <tr>

                                                                        <th class="text-center">
                                                                            <input id="checkAll_Id" name="checkAll_Id" onclick="CheckAllValue(this.checked)" type="checkbox" value="true" />
                                                                            <input name="checkAll_Id" type="hidden" value="false" /></th>
                                                                        <th class="text-center">No.</th>
                                                                        <th class="text-center">Account Category</th>
                                                                        <th class="text-center">Account Name</th>
                                                                        <th class="text-center">User Name</th>
                                                                        <th class="text-center">Roles</th>
                                                                        <th class="text-center">Email ID</th>
                                                                        <th class="text-center">Mobile No</th>
                                                                        <th class="text-center">Country</th>
                                                                        <th class="text-center">State</th>
                                                                        <th class="text-center">City</th>
                                                                        <th class="text-center">Created Date</th>

                                                                        <th class="text-center">Status</th>
                                                                        <th class="text-center">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="text-center" style={{ display: 'none' }}>
                                                                            2
                                                                        </td>
                                                                        <td class="text-center"><input type="checkbox" value="" id="2" /></td>
                                                                        <td align="center">1</td>
                                                                        <td class="text-center">Admin</td>
                                                                        <td class="text-center"></td>
                                                                        <td class="text-center">admin</td>
                                                                        <td class="text-center">Admin</td>
                                                                        <td class="text-center">admin@gyanmitras.com </td>
                                                                        <td class="text-center">09876546644 </td>
                                                                        <td class="text-center">India </td>
                                                                        <td class="text-center"> Haryana</td>
                                                                        <td class="text-center"> Gurgaon </td>
                                                                        <td class="text-center"> 01/05/2020 17:06 </td>
                                                                        <td align="center" class="success text-success text-bold-600">Active</td>
                                                                        <td class="text-center text-nowrap">
                                                                    <a class="btn btn-icon btn-dark btn-sm" style={{ "margin-right":"1px" }} href="../Admin/MstUser/AddEditUser/2"><i class="la la-pencil"></i><span>&#9998;</span></a>
                                                                            <a class="btn btn-icon btn-danger btn-sm" href="../Admin/MstUser/DeleteUser/2" onclick="return confirm('Are&nbsp;you&nbsp;sure&nbsp;you&nbsp;want&nbsp;to&nbsp;delete?');"><i class="la la-trash-o"></i><span>&#x2421;</span></a><br />
                                                                        </td>
                                                                    </tr>                     <tr>
                                                                        <td class="text-center" style={{ display: 'none' }}>
                                                                            1
                                                                        </td>
                                                                        <td class="text-center"><input type="checkbox" value="" id="1" /></td>
                                                                        <td align="center">2</td>
                                                                        <td class="text-center">Super Admin</td>
                                                                        <td class="text-center"></td>
                                                                        <td class="text-center">dadmin</td>
                                                                        <td class="text-center">Super Admin</td>
                                                                        <td class="text-center">dadmin@gyanmitras.com </td>
                                                                        <td class="text-center">9876549878 </td>
                                                                        <td class="text-center">India </td>
                                                                        <td class="text-center"> Haryana</td>
                                                                        <td class="text-center"> Gurgaon </td>
                                                                        <td class="text-center">  </td>

                                                                        <td align="center" class="text-success text-bold-600">Active</td>
                                                                        <td class="text-center text-nowrap">
                                                                            <a class="btn btn-icon btn-dark btn-sm" href="../Admin/MstUser/AddEditUser/1"><i class="la la-pencil"></i><span>&#9998;</span></a>
                                                                        </td>
                                                                    </tr>         </tbody>


                                                            </table>

                                                        </div>


                                                        <div class="row">
                                                            <div class="col-sm-12 col-md-9">
                                                        <div class="dataTables_info" id="" style={{ "margin-top": "5px"}} role="status" aria-live="polite">Page 1 of 1 ( 2 Records ) </div>
                                                            </div>
                                                            <div class="col-sm-12 col-md-3">
                                                                <div class="dataTables_paginate paging_simple_numbers" id="">
                                                            <ul class="pagination pagination-flat" style={{ "padding-left": "91px " }}>



                                                                        <li class="paginate_button page-item previous disabled"><a href="javascript:void(0);" class="page-link">Previous</a></li>

                                                                        <li class="paginate_button page-item active"><a href="javascript:void(0);" onclick="paging(1)" class="page-link">1</a></li>

                                                                        <li class="paginate_button page-item next"><a href="javascript:void(0);" class="page-link">Next</a></li>


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

export default MstForm;
