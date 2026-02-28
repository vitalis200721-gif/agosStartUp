const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '⚔️' },
  category: { type: String, enum: ['combat', 'social', 'economy', 'exploration', 'creative'], default: 'combat' },

  // Rewards
  coinReward: { type: Number, default: 50 },
  xpReward: { type: Number, default: 25 },

  // Difficulty
  difficulty: { type: String, enum: ['easy', 'medium', 'hard', 'legendary'], default: 'easy' },

  // Progress tracking
  targetProgress: { type: Number, default: 1 },
  currentProgress: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },

  // Daily reset
  expiresAt: { type: Date, required: true },
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for efficient queries
questSchema.index({ userId: 1, expiresAt: 1 });

module.exports = mongoose.model('Quest', questSchema);
