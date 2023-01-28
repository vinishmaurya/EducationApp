import logo from './logo.svg';
import './App.css';
import * as Icons from "react-bootstrap-icons"
function App() {
    return (
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>

        //     <a className="btn btn-primary"
        //          data-bs-toggle="collapse"
        //          href="#collapseExample"
        //          role="button"
        //          aria-expanded="false"
        //          aria-controls="collapseExample">
        //     Bootstrap button
        //     </a>

        //   </header>
        // </div>
        <div>
            <nav class="navbar bg-light fixed-top">
                <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="#">Offcanvas navbar</a>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <form class="d-flex mt-3" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr class="dropdown-divider"></hr>
                                        </li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </nav>
            <div class="page-heading">
                <div class="col-md-12 col-12 mb-12">
                    <div class="content-header row">
                        <div class="content-header-left col-md-6 col-12 mb-2">
                            <h3 class="content-header-title">Page</h3>
                            <div class="row breadcrumbs-top">
                                <div class="breadcrumb-wrapper col-12">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Home</a> </li>
                                        <li class="breadcrumb-item active">Page</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="content-body">



                        <section id="stats-icon-subtitle">
                            <div class="row match-height">



                            </div>

                        </section>


                        <section id="">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">Index</h4>
                                            <a class="heading-elements-toggle">
                                                <i class="la la-ellipsis-v font-medium-3"></i>
                                                </a>
                                            <div class="heading-elements">
                                                <ul class="list-inline mb-0">

                                                    <li><a data-action="reload">
                                                        {/* <i class="ft-rotate-cw">
                                                        </i> */}
                                                        <Icons.ArrowClockwise class="my-icons"></Icons.ArrowClockwise>
                                                        </a></li>
                                                    <li><a data-action="expand">
                                                        {/* <i class="ft-maximize"></i> */}
                                                        <Icons.Fullscreen class="my-icons"></Icons.Fullscreen>
                                                        </a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div class="card-content collapse show" >
                                            <div class="card-body card-dashboard">
                                                <div class="dataTables_wrapper">
                                                    <div class="row">
                                                        <div class="col-sm-12 col-md-6">
                                                            <div id="" class="dataTables_filter">
                                                                <fieldset>
                                                                    <div class="input-group listSearch">
                                                                        <div class="input-group-prepend">
                                                                            <button id="SearchCreteria" type="button" val="All" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                                            <div class="dropdown-menu" id="tableMenu">
                                                                                <a class="dropdown-item" href="javascript:void(0)" val="All" onclick="paging(1,this)" >All</a>



                                                                                <a class="dropdown-item" href="javascript:void(0)" val="Today" onclick="paging(1,this)">Today</a>
                                                                                <a class="dropdown-item" href="javascript:void(0)" val="Last1Week" onclick="paging(1,this)">Last 1 Week</a>
                                                                                <a class="dropdown-item" href="javascript:void(0)" val="Last1Month" onclick="paging(1,this)">Last 1 Month</a>
                                                                                <a class="dropdown-item" href="javascript:void(0)" myattr="CustomDate" val="CustomDate" onclick="paging(1,this)">Custom Date</a>

                                                                            </div>
                                                                        </div>
                                                                        <input type="text" class="form-control" id="SearchValue" placeholder="All" aria-label="Amount (to the nearest dollar)"></input>
                                                                        <input type="text" class="form-control" id="FromToDate" name="FromToDate" ></input>
                                                                        <div class="input-group-append" >
                                                                            <span class="input-group-text">
                                                                                {/* <span class="la la-calendar">
                                                                                </span> */}
                                                                                <Icons.Calendar class="my-icons" />
                                                                            </span>
                                                                        </div>

                                                                        <div class="input-group-append"> <span class="input-group-text" onclick="paging(1)"><i class="ficon ft-search" ></i></span> </div>
                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12 col-md-6 text-right">

                                                        </div>
                                                    </div>

                                                    <div id="msgDiv">

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
