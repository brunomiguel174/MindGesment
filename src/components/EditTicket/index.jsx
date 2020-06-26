import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import validation from "../../utils/validTips";

import Input from "../../components/Input";
import TextArea from "../../components/TextArea";

import Banner from "../Banner";

// EditTicket edita o ticket selecionado do user
export default function EditTicket({ tip, onSave, setSelectedTip }) {
  const [error, setError] = useState("");
  const [changeTitle, setChangeTitle] = useState("");
  const [changeDescription, setChangeDescription] = useState("");
  const [changeImageUrl, setChangeImageUrl] = useState("");

  let defaultValues = { title: "", description: "", imageUrl: "" };

  useEffect(() => {
    if (tip) {
      defaultValues.title = tip.title;
      defaultValues.description = tip.description;
      defaultValues.imageUrl = tip.imageUrl;

      setChangeTitle(tip.title);
      setChangeDescription(tip.description);
      setChangeImageUrl(tip.imageUrl);
    }
  }, [tip]);

  const { register, handleSubmit, errors, setValue, clearError } = useForm({
    defaultValues
  });

  useEffect(() => {
    register({ name: "title" }, validation.title);
    register({ name: "description" }, validation.description);
    register({ name: "imageUrl" }, validation.imageUrl);
  }, [register]);

  // Enviar para o pai os datos alterados
  async function onSubmit(data) {
    const { title, description, imageUrl } = data;
    try {
      onSave({ id: tip.id, title, description, imageUrl });
    } catch (error) {
      setError("Some have faill on register!");
    }
  }

  return (
    <>
      <Banner bannerMessage={error} setBannerMessage={setError} />
      <div className="ReactModal__Header">
        <button onClick={() => setSelectedTip(null)}>X</button>
        <h2>Edit Tip</h2>
      </div>

      <div className="ReactModal__Body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            defaultValue={changeTitle}
            placeholder="Title"
            title="Title"
            onChange={text => setValue("title", text.target.value)}
            error={errors?.title}
            errorMessage={errors?.title?.message}
            onFocus={() => clearError("title")}
          />

          <TextArea
            defaultValue={changeDescription}
            placeholder="Description"
            title="Description"
            onChange={text => setValue("description", text.target.value)}
            error={errors?.description}
            errorMessage={errors?.description?.message}
            onFocus={() => clearError("description")}
          />

          <Input
            type="text"
            defaultValue={changeImageUrl}
            placeholder="Image Url"
            title="Image Url"
            onChange={text => setValue("imageUrl", text.target.value)}
            error={errors?.imageUrl}
            errorMessage={errors?.imageUrl?.message}
            onFocus={() => clearError("imageUrl")}
          />

          <button className="button">Edit</button>
        </form>
      </div>
    </>
  );
}
