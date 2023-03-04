import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [currentUser, setCurrentUser] = useState(
    {}
  );
  const [cards, setCards] = useState([]);

  const [
    isEditAvatarPopupOpen,
    setIsEditAvatarPopupOpen,
  ] = useState(false);
  const [
    isEditProfilePopupOpen,
    setIsEditProfilePopupOpen,
  ] = useState(false);
  const [
    isAddPlacePopupOpen,
    setIsAddPlacePopupOpen,
  ] = useState(false);
  const [selectedCard, setSelectedCard] =
    useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleUpdateAvatar(newAvatar) {
    api.setAvatar(newAvatar).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleUpdateUser(newUserInfo) {
    api.setUserInfo(newUserInfo).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleAddPlace(card) {
    api.postCard(card).then((data) => {
      setCards([data, ...cards]);
      closeAllPopups();
    });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => setCurrentUser(data));
  }, []);

  useEffect(() => {
    api.getCards().then((cardsData) => {
      setCards([...cardsData]);
    });
  }, []);

  return (
    <div className="content">
      <CurrentUserContext.Provider
        value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
