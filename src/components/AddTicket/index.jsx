import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import validation from "../../utils/validTips";

import Banner from "../Banner";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";

function AddTicket({ isOpen, onAdd }) {
  const [error, setError] = useState("");
  const { register, handleSubmit, errors, setValue, clearError } = useForm();

  useEffect(() => {
    register({ name: "title" }, validation.title);
    register({ name: "description" }, validation.description);
    register({ name: "imageUrl" }, validation.imageUrl);
  }, [register]);

  async function onSubmit(data) {
    const { title, description, imageUrl } = data;
    try {
      onAdd({ title, description, imageUrl });
    } catch (error) {
      setError("Some have faill on register!");
    }
  }

  return (
    <>
      <Banner bannerMessage={error} setBannerMessage={setError} />
      <div className="ReactModal__Header">
        <button onClick={() => isOpen(false)}>X</button>
        <h2>Add Tip</h2>
      </div>
      <div className="ReactModal__Body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Title"
            title="Title"
            onChange={text => setValue("title", text.target.value)}
            error={errors?.title}
            errorMessage={errors?.title?.message}
            onFocus={() => clearError("title")}
          />
          <TextArea
            placeholder="Description"
            title="Description"
            onChange={text => setValue("description", text.target.value)}
            error={errors?.description}
            errorMessage={errors?.description?.message}
            onFocus={() => clearError("description")}
          />
          <Input
            type="text"
            placeholder="Image Url"
            title="Image Url"
            onChange={text => setValue("imageUrl", text.target.value)}
            error={errors?.imageUrl}
            errorMessage={errors?.imageUrl?.message}
            onFocus={() => clearError("imageUrl")}
          />
          <button className="button">Add</button>
        </form>
      </div>
    </>
  );
}

export default AddTicket;
