import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

const pageTitle = "Login With Education System";
const Login = () => {

    //const loginAPI = 'https://tararoutray.com/demo/react-auth/login.php';
    const navigate = useNavigate();

    const submitLoginForm = (event) => {
        event.preventDefault();
        const formElement = document.querySelector('#loginForm');
        //const formData = new FormData(formElement);
        //const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#login-btn');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);
        // axios.post(loginAPI, formDataJSON).then((response) => {
        //     btnPointer.innerHTML = 'Login';
        //     btnPointer.removeAttribute('disabled');
        //     const data = response.data;
        //     const token = data.token;
        //     if (!token) {
        //         alert('Unable to login. Please try after some time.');
        //         return;
        //     }
        //     localStorage.clear();
        //     localStorage.setItem('user-token', token);
        //     setTimeout(() => {
        //         navigate('/');
        //     }, 500);

        // }).catch((error) => {
        //     btnPointer.innerHTML = 'Login';
        //     btnPointer.removeAttribute('disabled');
        //     alert("Oops! Some error occured.");
        // });
        btnPointer.innerHTML = 'Sign In';
        btnPointer.removeAttribute('disabled');
        localStorage.clear();
        localStorage.setItem('user-token', "token");
        setTimeout(() => {
            navigate('/');
        }, 500);

    }

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

                                        <form onSubmit={submitLoginForm} id="loginForm">
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
                                            <button type="submit" className="btn btn-primary" id="login-btn">Sign In</button>
                                            
                                            
                                        </form>

                                       
                                        <div className="text-center ls-tight">
                                            {<NavLink to="/auth/forget-password">Forgot Password</NavLink>}
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
                                            {<NavLink to="/auth/register">New around here? Sign up</NavLink>}
                                        </div>
                                        <div className="text-center ls-tight">
                                            <p>By continuing, you agree to our <a className="ls-tight">Terms of Service</a> and <a className="ls-tight">Privacy Policy</a></p>

                                        </div>

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
