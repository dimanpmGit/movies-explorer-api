const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');

const getAllMovies = (req, res, next) => {
  Movie.find({}).sort({ createdAt: -1 })
    .then((movie) => res.send(movie))
    .catch(next);
};

const getUserMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId }).sort({ createdAt: -1 })
    .then((movie) => res.send(movie))
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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      } else {
        return Movie.findByIdAndRemove(req.params.id);
      }
    })
    .then(() => res.send({ message: 'Фильм удален' }))
    .catch(next);
};

module.exports = {
  getAllMovies,
  getUserMovies,
  createMovie,
  deleteMovie,
};
