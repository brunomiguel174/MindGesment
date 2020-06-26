export default {
  name: {
    required: "Name is required.",
    minLength: { value: 1, message: "Name must be at least 1 characters." },
    maxLength: { value: 30, message: "Name must be less then 30 characters." },
  },
  totalAmount: {
    required: "Total is required.",
    minLength: { value: 1, message: "Total must be at least 1 characters." },
    maxLength: { value: 10, message: "Total must be less then 10 characters." },
    min: { value: 1, message: "The minimum value is 0." },
  },
  description: {
    required: false,
    minLength: { value: 0, message: "Total must be at least 0 characters." },
    maxLength: {
      value: 120,
      message: "Total must be less then 120 characters.",
    },
  },
};
