const mongoose = require('mongoose');

const factionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '⚔️' },
  color: { type: String, default: '#7c3aed' },
  banner: { type: String, default: '' },

  // Members
  leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxMembers: { type: Number, default: 100 },

  // Progression
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  weeklyXp: { type: Number, default: 0 },
  weeklyRank: { type: Number, default: 0 },

  // Territory
  territories: { type: Number, default: 0 },
  territoryScore: { type: Number, default: 0 },

  // Stats
  totalGamesPlayed: { type: Number, default: 0 },
  winsCount: { type: Number, default: 0 },

  // Weekly reset tracking
  lastWeeklyReset: { type: Date, default: Date.now }
}, { timestamps: true });

factionSchema.methods.addXP = async function(amount) {
  this.xp += amount;
  this.weeklyXp += amount;
  this.level = Math.floor(Math.sqrt(this.xp / 500)) + 1;
  return this.save();
};

module.exports = mongoose.model('Faction', factionSchema);
