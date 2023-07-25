// app.js — входной файл
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();
const { errors } = require('celebrate');
const { cors } = require('./middlewares/cors');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const {
  login,
  createUser,
} = require('./controllers/users');

const auth = require('./middlewares/auth');
const {
  signupValidation,
  signinValidation,
} = require('./middlewares/validations');

const { PORT = 3001, NODE_ENV, DB_SERVER } = process.env;

console.log(process.env);
const { DB_DEV_SERVER } = require('./utils/db-config');
const {
  MSG_PAGE_NOT_FOUND,
  MSG_SERVER_WILL_FALL,
} = require('./utils/constants');
const router = require('./routes/index');
const NotFoundError = require('./errors/not-found-error');

const app = express();
app.use(cors);
app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(MSG_SERVER_WILL_FALL);
  }, 0);
});

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, login);

// авторизация
app.use(auth);
app.use('/', router);
app.use('/*', (req, res, next) => next(new NotFoundError(MSG_PAGE_NOT_FOUND)));

// подключаемся к серверу mongo
mongoose.connect((NODE_ENV === 'production' ? DB_SERVER : DB_DEV_SERVER), {});

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// Мидлвар централизованной обработки ошибок
app.use(error);

app.listen(PORT);
