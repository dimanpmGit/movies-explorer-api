const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      minlength: 2,
    },
    director: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 4,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 3000,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Некорректный url изображения',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Некорректный url изображения',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
      minlength: 2,
    },
    nameEN: {
      type: String,
      required: true,
      minlength: 2,
    },
    likedMovieId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
