const router = require('express').Router();
const ctrl = require('../controllers/hackingController');
const { protect } = require('../middleware/auth');

router.get('/config', ctrl.getConfig);
router.get('/challenge', protect, ctrl.getChallenge);
router.post('/attempt', protect, ctrl.attemptHack);

module.exports = router;
