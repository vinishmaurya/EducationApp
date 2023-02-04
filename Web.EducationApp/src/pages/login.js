import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { colorBrewer } from "react-syntax-highlighter/dist/esm/styles/hljs";

const pageTitle = "Login With Education System";
const Login = () => {
    return (
        <>
            <section className="">
               
  <div className="px-4 py-5 px-md-5 text-center text-lg-start" >
                    <div className="container">
                        <div className="row gx-lg-5 align-items-center">
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <h1 className="my-5 display-3 fw-bold ls-tight">
                                    The best education app <br />
                                    <span className="text-primary">manage your sytem</span>
                                </h1>
                                <p >
                                    The best education app for simplify processes and
                                    intelligently manage your school, institute or coaching centre and manage every need of your school on a single platform
          </p>
                            </div>

                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <div className="card">
                                    <div className="card-body py-5 px-md-5">


                                        <h3 className="card-title">{pageTitle}</h3>

                                        <form action="/action_page.php">
                                            <div className="mb-3 mt-3">
                                                <label htmlFor="email" className="form-label">Email:</label>
                                                <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"></input>
                                            </div>
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
                                            <div className="text-left ls-tight">
                                                <a className="ls-tight">Forgot Password</a>
                                            </div>
                                            <div className="text-center">
                                                <p>or sign in with:</p>
                                                <button type="button" className="btn btn-link">
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                </button>

                                                <button type="button" className="btn btn-link">
                                                    <FontAwesomeIcon icon={faGoogle} />
                                                </button>
                                            </div>
                                            <div className="text-center ls-tight">
                                                <a className="ls-tight">Request for new registration.</a>
                                            </div>
                                            <div className="text-center ls-tight">
                                                <p>By continuing, you agree to our <a className="ls-tight">Terms of Service</a> and <a className="ls-tight">Privacy Policy</a></p>
                                                
                                            </div>
                                            
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
</section>
        </>

    );
};

export default Login;
