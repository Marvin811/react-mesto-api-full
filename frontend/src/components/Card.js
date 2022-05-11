import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const handleClick = () => props.onCardClick(props.card);
    const handleLikeClick = () => props.onCardLike(props.card);
    const handleDeleteClick = () => props.onCardDelete(props.card);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `button ${isOwn ? 'elements__delete-button' : 'elements__delete-button_none'}`
    );
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `button elements__like-button ${isLiked ? 'elements__like-button_active' : 'button elements__like-button'}`);

    return (
        <div className="elements__list-items">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img
                src={props.card.link}
                alt={props.card.name}
                onClick={handleClick}
                className="elements__image"/>
            <div className="elements__container">
                <h2 className="elements__heading">{props.card.name}</h2>
                <div className="elements__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}
                            aria-label="Like"></button>
                    <span className="elements__like-amount">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;