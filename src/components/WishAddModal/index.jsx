import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "@sweetalert/with-react";

import api from "../../services/api";
import validation from "../../utils/validWish";

import WishModalStyle from "../WishModalStyle";
import Input from "../Input";
import TextArea from "..//TextArea";
import Banner from "../Banner";

// WishAddModal é uma modal, usada para criar uma nova Wish
export default function WishAddModal({
  isModalOpen,
  setIsModalOpen,
  wishList = []
}) {
  const [othersWishes, setOthersWishes] = useState(wishList);

  const [wishName, setWishName] = useState("");

  const [RangeValue, setRangeValue] = useState(1);
  const [wishProposalAmount, setWishProposalAmount] = useState(1);
  const [bannerMessage, setBannerMessage] = useState("");

  const defaultValues = {
    name: "",
    totalAmount: 0,
    description: ""
  };

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    clearError,
    getValues
  } = useForm({ defaultValues });

  // FIca alerta para as mudanças nos inputs
  useEffect(() => {
    register({ name: "name" }, validation.name);
    register({ name: "totalAmount" }, validation.totalAmount);
    register({ name: "description" }, validation.description);
    register({ name: "proposalAmount" }, validation.proposalAmount);
  }, [register]);

  // Informa o BackEnd que está a ser criada uma nova Wish
  // O BackEnd devolve proposalAmount do user disponivel para gastar mensalmente na wish
  async function onSubmit(data) {
    const { name, totalAmount } = data;
    try {
      let response;
      if (!wishList.length)
        response = await api.get("/wish/first/proposalAmount", {
          params: { totalAmount }
        });
      else {
        await api.get("/wish/others/proposalAmount").then(resp => setOthersWishes(resp.data.list));
        response = await api.get("/wish/proposalAmount");
        console.log(response);
      }
      setWishProposalAmount(Math.min(response.data.proposalAmount, totalAmount));
      setWishName(name);
      if (!wishList.length) wishAcceptPreposalFunc(response.data);
    } catch (error) { setBannerMessage("Some have faill on register!"); }
  }

  // Caso seja a primeira wish aperece esta mensagem
  function wishAcceptPreposalFunc(response) {
    swal({
      icon: "info",
      buttons: {
        Accept: "Accept",
        cancel: "Don't Accept"
      },
      content: (
        <div className="SwetAlertModal">
          <h2>{getValues("name")}</h2>
          <p>
            With this monthly fee: {response.proposalAmount + "\n"}
            You will be able to reach the objective in {response.date}
          </p>
        </div>
      )
    }).then(isAccept => { if (isAccept) sendNewWish(); });
  }

  // Envia para o BackEnd a nova Wish criada pelo user
  async function sendNewWish(event) {
    if (event) event.preventDefault();
    setIsModalOpen(false);
    const wishComplet = {
      name: getValues("name"),
      total: getValues("totalAmount"),
      proposalAmount: RangeValue,
      description: getValues("description")
    };
    try {
      let response;
      if (!wishList.length)
        response = await api.post("/wish/first", wishComplet);
      else
        response = await api.post("/wish/others", {
          wish: wishComplet,
          othersWishes
        });
      setBannerMessage("Wish saved");
      window.location.reload();
    } catch (error) {
      setBannerMessage("Something went wrong on create wish!");
    }
  }

  function closeModal() {
    setWishName(null);
    setIsModalOpen(false);
  }

  return (
    <>
      <Banner
        bannerMessage={bannerMessage}
        setBannerMessage={setBannerMessage}
      />
      <WishModalStyle isModalOpen={isModalOpen} closeModal={closeModal} wishName={wishName}>

        <article className={`ModalNewWish ${wishName ? "ModalNotVisible" : "ModalVisible"}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Wish Name"
              type="text"
              placeholder="Ex. House"
              title="Name"
              className="Name"
              onChange={text => setValue("name", text.target.value)}
              error={errors?.name}
              errorMessage={errors?.name?.message}
              onFocus={() => clearError("name")}
            />

            <Input
              label="Total Amount of Wish"
              type="number"
              placeholder="Ex. 100 000"
              title="Total Amount"
              className="totalAmount"
              onChange={text => setValue("totalAmount", text.target.value)}
              error={errors?.totalAmount}
              errorMessage={errors?.totalAmount?.message}
              onFocus={() => clearError("totalAmount")}
            />

            <TextArea
              label="Description"
              title="Description"
              placeholder="Ex. A Simple Blue House"
              className="Description"
              onChange={text => setValue("description", text.target.value)}
              error={errors?.description}
              errorMessage={errors?.description?.message}
              onFocus={() => clearError("description")}
            />

            <button type="submit" className="button">
              Submit
                </button>
          </form>
        </article>

        <AddWishRanges
          wishName={wishName}
          RangeValue={RangeValue}
          setRangeValue={setRangeValue}
          sendNewWish={sendNewWish}
          wishProposalAmount={wishProposalAmount}
          othersWishes={othersWishes}
          setOthersWishes={setOthersWishes}
          closeModal={closeModal}
        />
      </WishModalStyle>
    </>
  );
}

// AddWishRanges é usado quando o user quer criar uma nova wish
// O User pode definir a mensalidade da wish
function AddWishRanges({
  wishName,
  RangeValue,
  sendNewWish,
  wishProposalAmount,
  setRangeValue,
  closeModal
}) {
  return (
    <>
      <article className={`ModalRange ${wishName ? "ModalVisible" : "ModalNotVisible"}`}>
        <main>
          <form onSubmit={event => sendNewWish(event)}>
            <Input
              label={`${wishName} (${RangeValue}) / ${wishProposalAmount}`}
              type="range"
              title={wishName}
              className="totalAmount"
              value={RangeValue}
              onChange={event => setRangeValue(event.target.value)}
              max={wishProposalAmount}
            />
          </form>
        </main>
        <footer>
          <button
            className="BtnModal BtnModalAccept"
            onClick={() => sendNewWish()}>Accept</button>
          <button
            className="BtnModal BtnModalRecuse"
            onClick={closeModal}>Don't Accept</button>
        </footer>
      </article>
    </>
  );
}
