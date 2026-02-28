const router = require('express').Router();
const ctrl = require('../controllers/questController');
const { protect } = require('../middleware/auth');

router.get('/', protect, ctrl.getQuests);
router.post('/complete/:questId', protect, ctrl.complete);

module.exports = router;
