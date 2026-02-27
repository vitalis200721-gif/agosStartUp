const router = require('express').Router();
const ctrl = require('../controllers/economyController');
const { protect } = require('../middleware/auth');

router.get('/marketplace', ctrl.getMarketplace);
router.post('/purchase/:itemId', protect, ctrl.purchase);
router.get('/inventory', protect, ctrl.getInventory);
router.get('/balance', protect, ctrl.getBalance);

module.exports = router;
