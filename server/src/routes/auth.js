const router = require('express').Router();
const { register, login, getMe, updateProfile, allocateSkillPoint } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.post('/skills', protect, allocateSkillPoint);

module.exports = router;
