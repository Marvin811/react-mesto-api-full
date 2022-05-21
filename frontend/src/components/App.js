import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState } from "react";
import Api from "../utils/Api";
import { setToken, removeToken } from "../utils/token";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import success from "../images/success.svg";
import unSuccess from "../images/unSuccess.svg";

import * as Auth from "../utils/Auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentCard, setCurrentCard] = useState([]);

  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({
    imageTooltip: "",
    titleTooltip: "",
  });

  const [cardToDelete, setCardToDelete] = useState();

  const [selectorCard, setSelectorCard] = useState(null);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleLoggedIn = () => setLoggedIn(true);
  const handleIsInfoTooltip = () => setInfoTooltip(true);

  const handleCardClick = (card) => setSelectorCard(card);

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectorCard(false);
    setIsEditProfilePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setInfoTooltip(false);
  };
  React.useEffect(() => {
    if (loggedIn === true) {
      Promise.all([Api.getUserInfo(), Api.getCards()])
        .then(([res, card]) => {
          setCurrentUser(res);
          setCurrentCard(card);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    return Api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCurrentCard((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Error: ${err}`));
  };

  const handleCardDelete = (card) => {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.deleteCard(card._id)
      .then(() => {
        setCurrentCard((state) => {
          return state.filter((i) => i._id !== card._id);
        });
      })
      .catch((err) => console.log(`Ошибка в App.js при лайке карточки ${err}`));
  };

  function handleUpdateUser(userData) {
    return Api.setUserInfo(userData)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Ошибка в App.js при редактировании информации о user ${err}`
        );
      });
  }

  const handleUpdateAvatar = (updateAvatar) => {
    Api.editAvatar(updateAvatar)
      .then((avatar) => setCurrentUser(avatar))
      .catch((err) =>
        console.log(`Ошибка в App.js при обновлении аватара ${err}`)
      );

    setIsEditAvatarPopupOpen(false);
  };
  const handleAddPlaceSubmit = (obj) => {
    Api.addCard({ name: obj.name, link: obj.link })
      .then((newCard) => setCurrentCard([newCard, ...currentCard]))
      .catch((err) =>
        console.log(`Ошибка в App.js при дабовление карточки ${err}`)
      );

    setIsAddPlacePopupOpen(false);
  };
  const handleCardToDelete = (card) => {
    setIsDeleteCardPopupOpen(true);
    setCardToDelete(card);
  };

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.getContent(jwt).then((data) => {
        if (data) {
          setEmail(data.email);
          setLoggedIn(true);
          history.push("/");
        }
      });
    }
  }

  function handleRegister(email, password) {
    return Auth.register(email, password)
      .then(() => {
        setEmail(email);
        history.push("/sign-in");
        setInfoTooltip(true);
        setMessage({
          imageTooltip: success,
          titleTooltip: "Вы успешно зарегистрировались!",
        });
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltip(true);
        setMessage({
          imageTooltip: unSuccess,
          titleTooltip: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function handleLogin(email, password) {
    return Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setEmail(email);
          setInfoTooltip(false);
          setMessage({
            imageTooltip: success,
            titleTooltip: "Вы успешно вошли!",
          });
          handleLoggedIn();
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltip(true);
        setMessage({
          imageTooltip: unSuccess,
          titleTooltip: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function handleSignOut() {
    removeToken("jwt");
    setLoggedIn(false);
    setEmail("");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={email} onSignOut={handleSignOut} />
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={currentCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardToDelete}
            />

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={() => handleCardDelete(cardToDelete)}
          />

          <InfoTooltip
            name="tooltip"
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            imageTooltip={message.imageTooltip}
            titleTooltip={message.titleTooltip}
          />

          <ImagePopup card={selectorCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
