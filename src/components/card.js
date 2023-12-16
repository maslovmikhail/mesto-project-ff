// Функция создания карточки
export function createCard(
  cardTemplate,
  cardImageValue,
  cardPlaceValue,
  cardOwnerId,
  cardLikes,
  cardId,
  userId,
  imageModal,
  openModal,
  openImageModal,
  deleteCard,
  deleteMyCard,
  likeCard,
  addLike,
  removeLike
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikesQty = cardElement.querySelector(".card__likes-qty");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardLikesQty.textContent = cardLikes.length;

  if (cardOwnerId !== userId) {
    cardDeleteButton.style.display = "none";
  }

  cardLikes.forEach((elment) => {
    if (elment._id === userId) {
      cardLikeButton.classList.add("card__like-button_is-active");
    } else {
      cardLikeButton.classList.remove("card__like-button_is-active");
    }
  });

  cardImage.src = cardImageValue;
  cardImage.alt = cardPlaceValue;
  cardTitle.textContent = cardPlaceValue;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      deleteCard(evt, deleteMyCard, cardId);
    });

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      likeCard(
        evt,
        cardLikes,
        userId,
        cardId,
        cardLikesQty,
        addLike,
        removeLike
      );
    });

  cardImage.addEventListener("click", () => {
    openImageModal(cardImageValue, cardPlaceValue, cardPlaceValue);
    openModal(imageModal);
  });

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(evt, deleteMyCard, cardId) {
  deleteMyCard(cardId)
    .then(() => {
      evt.target.closest(".card").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция лайка карточки
export function likeCard(
  evt,
  cardLikes,
  userId,
  cardId,
  cardLikesQty,
  addLike,
  removeLike
) {
  if (!cardLikes.some((element) => element._id === userId)) {
    addLike(cardId)
      .then((res) => {
        evt.target.classList.add("card__like-button_is-active");
        cardLikesQty.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLike(cardId)
      .then((res) => {
        evt.target.classList.remove("card__like-button_is-active");
        cardLikesQty.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
