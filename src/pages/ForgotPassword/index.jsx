import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import api from "../../services/api";

import validation from "../../utils/validUser";

import Banner from "../../components/Banner";
import Input from "../../components/Input";

import "../ChangePassword/style.css";

export default function ForgotPassword() {
  const { register, handleSubmit, errors, setValue, clearError } = useForm();
  const [bannerMessage, setBannerMessage] = useState("");

  useEffect(() => {
    register({ name: "email" }, validation.email);
  }, [register]);

  async function onSubmit(data) {
    try {
      await api.post("/forgot-password", { email: data.email });
      setBannerMessage("Go check your email!");
    } catch (error) {
      setBannerMessage("Somthins rong!");
    }
  }

  return (
    <>
      <Banner
        bannerMessage={bannerMessage}
        setBannerMessage={setBannerMessage}
      />
      <div className="fPassword-container">
        <section>
          <h2>Forgot your password?</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Write your email:"
              type="email"
              placeholder="Email ✉️"
              title="Email"
              className="Email"
              onChange={text => setValue("email", text.target.value)}
              error={errors?.email}
              errorMessage={errors?.email?.message}
              onFocus={() => clearError("email")}
            />
            <button type="submit" className="button">
              Send
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
