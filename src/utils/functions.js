const baseUrl = "https://mesto.nomoreparties.co/v1/wff-cohort-2";

// функция которая проверяет ответ от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

// функция запроса с проверкой ответа
export const request = (url, options) => {
  return fetch(`${baseUrl}` + url, options).then(checkResponse);
};

// универсальная функция управления текстом кнопки с 3 и 4 необязательными аргументами
function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// универсальная функция, которая принимает функцию запроса, объект события и текст во время загрузки
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();

  // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;
  // записываем начальный текст кнопки до вызова запроса
  const initialText = submitButton.textContent;
  // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      // любую форму нужно очищать после успешного ответа от сервера
      // а также `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
      evt.target.reset();
    })
    .catch((err) => {
      // в каждом запросе нужно ловить ошибку
      console.error(`Ошибка: ${err}`);
    })
    // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}
