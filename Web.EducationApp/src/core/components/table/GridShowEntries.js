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
            <div className="mr-2 d-flex">
                <label className="rowPageLabel">Show</label>
                <div>
                    <select
                        className="form-control"
                        onChange={e => onChangePaging(e)}
                        id="eleRowPerPage"
                    >
                        {BindOptons()}
                    </select>
                </div>
                <label className="rowPageLabel">Entries</label>
            </div>
        </>
    )
}
export default GridShowEntries;