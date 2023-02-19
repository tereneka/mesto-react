import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
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

  return (
    <div className="content">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input
          className="popup__input popup__input_data_avatar"
          id="avatar-input"
          type="url"
          name="avatar"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="popup__input-error avatar-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <input
          className="popup__input popup__input_data_user-name"
          id="user-name-input"
          type="text"
          name="userName"
          autoFocus
          required
          minLength="2"
          maxLength="40"
          placeholder="Имя"
        />
        <span className="popup__input-error user-name-input-error"></span>
        <input
          className="popup__input popup__input_data_user-about"
          id="user-about-input"
          type="text"
          name="userAbout"
          required
          minLength="2"
          maxLength="200"
          placeholder="О себе"
        />
        <span className="popup__input-error user-about-input-error"></span>
      </PopupWithForm>

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
    </div>
  );
}

export default App;
