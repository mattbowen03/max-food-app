import classes from "./Modal.module.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const bodyRef = document.body;

  useEffect(() => {
    disableBodyScroll(bodyRef, {
      allowTouchMove: (el) => el.className === "modal",
    });

    return () => {
      enableBodyScroll(bodyRef);
      clearAllBodyScrollLocks();
    };
  }, [bodyRef]);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
      {}
    </>
  );
};

export default Modal;
