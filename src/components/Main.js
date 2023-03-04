import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { CardContext } from "../contexts/CardContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import Card from "./Card";

export default function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(
    CurrentUserContext
  );

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-box">
            <button
              className="profile__edit-avatar-btn"
              type="button"
              onClick={onEditAvatar}></button>
            <img
              className="profile__avatar"
              src={currentUser?.avatar}
              alt="аватарка"
            />
          </div>

          <div>
            <div className="profile__name-flex-box">
              <h1 className="profile__name">
                {currentUser?.name}
              </h1>
              <button
                className="profile__edit-btn"
                type="button"
                aria-label="редактирование профиля"
                onClick={onEditProfile}></button>
            </div>
            <h2 className="profile__about">
              {currentUser?.about}
            </h2>
          </div>
        </div>

        <button
          className="profile__add-btn"
          type="button"
          aria-label="добавление поста"
          onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <CardContext.Provider
            value={card}
            key={card._id}>
            <Card
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          </CardContext.Provider>
        ))}
      </section>
    </main>
  );
}
