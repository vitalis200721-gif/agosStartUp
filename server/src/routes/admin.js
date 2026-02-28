const router = require('express').Router();
const ctrl = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.get('/stats', protect, admin, ctrl.getStats);
router.get('/users', protect, admin, ctrl.getUsers);
router.post('/give-coins', protect, admin, ctrl.giveCoins);
router.put('/users/:id', protect, admin, ctrl.updateUser);
router.delete('/users/:id', protect, admin, ctrl.deleteUser);

module.exports = router;
