import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
}) {
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
              src="#"
              alt="аватарка"
            />
          </div>

          <div>
            <div className="profile__name-flex-box">
              <h1 className="profile__name"></h1>
              <button
                className="profile__edit-btn"
                type="button"
                aria-label="редактирование профиля"
                onClick={onEditProfile}></button>
            </div>
            <h2 className="profile__about"></h2>
          </div>
        </div>

        <button
          className="profile__add-btn"
          type="button"
          aria-label="добавление поста"
          onClick={onAddPlace}></button>
      </section>

      <section className="elements"></section>
    </main>
  );
}
