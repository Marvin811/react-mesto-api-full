import React from "react";
import {Link} from "react-router-dom";

function Register({onRegister}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('')

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(password, email)
    }

    return (
        <section className='entrance'>
            <div className='entrance__container'>
                <h3 className='entrance__title'>Регистрация</h3>
                <form onSubmit={handleSubmit} className='entrance__form'>
                    <input
                        value={email}
                        onChange={handleChangeEmail}
                        minLength='2'
                        maxLength='40'
                        className='entrance__input'
                        required
                        name='email'
                        type='text'
                        placeholder="Email"/>
                    <input
                        value={password}
                        onChange={handleChangePassword}
                        minLength='8'
                        maxLength='20'
                        className='entrance__input'
                        required
                        name='password'
                        type='password'
                        placeholder="Пароль"/>
                    <button className="button entrance__save-button" type="submit">Зарегистрироваться</button>
                    <Link to='sign-in' className='entrance__link'>Уже зарегистрированы? Войти</Link>
                </form>
            </div>
        </section>
    )
}

export default Register