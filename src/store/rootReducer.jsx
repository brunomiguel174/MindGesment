import { combineReducers } from "redux";
import userReducer from "./user/reducer";

//Só esta a ser utilizado um reducer mas futuramente
//na melhoria de código pretende-se usar mais de que
//um reducer
const combinedReducers = combineReducers({
    user: userReducer
});

export default combinedReducers;