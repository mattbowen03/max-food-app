import classes from "./Order-Form.module.css";
import { useContext } from "react";
import React from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

export const OrderForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  let formIsValid = false;

  if (firstNameIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log(firstNameValue);
    console.log(lastNameValue);
    console.log(emailValue);
    resetFirstName();
    resetLastName();
    resetEmail();
    // props.onClose();
  };

  const firstNameClasses = firstNameHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];

  const lastNameClasses = lastNameHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];

  const emailClasses = emailHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler}>
        <div className={classes["control-group"]}>
          <div className={firstNameClasses}>
            <label htmlFor='firstName'> First Name</label>
            <input
              value={firstNameValue}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              id='firstName'
              type='text'
            />
            {firstNameHasError && (
              <p className={classes["error-text"]}>
                Please enter a first name.
              </p>
            )}
          </div>
          <div className={lastNameClasses}>
            <label htmlFor='lastName'> Last Name</label>
            <input
              value={lastNameValue}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              id='lastName'
              type='text'
            />
            {lastNameHasError && (
              <p className={classes["error-text"]}>Please enter a last name.</p>
            )}
          </div>
          <div className={emailClasses}>
            <label htmlFor='email'> Email</label>
            <input
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              id='email'
              type='email'
            />
            {emailHasError && (
              <p className={classes["error-text"]}>
                Please enter a valid email address.
              </p>
            )}
          </div>
        </div>

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
          <button
            disabled={!formIsValid}
            type='submit'
            className={classes.button}>
            Place Order
          </button>
        </div>
      </form>
    </Modal>
  );
};
