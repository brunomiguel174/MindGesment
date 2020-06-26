import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

import api from "../../services/api";

import { showLoader, hideLoader } from "../../store/user/actions";

import coinFormat from "../../utils/coinFormat";

import Banner from "../../components/Banner";
import Tips from "../../components/Tips";
import AddTicket from "../../components/AddTicket";
import EditTicket from "../../components/EditTicket";

import "./styles.css";

function Home({ currency, isLogged, isAdmin, showLoading, hideLoading }) {
  let history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedTip, setSelectedTip] = useState(null);

  const [page, setPage] = useState(0);
  const [totalPerPage, setTotalPerPage] = useState(10);
  const [tips, setTips] = useState([]);
  const [totalTips, setTotalTips] = useState(0);

  const [disabled, setDisabled] = useState(false);

  const [userWishBalance, setUserWishBalance] = useState(0);
  const [userWalletExpense, setUserWalletExpense] = useState(0);
  const [userWalletIncome, setUserWalletIncome] = useState(0);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callGetTips, setCallGetTips] = useState(false);

  function paginationPlus() {
    if (totalTips > totalPerPage) {
      setPage(prev => prev + 1);
      setTotalPerPage(prev => prev + 10);
    }
    return setDisabled(true);
  }

  useEffect(() => {
    if (isLoaded) {
      //se a resposta for OK será guardado
      //um array de tips que de seguida vão 
      //ser utilizadas no componente Tips
      async function getTips() {
        await api
          .get("tips", {
            params: {
              page
            }
          })
          .then(response => {
            setTips(response.data.list);
            setTotalTips(response.data.total);
            if (shouldUpdate) setTotalPerPage(response.data.totalPerPage);
            setDisabled(false);
          });
        setShouldUpdate(false);
      }
      getTips();
      setCallGetTips(false);
    }
    setIsLoaded(true);
  }, [isLoaded, callGetTips, page]);

  useEffect(() => {
    //Esta função é importante pois serve para obter
    //os valores que o utilizador possuí na pagina Wallet
    //e página Wishes
    async function captureBalances() {
      if (isLogged) {
        try {
          await api
            .get("/wish/balance")
            .then(response => setUserWishBalance(response?.data?.user || 0));

          await api.get("/user/balance").then(response => {
            setUserWalletIncome(response?.data?.income || 0);
            setUserWalletExpense(response?.data?.expense || 0);
          });
        } catch (err) {
          console.log(err);
          setError("Error in get values of wish.");
        }
      }
    }

    captureBalances();
  }, []);

  //redirecionar o user consoante o div que o mesmo
  //clicou para navegar para a página
  //wallet ou wishes
  function redirectUser(path = null) {
    if (path) history.push(`/${path}`);
  }

  async function handleAdd(newTicket) {
    try {
      await api.post("admin/tips", newTicket);
      setCallGetTips(true);
    } catch (err) {
      setError("Invalid information.");
    }
    setIsModalOpen(false);
  }

  async function handleSave(updatedTip) {
    setSelectedTip(null);
    try {
      await api
        .put(`/admin/tips/${updatedTip.id}`, updatedTip)
        .then(response => {
          tips.map(t => (t.id === updatedTip.id ? response : t));
        });
      setCallGetTips(true);
    } catch (err) {
      setError("Invalid information.");
    }
  }

  async function deleteTip(tip_id) {
    try {
      await api.delete(`admin/tips/${tip_id}`);
      setCallGetTips(true);
    } catch (err) {
      setError("Try again later.");
    }
  }

  if (isLoaded) {
    return (
      <>
        <Banner bannerMessage={error} setBannerMessage={setError} />
        <div className="home-container">
          <div className="display-values">
            <section>
              <article onClick={() => redirectUser("wish")}>
                <h4>Wish</h4>
                <p>
                  <span>Balance:</span>
                  <span>
                    {currency
                      ? coinFormat(userWishBalance, currency)
                      : coinFormat(userWishBalance, "USD")}
                  </span>
                </p>
              </article>
              <article onClick={() => redirectUser("wallet")}>
                <h4>Wallet</h4>
                <p>
                  <span className="income">Income:</span>
                  <span className="income">
                    {currency
                      ? coinFormat(userWalletIncome, currency)
                      : coinFormat(userWalletIncome, "USD")}
                  </span>
                </p>
                <p>
                  <span className="expense">Expense:</span>
                  <span className="expense">
                    {currency
                      ? coinFormat(userWalletExpense, currency)
                      : coinFormat(userWalletExpense, "USD")}
                  </span>
                </p>
              </article>
            </section>
          </div>

          {isAdmin ? (
            <div className="button-add">
              <button onClick={() => setIsModalOpen(true)}>&#x2b;</button>
            </div>
          ) : null}
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
              disabled={disabled || totalTips <= totalPerPage}
            >
              +
            </button>
          </div>

          <div className="display-tips">
            {tips ? 
            <Tips
              items={tips}
              deleteTip={deleteTip}
              setSelectedTip={setSelectedTip}
            />
            : null}
          </div>
        </div>

        <Modal isOpen={isModalOpen} className="modal-style">
          <AddTicket isOpen={setIsModalOpen} onAdd={handleAdd} />
        </Modal>

        <Modal isOpen={selectedTip !== null} className="modal-style">
          <EditTicket
            tip={selectedTip}
            onSave={handleSave}
            setSelectedTip={setSelectedTip}
          />
        </Modal>
      </>
    );
  }
  return null;
}

const mapStateToProps = state => ({
  currency: state.user.details.coin,
  isLogged: state.user.isLogged,
  isAdmin: state.user.details.isAdmin
});

const mapDispatchToProps = dispatch => ({
  showLoading: () => dispatch(showLoader()),
  hideLoading: () => dispatch(hideLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
