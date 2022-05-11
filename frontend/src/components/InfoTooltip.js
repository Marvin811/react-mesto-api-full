export default function InfoTooltip(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_is-opened`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__overlay" onClick={props.onClose} />
      <div className="popup__container popup__wrapper">
        <button
          className="popup__close-button button "
          aria-label="Кнопка закрытия редактора формы"
          type="button"
          onClick={props.onClose}
        />
        <img
          src={props.imageTooltip}
          alt={props.imageTooltip}
          className="popup__tooltip"
        />
        <h2 className="form__title popup__title_type_tooltip">
          {props.titleTooltip}
        </h2>
      </div>
    </div>
  );
}
