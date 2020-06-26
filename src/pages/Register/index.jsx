import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import api from "../../services/api";

import validation from "../../utils/validUser";

import Banner from "../../components/Banner";
import Select from "../../components/Select";
import Input from "../../components/Input";

import "./styles.css";

export default function Register() {
  const { register, handleSubmit, errors, setValue, clearError } = useForm();
  const [bannerMessage, setBannerMessage] = useState("");
  const history = useHistory();

  const [fetchCoin, setFetchCoin] = useState([""]);

  //Quando o componente montar vamos capturar o tipo de moedas existentes
  useEffect(() => {
    fetchCoin();
    async function fetchCoin() {
      const response = await api.get("/constants/coins");
      setFetchCoin(response.data);
    }
  }, []);

  //Atualizar o estado do formulário 
  useEffect(() => {
    register({ name: "username" }, validation.username);
    register({ name: "email" }, validation.email);
    register({ name: "password" }, validation.password);
    register({ name: "repeatPassword" }, validation.repeatPassword);
    register({ name: "earnings" }, validation.earnings);
    register({ name: "expenses" }, validation.expenses);
    register({ name: "coin" }, validation.coin);
  }, [register]);

  async function onSubmit(data) {
    const {
      username,
      email,
      password,
      repeatPassword,
      earnings,
      expenses,
      coin
    } = data;
    if (password === repeatPassword) {
      try {
        const response = await api.post("user/register", {
          username,
          email,
          password,
          earnings,
          expenses,
          coin
        });
        if (response.status === 201) history.push("/login");
      } catch (error) {
        setBannerMessage("Some have faill on register!");
      }
    } else setBannerMessage("Password and Repeat Password are not iquals!");
  }

  return (
    <>
      <main>
        <Banner
          bannerMessage={bannerMessage}
          setBannerMessage={setBannerMessage}
        />
        <div className="register-container">
          <section>
            <h2>Create Account</h2>
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
                type="email"
                placeholder="Email ✉️"
                title="Email"
                className="Email"
                onChange={text => setValue("email", text.target.value)}
                error={errors?.email}
                errorMessage={errors?.email?.message}
                onFocus={() => clearError("email")}
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

              <Input
                type="password"
                placeholder="Repeat Password 🔒"
                title="Repeat Password"
                className="RPassword"
                id={"RepeatPassword"}
                onChange={text => setValue("repeatPassword", text.target.value)}
                error={errors?.repeatPassword}
                errorMessage={errors?.repeatPassword?.message}
                onFocus={() => clearError("repeatPassword")}
              />

              <div className="Money">
                <Input
                  type="number"
                  placeholder="Your Earnings 💰"
                  title="Earnings"
                  className="Earnings"
                  onChange={text => setValue("earnings", text.target.value)}
                  error={errors?.earnings}
                  errorMessage={errors?.earnings?.message}
                  onFocus={() => clearError("earnings")}
                />

                <Input
                  type="number"
                  placeholder="Your expenses 💸"
                  title="Expenses"
                  className="Expenses"
                  onChange={text => setValue("expenses", text.target.value)}
                  error={errors?.expenses}
                  errorMessage={errors?.expenses?.message}
                  onFocus={() => clearError("expenses")}
                />

                <Select
                  items={fetchCoin}
                  className="Coin"
                  title="Select Your Contry Coin"
                  onChange={text => setValue("coin", text.target.value)}
                  error={errors?.coin}
                  errorMessage={errors?.coin?.message}
                  onFocus={() => clearError("coin")}
                />
              </div>

              <button type="submit" className="button">
                SIGN UP
              </button>
            </form>
            <Link to="/login" className="back-link">
              Login
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
