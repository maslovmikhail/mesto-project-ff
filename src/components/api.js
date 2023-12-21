import { request } from "../utils/functions";

const config = {
  headers: {
    authorization: "adc37ab1-da9a-4d2d-aff3-b91854ab8caa",
    "Content-Type": "application/json; charset=UTF-8",
  },
};

export const getInitialCards = () => {
  return request(`/cards`, {
    headers: config.headers,
  });
};

export const getProfile = () => {
  return request(`/users/me`, {
    headers: config.headers,
  });
};

export const editProfile = (profileNameValue, profileJobValue) => {
  return request(`/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileNameValue,
      about: profileJobValue,
    }),
  });
};

export const addNewCard = (cardImageValue, cardPlaceValue) => {
  return request(`/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      link: cardImageValue,
      name: cardPlaceValue,
    }),
  });
};

export const deleteMyCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const addLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};

export const removeLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const editAvatar = (urlAvatar) => {
  return request(`/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: urlAvatar,
    }),
  });
};
