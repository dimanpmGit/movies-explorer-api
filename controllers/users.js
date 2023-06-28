const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SALT_ROUNDS } = require('../utils/constants');
const {
  MSG_GOODBYE,
  MSG_USER_NOT_FOUND,
  MSG_USER_WRONG_ID,
  MSG_USER_DUBLICATE,
  MSG_USER_WRONG_DATA,
  MSG_USER_WRONG_MAIL_OR_PSSWD,
} = require('../utils/constants');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const ValidationError = require('../errors/validation-error');
const AuthError = require('../errors/auth-error');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MSG_USER_NOT_FOUND);
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MSG_USER_WRONG_ID);
      }
      return res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res
      .status(201)
      .send({
        _id: user._id,
        name: user.name,
        email: user.email,
      }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(MSG_USER_DUBLICATE));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(MSG_USER_WRONG_DATA));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({
          _id: user._id,
          token,
        });
    })
    .catch(next);
};

const signout = (req, res, next) => {
  const { email } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(MSG_USER_WRONG_MAIL_OR_PSSWD));
      }
      res.clearCookie('jwt');
      return res.send({ message: MSG_GOODBYE });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  updateProfile,
  createUser,
  login,
  signout,
};
