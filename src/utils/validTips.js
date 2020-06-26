export default {
  title: {
    required: "Title is required",
    maxLength: {
      value: 250,
      message: "Title can only be a maximum of 250 characters",
    },
  },
  description: {
    required: "Description is required",
    maxLength: {
      value: 120000,
      message: "Description can only be a maximum of 120000 characters",
    },
  },
  urlImage: {
    required: "Url Image is required",
    maxLength: {
      value: 500,
      message: "Url image can only be a maximum of 500 characters",
    },
  },
};
