// функция открытия модального окна
export function openModal(button, modal) {
  button.addEventListener("click", () => {
    modal.classList.add("popup_is-opened");
  });
}

// Функция закрытия модального окна
export function closeModal(button, modal) {
  button.addEventListener("click", () => {
    modal.classList.remove("popup_is-opened");
  });
}

// Функция закрытия модального окна кликом на оверлей
export function closeModalByClickLayer(modal) {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      modal.classList.remove("popup_is-opened");
    }
  });
}

// Функция закрытия модального окна нажатием на Esc
export function closeModalByEsc(modal) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      modal.classList.remove("popup_is-opened");
    }
  });
}

// Функция открытия модального окна с картинкой
export function openImageModal(
  cardImage,
  cardImageValue,
  cardPlaceValue,
  imageModal
) {
  cardImage.addEventListener("click", () => {
    const popupImage = imageModal.querySelector(".popup__image");
    const popupCaption = imageModal.querySelector(".popup__caption");
    popupImage.src = cardImageValue;
    popupCaption.textContent = cardPlaceValue;
    imageModal.classList.add("popup_is-opened");
  });
}

// функция открытия модального окна для редактирования профиля
export function profileForm(profileEdit) {
  const formElement = profileEdit.querySelector(".popup__form");
  const nameInput = formElement.querySelector(".popup__input_type_name");
  const jobInput = formElement.querySelector(".popup__input_type_description");

  function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    profileEdit.classList.remove("popup_is-opened");
  }
  formElement.addEventListener("submit", handleFormSubmit);
}
