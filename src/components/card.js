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

// Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// Функция лайка карточки
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
