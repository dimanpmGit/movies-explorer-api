const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const {
  MSG_MOVIE_NOT_FOUND,
  MSG_MOVIE_CAN_DEL_ONLY_OWNER,
  MSG_MOVIE_DELETED,
  MSG_NO_SAVED_MOVIES,
} = require('../utils/constants');

const getAllMovies = (req, res, next) => {
  Movie.find({}).sort({ createdAt: -1 })
    .then((movie) => res.send(movie))
    .catch(next);
};

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }).sort({ createdAt: -1 })
    .then((movie) => {
      if (movie.length === 0) {
        res.send({ message: MSG_NO_SAVED_MOVIES });
      }
      res.send(movie);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    likedMovieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
    likedMovieId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MSG_MOVIE_NOT_FOUND);
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(MSG_MOVIE_CAN_DEL_ONLY_OWNER);
      } else {
        return Movie.findByIdAndRemove(req.params.id);
      }
    })
    .then(() => res.send({ message: MSG_MOVIE_DELETED }))
    .catch(next);
};

module.exports = {
  getAllMovies,
  getUserMovies,
  createMovie,
  deleteMovie,
};
