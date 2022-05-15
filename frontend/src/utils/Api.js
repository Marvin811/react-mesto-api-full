class Api {
    constructor({address, headers}) {
        this._address = address;
        this._token = headers['authorization'];
    }

    _handleResponse = (response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
    }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: {
                authorization: this._token
            },
            credentials: 'include',
        }).then(this._handleResponse)
    }

    getCards() {
        return fetch(`${this._address}/cards`, {
            headers: {
                authorization: this._token
            },
            credentials: 'include',
        }).then(this._handleResponse)
    }

    editAvatar(avatar) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(
                avatar
            )
        })
            .then(this._handleResponse)
    }

    deleteCard(_id) {
        return fetch(`${this._address}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            },
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: {
                authorization: this._token
            },
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    setUserInfo({name, info}) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                about: info
            })
        })
            .then(this._handleResponse)
    }

    addCard({name, link}) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._handleResponse)
    }

}

const api = new Api({
    address: 'https://marvin811.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json'
    },
})

export default api;