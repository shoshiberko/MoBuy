import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
//import SideNavBar from "./components/SideNavBar";
import * as serviceWorker from "./serviceWorker";
import MobuyApp from "./components";
//import SignIn from "./components/SignIn";
import { BrowserRouter as Router } from "react-router-dom";
//ReactDOM.render(<Dashboard />, document.getElementById("root"));
import CartContextProvider from "./contexts/CartContext";
import ProductsContextProvider from "./contexts/ProductsContext";
import Grid from "@material-ui/core/Grid";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ProductsContextProvider>
      <CartContextProvider>
        <Router>
          <MobuyApp />
        </Router>
      </CartContextProvider>
    </ProductsContextProvider>
  </React.StrictMode>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
