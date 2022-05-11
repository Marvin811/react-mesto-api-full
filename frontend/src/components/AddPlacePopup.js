import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleName = (evt) => setName(evt.target.value);
  const handleLink = (evt) => setLink(evt.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onAddCard({
      name,
      link,
    });
  };
  
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      submit="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_title"
        type="text"
        name="place"
        id="place"
        required
        minLength="2"
        maxLength="30"
        placeholder="Название"
        onChange={handleName}
        value={name}
      />
      <span id="place-error" className="popup__error-visible"></span>
      <input
        className="popup__input popup__input_link"
        type="url"
        name="photo"
        id="link"
        required
        placeholder="Ссылка на картинку"
        onChange={handleLink}
        value={link}
      />
      <span id="link-error" className="popup__error-visible"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
