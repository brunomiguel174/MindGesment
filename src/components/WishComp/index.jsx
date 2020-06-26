import React, { useState } from "react";

import api from "../../services/api";

import Banner from "../Banner";

import WishEditModal from "../WishEditModal";

import "./style.min.css";

// WishComp tem a função de mostrar todas as wish do user
export default function WishComp({ wishList = [], setWishList }) {
  const [selectWish, setSelectWish] = useState(null);
  const [bannerMessage, setBannerMessage] = useState("");

  // Quando o user salvar a wish devolve ao BackEnd as alterações
  async function onSave(updatedWish) {
    const {
      id,
      name,
      total,
      proposalAmount,
      balance,
      date,
      description
    } = updatedWish;
    try {
      await api.put(`/wish/${id}`, {
        name,
        total,
        proposalAmount,
        balance,
        date,
        description
      });
      setWishList(wishList =>
        wishList.map(w => (w.id === updatedWish.id ? updatedWish : w))
      );
      setSelectWish(null);
      setBannerMessage("Wish updated");
    } catch (err) {
      setBannerMessage("Something fails on save wish!");
    }
  }

  // deleteWish elimina a wish selecionada
  async function deleteWish(deletedWish) {
    try {
      await api.delete(`/wish/${deletedWish.id}`);
      setWishList(wishList =>
        wishList.filter(w => {
          if (w.id !== deletedWish.id) return w;
        })
      );
      setBannerMessage("Wish Deletede!");
      setSelectWish(null);
    } catch (error) {
      setBannerMessage("Error on Delete Wish!");
    }
  }

  return (
    <>
      <Banner
        bannerMessage={bannerMessage}
        setBannerMessage={setBannerMessage}
      />
      {wishList.map(w => {
        const { id, name, description, balance, total, date } = w;
        return (
          <li
            key={id}
            className="WishListItem"
            onClick={() => setSelectWish(w)}
          >
            <div className="Infos">
              <h3>{name}</h3>
              <p>{description}</p>
            </div>

            <div className="DateBalence">
              <h3>
                {balance}/{total}
              </h3>
              <p>{date}</p>
            </div>
          </li>
        );
      })}
      <WishEditModal
        selectWish={selectWish}
        setSelectWish={setSelectWish}
        onSave={onSave}
        deleteWish={deleteWish}
      />
    </>
  );
}
