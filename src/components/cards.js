const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Горный район Архыз",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Река в Челябинской области",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Панельные дома многоэтажки",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Горный хребет на Камчатском полуострове",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Железная дорога в лесу",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Байкал зимой",
  },
];

// Функция создания карточки
export function createCard(
  cardTemplate,
  element,
  imageModal,
  openImageModal,
  deleteCard,
  likeCard
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = element.link;
  cardImage.alt = element.alt;
  cardElement.querySelector(".card__title").textContent = element.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);

  const cardImageValue = element.link;
  const cardPlaceValue = element.name;

  openImageModal(cardImage, cardImageValue, cardPlaceValue, imageModal);

  return cardElement;
}

// Форма добавления карточки
export function newCardForm(
  newCardModal,
  cardTemplate,
  cardsList,
  imageModal,
  openImageModal,
  deleteCard,
  likeCard
) {
  const newCardForm = newCardModal.querySelector(".popup__form");

  const cardPlaceInput = newCardForm.querySelector(
    ".popup__input_type_card-name"
  );
  const cardImageUrl = newCardForm.querySelector(".popup__input_type_url");

  function handleCardSubmit(evt) {
    evt.preventDefault();

    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");

    cardImage.src = cardImageUrl.value;
    cardElement.querySelector(".card__title").textContent =
      cardPlaceInput.value;
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", deleteCard);
    cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", likeCard);

    const cardImageValue = cardImageUrl.value;
    const cardPlaceValue = cardPlaceInput.value;

    openImageModal(cardImage, cardImageValue, cardPlaceValue, imageModal);

    cardsList.prepend(cardElement);
    newCardModal.classList.remove("popup_is-opened");
    cardImageUrl.value = "";
    cardPlaceInput.value = "";
  }
  newCardForm.addEventListener("submit", handleCardSubmit);
}

// Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// Функция лайка карточки
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Функция вывода карточек на страницу
export function addCard(
  cardTemplate,
  cardsList,
  imageModal,
  openImageModal,
  deleteCard,
  likeCard
) {
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
