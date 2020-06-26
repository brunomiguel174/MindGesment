import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import api from "../../services/api";

import { showLoader, hideLoader } from "../../store/user/actions";

import coinFormat from "../../utils/coinFormat";

import Banner from "../../components/Banner";
import WishComp from "../../components/WishComp";
import WishAddModal from "../../components/WishAddModal";

import "./style.css";

function Wish({ currency, isLogged, showLoading, hideLoading }) {
  let history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);

  const [UserBalanceAll, setUserBalanceAll] = useState(0);
  const [wishList, setWishList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  const [page, setPage] = useState(0);
  const [totalPerPage, setTotalPerPage] = useState(10);
  const [totalWishes, setTotalWishes] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(true);



  function paginationPlus() {
    if (totalWishes > totalPerPage) {
      setPage(prev => prev + 1);
      setTotalPerPage(prev => prev + 10);
    }
    return setDisabled(true);
  }

  useEffect(() => {
    getUserWishes();
    async function getUserWishes() {
      showLoading();

      try {
        const response = await api.get("/wish/balance");
        setUserBalanceAll(response.data.balance);
      } catch (error) {
        setBannerMessage("We were unable to get your balance!");
      }
      try {
        const response = await api.get("/wish", { params: { page } });
        setWishList(response.data.list);
        setTotalWishes(response.data.total);
        setDisabled(false);
      } catch (error) {
        setTotalWishes(0);
        setDisabled(true);
        setBannerMessage("You have any Wish!");
      }
      setIsLoaded(true);
    }
    setShouldUpdate(false);
    hideLoading();
  }, [page]);

  if (isLoaded) {
    return (
      <>
        <main>
          <Banner
            bannerMessage={bannerMessage}
            setBannerMessage={setBannerMessage}
          />
          <div className="WishContainer">
            <h2>Wish List</h2>
            <div className="WishHeader">
              <section>
                <h3>
                  {currency
                    ? coinFormat(UserBalanceAll, currency)
                    : coinFormat(UserBalanceAll, "USD")}
                </h3>
                <p>Available Balance</p>
                <div
                  className="button-plus"
                  onClick={() => {
                    isLogged ? setIsModalOpen(true) : history.push("/welcome");
                  }}
                >
                  <button>&#x2b;</button>
                </div>
              </section>
            </div>

            <div className="WishMain">
              <ul>
                {<WishComp wishList={wishList} setWishList={setWishList} />}
              </ul>
            </div>

            <div className="PaginationDiv">
              <div>
                <button
                  title="Back one page"
                  disabled={page === 0}
                  className="AddPaginationBtn"
                  onClick={() => {
                    setTotalPerPage(10);
                    setPage(page - 1);
                  }}
                >
                  -
                </button>
                <span>{page + 1}</span>
                <button
                  title="Foward one page"
                  className="RemovePaginationBtn"
                  onClick={paginationPlus}
                  disabled={disabled || totalWishes <= totalPerPage}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </main>

        <WishAddModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          wishList={wishList}
        />
      </>
    );
  }
  return null;
}

const mapStateToProps = state => ({
  currency: state.user.details.coin,
  isLogged: state.user.isLogged
});

const mapDispatchToProps = dispatch => ({
  showLoading: () => dispatch(showLoader()),
  hideLoading: () => dispatch(hideLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(Wish);
