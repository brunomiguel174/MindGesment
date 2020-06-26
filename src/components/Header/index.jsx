import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FiMenu, FiX, FiLogIn } from "react-icons/fi";
import { connect } from "react-redux";

import logo from "../../assets/images/MindGesmantLogo.png";

import "./style.css";

import {
  logoutUserAction,
  loginUserAction,
  detailsUserAction
} from "../../store/user/actions";

// O Header permite a navegação do site
//  e apresentação do Logotipo

function Header({ detailsUser, loginUser, logoutUser, isLogged, name }) {
  let history = useHistory();

  function handleLogout() {
    logoutUser();
    localStorage.removeItem("userToken");
  }

  function openSlideMenu() {
    document.getElementsByClassName("side-nav")[0].style.width = "200px";
  }

  function closeSlideMenu() {
    document.getElementsByClassName("side-nav")[0].style.width = "0";
  }

  function redirectHomePage() {
    history.push("/");
  }

  return (
    <>
      <header>
        <img src={logo} alt="Logo MindGesmant" onClick={redirectHomePage} />
        <h1>MindGesment</h1>

        {isLogged ? (
          <NavLink to="/welcome" onClick={handleLogout}>
            Logout
          </NavLink>
        ) : (
            <NavLink to="/login">
              {" "}
              <FiLogIn fontSize={10} /> Login{" "}
            </NavLink>
          )}
      </header>

      <nav className="navbar">
        <span className="open-slide">
          <NavLink to="#" className="slide-menu" onClick={openSlideMenu}>
            <FiMenu size={16} color="black" />
          </NavLink>
        </span>
        <ul className="navbar-nav">
          <li>
            {" "}
            <NavLink to="/" activeClassName="choosen-nav" exact>
              Home
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/wallet" activeClassName="choosen-nav">
              Wallet
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/wish" activeClassName="choosen-nav">
              Wishs
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            {isLogged ? (
              <NavLink to="/profile" activeClassName="choosen-nav">
                {name}
              </NavLink>
            ) : null}
          </li>
        </ul>
      </nav>

      <div className="side-nav">
        <NavLink to="#" className="btn-close" onClick={closeSlideMenu}>
          {" "}
          <FiX color="#1D7688" />{" "}
        </NavLink>
        <NavLink to="/" activeClassName="choosen" exact>
          Home
        </NavLink>
        <NavLink to="/wallet" activeClassName="choosen">
          Wallet
        </NavLink>
        <NavLink to="/wish" activeClassName="choosen">
          Wishs
        </NavLink>
        {isLogged ? (
          <NavLink to="/profile" activeClassName="choosen">
            {name}
          </NavLink>
        ) : null}
        {isLogged ? (
          <NavLink to="/welcome" onClick={handleLogout}>
            {" "}
            Logout{" "}
          </NavLink>
        ) : (
            <NavLink to="/login"> Login </NavLink>
          )}
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
  name: state.user.details.username
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUserAction()),
  loginUser: () => dispatch(loginUserAction()),
  detailsUser: (coin, earnings, email, expenses, id, monthlyPeriod, username) =>
    dispatch(
      detailsUserAction(
        coin,
        earnings,
        email,
        expenses,
        id,
        monthlyPeriod,
        username
      )
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
