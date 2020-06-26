import React, { useState, useEffect } from "react";

import swal from "sweetalert";

import api from "../../services/api";

import WishModalStyle from "../WishModalStyle";
import Banner from "../Banner";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";

export default function WishEditModal({
  selectWish,
  setSelectWish,
  onSave,
  deleteWish
}) {
  const [wishId, setWishId] = useState("");
  const [name, setName] = useState("New Wish");
  const [total, setTotal] = useState(0);
  const [wishProposalAmount, setWishProposalAmount] = useState(0);
  const [balance, setBalance] = useState(null);
  const [date, setDate] = useState(0);
  const [description, setDescription] = useState("");

  const [maxMensality, setMaxMensality] = useState(0);
  const [beforeProposal, setBeforeProposal] = useState(0);
  const [transValue, setTransValue] = useState(0);
  const [bannerMessage, setBannerMessage] = useState("");

  useEffect(() => {
    if (balance >= total && wishId) swal({
      icon: "info",
      text: `You alread have complet the ${name} Wish?`,
    }).then(() => handleDeleteWish());
  });

  useEffect(() => {
    if (selectWish) {
      const { id, name, total, proposalAmount, balance, date, description } = selectWish;
      setWishId(id);
      setName(name);
      setTotal(total);
      setWishProposalAmount(proposalAmount);
      setBalance(balance);
      setDate(date);
      setDescription(description);
      setBeforeProposal(proposalAmount);
    }
  }, [selectWish]);

  useEffect(() => {
    if (selectWish) getMaxMensality();
    async function getMaxMensality() {
      try {
        await api.get("wish/proposalAmount")
          .then(resp => setMaxMensality(Math.min(resp.data.proposalAmount + beforeProposal, total)));
      } catch (error) { setBannerMessage("We were unable to get your balance!"); }
    }
  }, [beforeProposal]);

  function formSubmitSaveWish(event) {
    event.preventDefault();
    onSave({
      id: wishId,
      name,
      total,
      proposalAmount: wishProposalAmount,
      balance,
      date,
      description
    });
    window.location.reload();
  }

  function handleDeleteWish() {
    swal({
      icon: "warning",
      title: `Do you want to eliminate ${name}?`,
      text: "Once deleted, you will not be able to recover this Wish!",
      buttons: true,
      dangerMode: true
    }).then(wishDelete => {
      if (wishDelete) deleteWish({ id: wishId, name, total, proposalAmount: wishProposalAmount, balance, date, description });
    });
    setWishId(null);
  }

  async function fromSubmitAddTrans(e) {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("balance", transValue);
      await api.post(`/wish/balance/${wishId}`, params);
      setBalance(balance + transValue);
      setTransValue(0);
      setBannerMessage("Balance was updated!");
    } catch (err) { setBannerMessage("Error on adding!"); }
  }

  function closeModal() {
    setSelectWish(null);
    setWishId(null);
    window.location.reload();
  }

  return (
    <>
      <Banner bannerMessage={bannerMessage} setBannerMessage={setBannerMessage} />

      <WishModalStyle
        selectWish={selectWish}
        closeModal={closeModal}
        wishName={name}
        handleDeleteWish={handleDeleteWish}>

        <article className="ModalMainAccontWish">
          <form
            onSubmit={formSubmitSaveWish}
            className="ModalMainWishAccont"
          >
            <div className="Name">
              <Input
                label="Wish Name"
                type="text"
                placeholder="Name"
                title="Name"
                minLength={1}
                maxLength={30}
                value={name}
                onChange={event => setName(event.target.value)}
                required={true}
              />
            </div>
            <div className="Data">
              <p title="Data">{date}</p>
            </div>
            <div className="H3Balance" title="Balance">
              <h3>Balance: {balance}</h3>
            </div>
            <div className="Total">
              <Input
                label="Total"
                type="number"
                placeholder="Total"
                title="The money you need to collect"
                minLength={1}
                maxLength={10}
                min="1"
                value={total}
                onChange={event => setTotal(event.target.value)}
                required={true}
              />
            </div>
            <div className="rangePA">1
              <Input
                label={`Monthly payment ${wishProposalAmount}`}
                type="range"
                title="Proposed to achieve your goal"
                value={wishProposalAmount}
                min="1"
                max={maxMensality}
                onChange={event => setWishProposalAmount(event.target.value)} />
              {maxMensality}</div>
            <div className="Description">
              <TextArea
                label="Description"
                placeholder="Description"
                title="Description"
                minLength={1}
                maxLength={120}
                value={description}
                onChange={event => setDescription(event.target.value)}
              >
                {description}
              </TextArea>
            </div>
            <div className="Save">
              <button type="submit" className="button">Save</button>
            </div>
          </form>
          <div className="Transactions">
            <form onSubmit={fromSubmitAddTrans}>
              <Input
                label="Add Balance:"
                type="number"
                placeholder="Trasaction Value"
                title="How much do you join"
                minLength={1}
                maxLength={String(total).length}
                min="1"
                max={total - balance}
                pattern="\d*"
                value={transValue}
                onChange={event =>
                  setTransValue(Number(event.target.value))
                }
                required={true}
              />
              <button type="submit" className="button">
                Add
                  </button>
            </form>
          </div>
        </article>
      </WishModalStyle>
    </>
  );
}
