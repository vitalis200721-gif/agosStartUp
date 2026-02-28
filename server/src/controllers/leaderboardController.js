const User = require('../models/User');

exports.getLeaderboard = async (req, res, next) => {
  try {
    const { type = 'xp' } = req.query;
    let sort = {};
    if (type === 'xp') sort = { xp: -1 };
    else if (type === 'coins') sort = { coins: -1 };
    else if (type === 'level') sort = { level: -1, xp: -1 };
    else sort = { xp: -1 };

    const players = await User.find({}, 'displayName level xp coins faction')
      .sort(sort)
      .limit(20)
      .lean();

    // Find requesting user's rank
    const userId = req.user?._id;
    let myRank = null;
    if (userId) {
      const allSorted = await User.find({}, '_id').sort(sort).lean();
      myRank = allSorted.findIndex(u => u._id.toString() === userId.toString()) + 1;
    }

    res.json({ players, myRank, type });
  } catch (err) { next(err); }
};
