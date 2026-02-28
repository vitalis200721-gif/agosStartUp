const Notification = require('../models/Notification');

exports.getNotifications = async (req, res, next) => {
  try {
    const notifs = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 }).limit(30).lean();
    const unreadCount = await Notification.countDocuments({ userId: req.user._id, isRead: false });
    res.json({ notifications: notifs, unreadCount });
  } catch (err) { next(err); }
};

exports.markRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
    res.json({ success: true });
  } catch (err) { next(err); }
};

exports.createNotification = async (userId, type, title, message, data = {}) => {
  return Notification.create({ userId, type, title, message, data });
};
