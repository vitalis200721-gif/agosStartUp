const { generateChallenge, resolveHack, DIFFICULTIES, MIN_BET, MAX_BET } = require('../services/hackingEngine');

exports.getChallenge = async (req, res, next) => {
  try {
    const difficulty = req.query.difficulty || 'easy';
    const challenge = generateChallenge(difficulty);
    res.json({
      grid: challenge.grid,
      gridSize: challenge.gridSize,
      targetSequence: challenge.targetSequence,
      difficulty,
      config: {
        label: challenge.config.label,
        multiplier: challenge.config.multiplier,
        winChance: Math.round(challenge.config.winChance * 100)
      }
    });
  } catch (err) { next(err); }
};

exports.attemptHack = async (req, res, next) => {
  try {
    const { difficulty, betAmount } = req.body;
    const result = await resolveHack(req.user._id, difficulty, betAmount);
    res.json(result);
  } catch (err) { next(err); }
};

exports.getConfig = async (req, res) => {
  res.json({
    difficulties: Object.entries(DIFFICULTIES).map(([key, val]) => ({
      key,
      label: val.label,
      multiplier: val.multiplier,
      winChance: Math.round(val.winChance * 100),
      gridSize: val.gridSize
    })),
    minBet: MIN_BET,
    maxBet: MAX_BET
  });
};
