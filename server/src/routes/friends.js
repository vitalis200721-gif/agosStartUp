const router = require('express').Router();
const ctrl = require('../controllers/friendController');
const { protect } = require('../middleware/auth');

router.get('/', protect, ctrl.getFriends);
router.post('/request/:id', protect, ctrl.sendRequest);
router.put('/accept/:id', protect, ctrl.acceptRequest);
router.delete('/:id', protect, ctrl.declineOrRemove);

router.get('/messages/:id', protect, ctrl.getMessages);
router.post('/messages/:id', protect, ctrl.sendMessage);

module.exports = router;
