const router = require('express').Router();
const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  idValidation,
} = require('../middlewares/validations');

router.get('/', getUserMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:id', idValidation, deleteMovie);

module.exports = router;
