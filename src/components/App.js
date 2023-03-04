import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
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
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleUpdateUser(newUserInfo) {
    api.setUserInfo(newUserInfo).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }
  function handleUpdateAvatar(newAvatar) {
    api.setAvatar(newAvatar).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => setCurrentUser(data));
  }, []);

  return (
    <div className="content">
      <CurrentUserContext.Provider
        value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
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

        <PopupWithForm
          title="Новое место"
          name="add-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <input
            className="popup__input popup__input_data_card-name"
            id="card-name-input"
            placeholder="Название"
            type="text"
            name="cardName"
            autoFocus
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__input-error card-name-input-error"></span>
          <input
            className="popup__input popup__input_data_card-link"
            id="card-link-input"
            placeholder="Ссылка на картинку"
            type="url"
            name="cardLink"
            required
          />
          <span className="popup__input-error card-link-input-error"></span>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
