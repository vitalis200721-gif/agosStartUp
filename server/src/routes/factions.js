const router = require('express').Router();
const ctrl = require('../controllers/factionController');
const { protect } = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.get('/leaderboard', ctrl.leaderboard);
router.get('/:slug', ctrl.getOne);
router.post('/:id/join', protect, ctrl.join);
router.post('/leave', protect, ctrl.leave);
router.post('/contribute', protect, ctrl.contributeXP);

module.exports = router;
