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
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
}) {
  const currentUser = useContext(
    CurrentUserContext
  );

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (i) => i._id === currentUser._id
    );

    api
      .setCardLikeStatus(card._id, isLiked)
      .then((newCard) =>
        setCards(
          cards.map((c) =>
            c._id === card._id ? newCard : c
          )
        )
      );
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards(
          cards.filter((c) => c._id !== card._id)
        )
      );
  }

  useEffect(() => {
    api.getCards().then((cardsData) => {
      setCards([...cardsData]);
    });
  }, []);

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
              // card={card}
              // userId={currentUser._id}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </CardContext.Provider>
        ))}
      </section>
    </main>
  );
}
