export const loginUserAction = () => ({
  type: "LOGIN_USER"
});

export const detailsUserAction = (userDetails) => {
  const isAdmin = userDetails.role.find(roleUser => roleUser === "USER_ADMIN");
  return {
  type: "LOGIN_USER_DETAILS",
  payload: {
    coin : userDetails.coin,
    earnings : userDetails.earnings,
    email : userDetails.email,
    expenses : userDetails.expenses,
    id : userDetails.id,
    monthlyPeriod : userDetails.monthlyPeriod,
    username : userDetails.username,
    role : userDetails.role,
    isAdmin
  }
}}
;

export const logoutUserAction = () => ({
    type: "LOGOUT_USER"
});

export const showLoader = () => ({
  type: "SHOW_LOADER"
});

export const hideLoader = () => ({
  type: "HIDE_LOADER"
});

export const userNotLogged = () => ({
  type: "USER_NOT_LOGGED"
})
