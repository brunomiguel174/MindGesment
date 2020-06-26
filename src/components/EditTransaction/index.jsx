import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import validation from "../../utils/validWallet";

import Select from "../Select";
import Input from "../Input";

function EditTransaction({
  transaction,
  onSave,
  setSelectedTransaction,
  categoriesIncome = [],
  categoriesExpense = [],
  fetchType = []
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState();
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  let defaultValues = {
    title: "",
    amount: "",
    date: null,
    description: ""
  };

  useEffect(() => {
    if (transaction) {
      defaultValues.title = transaction.title;
      defaultValues.amount = transaction.amount;
      defaultValues.date = transaction.date;
      defaultValues.description = transaction.description;

      setTitle(transaction.title);
      setAmount(transaction.amount);
      setDate(transaction.date);
      setDescription(transaction.description);

      setType(transaction.type);
      setCategory(transaction.category);
    }
  }, [transaction]);

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
      onSave({
        id: transaction.id,
        title,
        amount,
        type,
        description,
        category,
        date
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="ReactModal__Header">
        <button onClick={() => setSelectedTransaction(null)}>X</button>
        <h2>Edit Ticket</h2>
      </div>

      <div className="ReactModal__Body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            defaultValue={title}
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
            defaultValue={amount}
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
            defaultValue={date}
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
            defaultValue={description}
            placeholder="Description"
            title="Description"
            name="Description"
            onChange={text => setValue("description", text.target.value)}
            error={errors?.description}
            errorMessage={errors?.description?.message}
            onFocus={() => clearError("description")}
          />

          <button className="button">Edit</button>
        </form>
      </div>
    </>
  );
}

export default EditTransaction;
