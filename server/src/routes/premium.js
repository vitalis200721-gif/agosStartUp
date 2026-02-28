const router = require('express').Router();
const ctrl = require('../controllers/premiumController');
const { protect } = require('../middleware/auth');

router.get('/packages', ctrl.getPackages);
router.post('/purchase', protect, ctrl.purchase);

module.exports = router;
