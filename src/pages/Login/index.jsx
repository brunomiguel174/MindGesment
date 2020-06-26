import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import api from "../../services/api";

import { loginUserAction, detailsUserAction } from "../../store/user/actions";

import validation from "./validation";

import Banner from "../../components/Banner";
import Input from "../../components/Input";

import "./styles.css";

function Login({ loginUser, detailsUser }) {
  let history = useHistory();
  const { register, handleSubmit, errors, setValue, clearError } = useForm();
  const [bannerMessage, setBannerMessage] = useState("");

  useEffect(() => {
    register({ name: "username" }, validation.username);
    register({ name: "password" }, validation.password);
  }, [register]);

  async function onSubmit(data) {
    const { username, password } = data;
    try {
      await api.post("/login", { username, password }).then(response => {
        const token = response.data.token || "";
        if (token) {
          localStorage.setItem("userToken", token);
          api.get("/user").then(response => {
            detailsUser(response.data);
            loginUser();
            history.push("/");
          });
        }
      });
    } catch (error) {
      setBannerMessage("Some have faill on register!");
    }
  }

  return (
    <>
      <main>
        <Banner
          bannerMessage={bannerMessage}
          setBannerMessage={setBannerMessage}
        />
        <div className="login-container">
          <section>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="text"
                placeholder="Username 👤"
                title="Username"
                className="UserName"
                onChange={text => setValue("username", text.target.value)}
                error={errors?.username}
                errorMessage={errors?.username?.message}
                onFocus={() => clearError("username")}
              />

              <Input
                type="password"
                placeholder="Password 🔒"
                title="Password"
                className="Password"
                id={"Password"}
                onChange={text => setValue("password", text.target.value)}
                error={errors?.password}
                errorMessage={errors?.password?.message}
                onFocus={() => clearError("password")}
              />

              <button type="submit" className="button">
                Login
              </button>
            </form>
            <div className="login-button-link">
              <Link to="/register" className="back-link">
                Create Account
              </Link>
              <Link to="/forgot-password" className="back-link">
                Forgot Password
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
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

export default connect(undefined, mapDispatchToProps)(Login);
