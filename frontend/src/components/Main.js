import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext)

    // const [userName, setUserName] = useState('');
    // const [userDescription, setUserDescription] = useState('');
    // const [userAvatar, setUserAvatar] = useState('');


    //  useEffect(() => {
    // Api.getUser()
    //     .then((res) => {
    //         setUserName(res.name)
    //         setUserDescription(res.about)
    //         setUserAvatar(res.avatar)
    //     })
    //     .then(() => {
    //             Api.getCards()
    //                 .then(card => {
    //                     setCards(
    //                         card.map(item => ({
    //                             title: item.name,
    //                             link: item.link,
    //                             likes: item.likes.length,
    //                             id: item._id,
    //                         }))
    //                     )
    //                 })
    //                 .catch(err => console.log(`Ошибка в main.js при создании картоек ${err}`))
    //         // })
    //         // .catch(err => console.log(`Ошибка в main.js при запросе User ${err}`))
    // }, [])
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__overlay">
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"
                         onClick={props.onEditAvatar}/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__user">{currentUser.name}</h1>
                    <p className="profile__author">{currentUser.about}</p>
                    <button type="button" onClick={props.onEditProfile}
                            className="button profile__edit-button"></button>
                </div>
                <button
                    aria-label="Добавить карточку"
                    onClick={props.onAddPlace}
                    type="button"
                    className="button profile__add-button"></button>
            </section>

            <section className="elements">{
                props.cards.map((item) => {
                    return (<Card key={item._id}
                                  onCardClick={props.onCardClick}
                                  card={item}
                                  onCardLike={props.onCardLike}
                                  onCardDelete={props.onCardDelete}
                    />)
                })
            }
            </section>
        </main>
    );
}

export default Main;