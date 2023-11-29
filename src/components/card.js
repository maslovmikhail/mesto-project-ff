import { openModal } from "./modal";

// Функция создания карточки
export function createCard(
  cardTemplate,
  cardImageValue,
  cardImageAltValue,
  cardPlaceValue,
  imageModal,
  openImageModal,
  deleteCard,
  likeCard
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardImageValue;
  cardImage.alt = cardImageAltValue;
  cardTitle.textContent = cardPlaceValue;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => {
    openImageModal(cardImageValue, cardImageAltValue, cardPlaceValue);
    openModal(imageModal);
  });

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// Функция лайка карточки
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
