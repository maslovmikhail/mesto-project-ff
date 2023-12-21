import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getProfile,
  editProfile,
  addNewCard,
  deleteMyCard,
  addLike,
  removeLike,
  editAvatar,
} from "./api.js";
import { handleSubmit } from "../utils/functions.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const cardsList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

// Модальное окно "Редактировать профиль"
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEdit = document.querySelector(".popup_type_edit");

// Модальное окно "Обновление аватара пользователя"
const avatarImage = document.querySelector(".profile__image-section");
const avatarEdit = document.querySelector(".popup_avatar_edit");
const avatarForm = document.forms["edit-avatar"];
const avatarInput = avatarForm.querySelector(".popup__input_type_url");

// Модальное окно добавления карточки
const newCardAddButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector(".popup_type_new-card");

// Модальное окно с картинкой
const imageModal = document.querySelector(".popup_type_image");
const popupImage = imageModal.querySelector(".popup__image");
const popupImageTitle = imageModal.querySelector(".popup__caption");

// Поля формы добавления новой карточки
const newCardForm = document.forms["new-place"];
const cardPlaceInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const cardImageUrl = newCardForm.querySelector(".popup__input_type_url");

// Поля формы редактирования профиля
const profileForm = document.forms["edit-profile"];
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileJobInput = profileForm.querySelector(
  ".popup__input_type_description"
);

// Имя и информация о себе
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

let userId;

Promise.all([getInitialCards(), getProfile()])
  .then(([cardsData, userData]) => {
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userId = userData._id;

    cardsData.forEach((element) => {
      const cardElement = createCard(
        cardTemplate,
        element.link,
        element.name,
        element.owner._id,
        element.likes,
        element._id,
        userId,
        openImageModal,
        deleteCard,
        deleteMyCard,
        likeCard,
        addLike,
        removeLike
      );

      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Открытие модального окна "Редактировать профиль"
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(profileEdit);
  clearValidation(profileForm, validationConfig);
});

// Открытие модального окна "Обновление аватара пользователя"
avatarImage.addEventListener("click", () => {
  openModal(avatarEdit);
  clearValidation(avatarForm, validationConfig);
});

// Открытие модального окна новой карточки
newCardAddButton.addEventListener("click", () => {
  openModal(newCardModal);
  clearValidation(newCardForm, validationConfig);
});

// Функция открытия модального окна с картинкой
function openImageModal(cardImageValue, cardImageAltValue, cardPlaceValue) {
  popupImage.src = cardImageValue;
  popupImage.alt = cardImageAltValue;
  popupImageTitle.textContent = cardPlaceValue;
  openModal(imageModal);
}

// Закрытие модального окна
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

// Обработчик отправки формы обновления аватара пользователя
function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return editAvatar(avatarInput.value).then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closeModal(avatarEdit);
    });
  }

  handleSubmit(makeRequest, evt);
}
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return editProfile(profileNameInput.value, profileJobInput.value).then(
      (res) => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closeModal(profileEdit);
      }
    );
  }

  handleSubmit(makeRequest, evt);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Обработчик отправки формы добавления карточки
function handleNewCardFormSubmit(evt) {
  const cardImageValue = cardImageUrl.value;
  const cardPlaceValue = cardPlaceInput.value;

  function makeRequest() {
    return addNewCard(cardImageUrl.value, cardPlaceInput.value).then((res) => {
      closeModal(newCardModal);
      newCardForm.reset();
      const cardElement = createCard(
        cardTemplate,
        cardImageValue,
        cardPlaceValue,
        res.owner._id,
        res.likes,
        res._id,
        userId,
        openImageModal,
        deleteCard,
        deleteMyCard,
        likeCard,
        addLike,
        removeLike
      );

      cardsList.prepend(cardElement);
    });
  }

  handleSubmit(makeRequest, evt);
}

newCardForm.addEventListener("submit", handleNewCardFormSubmit);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
