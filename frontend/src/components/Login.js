import React from "react";

function Login({onLogin}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    function handleSumbit(e) {
        e.preventDefault();
        if(!email || !password){
            return
        }
        onLogin(email, password)
    }

    return (
        <section className='entrance'>
            <div className='entrance__container'>
                <h3 className='entrance__title'>Вход</h3>
                <form onSubmit={handleSumbit} className='entrance__form'>
                    <input
                        value={email}
                        onChange={handleChangeEmail}
                        className='entrance__input'
                        required
                        name='email'
                        type='text'
                        placeholder="Email"/>
                    <span className="entrance__error-visible" id="name-error"></span>
                    <input
                        value={password}
                        onChange={handleChangePassword}
                        className='entrance__input'
                        required
                        name='password'
                        type='password'
                        placeholder="Пароль"/>
                    <span className="entrance__error-visible" id="name-error"></span>
                    <button className="button entrance__save-button" type="submit">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default Login