const router = require('express').Router();
const ctrl = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.get('/:id', protect, ctrl.getOne);
router.post('/:id/join', protect, ctrl.join);
router.put('/:id/progress', protect, ctrl.updateProgress);

module.exports = router;
