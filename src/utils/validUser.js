export default {
  username: {
    required: "Username is required.",
    maxLength: {
      value: 50,
      message: "Username can only be a maximum of 50 characters.",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      // eslint-disable-next-line no-useless-escape
      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Invalid email format.",
    },
  },
  password: {
    required: "Password is required.",
    minLength: { value: 8, message: "Password must be at least 8 characters." },
  },
  repeatPassword: {
    required: "Repeat password is required.",
    minLength: { value: 8, message: "Password must be at least 8 characters." },
  },
  earnings: {
    required: false,
    min: { value: 0, message: "The minimum value is 0." },
    max: { value: 999999999.99, message: "The maximum value is 999999999.99." },
  },
  expenses: {
    required: false,
    min: { value: 0, message: "The minimum value is 0." },
    max: { value: 999999999.99, message: "The maximum value is 999999999.99." },
  },
  coin: { required: "Coin is required." },
  monthlyPeriod: {
    required: "Monthly Period is required.",
    min: { value: 1, message: "The minimum value is 1." },
    max: { value: 31, message: "The maximum value is 31." },
  },
};
