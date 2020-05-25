import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import creditReducers from "./reducers/creditReducers";
import CreditList from "./components/CreditList";

if (localStorage.getItem("creditData") == null) {
  localStorage.setItem("creditData", JSON.stringify([]));
}

let initialState = {
  currentIndex: -1,
  list: JSON.parse(localStorage.getItem("creditData")),
};

const store = createStore(
  creditReducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <CreditList />
  </Provider>,
  document.getElementById("root")
);
