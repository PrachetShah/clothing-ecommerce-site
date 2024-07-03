import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { ProductsProvider } from "./contexts/products.context";
import { CartToggleProvider } from "./contexts/cart-toggle.context";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* We need user for cart, since we can query db for user cart items and also need product context */}
      {/* in our case, we need our product provider to access user data, hence order of provider is imp for data flow */}
      {/* this is the context provider defined in User.context */}
      <UserProvider>
        <ProductsProvider>
          <CartToggleProvider>
            <App />
          </CartToggleProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
