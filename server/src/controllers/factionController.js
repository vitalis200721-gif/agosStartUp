const Faction = require('../models/Faction');
const User = require('../models/User');
const { getLeaderboard, contributeFactionXP, calculateTerritoryScore } = require('../services/factionEngine');

exports.getAll = async (req, res, next) => {
  try {
    const factions = await Faction.find()
      .populate('leader', 'displayName avatar')
      .sort({ xp: -1 })
      .lean();
    res.json({ factions: factions.map(f => ({ ...f, memberCount: f.members.length })) });
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const faction = await Faction.findOne({ slug: req.params.slug })
      .populate('leader', 'displayName avatar level')
      .populate('members', 'displayName avatar level xp');
    if (!faction) return res.status(404).json({ error: 'Faction not found' });
    res.json({ faction });
  } catch (err) { next(err); }
};

exports.join = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.faction) {
      return res.status(400).json({ error: 'You are already in a faction. Leave first.' });
    }
    const faction = await Faction.findById(req.params.id);
    if (!faction) return res.status(404).json({ error: 'Faction not found' });
    if (faction.members.length >= faction.maxMembers) {
      return res.status(400).json({ error: 'Faction is full' });
    }

    faction.members.push(user._id);
    await faction.save();

    user.faction = faction._id;
    user.factionJoinedAt = new Date();
    await user.save();

    const { checkAchievements } = require('../services/achievementEngine');
    await checkAchievements(user._id, 'faction_joined', 1);

    res.json({ message: `Joined ${faction.name}!`, faction });
  } catch (err) { next(err); }
};

exports.leave = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.faction) {
      return res.status(400).json({ error: 'You are not in a faction' });
    }
    const faction = await Faction.findById(user.faction);
    if (faction) {
      faction.members = faction.members.filter(m => m.toString() !== user._id.toString());
      await faction.save();
    }
    user.faction = null;
    user.factionJoinedAt = null;
    await user.save();
    res.json({ message: 'Left faction' });
  } catch (err) { next(err); }
};

exports.leaderboard = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const factions = await getLeaderboard(limit);
    res.json({ leaderboard: factions.map((f, i) => ({ ...f, rank: i + 1, memberCount: f.members.length })) });
  } catch (err) { next(err); }
};

exports.contributeXP = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const faction = await contributeFactionXP(req.user._id, amount || 10);
    if (!faction) return res.status(400).json({ error: 'Not in a faction' });
    res.json({ faction });
  } catch (err) { next(err); }
};
