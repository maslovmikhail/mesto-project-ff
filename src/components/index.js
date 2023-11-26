import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import {
  openModal,
  closeModal,
  closeModalByClickLayer,
  closeModalByEsc,
} from "./modal.js";
import { initialCards } from "./cards.js";
import profileAvatar from "../images/avatar.jpg";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
document
  .querySelector(".profile__image")
  .setAttribute("style", `background-image: url(${profileAvatar})`);

const cardsList = document.querySelector(".places__list");

// Модальное окно редактировать профиль
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEdit = document.querySelector(".popup_type_edit");
const profileCloseButton = profileEdit.querySelector(".popup__close");

// Модальное окно добавления карточки
const newCardAddButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector(".popup_type_new-card");
const newCardCloseButton = newCardModal.querySelector(".popup__close");

// Модальное окно с картинкой
const imageModal = document.querySelector(".popup_type_image");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const popupImage = imageModal.querySelector(".popup__image");
const popupTitle = imageModal.querySelector(".popup__caption");

// Поля формы добавления новой карточки
const newCardForm = newCardModal.querySelector(".popup__form");
const cardPlaceInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const cardImageUrl = newCardForm.querySelector(".popup__input_type_url");

// Поля формы редактирования профиля
const profileFormElement = profileEdit.querySelector(".popup__form");
const profileNameInput = profileFormElement.querySelector(
  ".popup__input_type_name"
);
const profileJobInput = profileFormElement.querySelector(
  ".popup__input_type_description"
);

// Имя и информация о себе
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");



// Закрытие модального окна нажатием на Esc
document.addEventListener("click", closeModalByEsc);

// Открытие модального окна "Редактировать профиль"
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(profileEdit);
});

// Закрытие модального окна "Редактировать профиль"
profileCloseButton.addEventListener("click", () => {
  closeModal(profileEdit);
});

// Закрытие модального окна "Редактировать профиль" кликом на оверлей
closeModalByClickLayer(profileEdit);

// Открытие модального окна новой карточки
newCardAddButton.addEventListener("click", () => {
  openModal(newCardModal);
});

// Закрытие модального окна новой карточки
newCardCloseButton.addEventListener("click", () => {
  closeModal(newCardModal);
});

// Закрытие модального окна новой карточки кликом на оверлей
closeModalByClickLayer(newCardModal);

// Функция открытия модального окна с картинкой
function openImageModal(cardImage, cardImageValue, cardPlaceValue) {
  cardImage.addEventListener("click", () => {
    popupImage.src = cardImageValue;
    popupImage.alt = cardPlaceValue;
    popupTitle.textContent = cardPlaceValue;
    openModal(imageModal);
  });
}

// Закрытие модального окна с картинкой
imageModalCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

// Закрытие модального окна с картинкой кликом на оверлей
closeModalByClickLayer(imageModal);



// Обработчик отправки формы редактирования профиля
function profileFormSubmit(evt) {
  evt.preventDefault();

  const profileNameValue = profileNameInput.value;
  const profileJobValue = profileJobInput.value;
  profileTitle.textContent = profileNameValue;
  profileDescription.textContent = profileJobValue;
  closeModal(profileEdit);
}
profileFormElement.addEventListener("submit", profileFormSubmit);


// Обработчик отправки формы добавления карточки
function newCarFormdSubmit(evt) {
  evt.preventDefault();

  const cardElement = createCard(
    cardTemplate,
    evt,
    imageModal,
    openImageModal,
    deleteCard,
    likeCard
  );

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardImageUrl.value;
  cardImage.alt = cardPlaceInput.value;
  cardElement.querySelector(".card__title").textContent = cardPlaceInput.value;

  const cardImageValue = cardImageUrl.value;
  const cardPlaceValue = cardPlaceInput.value;

  openImageModal(cardImage, cardImageValue, cardPlaceValue, imageModal);

  cardsList.prepend(cardElement);
  closeModal(newCardModal);
  newCardForm.reset();
}

newCardForm.addEventListener("submit", newCarFormdSubmit);


// Функция вывода карточек на страницу
function addCard() {
  initialCards.forEach((element) => {
    const cardElement = createCard(
      cardTemplate,
      element,
      imageModal,
      openImageModal,
      deleteCard,
      likeCard
    );

    cardsList.append(cardElement);
  });
}

// Вывод карточек на страницу
addCard();
