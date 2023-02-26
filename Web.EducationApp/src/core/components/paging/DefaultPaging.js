//import { useEffect } from "react";
import CommonFuncs from "../../../util/common.funcs";
require('dotenv').config();

const DefaultPaging = (props) => {
    //debugger;
    let currentPage = Number(props.CurrentPage);
    let MaxPageSize = Number(process.env.REACT_APP_DefaultMaxPageSize);
    let StartNo = Math.floor((currentPage % MaxPageSize == 0) ? (currentPage / MaxPageSize - 1) * MaxPageSize + 1 : (currentPage / MaxPageSize) * MaxPageSize);
    let next = StartNo + MaxPageSize;
    let nextPage = Number(props.CurrentPage) + 1;
    let previous = currentPage - 1;
    let totalPage = Number(props.TotalPage);


    function onClickPaging(e) {
        let pageTarget = e.target.getAttribute('page-target');
        props.onChangePagingData(pageTarget);
    }
    function funcBindPreviousData() {
        if (currentPage > previous) {
            if (previous != 0) {
                return (
                    <>
                        <li className="page-item">
                            <a className="page-link" href={void (0)} aria-label="Previous" page-target={previous} onClick={e => onClickPaging(e)}>
                                {"<<"}
                            </a>
                        </li>
                    </>
                )
            }
            else {
                return (
                    <>
                        <li className="page-item disabled">
                            <a className="page-link" href={void (0)} aria-label="Previous">
                                {"<<"}
                            </a>
                        </li>
                    </>
                )
            }
        }
        else {
            return
            (
                <>
                    <li className="page-item">
                        <a className="page-link disabled" href={void (0)} aria-label="Previous">
                            {"<<"}
                        </a>
                    </li>
                </>
            )
        }
    }
    function funcBindNextData() {
        if (nextPage <= totalPage) {
            return (
                <>
                    <li className="page-item">
                        <a className="page-link" href={void (0)} aria-label="Next" page-target={nextPage} onClick={e => onClickPaging(e)}>
                            {">>"}
                        </a>
                    </li>
                </>
            )
        }
        else {
            return (
                <>
                    <li className="page-item disabled">
                        <a className="page-link" href={void (0)} aria-label="Next">
                            {">>"}
                        </a>
                    </li>
                </>
            )
        }
    }
    function funcBindPagesData() {
        let itemList = [];
        if (StartNo < 0) {
            StartNo = 0;
        }

        for (let i = StartNo; i < next; i++) {
            let uniqueKey = CommonFuncs.funcUniqueKey(i);
            let uniqueKey1 = CommonFuncs.funcUniqueKey(next + 1);
            //console.log(i);
            if (i <= totalPage) {
                if (i == currentPage) {
                    itemList.push(
                        <li key={uniqueKey} className="page-item active">
                            <a key={uniqueKey1} className="page-link" href={void (0)} page-target={i} onClick={e => onClickPaging(e)}>
                                {i}
                            </a>
                        </li>
                    )
                }
                else {
                    itemList.push(
                        <li key={uniqueKey} className="page-item">
                            <a key={uniqueKey1} className="page-link" href={void (0)} page-target={i} onClick={e => onClickPaging(e)}>
                                {i}
                            </a>
                        </li>
                    )
                }
            }
        }

        return itemList;
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-9">
                    <div className="dataTables_info" id="" style={{ marginTop: "5px" }} role="status" aria-live="polite">
                        Page {props.TotalPage > 0 ? props.CurrentPage : 0} of {props.TotalPage} ( {props.TotalItem} Records ) </div>
                </div>
                <div className="col-sm-12 col-md-3">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {funcBindPreviousData()}
                            {funcBindPagesData()}
                            {funcBindNextData()}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default DefaultPaging;