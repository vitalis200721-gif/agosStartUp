const Quest = require('../models/Quest');
const User = require('../models/User');

/**
 * Daily Quest Templates
 * These are used to generate daily quests for each user
 */
const QUEST_TEMPLATES = [
  // Combat / Hacking
  { title: 'Breach Protocol', description: 'Complete 3 hacking attempts', icon: '🔓', category: 'combat', difficulty: 'easy', coinReward: 75, xpReward: 30, targetProgress: 3 },
  { title: 'High Stakes Hack', description: 'Win a hacking game on Hard difficulty', icon: '💀', category: 'combat', difficulty: 'hard', coinReward: 200, xpReward: 80, targetProgress: 1 },
  { title: 'Winning Streak', description: 'Win 2 hacking games in a row', icon: '🔥', category: 'combat', difficulty: 'medium', coinReward: 150, xpReward: 50, targetProgress: 2 },

  // Economy
  { title: 'Big Spender', description: 'Spend 200 coins in the marketplace', icon: '💰', category: 'economy', difficulty: 'easy', coinReward: 100, xpReward: 25, targetProgress: 1 },
  { title: 'Collector', description: 'Buy 2 different items from the shop', icon: '🛒', category: 'economy', difficulty: 'medium', coinReward: 125, xpReward: 40, targetProgress: 2 },
  { title: 'Mystery Hunter', description: 'Open a Mystery Box', icon: '📦', category: 'economy', difficulty: 'easy', coinReward: 50, xpReward: 20, targetProgress: 1 },

  // Social
  { title: 'Social Butterfly', description: 'Send 5 messages in global chat', icon: '💬', category: 'social', difficulty: 'easy', coinReward: 60, xpReward: 20, targetProgress: 5 },
  { title: 'Faction Pride', description: 'Contribute resources to your faction', icon: '⚔️', category: 'social', difficulty: 'medium', coinReward: 100, xpReward: 35, targetProgress: 1 },
  { title: 'Team Player', description: 'Send 10 messages in global chat', icon: '🌐', category: 'social', difficulty: 'hard', coinReward: 175, xpReward: 60, targetProgress: 10 },

  // Exploration
  { title: 'Explorer', description: 'Visit 3 different pages in AGOS', icon: '🪐', category: 'exploration', difficulty: 'easy', coinReward: 50, xpReward: 15, targetProgress: 3 },
  { title: 'Multiverse Traveler', description: 'Check the Multiverse Map', icon: '🗺️', category: 'exploration', difficulty: 'easy', coinReward: 40, xpReward: 15, targetProgress: 1 },
  { title: 'Event Scout', description: 'Check the Events page', icon: '🌠', category: 'exploration', difficulty: 'easy', coinReward: 40, xpReward: 15, targetProgress: 1 },

  // Creative
  { title: 'Stylish', description: 'Equip a theme from your inventory', icon: '🎨', category: 'creative', difficulty: 'medium', coinReward: 100, xpReward: 30, targetProgress: 1 },
  { title: 'Skill Master', description: 'Allocate a skill point', icon: '🧠', category: 'creative', difficulty: 'easy', coinReward: 60, xpReward: 25, targetProgress: 1 },
  { title: 'Feedback Hero', description: 'Submit feedback about AGOS', icon: '📬', category: 'creative', difficulty: 'easy', coinReward: 75, xpReward: 20, targetProgress: 1 },
];

/**
 * Generate daily quests for a user
 * Picks 4 random quests from templates (1 easy, 1 medium, 1 hard, 1 random)
 */
async function generateDailyQuests(userId) {
  // Check if user already has active quests for today
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const existingQuests = await Quest.find({
    userId,
    expiresAt: { $gt: now }
  });

  if (existingQuests.length >= 4) {
    return existingQuests; // Already have quests for today
  }

  // Clear any old expired quests
  await Quest.deleteMany({ userId, expiresAt: { $lt: now } });

  // Pick quests: 1 easy, 1 medium, 1 hard, 1 random
  const easyQuests = QUEST_TEMPLATES.filter(q => q.difficulty === 'easy');
  const mediumQuests = QUEST_TEMPLATES.filter(q => q.difficulty === 'medium');
  const hardQuests = QUEST_TEMPLATES.filter(q => q.difficulty === 'hard');

  const selected = [];
  selected.push(randomPick(easyQuests));
  selected.push(randomPick(mediumQuests));
  selected.push(randomPick(hardQuests));
  selected.push(randomPick(QUEST_TEMPLATES.filter(q => !selected.includes(q))));

  // Create quest documents
  const quests = selected.map(template => ({
    userId,
    ...template,
    currentProgress: 0,
    isCompleted: false,
    expiresAt: endOfDay
  }));

  const created = await Quest.insertMany(quests);
  return created;
}

/**
 * Get user's active quests (generates if needed)
 */
async function getActiveQuests(userId) {
  return generateDailyQuests(userId);
}

/**
 * Complete a quest and award rewards
 */
async function completeQuest(userId, questId) {
  const quest = await Quest.findOne({ _id: questId, userId });
  if (!quest) throw Object.assign(new Error('Quest not found'), { statusCode: 404 });
  if (quest.isCompleted) throw Object.assign(new Error('Quest already completed'), { statusCode: 400 });
  if (new Date() > quest.expiresAt) throw Object.assign(new Error('Quest expired'), { statusCode: 400 });

  // Mark progress as complete
  quest.currentProgress = quest.targetProgress;
  quest.isCompleted = true;
  quest.completedAt = new Date();
  await quest.save();

  // Award rewards
  const user = await User.findById(userId);
  user.coins += quest.coinReward;
  await user.addXP(quest.xpReward);

  return {
    quest,
    coinsAwarded: quest.coinReward,
    xpAwarded: quest.xpReward,
    totalCoins: user.coins,
    message: `Quest "${quest.title}" completed! +${quest.coinReward} coins, +${quest.xpReward} XP`
  };
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { generateDailyQuests, getActiveQuests, completeQuest };
