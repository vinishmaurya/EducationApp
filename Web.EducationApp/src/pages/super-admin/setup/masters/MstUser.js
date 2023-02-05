const MstUser = () => {
    return (
        <>
            <div className="card card-demo">
                <div className="card-body">
                    <h3 className="card-title">Using dropdowns</h3>
                    <div className="content-demo">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" id="pillsUserDetails" data-toggle="pill" aria-current="UserDetails" href="#UserDetails" aria-selected="true">User Details</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pillsAdditionalInfo" data-toggle="pill" aria-current="AdditionalInfo" href="#AdditionalInfo" aria-selected="false">Additional Info</a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="UserDetails" role="tabpanel" aria-labelledby="pillsUserDetails">
                                <br/>
                                <form action="/action_page.php">
                                    <div class="container">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="exampleInputEmail1">Email address</label>
                                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                                </div>
                                            </div>

                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-3">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="tab-pane" id="AdditionalInfo" role="tabpanel" aria-labelledby="pillsAdditionalInfo">
                                <form action="/action_page.php">
                                    <div className="mb-3">
                                        <label htmlFor="pwd" className="form-label">Password:</label>
                                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd"></input>
                                    </div>
                                    <div className="form-check mb-3">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" name="remember"></input> Remember me
            </label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MstUser;
