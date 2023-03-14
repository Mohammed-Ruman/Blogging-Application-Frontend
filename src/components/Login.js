import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin } from "../Auth";
import login from "../login.jpg";
import { logIn } from "../service/user-service";

export default function Login() {
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (event, props) => {
    setLoginDetail({
      ...loginDetail,
      [props]: event.target.value,
    });
  };

  const navapp1 = useNavigate();

  const loginHandle = () => {
    // console.log(loginDetail);
    if (
      loginDetail.username.trim().length === 0 ||
      loginDetail.password.trim().length === 0
    ) {
      toast.error("Email or Password can't be blank");
      setLoginDetail({
        username: "",
        password: "",
      });
      return;
    }

    logIn(loginDetail)
      .then((resp) => {
        
        doLogin(resp);
        navapp1("/user/dashboard");
        toast.success("Login Success! Welcome " + resp.user.name);
        setLoginDetail({
          username: "",
          password: "",
        });
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message + ": Invalid email or password"
          );
        } else {
          toast.error("Something went wrong on server side!!");
        }
      });
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black"
                style={{ borderRadius: "25px", border: "0px solid white" }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div
                      className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                      style={{ marginTop: "150px" }}
                    >
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              placeholder="Enter here"
                              value={loginDetail.username}
                              onChange={(e) => changeHandler(e, "username")}
                            />
                            <label className="form-label" htmlFor="email">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="pass"
                              className="form-control"
                              placeholder="Enter here"
                              value={loginDetail.password}
                              onChange={(e) => changeHandler(e, "password")}
                            />
                            <label className="form-label" htmlFor="pass">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={loginHandle}
                          >
                            Login
                          </button>
                        </div>
                        <div className="text-center">
                        <Link to="/signup" className="text-decoration-none" style={{color:'black'}}>Create new account  <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src={login} className="img-fluid" alt="Sample" />
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
}
