import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { doLogout, isLogin } from "../Auth";
import { toast } from "react-toastify";
import logo from '../logoR.png';

const Navbar = () => {
  const chk = isLogin();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(isLogin());
  }, [chk]);

  const navapp = useNavigate();
  const logouthandler = () => {
    doLogout();
    navapp("/");
    toast.success("Logging Out");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  function animation() {
    var tabsNewAnim = $("#navbarSupportedContent");
    var activeItemNewAnim = tabsNewAnim.find(".active");
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
      $("#navbarSupportedContent ul li").removeClass("active");
      $(this).addClass("active");
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        top: itemPosNewAnimTop.top + "px",
        left: itemPosNewAnimLeft.left + "px",
        height: activeWidthNewAnimHeight + "px",
        width: activeWidthNewAnimWidth + "px",
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on("resize", function () {
      setTimeout(function () {
        animation();
      }, 500);
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg ">
      <Link
        className="navbar-brand navbar-logo"
        style={{ marginRight: "210px" }}
        to="/"
      >
        <img src={logo}  className="d-inline-block align-top" alt="" />
        Readr
      </Link>

      <button
        className="navbar-toggler"
        onClick={function () {
          setTimeout(function () {
            animation();
          });
        }}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>

      <div className="collapse navbar-collapse  " id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto ">
          <div className="hori-selector " style={{ marginLeft: "25px" }}>
            <div className="left"></div>
            <div className="right"></div>
          </div>

          <li className="nav-item active" style={{ marginLeft: "20px" }}>
            <Link className="nav-link" to="/" exact>
              <i className="fa-solid fa-house"></i>Home
            </Link>
          </li>

          <li className="nav-item" style={{ marginLeft: "20px" }}>
            <Link className="nav-link" to="/feeds" exact>
              <i className="fa-solid fa-blog"></i>Feeds
            </Link>
          </li>

          
          <li
            className="nav-item"
            id="signup"
            style={{ marginLeft: "100px" }}
          ></li>
          
          <li
            className="nav-item"
            id="signup"
            style={{ marginLeft: "520px" }}
          ></li>
          
          

          <li className="nav-item" style={{ marginLeft: "20px" }}>
            <Link
              className="nav-link"
              to={login ? "/user/dashboard" : "/login"}
              exact
            >
              <i
                className={
                  login
                    ? "fa-solid fa-circle-user fa-xl"
                    : "fa-solid fa-right-to-bracket"
                }
              ></i>
              {login ? "Profile" : "Login"}
            </Link>
          </li>

          <li className="nav-item" style={{ marginLeft: "20px" }}>
            <Link
              className="nav-link"
              to={login ? "/" : "/signup"}
              exact
              onClick={login ? logouthandler : ""}
            >
              <i
                className={
                  login
                    ? "fa-solid fa-arrow-up-right-from-square fa-xl"
                    : "fa-solid fa-user-plus"
                }
              ></i>
              {login ? "Logout" : "Signup"}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
