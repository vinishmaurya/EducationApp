/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Common core componenet for grid role rights
 * --------------------------------------------------------------------------
 */
//import { useEffect } from "react";
import CommonFuncs from "../../../util/common.funcs";
import { React, useState, useEffect } from "react";
import { $ } from 'react-jquery-plugin'

const GridRoleRight = (props) => {
    //debugger;
    // get table column
    const column = Object.keys(props.HeaderList.length > 0 ? props.HeaderList[0] : []);
    const header = Object.values(props.HeaderList.length > 0 ? props.HeaderList[0] : []);
    //console.log(column);
    // get table heading data
    const ThData = () => {
        if (header.length > 0) {
            return header.map((data, i) => {
                let uniqueKey1 = CommonFuncs.funcUniqueKey(7);
                return (
                    <th className="text-center" key={uniqueKey1}>{data}</th>
                );
            });
        }
        else {
            return (
                <>
                    <th className="text-center">All </th>
                    <th className="text-center">View </th>
                    <th className="text-center">Add </th>
                    <th className="text-center">Edit </th>
                    <th className="text-center">Delete </th>
                    <th className="text-center">Export </th>
                </>
            );
        }
    }
    const funcBodyCheckBoxs = (rowId, uniqueKey) => {
        //debugger
        let IsAllChecked = true;
        for (var i in column) {
            if (!props.DataList[rowId][column[i]] && column[i].toLocaleLowerCase() !== "all") { IsAllChecked = false; }
        }
        
        //debugger;
        return column.map((data, i) => {
            let uniqueKey2 = CommonFuncs.funcUniqueKey(uniqueKey + i);
            let uniqueKey3 = CommonFuncs.funcUniqueKey(uniqueKey + i);
           
            return (
                <td align="center" key={uniqueKey2}>
                    <input key={uniqueKey3}
                        type="checkbox"
                        value="false"
                        row-id={rowId}
                        data-type={data}
                        onClick={(e) => { funcClickCheckBox(e) }}
                        defaultChecked={(data.toLocaleLowerCase() === "all" && IsAllChecked ? true : props.DataList[rowId][data])}
                    />
                </td>
            );
        });
    }
    // get table row data
    const tdData = () => {
        let uniqueKey3 = CommonFuncs.funcUniqueKey(3);
        let uniqueKey4 = CommonFuncs.funcUniqueKey(4);

        let colspan = column.length > 0 ? column.length + 1 : 7;
        if (props.DataList.length <= 0) {
            return (
                <>
                    <tr key={uniqueKey3}>
                        <td key={uniqueKey4} colSpan={colspan} className="text-center red">Opps, No Record Found!</td>
                    </tr>
                </>
            )
        }

        return props.DataList.map((data, i) => {
            let uniqueKey5 = CommonFuncs.funcUniqueKey(5);
            let uniqueKey6 = CommonFuncs.funcUniqueKey(6);

            return (
                <tr key={uniqueKey5} valign="middle">

                    <td key={uniqueKey6} className="text-center">{data.FormName}</td>
                    {funcBodyCheckBoxs(i,7+i)}
                </tr>
            )
        })
    }



    function funcClickCheckBox(e) {
        if ($(e.target).attr('data-type').toLowerCase() === 'all') {
            $(e.target).closest('tr').find('input[type="checkbox"]').each(function (obj, i) {
                if ($(e.target).is(':checked')) {
                    $(this).prop('checked', true);
                    props.DataList[$(e.target).attr('row-id')][$(this).attr('data-type')] = true;
                }
                else {
                    $(this).prop('checked', false);
                    props.DataList[$(e.target).attr('row-id')][$(this).attr('data-type')] = false;
                }
            });
        }
        else {
            if ($(e.target).is(':checked')) {
                props.DataList[$(e.target).attr('row-id')][$(e.target).attr('data-type')] = true;
            }
            else {
                props.DataList[$(e.target).attr('row-id')][$(e.target).attr('data-type')] = false;
            }
            let IsAllChecked = true;
            $(e.target).closest('tr').find('input[type="checkbox"]').each(function (obj, i) {
                if (!$(this).is(':checked') && $(this).attr('data-type').toLowerCase() !== 'all') {
                    IsAllChecked = false;
                }
            });
            $(e.target).closest('tr').find('input[type="checkbox"][data-type="All"]').prop('checked', IsAllChecked);
        }
        props.onChangeRoleRights(props.DataList);
        //console.log(props.DataList[$(e.target).attr('row-id')]);
    }

    return (
        <>
            {(() => {
                return (
                    <>
                        <div className="table-responsive mt-4 mb-2 position-relative" style={{ maxHeight: '465px' }}>
                            <table cellSpacing="0" cellPadding="0" border="0" className="table table-bordered table-hover table-striped" width="100%" style={{ cursor: 'auto' }} id="tblGridRoleRights">
                                <thead className="bg-light sticky-top top-0">
                                    <tr>
                                        <th rowSpan="2" className="text-center">Forms</th>
                                        <th colSpan="6" className="text-center">Rights</th>
                                    </tr>
                                    <tr>
                                        {ThData()}
                                    </tr>
                                </thead>

                                <tbody id="tableBody">
                                    {tdData()}
                                </tbody>


                            </table>
                        </div>

                    </>
                );
            })()}
        </>
    )
}
export default GridRoleRight;