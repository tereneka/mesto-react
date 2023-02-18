import React, { useEffect } from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
}) {
  function handleClose(e) {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains(
        "popup__close-btn"
      )
    ) {
      onClose();
    }
  }

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener(
      "keydown",
      handleEscClose
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscClose
      );
    };
  });

  return (
    <div
      className={`popup popup_name_${name} ${
        isOpen ? "popup_opened" : ""
      }`}
      onClick={handleClose}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="закрытие окна"></button>
        <h3 className="popup__title">{title}</h3>
        <p className="error"></p>
        <div className="popup__content-box">
          <form
            className="popup__form"
            method="post"
            name={name}
            noValidate>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
