/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__user">{currentUser.name}</h1>
          <p className="profile__author">{currentUser.about}</p>
          <button
            type="button"
            onClick={onEditProfile}
            className="button profile__edit-button"
          ></button>
        </div>
        <button
          aria-label="Добавить карточку"
          onClick={onAddPlace}
          type="button"
          className="button profile__add-button"
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              onCardClick={onCardClick}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
