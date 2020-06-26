import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import {
  loginUserAction,
  detailsUserAction,
  showLoader,
  hideLoader,
  userNotLogged
} from "../store/user/actions";

import api from "../services/api";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import ChangeEmail from "../pages/ChangeEmail";
import Wallet from "../pages/Wallet";
import Wish from "../pages/Wish";
import Profile from "../pages/Profile";
import Welcome from "../pages/Welcome";

import "../styles/global.css";

import Header from "../components/Header";
import Loading from "../components/Loading";

const token = localStorage.getItem("userToken");
function Routes({
  loginUser,
  detailsUser,
  showLoading,
  hideLoading,
  isLogged,
  isLoaded,
  userNotLogged
}) {

  useEffect(() => {
    if (!isLogged) {
      updateReducerUser();

      async function updateReducerUser() {
        if (token) {
          try {
            showLoading();
            await api.get("user").then(response => {
              detailsUser(response.data);
              loginUser();
            });
            hideLoading();
          } catch (err) {
            userNotLogged();
            hideLoading();
          }
        } else {
          userNotLogged();
        }
      }
    }
  }, [isLogged]);

  if (isLoaded) {
    return (
      <BrowserRouter>
        <Header />
        <Loading />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/wallet" component={Wallet} />
          <Route path="/wish" component={Wish} />
          <Route path="/profile" component={Profile} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register}>
            {isLogged ? <Redirect to="/" /> : null}
          </Route>
          <Route path="/forgot-password" component={ForgotPassword}>
            {isLogged ? <Redirect to="/" /> : null}
          </Route>
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/change-email" component={ChangeEmail} />
        </Switch>
      </BrowserRouter>
    );
  }
  return null;
}

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
  isLoaded: state.user.isLoaded
});
const mapDispatchToProps = dispatch => ({
  showLoading: () => dispatch(showLoader()),
  hideLoading: () => dispatch(hideLoader()),
  loginUser: () => dispatch(loginUserAction()),
  userNotLogged: () => dispatch(userNotLogged()),
  detailsUser: (
    coin,
    earnings,
    email,
    expenses,
    id,
    monthlyPeriod,
    username,
    admin
  ) =>
    dispatch(
      detailsUserAction(
        coin,
        earnings,
        email,
        expenses,
        id,
        monthlyPeriod,
        username,
        admin
      )
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
