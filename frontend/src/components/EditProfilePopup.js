import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const handleName = (evt) => setName(evt.target.value);
    const handleDescription = (evt) => setDescription(evt.target.value)

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }
// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            name="edit"
            title='Редактировать профиль'
            submit='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_user_name"
                   type="text"
                   name="name"
                   id="user-name"
                   required
                   minLength="2"
                   maxLength="40"
                   placeholder="Введите имя"
                   onChange={handleName}
                   value={name || ''}
            />
            <span className="popup__error-visible" id="name-error"></span>
            <input className="popup__input popup__input_user_job"
                   type="text"
                   name="info"
                   id="job"
                   required
                   minLength="2"
                   maxLength="200"
                   placeholder="Расскажите о себе"
                   onChange={handleDescription}
                   value={description || ''}
            />
            <span id="job-error" className="popup__error-visible"></span>
        </PopupWithForm>
    )
}


export default EditProfilePopup;