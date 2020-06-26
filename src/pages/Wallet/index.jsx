import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import { showLoader, hideLoader } from "../../store/user/actions";
import coinFormat from "../../utils/coinFormat";

import TicketEx from "../../components/TicketEx";
import Banner from "../../components/Banner";
import AddTransaction from "../../components/AddTransaction";
import EditTransaction from "../../components/EditTransaction";

import "./style.css";

Modal.setAppElement("#root");
function Wallet({ currency, showLoading, hideLoading, isLogged }) {
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  const [categoriesIncome, setCategoriesIncome] = useState([]);
  const [categoriesExpense, setCategoriesExpense] = useState([]);
  const [fetchType, setFetchType] = useState([]);

  const [balanceIncome, setBalanceIncome] = useState(0);
  const [balanceExpense, setBalanceExpense] = useState(0);
  const [balanceTotal, setBalanceTotal] = useState(0);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [captureNewTransaction, setCaptureNewTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [page, setPage] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalPerPage, setTotalPerPage] = useState(10);

  //Esta função serve para o utilizador
  //conseguir navegar entre as Transactions existentes
  //e caso nao haja mais Transactions o botão sera bloqueado
  //para evitar de fazer mais um pedido desnecessário
  function paginationPlus() {
    if (totalTransactions > totalPerPage) {
      setPage(prev => prev + 1);
      setTotalPerPage(prev => prev + 10);
    }
    return setDisabled(true);
  }

  //Nesta função vamos fazer um pedido á base de dados para
  //o nosso select ficar com o array de categoriaas de income ou de expense consoante
  //o type definido
  useEffect(() => {
    async function fetchCategories() {
      showLoading();
      try {
        const response = await api.get("/constants/categories");
        setCategoriesIncome(response.data.income);
        setCategoriesExpense(response.data.expense);
      } catch (err) {
        console.log(err);
      }
    }

    //Vai ser retornado um array de type para usar no Select
    async function fetchTypeInformation() {
      try {
        showLoading()
        const response = await api.get("/constants/transactionTypes");
        setFetchType(response.data);
        hideLoading();
      } catch (err) {
        console.log(err);
      }
      hideLoading();
    }
    fetchCategories();
    fetchTypeInformation();
  }, [isLoaded]);

  //Esta função é importante pois na wallet
  //vao ser mostrados os valores que o utilizador
  //possuí em transactions
  async function getBalanceValues() {
    showLoading();
    try {
      const response = await api.get("/user/balance");
      setBalanceIncome(response?.data?.income || 0);
      setBalanceExpense(response?.data?.expense || 0);
      setBalanceTotal(response?.data?.income - response?.data?.expense || 0);
      setCaptureNewTransaction(false);
      setError("");
      hideLoading();
    } catch (err) {
      setError("Your balance is empty");
    }
    hideLoading();
  }

  useEffect(() => {
    getBalanceValues();
  }, [isLoaded, captureNewTransaction]);

  //vai ser retornado um array de transactions
  //onde de seguida vão ser todas imprimidas
  //através do component TicketEx
  async function getTicketInformation() {
    if (isLogged) {
      showLoading();
      try {
        await api
          .get("/transaction", {
            params: {
              page
            }
          })
          .then(response => {
            setTransactions([response.data.list]);
            setTotalTransactions(response.data.total);
            if (shouldUpdate) setTotalPerPage(response.data.totalPerPage);
            setError("");
            setDisabled(false);
          });
      } catch (err) {
        setTransactions([]);
        console.log(err);
        setDisabled(true);
      }
      setShouldUpdate(false);
      hideLoading();
    }
  }

  useEffect(() => {
    getTicketInformation();
    setIsLoaded(true);
  }, [isLoaded, captureNewTransaction, page]);

  //Esta função permite deletar uma transaction
  async function deleteTicket(id) {
    try {
      await api.delete(`/transaction/${id}`);
      getTicketInformation();
      getBalanceValues();
    } catch (err) {
      console.log(err);
    }
  }

  //Nesta função vamos receber os dados que adicionamos
  //através da modal e vamos adicionar á base de dados
  //caso dê um status code de OK
  async function handleAdd(newTransaction) {
    showLoading();
    try {
      await api.post("/transaction", newTransaction);
      setCaptureNewTransaction(true);
      setShouldUpdate(true);
      setPage(0);
    } catch (err) {
      setError("Invalid information on the new ticket");
      setCaptureNewTransaction(false);
    }
    hideLoading();
  }

  // função que serve de callback
  async function handleSave(updatedtransaction) {
    setSelectedTransaction(null);
    showLoading();
    try {
      await api
        .put(`/transaction/${updatedtransaction.id}`, updatedtransaction)
        .then(response => {
          transactions[0].map(t =>
            t.id === updatedtransaction.id ? response : t
          );
        });
      setCaptureNewTransaction(true);
    } catch (err) {
      console.log(err);
    }
    hideLoading();
  }
  // Permite deixar que as variaveis carreguem
  // todas os seus respectivos valores
  if (isLoaded) {
    return (
      <main>
        <Banner bannerMessage={error} setBannerMessage={setError} />
        <div className="wallet-container">
          <h1>Wallet Activity</h1>
          <section>
            <div className="section-title">
              <h3 style={{ color: balanceTotal < 0 && "#F7695A" }}>
                {currency ? coinFormat(balanceTotal, currency) : coinFormat(balanceTotal, "USD")}
              </h3>
              <p>Available Balance</p>
            </div>

            <article className="income-article">
              <h4>Income</h4>
              <p>
                {currency ? coinFormat(balanceIncome, currency) : balanceIncome}
              </p>
            </article>

            <div
              className="button-plus"
              onClick={() => {
                return isLogged
                  ? setModalIsOpen(true)
                  : history.push("/welcome");
              }}
            >
              <button>&#x2b;</button>
            </div>

            <article className="expense-article">
              <h4>Expense</h4>
              <p>
                {currency
                  ? coinFormat(balanceExpense, currency)
                  : balanceExpense}
              </p>
            </article>
          </section>

          <div className="container-activity">
            <div className="block-list">
              <h2>Recent Activity</h2>

              <div className="block-list-pages">
                <button
                  onClick={() => {
                    setShouldUpdate(true);
                    setPage(prev => prev - 1);
                  }}
                  disabled={page === 0}
                >
                  -
                </button>
                <p>{page + 1}</p>
                <button
                  onClick={paginationPlus}
                  disabled={disabled || totalTransactions <= totalPerPage}
                >
                  +
                </button>
              </div>
            </div>

            <ul className="filter">
              <li>Date</li>
              <li>Category</li>
              <li>Type</li>
            </ul>

            <ul className="dinamic-activity">
              <TicketEx
                item={transactions[0]}
                deleteTicket={deleteTicket}
                setSelectedTransaction={setSelectedTransaction}
              />
            </ul>
          </div>
        </div>

        <Modal isOpen={selectedTransaction !== null} className="modal-style">
          <EditTransaction
            transaction={selectedTransaction}
            onSave={handleSave}
            setSelectedTransaction={setSelectedTransaction}
            categoriesIncome={categoriesIncome}
            categoriesExpense={categoriesExpense}
            fetchType={fetchType}
          />
        </Modal>

        <Modal isOpen={modalIsOpen} className="modal-style">
          <AddTransaction
            isOpen={setModalIsOpen}
            onAdd={handleAdd}
            categoriesIncome={categoriesIncome}
            categoriesExpense={categoriesExpense}
            fetchType={fetchType}
          />
        </Modal>
      </main>
    );
  }
  return null;
}

//
const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
  currency: state.user.details.coin
});

const mapDispatchToProps = dispatch => ({
  showLoading: () => dispatch(showLoader()),
  hideLoading: () => dispatch(hideLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
