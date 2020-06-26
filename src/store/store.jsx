import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combinedReducers from "./rootReducer";

const composedEnhancers = composeWithDevTools();

const store = createStore(combinedReducers, composedEnhancers);

export default store;
