export default {
  title: {
    required: "Title is required.",
    maxLength: {
      value: 30,
      message: "Title can only be a maximum of 30 characters.",
    },
  },
  type: { required: "Type is required." },
  category: { required: "Category is required." },
  date: { required: "Date is required." },
  amount: {
    required: "Amount is required.",
    min: { value: 0, message: "The minimum value is 0." },
    max: { value: 999999999.99, message: "The maximum value is 999999999.99." },
  },
  description: {
    required: false,
    maxLength: {
      value: 120,
      message: "Description can only be a maximum of 120 characters.",
    },
  },
};
