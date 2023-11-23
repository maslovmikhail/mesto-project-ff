import "../pages/index.css";
import { addCard, newCardForm, deleteCard, likeCard } from "./cards.js";
import {
  openModal,
  closeModal,
  closeModalByClickLayer,
  closeModalByEsc,
  profileForm,
  openImageModal,
} from "./modal.js";
import profileAvatar from "../images/avatar.jpg";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
document
  .querySelector(".profile__image")
  .setAttribute("style", `background-image: url(${profileAvatar})`);

const cardsList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEdit = document.querySelector(".popup_type_edit");
const profileCloseButton = profileEdit.querySelector(".popup__close");

const newCardAddButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector(".popup_type_new-card");
const newCardCloseButton = newCardModal.querySelector(".popup__close");

const imageModal = document.querySelector(".popup_type_image");

const imageModalCloseButton = imageModal.querySelector(".popup__close");

// При открытии формы поля «Имя» и «О себе» заполняем теми значениями, которые отображаются на странице.
const formElement = profileEdit.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
nameInput.value = document.querySelector(".profile__title").textContent;
jobInput.value = document.querySelector(".profile__description").textContent;

// Плавное открытие и закрытие модальных окон
profileEdit.classList.add("popup_is-animated");
newCardModal.classList.add("popup_is-animated");
imageModal.classList.add("popup_is-animated");

// Редактирование имени и информации о себе
openModal(profileEditButton, profileEdit);
closeModal(profileCloseButton, profileEdit);
closeModalByClickLayer(profileEdit);
closeModalByEsc(profileEdit);

// Добавление карточки
openModal(newCardAddButton, newCardModal);
closeModal(newCardCloseButton, newCardModal);
closeModalByClickLayer(newCardModal);
closeModalByEsc(newCardModal);

// Открытие попапа с картинкой
closeModal(imageModalCloseButton, imageModal);
closeModalByClickLayer(imageModal);
closeModalByEsc(imageModal);

// Редактирование имени и информации о себе
profileForm(profileEdit);

// Форма добавления карточки
newCardForm(
  newCardModal,
  cardTemplate,
  cardsList,
  imageModal,
  openImageModal,
  deleteCard,
  likeCard
);

// Вывод карточек на страницу
addCard(
  cardTemplate,
  cardsList,
  imageModal,
  openImageModal,
  deleteCard,
  likeCard
);
