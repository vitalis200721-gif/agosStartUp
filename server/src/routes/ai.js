const router = require('express').Router();
const { submitMood, getRecommendations, getProfileAnalysis, logGamePlay } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/mood', protect, submitMood);
router.get('/recommendations', protect, getRecommendations);
router.get('/profile-analysis', protect, getProfileAnalysis);
router.post('/play-log', protect, logGamePlay);

module.exports = router;
