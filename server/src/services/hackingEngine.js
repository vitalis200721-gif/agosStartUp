const User = require('../models/User');

/**
 * Cyber-Hacking Mini-Game Engine
 * 
 * The player bets coins and tries to "hack" a sequence.
 * Higher risk = higher reward multiplier.
 * 
 * Difficulties:
 *   easy:   60% win chance, 1.5x multiplier
 *   medium: 40% win chance, 2.5x multiplier
 *   hard:   20% win chance, 5x multiplier
 *   insane: 10% win chance, 10x multiplier
 */

const DIFFICULTIES = {
  easy:   { winChance: 0.60, multiplier: 1.5, gridSize: 3, label: 'Easy' },
  medium: { winChance: 0.40, multiplier: 2.5, gridSize: 4, label: 'Medium' },
  hard:   { winChance: 0.20, multiplier: 5.0, gridSize: 5, label: 'Hard' },
  insane: { winChance: 0.10, multiplier: 10.0, gridSize: 6, label: 'Insane' }
};

const MIN_BET = 10;
const MAX_BET = 1000;

/**
 * Generate a hacking challenge
 * Returns the grid data and the correct sequence to solve
 */
function generateChallenge(difficulty) {
  const config = DIFFICULTIES[difficulty];
  if (!config) throw Object.assign(new Error('Invalid difficulty'), { statusCode: 400 });

  const gridSize = config.gridSize;
  // Generate hex codes for the grid
  const grid = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    grid.push(randomHex());
  }

  // Pick a random sequence of 3 positions as the "target"
  const targetLength = Math.min(3, gridSize);
  const targetPositions = [];
  while (targetPositions.length < targetLength) {
    const pos = Math.floor(Math.random() * grid.length);
    if (!targetPositions.includes(pos)) targetPositions.push(pos);
  }

  const targetSequence = targetPositions.map(p => grid[p]);

  return { grid, gridSize, targetSequence, targetPositions, config };
}

function randomHex() {
  return '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Resolve a hacking attempt
 * The server determines win/loss based on probability (not player skill for now)
 * This keeps it fair and prevents client-side cheating
 */
async function resolveHack(userId, difficulty, betAmount) {
  const config = DIFFICULTIES[difficulty];
  if (!config) throw Object.assign(new Error('Invalid difficulty'), { statusCode: 400 });

  if (betAmount < MIN_BET || betAmount > MAX_BET) {
    throw Object.assign(new Error(`Bet must be between ${MIN_BET} and ${MAX_BET} coins`), { statusCode: 400 });
  }

  const user = await User.findById(userId);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  if (user.coins < betAmount) throw Object.assign(new Error('Not enough coins!'), { statusCode: 400 });

  // Determine outcome
  const roll = Math.random();
  const won = roll < config.winChance;

  if (won) {
    const winnings = Math.floor(betAmount * config.multiplier);
    user.coins += winnings;
    user.hackingWins = (user.hackingWins || 0) + 1;
    // Also give some XP for playing
    await user.addXP(10 + Math.floor(winnings * 0.05));

    const { checkAchievements } = require('./achievementEngine');
    checkAchievements(user._id, 'hacking_wins', user.hackingWins).catch(console.error);
    checkAchievements(user._id, 'coins_earned', user.coins).catch(console.error);

    return {
      won: true,
      message: `SYSTEM BREACHED! +${winnings} coins`,
      winnings,
      coinsAfter: user.coins,
      xpGained: 10 + Math.floor(winnings * 0.05)
    };
  } else {
    user.coins -= betAmount;
    await user.save();

    return {
      won: false,
      message: `FIREWALL DETECTED! -${betAmount} coins`,
      lost: betAmount,
      coinsAfter: user.coins,
      xpGained: 5 // consolation XP
    };
  }
}

module.exports = { generateChallenge, resolveHack, DIFFICULTIES, MIN_BET, MAX_BET };
