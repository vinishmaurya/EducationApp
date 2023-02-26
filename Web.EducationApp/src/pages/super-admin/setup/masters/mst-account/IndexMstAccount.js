import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv, faFileExcel, faFilePdf, faSync } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import CommonFuncs from "../../../../../util/common.funcs";
import Login from "../../../../../auth/login/Login";
import GridTable from "../../../../../core/components/table/GridTable";
import DefaultPaging from "../../../../../core/components/paging/DefaultPaging";
import GridShowEntries from "../../../../../core/components/table/GridShowEntries";

require('dotenv').config();
const IndexMstAccount = (props) => {
    //let [SearchByPlaceHolder, setSearchByPlaceHolder] = useState('');
    let SearchByPlaceHolder = "";
    let ShowEntriesDataList = process.env.REACT_APP_DefaultRowPerPageValues.split(',');
    let RowPerPage = props.RowPerPage;
    let CurrentPage = props.CurrentPage;
    let TotalItem = props.defaultDynamicAPIResponse.CountArray.TotalItem;
    let SearchBy = props.SearchBy;
    let SearchValue = props.SearchValue;
    let TotalPage = Math.floor((TotalItem % RowPerPage == 0) ? (TotalItem / RowPerPage) : (TotalItem / RowPerPage + 1));

    let PagingDataList = {
        CurrentPage: CurrentPage,
        TotalItem: TotalItem,
        TotalPage: TotalPage
    };

    useEffect(() => {

    }, []);
    const isComponentMounted = CommonFuncs.useIsComponentMounted();
    if (!isComponentMounted.current) {
        //After Component Load data
    }
    if (!props.defaultDynamicAPIResponse) {
        return (<Login />)
    }

    function onSelectSearchBy(e) {
        SearchBy = e.target.getAttribute('search-by-value');
        //setSearchByPlaceHolder(e.target.getAttribute('search-by-text'));
        SearchByPlaceHolder = e.target.getAttribute('search-by-text');
    }
    function onChangeSearchValue(e) {
        SearchValue = e.target.value;
    }


    function onClickTotalCard(e) {
        debugger;
        RowPerPage = process.env.REACT_APP_DefaultRowPerPage;
        CurrentPage = process.env.REACT_APP_DefaultCurrentPage;
        TotalItem = props.defaultDynamicAPIResponse.CountArray.TotalItem;
        SearchBy = "";
        SearchValue = "";
        TotalPage = Math.floor((TotalItem % RowPerPage == 0) ? (TotalItem / RowPerPage) : (TotalItem / RowPerPage + 1));
        PagingDataList = {
            CurrentPage: CurrentPage,
            TotalItem: TotalItem,
            TotalPage: TotalPage
        };
        onChangePagingData(CurrentPage, RowPerPage);
    }

    function onChangePagingData(NextCurrentPage, NextRowPerPage) {
        const AccountId = 0;
        RowPerPage = !Number(NextRowPerPage) ? RowPerPage : NextRowPerPage;
        CurrentPage = !Number(NextCurrentPage) ? CurrentPage : NextCurrentPage;

        props.fetchParentDefaultData(
            AccountId,
            RowPerPage,
            CurrentPage,
            SearchBy,
            SearchValue
        );//Call parent function to call backend api
    }

    function funcBindSearchTerms() {
        //debugger;
        let itemList = [];
        if (!props.defaultDynamicAPIResponse.SearchTermList) { return; }
        if (!props.defaultDynamicAPIResponse.SearchTermList.length > 0) { return; }
        let bool = false;
        props.defaultDynamicAPIResponse.SearchTermList.map((data, i) => {
            if (!bool && data.IsDefaultSelection) {
                SearchByPlaceHolder = data.SearchByText;
                //setSearchByPlaceHolder(e.target.getAttribute('search-by-text'));
                SearchBy = data.SearchByValue;
                bool = true;
            }
            let uniqueKey = CommonFuncs.funcUniqueKey(1);
            itemList.push(
                <li key={i}>
                    <a key={uniqueKey} className={`dropdown-item ${data.IsDefaultSelection ? 'active' : ''}`}
                        search-by-value={data.SearchByValue}
                        onClick={e => onSelectSearchBy(e)}
                        search-by-text={data.SearchByText}
                    >{data.SearchByText}</a>
                </li>
            )
        });
        //console.log(SearchByPlaceHolder);

        return itemList;
    }

    return (
        <>
            <div className="content-demo">
                <section id="stats-icon-subtitle">
                    <div className="row match-height">
                        <div className="col-xl-3 col-md-6">
                            <div className="card overflow-hidden" >
                                <div className="card-content cursor-card" id="total" onClick={e => onClickTotalCard(e)}>
                                    <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                        <div className="media-left p-1 media-middle btn-primary" style={{ "backgroundColor": "#0099e5" }}>
                                        </div>
                                        <div className="media-body p-2">
                                            <h4>Total </h4>
                                        </div>
                                        <div className="media-right p-2 media-middle">
                                            <h2 className="info font-weight-bold" id="totalValue">{props.defaultDynamicAPIResponse.CountArray.TotalItem}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card" >
                                <div className="card-content cursor-card" id="active" onClick={e => onClickTotalCard(e)}>
                                    <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                        <div className="media-left p-1 media-middle btn-primary" style={{ "backgroundColor": "#0099e5" }}>
                                        </div>
                                        <div className="media-body p-2">
                                            <h4>Active</h4>
                                        </div>
                                        <div className="media-right p-2 media-middle">
                                            <h2 className="success font-weight-bold" id="totalActiveValue">{props.defaultDynamicAPIResponse.CountArray.TotalActive}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card overflow-hidden">
                                <div className="card-content cursor-card" id="inactive" onClick={e => onClickTotalCard(e)}>
                                    <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                        <div className="media-left p-1 media-middle btn-primary" style={{ "backgroundColor": "#0099e5" }}>
                                        </div>
                                        <div className="media-body p-2">
                                            <h4>Inactive</h4>
                                        </div>
                                        <div className="media-right p-2 media-middle">
                                            <h2 className="danger font-weight-bold" id="totalTotalInactiveValue">{props.defaultDynamicAPIResponse.CountArray.TotalInActive}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card" >
                                <div className="card-content cursor-card" id="this_month" onClick={e => onClickTotalCard(e)}>
                                    <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                        <div className="media-left p-1 media-middle btn-primary" style={{ "backgroundColor": "#0099e5" }}>
                                        </div>
                                        <div className="media-body p-2">
                                            <h4>This Month</h4>
                                        </div>
                                        <div className="media-right p-2 media-middle">
                                            <h2 className="warning font-weight-bold" id="totalThisMonthValue">{props.defaultDynamicAPIResponse.CountArray.TotalCurrentMonth}</h2>
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
                                                                        {funcBindSearchTerms()}
                                                                    </ul>
                                                                </div>
                                                                <input type="text" className="form-control" onChange={e => onChangeSearchValue(e)} placeholder={SearchByPlaceHolder} aria-label={SearchByPlaceHolder} />
                                                                <div className="input-group-append" onClick={onChangePagingData}>
                                                                    <span className="input-group-text" >
                                                                        <span>&#128269;</span>
                                                                    </span>
                                                                    
                                                                </div>
                                                                
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6 text-right">
                                                   
                                                    <div className="dataTables_length d-flex" style={{ justifyContent: 'flex-end' }} id="exportdiv">
                                                        <span className="input-group-text input-group-append" onClick={e => onClickTotalCard(e)}>
                                                            <FontAwesomeIcon icon={faSync} />
                                                        </span>
                                                        {
                                                            <GridShowEntries
                                                                DataList={ShowEntriesDataList}
                                                                onChangePagingData={onChangePagingData}
                                                            />
                                                            //<div className="mr-2 d-flex" style={{ justifyContent: 'space-between', width: '30%' }}>
                                                            //    <label>Show</label>
                                                            //    <div style={{ width: '35%' }}>
                                                            //        <select
                                                            //            className="form-control"
                                                            //            onChange={onChangePagingData}
                                                            //            id="eleRowPerPage"
                                                            //        >
                                                            //            <option value="10">10</option>
                                                            //            <option value="20">20</option>
                                                            //            <option value="30">30</option>
                                                            //            <option value="40">40</option>
                                                            //        </select>
                                                            //    </div>
                                                            //    <label>Entries</label>
                                                            //</div>
                                                        }
                                                        
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
                                                {
                                                    <GridTable
                                                        DataList={props.defaultDynamicAPIResponse.DataList}
                                                        HeaderList={props.defaultDynamicAPIResponse.HeaderList}
                                                    />
                                                }
                                                {
                                                    <DefaultPaging
                                                        CurrentPage={PagingDataList.CurrentPage}
                                                        TotalPage={PagingDataList.TotalPage}
                                                        TotalItem={PagingDataList.TotalItem}
                                                        onChangePagingData={onChangePagingData}
                                                    />
                                                }
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
}

export default IndexMstAccount;
