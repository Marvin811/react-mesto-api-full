import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup (props) {
    const avatarRef = React.useRef('')

    const handleSubmit = (e)  => {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen])
    return(
        <PopupWithForm
            name="avatar"
            title='Обновить аватар'
            submit='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_link"
                   type="url"
                   name="avatar"
                   id="avatar"
                   required
                   placeholder="Ссылка на картинку"
                   ref={avatarRef}
            />
            <span id="avatar-error" className="popup__error-visible"></span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup