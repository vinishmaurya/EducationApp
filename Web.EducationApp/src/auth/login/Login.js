import srcLogo from "../../assets/images/full-logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AuthService from "../../services/auth.services";
import reqBody from "../../models/reqBody.Model";
import authenticateUser from "../../models/authenticateUser.model";
import { useCookies } from 'react-cookie'

const pageTitle = "Login With Education System";
const Login = () => {
    const navigate = useNavigate();
    const [Cookie,setCookie] = useCookies(['accessToken', 'refreshToken']);
    //const { deleteCookie, deleteAllCookies } = useCookies();
    const submitLoginForm = async (event) => {
        debugger;
        event.preventDefault();
        
        const formElement = document.querySelector('#loginForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#login-btn');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);
        //Create request body
        authenticateUser.UserName = formDataJSON.UserName;
        authenticateUser.Password = formDataJSON.Password;
        authenticateUser.GrantType = "Password";
        authenticateUser.RefreshToken = "";

        reqBody.body = authenticateUser;
        //console.log(authenticateUser)

        try {
            AuthService.Login(reqBody).then(
                (response) => {
                    btnPointer.innerHTML = 'Login';
                    btnPointer.removeAttribute('disabled');
                    const data = response.data;
                    //console.log(response);
                    if (data) {
                        if (data.Result) {
                            const resData = data.Data;
                            if (!resData.accessToken) {
                                alert('Unable to login. Please try after some time.');
                                return;
                            }
                            //localStorage.clear();
                            //localStorage.setItem('accessToken', resData.accessToken);
                            //localStorage.setItem('refreshToken', resData.refreshTokenInfo.refreshToken);
                            //deleteAllCookies();
                            //deleteCookie('accessToken');
                            //deleteCookie('refreshToken');

                            let token_expires = new Date(resData.expiryDatetime);
                            setCookie('accessToken', resData.accessToken, { path: '/', token_expires });

                            let refreshToken_expires = new Date(resData.refreshTokenInfo.expiryDatetime);
                            setCookie('refreshToken', resData.refreshTokenInfo.refreshToken, { path: '/', refreshToken_expires });

                            //const expireDate = new Date(2147483647 * 1000).toUTCString();


                            setTimeout(() => {
                                navigate('/'
                                    , {
                                        state: 
                                        {
                                            UserName: formDataJSON.UserName
                                            //,Password: formDataJSON.Password
                                        }
                                    });
                            }, 100);
                        }
                        else {
                            alert(data.Message);
                        }
                    }
                    else {
                        alert("Oops! Some error occured.");
                    }
                },
                (error) => {
                    //console.log(error);
                    btnPointer.innerHTML = 'Login';
                    btnPointer.removeAttribute('disabled');
                    alert("Oops! Some error occured.");
                }
            );
        } catch (e) {
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            alert("Oops! Some error occured.");
        }

    }

    return (
        <>
            <section className="">

                <div className="px-4 py-5 px-md-5 text-center text-lg-start" >
                    <div className="container">
                        <div className="row gx-lg-5 align-items-center">
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <div className="text-center">
                                </div>
                                <h5 className="my-5 display-5 fw-bold ls-tight">
                                    The best education app <br />
                                    <span className="text-primary">manage your sytem</span>
                                </h5>
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
                                                <label htmlFor="email" className="form-label">Username:</label>
                                                <input type="text" className="form-control" id="UserName" placeholder="Enter Username" name="UserName"></input>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="pwd" className="form-label">Password:</label>
                                                <input type="password" className="form-control" id="Password" placeholder="Enter password" name="Password"></input>
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
