const router = require('express').Router();
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

const {
  updateProfileValidation,
} = require('../middlewares/validations');

router.get('/me', getCurrentUser);
router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;
