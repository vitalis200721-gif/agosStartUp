const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, default: '🏆' },
  category: { type: String, enum: ['exploration', 'combat', 'social', 'economy', 'faction', 'special'], default: 'special' },
  rarity: { type: String, enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'], default: 'common' },
  xpReward: { type: Number, default: 50 },
  coinReward: { type: Number, default: 0 },
  condition: {
    type: { type: String, required: true }, // 'games_played', 'level_reached', 'coins_earned', 'faction_joined', etc.
    value: { type: Number, required: true }
  },
  unlockedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
