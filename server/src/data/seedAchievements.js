const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Achievement = require('../models/Achievement');

dotenv.config({ path: path.join(__dirname, '../../.env') });

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

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB. Seeding achievements...');
  await Achievement.deleteMany({});
  await Achievement.insertMany(achievements);
  console.log(`Successfully seeded ${achievements.length} achievements.`);
  process.exit(0);
}).catch(err => {
  console.error('Error seeding achievements:', err);
  process.exit(1);
});
