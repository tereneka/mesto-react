import React, { useEffect } from "react";

export default function ImagePopup({
  card,
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
    if (e.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    card
      ? document.addEventListener(
          "keydown",
          closePopupByEsc
        )
      : document.removeEventListener(
          "keydown",
          closePopupByEsc
        );
  }, [card]);

  return (
    <div
      className={`popup popup_name_fullscreen-photo ${
        card ? "popup_opened" : ""
      }`}
      onClick={closePopup}>
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
