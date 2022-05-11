import React from "react";
import useEscapeClose from "../hooks/useEscapeClose";

function ImagePopup(props) {
  useEscapeClose(props.card, props.onClose);
  return (
    <div
      className={
        props.card
          ? "popup popup_type_image popup_is-opened"
          : "popup popup_type_image"
      }
    >
      <div className="popup__overlay" onClick={props.onClose} />
      <figure className="popup__container-image">
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close-button button"
        />
        <img
          src={props.card?.link}
          alt={props.card?.name}
          className="popup__image"
        />
        <figcaption>
          <h2 className="popup__heading">{props.card?.name}</h2>
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
