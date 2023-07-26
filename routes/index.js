const router = require('express').Router();

const {
  createMovieValidation,
  idValidation,
  updateProfileValidation,
} = require('../middlewares/validations');
const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  getCurrentUser,
  updateProfile,
  signout,
} = require('../controllers/users');

router.post('/signout', signout);
router.get('/movies', getUserMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/:id', idValidation, deleteMovie);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = router;
