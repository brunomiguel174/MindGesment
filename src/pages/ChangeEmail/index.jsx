import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import api from "../../services/api";

import validation from "../../utils/validUser";

import Banner from "../../components/Banner";
import Input from "../../components/Input";

import swal from "sweetalert";

import "../ChangePassword/style.css";

export default function ChangeEmail() {
  const { register, handleSubmit, errors, setValue, clearError } = useForm();
  const [bannerMessage, setBannerMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    register({ name: "email" }, validation.email);
  }, [register]);

  async function onSubmit(data) {
    const token = window.location.search.replace("?token=", "");
    try {
      await api.post("/change-email", { email: data.email, token });
      setBannerMessage("Email was changed!");
      swal({
        icon: "success",
        title: "Email was changed!",
        text: "Go check your email to confirm!"
      }).then(() => history.push("/"));
    } catch (error) {
      setBannerMessage("Something wrong happened!");
    }
  }

  return (
    <>
      <Banner
        bannerMessage={bannerMessage}
        setBannerMessage={setBannerMessage}
      />
      <div className="ChangeEmailContainer">
        <section>
          <h2>Changing Email</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Write the new email:"
              type="email"
              placeholder="New Email ✉️"
              title="Email"
              className="Email"
              onChange={text => setValue("email", text.target.value)}
              error={errors?.email}
              errorMessage={errors?.email?.message}
              onFocus={() => clearError("email")}
            />
            <button type="submit" className="button">
              Change
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
