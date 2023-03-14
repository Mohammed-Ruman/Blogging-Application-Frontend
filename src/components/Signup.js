import React from "react";
import { useState } from "react";
import { signUp } from "../service/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navapp2 = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [err, setError] = useState({
    errors: {},
    isError: false,
  });

  const changeHandler = (event, props) => {
    setData({ ...data, [props]: event.target.value });
  };

  const submitform = (e) => {

    let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    if(!data.password.match(regularExpression)){
      toast.error("Password must contain 8 character including One uppercase,One lowercase and One Special character");
      return;
    }

    // console.log(data);
    signUp(data)
      .then((resp) => {
        // console.log(resp);
        toast.success("User Registered!");
        setTimeout(() => {
          navapp2("/login");
        }, 2000);
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        setError({
          errors: error,
          isError: true,
        });
        toast.error("Invalid fields");
        // console.log(error);
      });
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#F5F5F5"}}>
        <div className="container  h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black"
                style={{ borderRadius: "25px", border: "0px solid white" }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              className={`form-control ${
                                data.name.length >= 4 ? "is-valid" : ""
                              }`}
                              placeholder="Enter your name"
                              onChange={(e) => changeHandler(e, "name")}
                              value={data.name}
                            />
                            <label className="form-label" for="name">
                              <small style={{ color: "red" }}>
                                {" "}
                                {err.errors?.response?.data?.name}{" "}
                              </small>
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              placeholder="Enter valid email"
                              onChange={(e) => changeHandler(e, "email")}
                              value={data.email}
                            />
                            <label className="form-label" for="email">
                              <small style={{ color: "red" }}>
                                {" "}
                                {err.errors?.response?.data?.email}{" "}
                              </small>
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="pass"
                              className={`form-control ${
                                data.password.length > 4 &&
                                data.password.length < 15
                                  ? "is-valid"
                                  : ""
                              }`}
                              placeholder="Enter password"
                              onChange={(e) => changeHandler(e, "password")}
                              value={data.password}
                            />
                            <label className="form-label" for="pass">
                              <small style={{ color: "red" }}>
                                {" "}
                                {err.errors?.response?.data?.password}{" "}
                              </small>
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-solid fa-feather-pointed fa-lg me-3 fa-fw"></i>

                          <div className="form-outline flex-fill mb-0">
                            <textarea
                              rows="3"
                              id="about"
                              className={`form-control ${
                                data.about.length > 10 ? "is-valid" : ""
                              }`}
                              placeholder="Tell about yourself"
                              onChange={(e) => changeHandler(e, "about")}
                              value={data.about}
                            />
                            <label className="form-label" for="about">
                              <small style={{ color: "red" }}>
                                {" "}
                                {err.errors?.response?.data?.about}{" "}
                              </small>
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                            checked
                          />
                          <label
                            className="form-check-label"
                            for="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 ">
                          <button
                            type="button"
                            id="submitbtn"
                            className="btn btn-primary btn-lg"
                            onClick={submitform}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
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
