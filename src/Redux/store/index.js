import { createStore, applyMiddleware } from "redux";
import  thunk  from "redux-thunk"; //nos permite trabajar con acciones asincronicas
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducer/index";


 const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk)),
);
export default store;