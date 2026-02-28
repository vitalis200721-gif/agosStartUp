const router = require('express').Router();
const { register, login, getMe, updateProfile, allocateSkillPoint, googleAuth, googleCallback } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.post('/skills', protect, allocateSkillPoint);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

module.exports = router;
