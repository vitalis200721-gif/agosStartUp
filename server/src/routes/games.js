const router = require('express').Router();
const ctrl = require('../controllers/gameController');

router.get('/', ctrl.getAll);
router.get('/clusters', ctrl.getGenreClusters);
router.get('/:id', ctrl.getOne);

module.exports = router;
