import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
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
  }

  return (
    <div className="content">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />

      <PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        children={
          <>
            <input
              className="popup__input popup__input_data_avatar"
              id="avatar-input"
              type="url"
              name="avatar"
              required
              placeholder="Ссылка на картинку"
            />
            <span className="popup__input-error avatar-input-error"></span>
            <button
              className="popup__submit-btn"
              type="submit">
              Сохранить
            </button>
          </>
        }
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        children={
          <>
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
            <button
              className="popup__submit-btn"
              type="submit">
              Сохранить
            </button>
          </>
        }
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title="Новое место"
        name="add-card"
        children={
          <>
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
            <button
              className="popup__submit-btn"
              type="submit">
              Сохранить
            </button>
          </>
        }
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
