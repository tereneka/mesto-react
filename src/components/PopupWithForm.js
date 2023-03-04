import React, { useEffect } from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
}) {
  function closePopup(e) {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains(
        "popup__close-btn"
      )
    ) {
      onClose();
    }
  }

  function closePopupByEsc(e) {
    console.log("esc");
    if (e.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    isOpen
      ? document.addEventListener(
          "keydown",
          closePopupByEsc
        )
      : document.removeEventListener(
          "keydown",
          closePopupByEsc
        );
  }, [isOpen]);

  return (
    <div
      className={`popup popup_name_${name} ${
        isOpen ? "popup_opened" : ""
      }`}
      onClick={closePopup}>
      <div className="popup__container popup__container_for_form">
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
            <button
              className="popup__submit-btn"
              type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
