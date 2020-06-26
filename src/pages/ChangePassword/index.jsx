import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import api from "../../services/api";

import validation from "../../utils/validUser";

import Banner from "../../components/Banner";
import Input from "../../components/Input";

import swal from "sweetalert";

import "./style.css";

export default function ChangePassword() {
  const { register, handleSubmit, errors, setValue, clearError } = useForm();
  const [bannerMessage, setBannerMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    register({ name: "password" }, validation.password);
    register({ name: "repeatPassword" }, validation.repeatPassword);
  }, [register]);

  async function onSubmit(data) {
    const token = window.location.search.replace("?token=", "");
    if (data.password === data.repeatPassword) {
      try {
        await api.post("/change-password", { password: data.password, token });
        setBannerMessage("Password was changed!");
        swal({
          icon: "success",
          title: "Password was changed!",
          text: "Your password has been successfully changed."
        }).then(() => history.push("/"));
      } catch (error) {
        setBannerMessage("Something wrong happened!");
      }
    } else setBannerMessage("Password and Repeat Password are not iquals!");
  }

  return (
    <>
      <Banner
        bannerMessage={bannerMessage}
        setBannerMessage={setBannerMessage}
      />
      <div className="ChangePasswordContainer">
        <section>
          <h2>Changing password?</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="password"
              placeholder="New Password 🔒"
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
              placeholder="Repeat New Password 🔒"
              title="Repeat Password"
              className="RPassword"
              id={"RepeatPassword"}
              onChange={text => setValue("repeatPassword", text.target.value)}
              error={errors?.repeatPassword}
              errorMessage={errors?.repeatPassword?.message}
              onFocus={() => clearError("repeatPassword")}
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
