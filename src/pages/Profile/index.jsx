import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  FaUser,
  FaInbox,
  FaKey,
  FaArrowDown,
  FaArrowUp,
  FaCoins,
  FaCalendar
} from "react-icons/fa";

import api from "../../services/api";

import Banner from "../../components/Banner";
import Select from "../../components/Select";
import Input from "../../components/Input";

import "./style.css";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [earnings, setEarnings] = useState("");
  const [expenses, setExpenses] = useState("");
  const [coin, setCoin] = useState("");
  const [monthlyPeriod, setMonthlyPeriod] = useState("");

  const [usernameInput, setUsernameInput] = useState("");
  const [earningsInput, setEarningsInput] = useState("");
  const [expensesInput, setExpensesInput] = useState("");
  const [coinInput, setCoinInput] = useState("");
  const [monthlyPeriodInput, setMonthlyPeriodInput] = useState("");

  const [fetchCoin, setFetchCoin] = useState([]);

  const history = useHistory();
  const [formSelect, setFormSelect] = useState(null);
  const [bannerMensagen, setBannerMensagen] = useState("");

  let defaultValues = {
    username: "",
    earnings: 1,
    expenses: 1,
    monthlyPeriod: 1
  };


  useEffect(() => {
    getDataUser();
    fetchCoin();
    //Serve para ir buscar a informação do user e colocar nos inputs
    //como default value 
    async function getDataUser() {
      try {
        await api.get("/user").then(response => {
          const {
            username,
            email,
            earnings,
            expenses,
            coin,
            monthlyPeriod
          } = response.data;
          setUsername(username);
          setEmail(email);
          setEarnings(earnings);
          setExpenses(expenses);
          setCoin(coin);
          setMonthlyPeriod(monthlyPeriod);

          defaultValues.username = username;
          defaultValues.earnings = earnings;
          defaultValues.expenses = expenses;
          defaultValues.monthlyPeriod = monthlyPeriod;
        });
      } catch (error) {
        setBannerMensagen("Error on get data");
      }
    }

    //É retornado na resposta todo o tipo de coins
    //que é um objeto
    async function fetchCoin() {
      const response = await api.get("/constants/coins");
      setFetchCoin(response.data);
    }
  }, []);


  async function onUserNameSubmit(event) {
    event.preventDefault();
    try {
      setBannerMensagen("User Changed");
      setUsername(usernameInput);
      const params = new URLSearchParams();
      params.append("username", usernameInput);
      await api.patch("/user/username", params);
      localStorage.clear();
      history.push("/login");
    } catch (error) {
      setBannerMensagen("Error change UserName!");
    }
  }

  // é criada uma notificação para o user ir ao email
  // para depois ao clicar no link do email o user
  // ser redirecionado para uma página para mudar
  // o email
  async function changeEmail() {
    try {
      await api.get("/change-email");
      setBannerMensagen("Check your Email");
    } catch (error) {
      setBannerMensagen("Something went wrong!");
    }
  }

  // é criada uma notificação para o user ir ao email
  // para depois ao clicar no link do email o user
  // ser redirecionado para uma página para mudar
  // a password
  async function changePassword() {
    try {
      await api.get("/change-password");
      setBannerMensagen("Check your Email");
    } catch (error) {
      setBannerMensagen("Something went wrong!");
    }
  }

  // mudar as earnings do utilizador
  async function handleSubmitEarnings(event) {
    event.preventDefault();
    try {
      setEarnings(earningsInput);
      const params = new URLSearchParams();
      params.append("earnings", earningsInput);
      await api.patch("/user/earnings", params);
      setBannerMensagen("Earnings Changed");
    } catch (error) {
      setBannerMensagen("Error change Earnings!");
    }
  }

  // mudar as expenses do utilizador
  async function handleSubmitExpenses(event) {
    event.preventDefault();
    try {
      setExpenses(expensesInput);
      const params = new URLSearchParams();
      params.append("expenses", expensesInput);
      await api.patch("/user/expenses", params);
      setBannerMensagen("Expenses Changed");
    } catch (error) {
      setBannerMensagen("Error change Expenses!");
    }
  }

  // mudar a coin do utilizador
  async function handleSubmitCoin(event) {
    event.preventDefault();
    try {
      setCoin(coinInput);
      const params = new URLSearchParams();
      params.append("coin", coinInput);
      await api.patch("/user/coin", params);
      setBannerMensagen("Coin Changed");
    } catch (error) {
      setBannerMensagen("Error change Coin!");
    }
  }

  // mudar o dia do mês que o utilizador recebe
  // o seu salário
  async function handleSubmitMonthlyPeriod(event) {
    event.preventDefault();
    try {
      setMonthlyPeriod(monthlyPeriodInput);
      const params = new URLSearchParams();
      params.append("monthlyPeriod", monthlyPeriodInput);
      await api.patch("/user/monthlyPeriod", params);
      setBannerMensagen("Monthly Period Changed");
    } catch (error) {
      setBannerMensagen("Error change Monthly Period!");
    }
  }

  return (
    <>
      <main>
        <Banner
          bannerMessage={bannerMensagen}
          setBannerMessage={setBannerMensagen}
        />
        <div className="ProfileContainer">
          <section>
            <div>
              <FaUser size="20px" color="black" />
              <h2 className="UserNameH2">{username}</h2>
            </div>
            <div>
              <FaInbox size="20px" color="black" />
              <h2 className="UserEmailH2">{email}</h2>
            </div>
          </section>

          <article
            onClick={() => setFormSelect(formSelect === 0 ? null : 0)}
            className={0 === formSelect ? "selected" : null}
          >
            <h2>
              <FaUser size="16" color="white" />
              Change User
            </h2>
            <form onSubmit={event => onUserNameSubmit(event)}>
              <p className="DadosUserForm">{username}</p>
              <Input
                type="text"
                placeholder="Username 👤"
                title="Username"
                className="UserName"
                name="username"
                value={usernameInput}
                onChange={event => setUsernameInput(event.target.value)}
                maxLength="10"
                required={true}
              />
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </article>

          <article className={1 === formSelect ? "selected" : null}>
            <h2>
              <FaInbox size="16px" color="white" />
              Change Email
            </h2>
            <div className="ExternalChanges">
              <p className="DadosUserForm">{email}</p>
              <button className="button" onClick={changeEmail}>
                Change
              </button>
            </div>
          </article>

          <article className={2 === formSelect ? "selected" : null}>
            <h2>
              <FaKey size="16px" color="white" />
              Change Password
            </h2>
            <div className="ExternalChanges">
              <button className="button" onClick={changePassword}>
                Change
              </button>
            </div>
          </article>

          <article
            onClick={() => setFormSelect(formSelect === 3 ? null : 3)}
            className={3 === formSelect ? "selected" : null}
          >
            <h2>
              <FaArrowDown size="16px" color="white" />
              Earnings
            </h2>
            <form onSubmit={event => handleSubmitEarnings(event)}>
              <p className="DadosUserForm">{earnings}</p>
              <Input
                type="number"
                placeholder="Earnings"
                title="Earnings"
                value={earningsInput}
                onChange={event => setEarningsInput(event.target.value)}
                pattern="[0-9\/]*"
                min={0}
                max={999999999.99}
                required={true}
              />
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </article>

          <article
            onClick={() => setFormSelect(formSelect === 4 ? null : 4)}
            className={4 === formSelect ? "selected" : null}
          >
            <h2>
              <FaArrowUp size="16px" color="white" />
              Expenses
            </h2>
            <form onSubmit={event => handleSubmitExpenses(event)}>
              <p className="DadosUserForm">{expenses}</p>
              <Input
                type="number"
                placeholder="Expenses"
                title="Expenses"
                value={expensesInput}
                onChange={event => setExpensesInput(event.target.value)}
                pattern="[0-9\/]*"
                min={0}
                max={999999999.99}
                required={true}
              />
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </article>

          <article
            onClick={() => setFormSelect(formSelect === 5 ? null : 5)}
            className={5 === formSelect ? "selected" : null}
          >
            <h2>
              <FaCoins size="16px" color="white" />
              Type of Coin
            </h2>
            <form onSubmit={event => handleSubmitCoin(event)}>
              <p className="DadosUserForm">{coin}</p>
              <Select
                onChange={event => setCoinInput(event.target.value)}
                items={fetchCoin}
                selectedOption={coinInput}
              />
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </article>

          <article
            onClick={() => setFormSelect(formSelect === 6 ? null : 6)}
            className={6 === formSelect ? "selected" : null}
          >
            <h2>
              <FaCalendar size="16px" color="white" />
              Monthly Period
            </h2>
            <form onSubmit={event => handleSubmitMonthlyPeriod(event)}>
              <p className="DadosUserForm">{monthlyPeriod}</p>
              <Input
                type="number"
                placeholder="Monthly Period"
                title="Monthly Period"
                value={monthlyPeriodInput}
                onChange={event => setMonthlyPeriodInput(event.target.value)}
                pattern="[0-9\/]*"
                min={1}
                max={31}
                required={true}
              />
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </article>
        </div>
      </main>
    </>
  );
}
export default Profile;
