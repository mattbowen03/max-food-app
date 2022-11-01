import React, { useState } from "react";
import { Cart } from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { OrderForm } from "./components/OrderForm/OrderForm";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderFormIsShown, setOrderFormIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showOrderFormHandler = () => {
    setCartIsShown(false);
    setOrderFormIsShown(true);
  };

  const hideOrderFormHandler = () => {
    setOrderFormIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onOrder={showOrderFormHandler} />
      )}
      {orderFormIsShown && <OrderForm onClose={hideOrderFormHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
