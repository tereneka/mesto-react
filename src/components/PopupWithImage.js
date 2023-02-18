import React, { useEffect } from "react";

export default function PopupWithImage({
  card,
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
      className={`popup popup_name_fullscreen-photo ${
        card ? "popup_opened" : ""
      }`}
      onClick={handleClose}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="закрытие добавления нового места"></button>
        <img
          className="popup__photo"
          src={card?.link}
          alt={card?.name}
        />
        <p className="popup__photo-caption">
          {card?.name}
        </p>
      </div>
    </div>
  );
}
