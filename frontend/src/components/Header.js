import React from "react";
import headerLogo from "../images/logo-mesto.svg";
import { Link, Route, Switch } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место" className="header__logo" />
      <div>
        <Switch>
          <Route path="/sign-up">
            <Link to="sign-in" className="header__link">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link to="sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/">
            <div className="header__info">
              <p className="header__email">{email}</p>
              <button
                onClick={onSignOut}
                className="header__link header__button"
              >
                Выйти
              </button>
            </div>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
