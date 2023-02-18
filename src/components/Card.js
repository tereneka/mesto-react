import React from "react";

export default function Card({ card }) {
  return (
    <div className="elements__item">
      <img
        className="elements__photo"
        src={card.link}
        alt={card.name}
      />
      <button
        className="elements__trash"
        type="button"
        aria-label="удалить"></button>
      <div className="elements__title-flex-box">
        <h3 className="elements__title">
          {card.name}
        </h3>
        <div>
          <button
            className="elements__like"
            type="button"
            aria-label="нравится"></button>
          <p className="elements__like-count">
            {card.likes.length}
          </p>
        </div>
      </div>
    </div>
  );
}
