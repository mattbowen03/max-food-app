import classes from "./Order-Form.module.css";
import { useContext } from "react";
import React from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

export const OrderForm = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const orderForm = (
    <form>
      <div className={classes["control-group"]}>
        <div className={classes["form-control"]}>
          <label htmlFor='firstName'> First Name</label>
          <input id='firstName' type='text' />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor='lastName'> Last Name</label>
          <input id='lastName' type='text' />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor='email'> Email</label>
          <input id='email' type='email' />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor='street'> Street</label>
          <input id='street' type='street' />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor='city'> city</label>
          <input id='city' type='city' />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor='zip'> zip</label>
          <input id='zip' type='zip' />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor='state'> State</label>
          <input id='state' type='state' />
        </div>
      </div>
    </form>
  );

  return (
    <Modal onClose={props.onClose}>
      {orderForm}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.onReturnToCart}>
          Cart
        </button>
        <button className={classes.button}>Place Order</button>
      </div>
    </Modal>
  );
};
