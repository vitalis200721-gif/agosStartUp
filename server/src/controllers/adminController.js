const User = require('../models/User');

exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCoins = await User.aggregate([{ $group: { _id: null, total: { $sum: '$coins' } } }]);
    const topLevel = await User.findOne().sort({ level: -1 }).select('displayName level');
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(10).select('displayName level coins createdAt faction');
    const factionStats = await User.aggregate([
      { $group: { _id: '$faction', count: { $sum: 1 }, totalXp: { $sum: '$xp' } } },
      { $sort: { totalXp: -1 } }
    ]);

    res.json({
      totalUsers,
      totalCoinsInEconomy: totalCoins[0]?.total || 0,
      topPlayer: topLevel,
      recentUsers,
      factionStats
    });
  } catch (err) { next(err); }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('displayName email level xp coins faction createdAt role isBanned').lean();
    res.json({ users });
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { xp, coins, role, isBanned } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (xp !== undefined) user.xp = Number(xp);
    if (coins !== undefined) user.coins = Number(coins);
    if (role !== undefined) user.role = role;
    if (isBanned !== undefined) user.isBanned = Boolean(isBanned);
    
    await user.save();
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, message: 'User permanently deleted' });
  } catch (err) { next(err); }
};

exports.giveCoins = async (req, res, next) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.coins += Number(amount);
    await user.save();
    res.json({ success: true, coins: user.coins });
  } catch (err) { next(err); }
};
