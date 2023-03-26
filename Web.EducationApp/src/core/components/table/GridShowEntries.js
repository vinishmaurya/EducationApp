/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Grid sow Entries
 * --------------------------------------------------------------------------
 */
require('dotenv').config();
const GridShowEntries = (props) => {

    //console.log(props.DataList);
    function BindOptons() {
        //debugger;
        if (!props.DataList) { return; }
        if (!props.DataList.length > 0) { return; }
        return props.DataList.map((data, i) => {
            return (
                <option key={i} value={data}>{data}</option>
            );
        });

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