import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* It is a class component that we get from react - redux Once we pass store object we can provide store context to the rest of the application we can dispatch action to our store  or we can pull values off of the store and into our components it all comes from this provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
