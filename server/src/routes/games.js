const router = require('express').Router();
const ctrl = require('../controllers/gameController');

router.get('/', ctrl.getAll);
router.get('/clusters', ctrl.getGenreClusters);
router.get('/:id', ctrl.getOne);

const { protect } = require('../middleware/auth');
router.post('/play/:id', protect, ctrl.playGame);

module.exports = router;
