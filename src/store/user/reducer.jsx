const initialState = {
  isLogged: false,
  isLoaded: false,
  isLoading: false,
  details: {
    coin: "",
    earnings: 0,
    email: "",
    expenses: 0,
    id: "",
    monthlyPeriod: 0,
    username: "",
    role: [],
    isAdmin: false
  }
};

//Update do initialState consoante
//a ação que é recebida na função
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_LOADER":
      return {
        ...state,
        isLoading: true
      };
    case "HIDE_LOADER":
      return {
        ...state,
        isLoading: false
      };
    case "USER_NOT_LOGGED":
      return {
        ...state,
        isLoaded: true,
      };
    case "LOGIN_USER":
      return {
        ...state,
        isLoaded: true,
        isLogged: true
      };
    case "LOGIN_USER_DETAILS":
      //Para saber se é admin ou não
      const isAdmin = Boolean(
        action.payload.role.find(prev => prev === "ROLE_ADMIN")
      );
      return {
        ...state,
        isLoaded: true,
        details: {
          coin: action.payload.coin,
          earnings: action.payload.earnings,
          email: action.payload.email,
          expenses: action.payload.expenses,
          id: action.payload.id,
          monthlyPeriod: action.payload.monthlyPeriod,
          username: action.payload.username,
          role: action.payload.role,
          isAdmin
        }
      };
    case "LOGOUT_USER":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
