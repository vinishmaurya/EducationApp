//import { useEffect } from "react";
import CommonFuncs from "../../../util/common.funcs";
require('dotenv').config();
const GridShowEntries = (props) => {

    //console.log(props.DataList);
    function BindOptons() {
        //debugger;
        let itemList = [];
        if (!props.DataList) { return; }
        if (!props.DataList.length > 0) { return; }
        props.DataList.map((data, i) => {
            itemList.push(
                <option key={i} value={data}>{data}</option>
            )
        });

        return itemList;
    }
    function onChangePaging(e) {
        //console.log(e.target.value);
        props.onChangePagingData(process.env.REACT_APP_DefaultCurrentPage, e.target.value);
    }
    return (
        <>
            <div className="mr-2 d-flex" style={{ justifyContent: 'space-evenly', width: '30%' }}>
                <label>Show</label>
                <div style={{ width: '38%' }}>
                    <select
                        className="form-control-sm"
                        onChange={e => onChangePaging(e)}
                        id="eleRowPerPage"
                    >
                        {BindOptons()}
                    </select>
                </div>
                <label>Entries</label>
            </div>
        </>
    )
}
export default GridShowEntries;