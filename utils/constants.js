const SALT_ROUNDS = 10;
const URL_PATTERN = /^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,})?(?:[\\/?#]\S*)?$/im;

const MSG_PAGE_NOT_FOUND = 'Страница не найдена';
const MSG_SERVER_WILL_FALL = 'Сервер сейчас упадёт';
const MSG_GOODBYE = 'До свидания';

const MSG_MOVIE_NOT_FOUND = 'Фильм не найден';
const MSG_MOVIE_CAN_DEL_ONLY_OWNER = 'Удалить фильм может только владелец';
const MSG_MOVIE_DELETED = 'Фильм удален';
const MSG_NO_SAVED_MOVIES = 'Сохраненных фильмов нет';

const MSG_USER_NOT_FOUND = 'Пользователь не найден';
const MSG_USER_WRONG_ID = 'Пользователь с указанным id не найден';
const MSG_USER_DUBLICATE = 'Пользователь с таким email уже зарегистрирован';
const MSG_USER_WRONG_DATA = 'Переданы некорректные данные в методы пользователя';
const MSG_USER_WRONG_MAIL_OR_PSSWD = 'Неправильные почта или пароль';

module.exports = {
  URL_PATTERN,
  SALT_ROUNDS,
  MSG_PAGE_NOT_FOUND,
  MSG_SERVER_WILL_FALL,
  MSG_GOODBYE,
  MSG_MOVIE_NOT_FOUND,
  MSG_MOVIE_CAN_DEL_ONLY_OWNER,
  MSG_MOVIE_DELETED,
  MSG_NO_SAVED_MOVIES,
  MSG_USER_NOT_FOUND,
  MSG_USER_WRONG_ID,
  MSG_USER_DUBLICATE,
  MSG_USER_WRONG_DATA,
  MSG_USER_WRONG_MAIL_OR_PSSWD,
};
