const Achievement = require('../models/Achievement');
const User = require('../models/User');

/**
 * Core engine to evaluate and unlock achievements.
 * Automatically checks constraints for a specific action type.
 * 
 * @param {String} userId - The ID of the user performing the action
 * @param {String} actionType - 'level_reached', 'games_played', 'coins_earned', 'hacking_wins', 'faction_joined', 'items_bought'
 * @param {Number} actionValue - The new value (e.g. current level 6, or total games played 50)
 */
exports.checkAchievements = async (userId, actionType, actionValue) => {
  try {
    const user = await User.findById(userId).populate('achievements');
    if (!user) return null;

    // Get all achievements for this action type
    const possibleAchievements = await Achievement.find({ 'condition.type': actionType });
    if (!possibleAchievements || possibleAchievements.length === 0) return null;

    const newlyUnlocked = [];

    for (const achievement of possibleAchievements) {
      // Check if user already has it unlocked
      const alreadyHas = user.achievements.some(a => a._id.toString() === achievement._id.toString());
      if (alreadyHas) continue;

      // Check condition
      if (actionValue >= achievement.condition.value) {
        // Unlock it!
        user.achievements.push(achievement._id);
        user.xp += achievement.xpReward || 0;
        user.coins += achievement.coinReward || 0;
        newlyUnlocked.push(achievement);
      }
    }

    if (newlyUnlocked.length > 0) {
      await user.save();
      // Future scope: Emit a Socket.io event here so the frontend can show a toast
      // e.g. req.app.get('io').to(userId.toString()).emit('achievement_unlocked', newlyUnlocked);
      return newlyUnlocked;
    }

    return null;

  } catch (error) {
    console.error('Achievement Engine Error:', error);
    return null;
  }
};
