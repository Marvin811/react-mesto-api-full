class Api {
  constructor({ address }) {
    this._address = address;
  }

  _handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  };

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._handleResponse);
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._handleResponse);
  }

  editAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ avatar: data.avatar }),
    }).then(this._handleResponse);
  }

  deleteCard(_id) {
    return fetch(`${this._address}/cards/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponse);
  }

  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }
}

const api = new Api({
  address: "https://marvin811.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
