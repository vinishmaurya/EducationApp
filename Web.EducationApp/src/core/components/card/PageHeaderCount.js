/**
 * --------------------------------------------------------------------------
 * By: Vinish
 * Datetime: 2023-03-11 01:01:53.570
 * Page Header Count
 * --------------------------------------------------------------------------
 */
const PageHeaderCount = (props) => {
    return (
        <>
            <div className="row match-height">
                <div className="col-xl-3 col-md-6">
                    <div className="card overflow-hidden card-content-custom" >
                        <div className="card-content cursor-card " id="total" onClick={e => props.funcHandelCardTotal(e)} >
                            <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                <div className="media-left p-1 media-middle btn-primary" style={{ "backgroundColor": "#0099e5" }}>
                                </div>
                                <div className="media-body p-2">
                                    <h4>Total </h4>
                                </div>
                                <div className="media-right p-2 media-middle">
                                    <h2 className="info font-weight-bold" id="totalValue">{props.CountArray.TotalItem}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card overflow-hidden card-content-custom" >
                        <div className="card-content cursor-card" id="active" onClick={e => props.funcHandelCardActive(e)}>
                            <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                <div className="media-left p-1 media-middle btn-primary" style={{ "backgroundColor": "#3ecf8e" }}>
                                </div>
                                <div className="media-body p-2">
                                    <h4>Active</h4>
                                </div>
                                <div className="media-right p-2 media-middle">
                                    <h2 className="success font-weight-bold" id="totalActiveValue">{props.CountArray.TotalActive}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card overflow-hidden card-content-custom">
                        <div className="card-content cursor-card" id="inactive" onClick={e => props.funcHandelCardInactive(e)}>
                            <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                <div className="media-left p-1 media-middle btn-primary" style={{ "backgroundColor": "#ff6886" }}>
                                </div>
                                <div className="media-body p-2">
                                    <h4>Inactive</h4>
                                </div>
                                <div className="media-right p-2 media-middle">
                                    <h2 className="danger font-weight-bold" id="totalTotalInactiveValue">{props.CountArray.TotalInActive}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card overflow-hidden card-content-custom" >
                        <div className="card-content cursor-card" id="this_month" onClick={e => props.funcHandelCardThisMonth(e)}>
                            <div style={{ justifyContent: 'space-between' }} className="media align-items-stretch d-flex">
                                <div className="media-left p-1 media-middle btn-primary" style={{ "backgroundColor": "#0099e5" }}>
                                </div>
                                <div className="media-body p-2">
                                    <h4>This Month</h4>
                                </div>
                                <div className="media-right p-2 media-middle">
                                    <h2 className="warning font-weight-bold" id="totalThisMonthValue">{props.CountArray.TotalCurrentMonth}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
export default PageHeaderCount;