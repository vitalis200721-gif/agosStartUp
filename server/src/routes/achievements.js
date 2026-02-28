const router = require('express').Router();
const { getAchievements, seedAchievements } = require('../controllers/achievementController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAchievements);

// Development/Admin endpoint to seed the DB
router.get('/seed', seedAchievements);

module.exports = router;
