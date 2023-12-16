import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal, closeModalByClickLayer } from "./modal.js";
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

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const cardsList = document.querySelector(".places__list");

// Модальное окно "Редактировать профиль"
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEdit = document.querySelector(".popup_type_edit");
const profileCloseButton = profileEdit.querySelector(".popup__close");
const saveProfileButton = profileEdit.querySelector(".popup__button");

// Модальное окно "Обновление аватара пользователя"
const avatarImage = document.querySelector(".profile__image-section");
const avatarEdit = document.querySelector(".popup_avatar_edit");
const avatarCloseButton = avatarEdit.querySelector(".popup__close");
const avatarForm = avatarEdit.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_url");
const saveAvatarButton = avatarEdit.querySelector(".popup__button");

// Модальное окно добавления карточки
const newCardAddButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector(".popup_type_new-card");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const newCardSaveButton = newCardModal.querySelector(".popup__button");

const newCardElement = cardTemplate.cloneNode(true);

// Модальное окно с картинкой
const imageModal = document.querySelector(".popup_type_image");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const popupImage = imageModal.querySelector(".popup__image");
const popupImageTitle = imageModal.querySelector(".popup__caption");

// Поля формы добавления новой карточки
const newCardForm = newCardModal.querySelector(".popup__form");
const cardPlaceInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const cardImageUrl = newCardForm.querySelector(".popup__input_type_url");

// Поля формы редактирования профиля
const profileForm = profileEdit.querySelector(".popup__form");
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileJobInput = profileForm.querySelector(
  ".popup__input_type_description"
);

// Имя и информация о себе
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const renderLoading = (isLoading, buttonText) => {
  if (isLoading) {
    buttonText.textContent = "Сохранение";
  } else {
    buttonText.textContent = "Сохранить";
  }
};

// Открытие модального окна "Редактировать профиль"
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(profileEdit);
  clearValidation(profileForm, true);
});

// Закрытие модального окна "Редактировать профиль"
profileCloseButton.addEventListener("click", () => {
  closeModal(profileEdit);
});

// Закрытие модального окна "Редактировать профиль" кликом на оверлей
closeModalByClickLayer(profileEdit);

// Открытие модального окна "Обновление аватара пользователя"
avatarImage.addEventListener("click", () => {
  openModal(avatarEdit);
  clearValidation(avatarForm, true);
});

// Закрытие модального окна "Обновление аватара пользователя"
avatarCloseButton.addEventListener("click", () => {
  closeModal(avatarEdit);
});

// Закрытие модального окна "Обновление аватара пользователя
closeModalByClickLayer(avatarEdit);

// Открытие модального окна новой карточки
newCardAddButton.addEventListener("click", () => {
  openModal(newCardModal);
  clearValidation(newCardForm, true);
});

// Закрытие модального окна новой карточки
newCardCloseButton.addEventListener("click", () => {
  closeModal(newCardModal);
});

// Закрытие модального окна новой карточки кликом на оверлей
closeModalByClickLayer(newCardModal);

// Функция открытия модального окна с картинкой
function openImageModal(cardImageValue, cardImageAltValue, cardPlaceValue) {
  popupImage.src = cardImageValue;
  popupImage.alt = cardImageAltValue;
  popupImageTitle.textContent = cardPlaceValue;
}

// Закрытие модального окна с картинкой
imageModalCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

// Закрытие модального окна с картинкой кликом на оверлей
closeModalByClickLayer(imageModal);

// Обработчик отправки формы обновления аватара пользователя
function avatarFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, saveAvatarButton);

  const avatarValue = avatarInput.value;

  editAvatar(avatarValue)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, saveAvatarButton);
      closeModal(avatarEdit);
      saveAvatarButton.classList.add("form__submit_inactive");
    });

  avatarForm.reset();
}
avatarForm.addEventListener("submit", avatarFormSubmit);

// Обработчик отправки формы редактирования профиля
function profileFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, saveProfileButton);

  const profileNameValue = profileNameInput.value;
  const profileJobValue = profileJobInput.value;

  editProfile(profileNameValue, profileJobValue)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, saveProfileButton);
      saveProfileButton.classList.add("form__submit_inactive");
      closeModal(profileEdit);
    });

  profileForm.reset();
}
profileForm.addEventListener("submit", profileFormSubmit);

// Обработчик отправки формы добавления карточки
function newCardFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, newCardSaveButton);

  const cardImageValue = cardImageUrl.value;
  const cardPlaceValue = cardPlaceInput.value;

  addNewCard(cardImageValue, cardPlaceValue)
    .then((res) => {
      const cardElement = createCard(
        cardTemplate,
        cardImageValue,
        cardPlaceValue,
        res.owner._id,
        res.likes,
        res._id,
        userId,
        imageModal,
        openModal,
        openImageModal,
        deleteCard,
        deleteMyCard,
        likeCard,
        addLike,
        removeLike
      );

      cardsList.prepend(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, newCardSaveButton);
      closeModal(newCardModal);
      newCardSaveButton.classList.add("form__submit_inactive");
    });

  newCardForm.reset();
}

newCardForm.addEventListener("submit", newCardFormSubmit);

Promise.all([getInitialCards(), getProfile()])
  .then(([cardsData, userData]) => {
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    const userId = userData._id;

    //addCard(cardsData, userId);
    cardsData.forEach((element) => {
      const cardElement = createCard(
        cardTemplate,
        element.link,
        element.name,
        element.owner._id,
        element.likes,
        element._id,
        userId,
        imageModal,
        openModal,
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

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
