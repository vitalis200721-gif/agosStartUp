require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

const User = require('../models/User');
const Faction = require('../models/Faction');
const GameProfile = require('../models/GameProfile');
const Achievement = require('../models/Achievement');
const Event = require('../models/Event');
const MarketItem = require('../models/MarketItem');

async function seed() {
  await connectDB();
  console.log('🌱 Seeding database...');

  // Clear all
  await Promise.all([
    User.deleteMany({}), Faction.deleteMany({}), GameProfile.deleteMany({}),
    Achievement.deleteMany({}), Event.deleteMany({}), MarketItem.deleteMany({})
  ]);

  // === FACTIONS ===
  const factions = await Faction.create([
    { name: 'Shadow Legion', slug: 'shadow-legion', icon: '🌑', color: '#7c3aed', description: 'Masters of stealth and strategy. Strike from the shadows.', xp: 12500, weeklyXp: 3200, territories: 8 },
    { name: 'Solar Vanguard', slug: 'solar-vanguard', icon: '☀️', color: '#f59e0b', description: 'Blazing warriors of light. Charge into battle fearlessly.', xp: 15000, weeklyXp: 4100, territories: 12 },
    { name: 'Frost Covenant', slug: 'frost-covenant', icon: '❄️', color: '#06b6d4', description: 'Patience and precision. The cold never bothered us.', xp: 9800, weeklyXp: 2800, territories: 6 },
    { name: 'Crimson Order', slug: 'crimson-order', icon: '🔥', color: '#ef4444', description: 'Blood and fire. We forge victory from chaos.', xp: 11200, weeklyXp: 3600, territories: 9 },
    { name: 'Emerald Syndicate', slug: 'emerald-syndicate', icon: '💎', color: '#22c55e', description: 'Wealth is power. We control the markets.', xp: 8500, weeklyXp: 2100, territories: 5 },
  ]);

  // === ACHIEVEMENTS ===
  const achievements = await Achievement.create([
    { title: 'First Steps', description: 'Play your first game', icon: '👣', category: 'exploration', rarity: 'common', xpReward: 25, condition: { type: 'games_played', value: 1 } },
    { title: 'Dedicated Gamer', description: 'Play 10 games', icon: '🎮', category: 'exploration', rarity: 'uncommon', xpReward: 100, condition: { type: 'games_played', value: 10 } },
    { title: 'Veteran', description: 'Play 50 games', icon: '🏅', category: 'exploration', rarity: 'rare', xpReward: 500, condition: { type: 'games_played', value: 50 } },
    { title: 'Level 5', description: 'Reach level 5', icon: '⭐', category: 'combat', rarity: 'uncommon', xpReward: 150, condition: { type: 'level_reached', value: 5 } },
    { title: 'Level 10', description: 'Reach level 10', icon: '🌟', category: 'combat', rarity: 'rare', xpReward: 300, condition: { type: 'level_reached', value: 10 } },
    { title: 'Faction Warrior', description: 'Join a faction', icon: '⚔️', category: 'faction', rarity: 'common', xpReward: 50, condition: { type: 'faction_joined', value: 1 } },
    { title: 'Big Spender', description: 'Spend 1000 coins', icon: '💰', category: 'economy', rarity: 'uncommon', xpReward: 100, condition: { type: 'coins_spent', value: 1000 } },
    { title: 'Mood Master', description: 'Use mood selector 10 times', icon: '🧠', category: 'special', rarity: 'uncommon', xpReward: 75, condition: { type: 'moods_submitted', value: 10 } },
    { title: 'Legendary Status', description: 'Reach level 25', icon: '👑', category: 'combat', rarity: 'legendary', xpReward: 1000, coinReward: 500, condition: { type: 'level_reached', value: 25 } },
    { title: 'Social Butterfly', description: 'Play 20 multiplayer games', icon: '🦋', category: 'social', rarity: 'rare', xpReward: 200, condition: { type: 'multiplayer_played', value: 20 } },
  ]);

  // === MARKET ITEMS ===
  await MarketItem.create([
    { name: 'Neon Avatar Frame', description: 'A glowing neon frame for your profile picture', icon: '🖼️', category: 'avatar', rarity: 'common', basePrice: 50, currentPrice: 50 },
    { name: 'Shadow Badge', description: 'Dark and mysterious badge', icon: '🏴', category: 'badge', rarity: 'uncommon', basePrice: 150, currentPrice: 150 },
    { name: 'Cyber Theme', description: 'Cyberpunk-inspired UI theme', icon: '🌃', category: 'theme', rarity: 'rare', basePrice: 500, currentPrice: 500 },
    { name: 'XP Boost (2x)', description: 'Double XP for 60 minutes', icon: '⚡', category: 'boost', rarity: 'uncommon', basePrice: 200, currentPrice: 200, effects: { xpBoost: 100, duration: 60 } },
    { name: 'Coin Magnet', description: '+50% coins for 30 minutes', icon: '🧲', category: 'boost', rarity: 'uncommon', basePrice: 175, currentPrice: 175, effects: { coinBoost: 50, duration: 30 } },
    { name: 'Golden Crown', description: 'A legendary golden crown avatar', icon: '👑', category: 'avatar', rarity: 'legendary', basePrice: 2000, currentPrice: 2000, stock: 10 },
    { name: 'Pixel Art Pack', description: 'Retro pixel art cosmetics', icon: '🎨', category: 'cosmetic', rarity: 'rare', basePrice: 350, currentPrice: 350 },
    { name: 'Star Trail Effect', description: 'Leave a trail of stars', icon: '✨', category: 'cosmetic', rarity: 'epic', basePrice: 800, currentPrice: 800, stock: 50 },
    { name: 'Mystery Box', description: 'Contains a random item', icon: '📦', category: 'special', rarity: 'rare', basePrice: 300, currentPrice: 300 },
    { name: 'Faction Banner', description: 'Custom banner for your faction', icon: '🚩', category: 'cosmetic', rarity: 'uncommon', basePrice: 250, currentPrice: 250 },
  ]);

  // === EVENTS ===
  const now = new Date();
  await Event.create([
    { title: 'Launch Week Challenge', description: 'Welcome to AGOS! Complete challenges to earn rewards.', type: 'seasonal', status: 'active', startDate: now, endDate: new Date(now.getTime() + 7 * 86400000), rewards: { xp: 500, coins: 300 }, challenges: [
      { title: 'Play 5 games', description: 'Play any 5 games', target: 5, challengeType: 'play_games', reward: { xp: 100, coins: 50 } },
      { title: 'Try 3 genres', description: 'Play games from 3 different genres', target: 3, challengeType: 'play_genres', reward: { xp: 150, coins: 100 } },
      { title: 'Use mood selector', description: 'Submit your mood for recommendations', target: 1, challengeType: 'submit_mood', reward: { xp: 50, coins: 25 } }
    ]},
    { title: 'Speed Demon Weekend', description: 'Racing tournament this weekend!', type: 'tournament', status: 'active', startDate: now, endDate: new Date(now.getTime() + 3 * 86400000), rewards: { xp: 300, coins: 200 }, challenges: [
      { title: 'Play 10 racing games', description: 'Race to victory!', target: 10, challengeType: 'play_games', reward: { xp: 200, coins: 100 } }
    ]},
    { title: 'Faction Wars: Season 1', description: 'Factions compete for dominance. Earn XP for your faction!', type: 'tournament', status: 'active', startDate: now, endDate: new Date(now.getTime() + 14 * 86400000), rewards: { xp: 1000, coins: 500 }, challenges: [
      { title: 'Earn 500 faction XP', description: 'Contribute to your faction', target: 500, challengeType: 'earn_xp', reward: { xp: 300, coins: 200 } },
      { title: 'Play 20 games', description: 'Every game counts', target: 20, challengeType: 'play_games', reward: { xp: 200, coins: 100 } }
    ]},
  ]);

  // === DEMO USER ===
  const demoUser = await User.create({
    email: 'demo@agos.gg',
    password: 'demo123',
    displayName: 'DemoGamer',
    role: 'user',
    coins: 1500,
    xp: 450,
    level: 3,
    faction: factions[1]._id,
    achievements: [achievements[0]._id, achievements[3]._id],
    gamesPlayed: 15,
    totalPlaytime: 320
  });

  // Add demo user to faction
  factions[1].members.push(demoUser._id);
  factions[1].leader = demoUser._id;
  await factions[1].save();

  // Create game profile for demo user
  await GameProfile.create({
    user: demoUser._id,
    gamerArchetype: 'Explorer',
    playstyle: { aggression: 35, exploration: 80, social: 60, competitive: 45, creative: 70 },
    favoriteGenres: ['RPG', 'Adventure', 'Puzzle'],
    genrePreferences: new Map([['RPG', 5], ['Adventure', 4], ['Puzzle', 3], ['Action', 2]])
  });

  // === ADMIN USER ===
  await User.create({
    email: 'admin@agos.gg',
    password: 'admin123',
    displayName: 'AdminOS',
    role: 'admin',
    coins: 99999,
    xp: 10000,
    level: 10
  });

  console.log('✅ Seed complete!');
  console.log('📧 Demo: demo@agos.gg / demo123');
  console.log('📧 Admin: admin@agos.gg / admin123');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
