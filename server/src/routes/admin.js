const router = require('express').Router();
const ctrl = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

router.get('/stats', protect, ctrl.getStats);
router.get('/users', protect, ctrl.getUsers);
router.post('/give-coins', protect, ctrl.giveCoins);

module.exports = router;
