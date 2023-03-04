import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
}) {
  const currentUser = useContext(
    CurrentUserContext
  );

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_data_user-name"
        value={name}
        onChange={handleNameChange}
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
        value={about}
        onChange={handleAboutChange}
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
  );
}
