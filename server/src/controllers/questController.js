const { getActiveQuests, completeQuest } = require('../services/questEngine');

exports.getQuests = async (req, res, next) => {
  try {
    const quests = await getActiveQuests(req.user._id);
    res.json({ quests });
  } catch (err) { next(err); }
};

exports.complete = async (req, res, next) => {
  try {
    const result = await completeQuest(req.user._id, req.params.questId);
    res.json(result);
  } catch (err) { next(err); }
};
