import classes from "./Modal.module.css";
import React, { useEffect, useRef } from "react";
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
    <div ref={props.modalRef} className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const modalRef = useRef();
  useEffect(() => {
    disableBodyScroll(modalRef);

    return () => {
      enableBodyScroll(modalRef);
      clearAllBodyScrollLocks();
    };
  }, []);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay modalRef={modalRef}>{props.children}</ModalOverlay>,
        portalElement
      )}
      {}
    </>
  );
};

export default Modal;
