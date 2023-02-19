import React, {
  useEffect,
  useState,
} from "react";
import { api } from "../utils/api";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userDescription, setUserDescription] =
    useState("");
  const [userAvatar, setUserAvatar] =
    useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((profileData) => {
        setUserName(profileData.name);
        setUserId(profileData._id);
        setUserDescription(profileData.about);
        setUserAvatar(profileData.avatar);
      })
      .catch((err) => console.log(err));

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
              src={userAvatar}
              alt="аватарка"
            />
          </div>

          <div>
            <div className="profile__name-flex-box">
              <h1 className="profile__name">
                {userName}
              </h1>
              <button
                className="profile__edit-btn"
                type="button"
                aria-label="редактирование профиля"
                onClick={onEditProfile}></button>
            </div>
            <h2 className="profile__about">
              {userDescription}
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
          <Card
            card={card}
            userId={userId}
            onCardClick={onCardClick}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}
