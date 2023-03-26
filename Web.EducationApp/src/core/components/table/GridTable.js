/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Common core componenet for grid
 * --------------------------------------------------------------------------
 */
//import { useEffect } from "react";
import CommonFuncs from "../../../util/common.funcs";
//import Spinner from 'react-bootstrap/Spinner';
import { React, useEffect } from "react";
//import { prop } from "cheerio/lib/api/attributes";
import { $ } from 'react-jquery-plugin'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faXbox } from "@fortawesome/free-brands-svg-icons";

const GridTable = (props) => {
    //const [HaveData, setHaveData] = useState(false);
    useEffect(() => {
        //setHaveData(false);
    }, []);
    //console.log(props.DataList);
    // get table column
    const column = Object.keys(props.HeaderList);
    const header = Object.values(props.HeaderList);
    //console.log(column);
    // get table heading data
    const ThData = () => {
        return header.map((data, i) => {
            //console.log(data);
            let uniqueKey = CommonFuncs.funcUniqueKey(1);
            let uniqueKey1 = CommonFuncs.funcUniqueKey(2);
            let uniqueKey2 = CommonFuncs.funcUniqueKey(3);
            let uniqueKey5 = CommonFuncs.funcUniqueKey(15);
            if (i === 0) {
                return (
                    <th key={uniqueKey} className="text-center">
                        <input key={uniqueKey1} id="checkAll_Id" name="checkAll_Id" type="checkbox" value="true" onClick={(e) => { funcCheckBox(e) }} />
                        <input key={uniqueKey2} name="checkAll_Id" type="hidden" value="false" />
                    </th>
                );
            }
            else {
                return <th className="text-center" key={uniqueKey5}>{header[i]}</th>
            }
        });
    }
    // get table row data
    const tdData = () => {
        let uniqueKey3 = CommonFuncs.funcUniqueKey(4);
        let uniqueKey4 = CommonFuncs.funcUniqueKey(5);
        let uniqueKey5 = CommonFuncs.funcUniqueKey(6);
        let uniqueKey6 = CommonFuncs.funcUniqueKey(7);
        let uniqueKey7 = CommonFuncs.funcUniqueKey(8);
        let uniqueKey10 = CommonFuncs.funcUniqueKey(11);
        let uniqueKey13 = CommonFuncs.funcUniqueKey(14);

        if (props.DataList.length <= 0) {
            return (
                <>
                    <tr key={uniqueKey3}>
                        <td key={uniqueKey13} colSpan={column.length} className="text-center red">Opps, No Record Found!</td>
                    </tr>
                </>
            )
        }

        return props.DataList.map((data, i) => {
            uniqueKey3 = CommonFuncs.funcUniqueKey(3);

            return (
                <tr key={uniqueKey3}>
                    {
                        column.map((v, j) => {
                            uniqueKey4 = CommonFuncs.funcUniqueKey(4);
                            uniqueKey5 = CommonFuncs.funcUniqueKey(5);
                            uniqueKey6 = CommonFuncs.funcUniqueKey(6);
                            uniqueKey7 = CommonFuncs.funcUniqueKey(7);
                            uniqueKey10 = CommonFuncs.funcUniqueKey(10);
                            uniqueKey13 = CommonFuncs.funcUniqueKey(13);
                            //uniqueKey1 = randomNumber(1, 100000);
                            if (j === 0) {
                                //console.log(data[v]);
                                return (
                                    <td key={uniqueKey4} className="text-center">
                                        <input key={uniqueKey5} type="checkbox" className="row-checkbox" value={data[v]} id={"chkb_" + data[v]} />
                                    </td>
                                );
                            }
                            else if (j === column.length - 1) {
                                return (
                                    <td key={uniqueKey6} className="text-center text-nowrap">
                                        <a key={uniqueKey7}
                                            className="btn btn-icon btn-primary btn-sm"
                                            style={{ marginRight: "1px" }}
                                            href="/"
                                            onClick={(e) => { e.preventDefault(); props.onClickHandelEditClick(e) }}
                                            row-index={i}
                                            row-data={CommonFuncs.encryptCryptoJSAES(data['PK_ID'])}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </a>
                                        <a key={uniqueKey10}
                                            className="btn btn-icon btn-danger btn-sm"
                                            href="/"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                $("#myConfirmModal").modal("show");
                                                $("#btnModelConfirmClose").attr('row-data', CommonFuncs.encryptCryptoJSAES(data['PK_ID']));
                                            }}
                                            row-index={i}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </a>

                                    </td>
                                );
                            }
                            else {
                                if (v === "Status" && data[v].toUpperCase() === 'ACTIVE') {
                                    return <td key={uniqueKey13} align="center" className="success text-success">{data[v]}</td>
                                }
                                else if (v === "Status" && data[v].toUpperCase() === 'INACTIVE') {
                                    return <td key={uniqueKey13} align="center" className="danger text-danger">{data[v]}</td>
                                }
                                else {
                                    return <td key={uniqueKey13} className="text-center">{data[v]}</td>
                                }
                            }
                        })
                    }
                </tr>
            )
        })
    }


    function funcCheckBox(e) {
        $(e.target).closest('table').find('tbody > tr').each(function (obj, i) {
            if ($(e.target).is(':checked')) {
                $(this).find('input[type="checkbox"]').attr("checked", "checked");
            }
            else {
                $(this).find('input[type="checkbox"]').removeAttr("checked");
            }
        });
    }

    function bindConfirmModel() {
        return (
            <>
                <div className="modal fade" id="myConfirmModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="icon-box">
                                    <span className="material-icons">&#9587;</span>
                                </div>
                                <h4 className="modal-title">Are you sure?</h4>
                                <p>Do you really want to delete these records? This process cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" id="btnModelConfirmClose" onClick={(e) => { props.onClickHandelDeleteClick(e); $("#myConfirmModal").modal("hide") }}>Delete</button>
                                <button type="button" className="btn btn-light" data-dismiss="modal" onClick={() => { $("#myConfirmModal").modal("hide") }} >Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {(() => {

               
                return (
                    <>
                        {
                            //!HaveData && (
                            //    <>
                            //        <div className="alert alert-warning" role="alert">
                            //            <Spinner animation="grow" className="load-component-spinner" />
                            //            <span>  Please wait while loading data...</span>
                            //        </div>
                            //    </>
                            //)
                        }

                        <div>
                            <div className="table-responsive mt-4 mb-2 position-relative" style={{ maxHeight: '465px' }}>
                                <table cellSpacing="0" cellPadding="0" border="0" className="table table-bordered table-hover table-striped" width="100%" style={{ cursor: 'auto' }} id="tblGrid">
                                    <thead className="bg-light sticky-top top-0">
                                        <tr>{ThData()}</tr>
                                    </thead>
                                    <tbody>
                                        {tdData()}
                                    </tbody>
                                </table>
                            </div>
                            {bindConfirmModel()}
                        </div>
                    </>
                );
            })()}
        </>
    )
}
export default GridTable;