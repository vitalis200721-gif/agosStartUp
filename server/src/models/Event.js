const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  type: { type: String, enum: ['challenge', 'tournament', 'seasonal', 'flash', 'community'], required: true },
  status: { type: String, enum: ['upcoming', 'active', 'ended'], default: 'upcoming' },

  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  // Rewards
  rewards: {
    xp: { type: Number, default: 0 },
    coins: { type: Number, default: 0 },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MarketItem' }],
    achievement: { type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }
  },

  // Challenges within event
  challenges: [{
    title: { type: String },
    description: { type: String },
    target: { type: Number },
    challengeType: { type: String }, // 'play_games', 'earn_xp', 'win_matches', etc.
    reward: {
      xp: { type: Number, default: 0 },
      coins: { type: Number, default: 0 }
    }
  }],

  // Participants
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    joinedAt: { type: Date, default: Date.now },
    progress: { type: Map, of: Number, default: {} },
    completed: { type: Boolean, default: false }
  }],

  maxParticipants: { type: Number, default: 0 }, // 0 = unlimited
  isRecurring: { type: Boolean, default: false },
  recurringInterval: { type: String, enum: ['daily', 'weekly', 'monthly', ''], default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
