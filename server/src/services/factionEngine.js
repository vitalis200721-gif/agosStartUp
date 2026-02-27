const Faction = require('../models/Faction');
const User = require('../models/User');

/**
 * Calculate territory scores based on faction stats
 */
function calculateTerritoryScore(faction) {
  const memberBonus = faction.members.length * 10;
  const xpBonus = Math.floor(faction.xp / 100);
  const winBonus = faction.winsCount * 5;
  return memberBonus + xpBonus + winBonus;
}

/**
 * Get faction leaderboard sorted by weekly XP
 */
async function getLeaderboard(limit = 10) {
  return Faction.find()
    .sort({ weeklyXp: -1 })
    .limit(limit)
    .populate('leader', 'displayName avatar')
    .lean();
}

/**
 * Weekly reset: clear weeklyXp and recalculate ranks
 */
async function weeklyReset() {
  const factions = await Faction.find().sort({ weeklyXp: -1 });

  for (let i = 0; i < factions.length; i++) {
    const faction = factions[i];

    // Award territory based on rank
    if (i === 0) faction.territories += 3;
    else if (i < 3) faction.territories += 2;
    else if (i < 10) faction.territories += 1;

    faction.weeklyRank = i + 1;
    faction.territoryScore = calculateTerritoryScore(faction);
    faction.weeklyXp = 0;
    faction.lastWeeklyReset = new Date();
    await faction.save();
  }

  console.log(`✅ Weekly faction reset complete. ${factions.length} factions updated.`);
}

/**
 * Add XP to a faction and its contributing member
 */
async function contributeFactionXP(userId, amount) {
  const user = await User.findById(userId).populate('faction');
  if (!user?.faction) return null;

  const faction = await Faction.findById(user.faction._id || user.faction);
  if (!faction) return null;

  await faction.addXP(amount);
  faction.totalGamesPlayed += 1;
  await faction.save();

  return faction;
}

module.exports = { calculateTerritoryScore, getLeaderboard, weeklyReset, contributeFactionXP };
