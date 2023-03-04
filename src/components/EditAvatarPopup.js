import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_data_avatar"
        ref={avatarRef}
        id="avatar-input"
        type="url"
        name="avatar"
        required
        placeholder="Ссылка на картинку"
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
