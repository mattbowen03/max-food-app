import classes from "./Order-Form.module.css";
import { useContext, useState } from "react";
import React from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const validZip = (value) => value.trim().length === 5;
const isEmail = (value) => value.includes("@");

export const OrderForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [didSubmit, setDidSubmit] = useState(false);

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

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  const {
    value: zipValue,
    isValid: zipIsValid,
    hasError: zipHasError,
    valueChangeHandler: zipChangeHandler,
    inputBlurHandler: zipBlurHandler,
    reset: resetZip,
  } = useInput(validZip);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  console.log(cartCtx);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    streetIsValid &&
    cityIsValid &&
    zipIsValid
  ) {
    formIsValid = true;
  }

  const postData = async (order) => {
    setIsLoading(true);
    setHttpError(null);
    try {
      const response = await fetch(
        "https://react-http-fd1aa-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Uh oh!");
      }
      cartCtx.resetCart();

      resetFirstName();
      resetLastName();
      resetEmail();
      resetCity();
      resetStreet();
      resetZip();
      setDidSubmit(true);
    } catch (error) {
      setHttpError(error.message);
      console.log("Something went wrong!");
    }

    setIsLoading(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const order = {
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
    };

    postData(order);
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

  const streetClasses = streetHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];

  const cityClasses = cityHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];

  const zipClasses = zipHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];

  const btnClasses = !formIsValid ? classes["invalid-button"] : classes.button;

  if (didSubmit) {
    return (
      <Modal onClose={props.onClose}>
        <p>Sucess! Thank you for choosing us!</p>
        <div className={classes.actions}>
          <button
            type='button'
            onClick={props.onClose}
            className={classes.button}>
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={props.onClose}>
      <div className={classes["order-control"]}>
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
                <p className={classes["error-text"]}>
                  Please enter a last name.
                </p>
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
            <div className={streetClasses}>
              <label htmlFor='street'> Street</label>
              <input
                value={streetValue}
                onChange={streetChangeHandler}
                onBlur={streetBlurHandler}
                id='street'
                type='street'
              />
              {streetHasError && (
                <p className={classes["error-text"]}>
                  Please enter a street address.
                </p>
              )}
            </div>
            <div className={cityClasses}>
              <label htmlFor='city'> City</label>
              <input
                value={cityValue}
                onChange={cityChangeHandler}
                onBlur={cityBlurHandler}
                id='city'
                type='city'
              />
              {cityHasError && (
                <p className={classes["error-text"]}>Please enter a city.</p>
              )}
            </div>
            <div className={zipClasses}>
              <label htmlFor='zip'> Zip</label>
              <input
                value={zipValue}
                onChange={zipChangeHandler}
                onBlur={zipBlurHandler}
                id='zip'
                type='zip'
              />
              {zipHasError && (
                <p className={classes["error-text"]}>
                  Please enter a 5 digit postal code.
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
              type='button'
              className={classes["button--alt"]}
              onClick={props.onReturnToCart}>
              Cart
            </button>
            <button type='submit' className={btnClasses}>
              Place Order
            </button>
          </div>
          {isLoading && <p>Submitting...</p>}
          {httpError && <p>An error has occured. Please try re-submitting.</p>}
        </form>
      </div>
    </Modal>
  );
};
