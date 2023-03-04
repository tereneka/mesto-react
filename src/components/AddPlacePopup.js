import React, {
  useEffect,
  useState,
} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_data_card-name"
        value={name}
        onChange={handleNameChange}
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
        value={link}
        onChange={handleLinkChange}
        id="card-link-input"
        placeholder="Ссылка на картинку"
        type="url"
        name="cardLink"
        required
      />
      <span className="popup__input-error card-link-input-error"></span>
    </PopupWithForm>
  );
}
