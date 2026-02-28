const Achievement = require('../models/Achievement');

// Get all achievements and user's progress
exports.getAchievements = async (req, res) => {
  try {
    const allAchievements = await Achievement.find().sort({ coinReward: 1 });
    // the user's unlocked achievements are already populated via middleware or we can match their IDs
    res.json({ achievements: allAchievements });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievements.' });
  }
};

// Admin endpoint to seed achievements
exports.seedAchievements = async (req, res) => {
  try {
    const achievements = [
      {
        title: 'First Blood',
        description: 'Win your first hacking duel.',
        icon: '💻',
        category: 'combat',
        rarity: 'common',
        xpReward: 50,
        coinReward: 100,
        condition: { type: 'hacking_wins', value: 1 }
      },
      {
        title: 'Master Hacker',
        description: 'Win 10 hacking duels.',
        icon: '☠️',
        category: 'combat',
        rarity: 'rare',
        xpReward: 300,
        coinReward: 500,
        condition: { type: 'hacking_wins', value: 10 }
      },
      {
        title: 'The Addict',
        description: 'Play 50 games in the Multiverse.',
        icon: '🎮',
        category: 'exploration',
        rarity: 'epic',
        xpReward: 500,
        coinReward: 1000,
        condition: { type: 'games_played', value: 50 }
      },
      {
        title: 'Newborn Hacker',
        description: 'Reach Level 5.',
        icon: '⭐',
        category: 'special',
        rarity: 'common',
        xpReward: 100,
        coinReward: 200,
        condition: { type: 'level_reached', value: 5 }
      },
      {
        title: 'Cyber Shopper',
        description: 'Buy your first item from the Market.',
        icon: '🛒',
        category: 'economy',
        rarity: 'common',
        xpReward: 50,
        coinReward: 50,
        condition: { type: 'items_bought', value: 1 }
      },
      {
        title: 'Loyalist',
        description: 'Join a Faction.',
        icon: '🛡️',
        category: 'faction',
        rarity: 'rare',
        xpReward: 200,
        coinReward: 300,
        condition: { type: 'faction_joined', value: 1 }
      },
      {
        title: 'High Roller',
        description: 'Earn a total of 10,000 Coins.',
        icon: '💰',
        category: 'economy',
        rarity: 'legendary',
        xpReward: 1000,
        coinReward: 5000,
        condition: { type: 'coins_earned', value: 10000 }
      }
    ];

    await Achievement.deleteMany({});
    await Achievement.insertMany(achievements);
    
    res.json({ message: 'Achievements seeded successfully', count: achievements.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed achievements.' });
  }
};
