import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import validation from "../../utils/validWallet";

import Select from "../Select";
import Input from "../Input";

// Adiciona uma transação
export default function AddTransaction({
  isOpen,
  onAdd,
  categoriesIncome = [],
  categoriesExpense = [],
  fetchType = []
}) {
  const defaultValues = {
    title: "",
    amount: "",
    date: `${String(new Date().toISOString().slice(0, 10))}`,
    description: ""
  };
  const [type, setType] = useState("INCOME");
  const [category, setCategory] = useState("SALARY");

  const { register, handleSubmit, errors, setValue, clearError } = useForm({
    defaultValues
  });

  useEffect(() => {
    register({ name: "title" }, validation.title);
    register({ name: "amount" }, validation.amount);
    register({ name: "date" }, validation.date);
    register({ name: "description" }, validation.description);
  }, [register]);

  async function onSubmit(data) {
    const { title, amount, description, date } = data;
    try {
      onAdd({ title, amount, type, description, category, date });
      isOpen(false);
    } catch (error) { console.log(error); }
  }

  return (
    <>
      <div className="ReactModal__Header">
        <button onClick={() => isOpen(false)}>X</button>
        <h2>Add Ticket</h2>
      </div>

      <div className="ReactModal__Body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            defaultValue={defaultValues.title}
            placeholder="Title"
            title="Title"
            name="Title"
            onChange={text => setValue("title", text.target.value)}
            error={errors?.title}
            errorMessage={errors?.title?.message}
            onFocus={() => clearError("title")}
          />

          <Input
            type="number"
            defaultValue={defaultValues.amount}
            placeholder="Value"
            title="Amount"
            name="amount"
            onChange={text => setValue("amount", text.target.value)}
            error={errors?.amount}
            errorMessage={errors?.amount?.message}
            onFocus={() => clearError("amount")}
          />

          <Select
            onChange={event => setType(event.target.value)}
            items={fetchType}
          />

          <Select
            onChange={event => setCategory(event.target.value)}
            items={type === "INCOME" ? categoriesIncome : categoriesExpense}
            selectedOption={category}
          />

          <Input
            type="date"
            defaultValue={defaultValues.date}
            placeholder="Date"
            title="Date"
            name="Date"
            onChange={text => setValue("date", text.target.value)}
            error={errors?.date}
            errorMessage={errors?.date?.message}
            onFocus={() => clearError("date")}
          />

          <Input
            type="text"
            defaultValue={defaultValues.description}
            placeholder="Description"
            title="Description"
            name="Description"
            onChange={text => setValue("description", text.target.value)}
            error={errors?.description}
            errorMessage={errors?.description?.message}
            onFocus={() => clearError("description")}
          />

          <button className="button">Add</button>
        </form>
      </div>
    </>
  );
}
