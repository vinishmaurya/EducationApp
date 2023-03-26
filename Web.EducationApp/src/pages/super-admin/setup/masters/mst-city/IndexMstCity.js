"use strict";
/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Index Page City Master Details
 * --------------------------------------------------------------------------
 */
import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt, faFileCsv, faFileExcel, faFilePdf, faSearch, faSync } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import CommonFuncs from "../../../../../util/common.funcs";
import Login from "../../../../../auth/login/Login";
import GridTable from "../../../../../core/components/table/GridTable";
import DefaultPaging from "../../../../../core/components/paging/DefaultPaging";
import GridShowEntries from "../../../../../core/components/table/GridShowEntries";
import { $ } from 'react-jquery-plugin'
import { format } from 'date-fns';
import PageHeaderCount from "../../../../../core/components/card/PageHeaderCount";

require('dotenv').config();
const IndexMstCity = (props) => {
    //let [SearchByPlaceHolder, setSearchByPlaceHolder] = useState('');
    //console.log(props.defaultDynamicAPIResponse);
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
        $(e.target).parent().parent().each(function (obj, i) {
            $(this).find('a').removeClass('active');
        });
        $(e.target).addClass('active');
        $('#txtSearcBar').attr('placeholder', $(e.target).text());
    }
    function onChangeSearchValue(e) {
        SearchValue = e.target.value;
    }


    function funcHandelRefreshData(e) {
        //debugger;
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
        $('#txtSearcBar').val('');
    }

    function onChangePagingData(NextCurrentPage, NextRowPerPage) {
        const CityId = 0;
        RowPerPage = !Number(NextRowPerPage) ? RowPerPage : NextRowPerPage;
        CurrentPage = !Number(NextCurrentPage) ? CurrentPage : NextCurrentPage;

        props.fetchParentDefaultData(
            CityId,
            RowPerPage,
            CurrentPage,
            SearchBy,
            SearchValue
        );//Call parent function to call backend api
    }

    function onClickHandelEditClick(childEvent) {
        //debugger;
        let rowData = $(childEvent.currentTarget).attr('row-data');
        props.funcLoadComponent(rowData);
    }


    function onClickHandelDeleteClick(childEvent) {
        //debugger;
        let rowData = $(childEvent.currentTarget).attr('row-data');
        props.funcDeleteRecord(rowData);
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

    function funcHandelCardActive(e) {
        RowPerPage = process.env.REACT_APP_DefaultRowPerPage;
        CurrentPage = process.env.REACT_APP_DefaultCurrentPage;
        TotalItem = props.defaultDynamicAPIResponse.CountArray.TotalItem;
        SearchBy = "Status";
        SearchValue = "Active";
        TotalPage = Math.floor((TotalItem % RowPerPage == 0) ? (TotalItem / RowPerPage) : (TotalItem / RowPerPage + 1));
        PagingDataList = {
            CurrentPage: CurrentPage,
            TotalItem: TotalItem,
            TotalPage: TotalPage
        };
        onChangePagingData(CurrentPage, RowPerPage);
        $('#txtSearcBar').val('');
    }

    function funcHandelCardInactive(e) {
        RowPerPage = process.env.REACT_APP_DefaultRowPerPage;
        CurrentPage = process.env.REACT_APP_DefaultCurrentPage;
        TotalItem = props.defaultDynamicAPIResponse.CountArray.TotalItem;
        SearchBy = "Status";
        SearchValue = "Inactive";
        TotalPage = Math.floor((TotalItem % RowPerPage == 0) ? (TotalItem / RowPerPage) : (TotalItem / RowPerPage + 1));
        PagingDataList = {
            CurrentPage: CurrentPage,
            TotalItem: TotalItem,
            TotalPage: TotalPage
        };
        onChangePagingData(CurrentPage, RowPerPage);

        $('#txtSearcBar').val('');
    }

    function funcHandelCardThisMonth(e) {
        RowPerPage = process.env.REACT_APP_DefaultRowPerPage;
        CurrentPage = process.env.REACT_APP_DefaultCurrentPage;
        TotalItem = props.defaultDynamicAPIResponse.CountArray.TotalItem;
        SearchBy = "ThisMonth";
        SearchValue = "";
        TotalPage = Math.floor((TotalItem % RowPerPage == 0) ? (TotalItem / RowPerPage) : (TotalItem / RowPerPage + 1));
        PagingDataList = {
            CurrentPage: CurrentPage,
            TotalItem: TotalItem,
            TotalPage: TotalPage
        };
        onChangePagingData(CurrentPage, RowPerPage);

        $('#txtSearcBar').val('');
    }

    const funcHandelPDFExport = async () => {
        if (props.defaultDynamicAPIResponse.DataList.length > 0) {
            let filename = "CityMasterData" + format(new Date(), '-ddMMyyyykkmmss'), title = "City Master Data (" + format(new Date(), 'dd/MM/yyyy kk:mm:ss') + ")";
            //let headers = [["NAME", "PROFESSION"]];
            //let dynamicData = [
            //    { name: "Keanu Reeves", profession: "Actor" },
            //    { name: "Lionel Messi", profession: "Football Player" },
            //    { name: "Cristiano Ronaldo", profession: "Football Player" },
            //    { name: "Jack Nicklaus", profession: "Golf Player" },
            //]
            let headers = [(Object.values(props.defaultDynamicAPIResponse.HeaderList)).filter(function (ele, i) { return !["PK_ID", "Action", "#"].includes(ele) })];
            const headerKeys = (Object.keys(props.defaultDynamicAPIResponse.HeaderList)).filter(function (ele, i) { return !["PK_ID", "Action", "SrNo"].includes(ele) });;
            let parseDynamicData = [];
            let hasAnyChecked = false;
            $("#tblGrid > tbody > tr").each(function () {
                if ($(this).find('input[type="checkbox"]').is(':checked')) {
                    hasAnyChecked = true;
                }
            });
            props.defaultDynamicAPIResponse.DataList.forEach(function (obj, i) {
                let tempObj = [];
                if (hasAnyChecked) {
                    if ($("#chkb_" + obj.PK_ID).is(":checked")) {
                        for (var i = 0; i < headerKeys.length; i++) {
                            tempObj.push(obj[headerKeys[i]]);
                        }
                        parseDynamicData.push(tempObj);
                    }
                }
                else {
                    for (var i = 0; i < headerKeys.length; i++) {
                        tempObj.push(obj[headerKeys[i]]);
                    }
                    parseDynamicData.push(tempObj);
                }
            });
            await CommonFuncs.exportPDFUsingJSPDF(filename, title, headers, parseDynamicData);
        }
    }

    const funcHandelCSVExport = async () => {
        if (props.defaultDynamicAPIResponse.DataList.length > 0) {
            let filename = "CityMasterData" + format(new Date(), '-ddMMyyyykkmmss');
            //let headers = ['User Name', 'Department'];
            //let dynamicData = [
            //    ['Alan Walker', 'Singer'],
            //    ['Cristiano Ronaldo', 'Footballer'],
            //    ['Saina Nehwal', 'Badminton Player'],
            //    ['Arijit Singh', 'Singer'],
            //    ['Terence Lewis', 'Dancer']
            //]

            let headers = (Object.values(props.defaultDynamicAPIResponse.HeaderList)).filter(function (ele, i) { return !["PK_ID", "Action", "#"].includes(ele) });
            const headerKeys = (Object.keys(props.defaultDynamicAPIResponse.HeaderList)).filter(function (ele, i) { return !["PK_ID", "Action", "SrNo"].includes(ele) });;
            let parseDynamicData = [];
            let hasAnyChecked = false;
            $("#tblGrid > tbody > tr").each(function () {
                if ($(this).find('input[type="checkbox"]').is(':checked')) {
                    hasAnyChecked = true;
                }
            });
            props.defaultDynamicAPIResponse.DataList.forEach(function (obj, i) {
                let tempObj = [];
                if (hasAnyChecked) {
                    if ($("#chkb_" + obj.PK_ID).is(":checked")) {
                        for (var i = 0; i < headerKeys.length; i++) {
                            tempObj.push(obj[headerKeys[i]]);
                        }
                        parseDynamicData.push(tempObj);
                    }
                }
                else {
                    for (var i = 0; i < headerKeys.length; i++) {
                        tempObj.push(obj[headerKeys[i]]);
                    }
                    parseDynamicData.push(tempObj);
                }
            });

            await CommonFuncs.exportCSVDefault(filename, String(headers) + "\n", parseDynamicData);
        }
    }

    const funcHandelExcelExport = async () => {
        if (props.defaultDynamicAPIResponse.DataList.length > 0) {
            let filename = "CityMasterData" + format(new Date(), '-ddMMyyyykkmmss');
            //const headers = [
            //    ['User Name', 'Department']
            //];
            //let dynamicData = [
            //    ['Alan Walker', 'Singer'],
            //    ['Cristiano Ronaldo', 'Footballer'],
            //    ['Saina Nehwal', 'Badminton Player'],
            //    ['Arijit Singh', 'Singer'],
            //    ['Terence Lewis', 'Dancer']
            //]

            let headers = [(Object.values(props.defaultDynamicAPIResponse.HeaderList)).filter(function (ele, i) { return !["PK_ID", "Action", "#"].includes(ele) })];
            const headerKeys = (Object.keys(props.defaultDynamicAPIResponse.HeaderList)).filter(function (ele, i) { return !["PK_ID", "Action", "SrNo"].includes(ele) });;
            let parseDynamicData = [];
            let hasAnyChecked = false;
            $("#tblGrid > tbody > tr").each(function () {
                if ($(this).find('input[type="checkbox"]').is(':checked')) {
                    hasAnyChecked = true;
                }
            });
            props.defaultDynamicAPIResponse.DataList.forEach(function (obj, i) {
                let tempObj = [];
                if (hasAnyChecked) {
                    if ($("#chkb_" + obj.PK_ID).is(":checked")) {
                        for (var i = 0; i < headerKeys.length; i++) {
                            tempObj.push(obj[headerKeys[i]]);
                        }
                        parseDynamicData.push(tempObj);
                    }
                }
                else {
                    for (var i = 0; i < headerKeys.length; i++) {
                        tempObj.push(obj[headerKeys[i]]);
                    }
                    parseDynamicData.push(tempObj);
                }
            });

            await CommonFuncs.exportExcelUsingXlsxUtil(filename, headers, parseDynamicData);
        }
    }


    return (
        <>
            <div className="content-demo">
                <section id="stats-icon-subtitle">
                    <PageHeaderCount
                        CountArray={props.defaultDynamicAPIResponse.CountArray}

                        funcHandelCardTotal={funcHandelRefreshData}
                        funcHandelCardInactive={funcHandelCardInactive}
                        funcHandelCardActive={funcHandelCardActive}
                        funcHandelCardThisMonth={funcHandelCardThisMonth}
                    />
                </section>
                <section className="mt-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">City Data</h5>
                                    <a className="heading-elements-toggle"><i className="la la-ellipsis-v font-medium-3"></i></a>
                                    <div className="heading-elements">
                                        <ul className="list-inline mb-0">
                                            <li>
                                                <span onClick={e => funcHandelRefreshData(e)} className="cursor-card btn btn-light">
                                                    <FontAwesomeIcon icon={faSync} />
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-content collapse show" style={{ 'cursor': 'auto' }}>
                                    <div className="card-body card-dashboard">
                                        <div className="dataTables_wrapper">
                                            <div className="row d-flex">
                                                <div className="col-sm-12 col-md-6">
                                                    <div id="" className="dataTables_filter">
                                                        <fieldset>
                                                            <div className="input-group listSearch">
                                                                <div className="input-group-prepend">
                                                                    <button className="btn btn-light dropdown-toggle right-radius-dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                                                    <ul className="dropdown-menu my-dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                        {funcBindSearchTerms()}
                                                                    </ul>
                                                                </div>
                                                                <input type="text" className="form-control" id="txtSearcBar" onChange={e => onChangeSearchValue(e)} placeholder={SearchByPlaceHolder} aria-label={SearchByPlaceHolder} />
                                                                <div className="input-group-append" onClick={onChangePagingData}>
                                                                    <span className="input-group-text left-radius-dropdown-toggle" >
                                                                        <FontAwesomeIcon icon={faSearch} />
                                                                    </span>

                                                                </div>

                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6 text-right">

                                                    <div className="dataTables_length d-flex grid-header" style={{ justifyContent: 'space-between' }} id="exportdiv">
                                                        {
                                                            <GridShowEntries
                                                                DataList={ShowEntriesDataList}
                                                                onChangePagingData={onChangePagingData}
                                                            />
                                                        }
                                                        <div className="dropdown">
                                                            <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Export <FontAwesomeIcon icon={faCloudDownloadAlt} /></button>
                                                            <ul className="dropdown-menu my-dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <li>
                                                                    <a className="dropdown-item" id="Excel" onClick={funcHandelExcelExport} >
                                                                        <FontAwesomeIcon icon={faFileExcel} />
                                                                        &emsp;
                                                                        Excel
                                                                        </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" id="CSV" onClick={funcHandelCSVExport} >
                                                                        <FontAwesomeIcon icon={faFileCsv} />
                                                                        &emsp;
                                                                        CSV
                                                                        </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" id="PDF" onClick={funcHandelPDFExport}>
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
                                                        onClickHandelEditClick={onClickHandelEditClick}
                                                        onClickHandelDeleteClick={onClickHandelDeleteClick}
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

export default IndexMstCity;
