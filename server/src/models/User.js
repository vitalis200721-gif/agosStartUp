const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },
  displayName: { type: String, required: true, trim: true, maxlength: 30 },
  avatar: { type: String, default: '' },
  googleId: { type: String, default: null },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },

  // Economy
  coins: { type: Number, default: 500 },
  inventory: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MarketItem' },
    acquiredAt: { type: Date, default: Date.now },
    quantity: { type: Number, default: 1 }
  }],

  // Progression
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  skillPoints: { type: Number, default: 0 },
  skills: {
    exploration: { type: Number, default: 0, max: 10 },
    combat: { type: Number, default: 0, max: 10 },
    strategy: { type: Number, default: 0, max: 10 },
    social: { type: Number, default: 0, max: 10 },
    creativity: { type: Number, default: 0, max: 10 }
  },

  // Faction
  faction: { type: mongoose.Schema.Types.ObjectId, ref: 'Faction', default: null },
  factionJoinedAt: { type: Date, default: null },

  // Achievements
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }],

  // Metadata
  profileTheme: { type: String, default: 'default' },
  lastLogin: { type: Date, default: Date.now },
  gamesPlayed: { type: Number, default: 0 },
  totalPlaytime: { type: Number, default: 0 }, // minutes
  hackingWins: { type: Number, default: 0 },
  itemsBought: { type: Number, default: 0 }
}, { timestamps: true });

// Hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Calculate level from XP
userSchema.methods.calculateLevel = function() {
  // Level formula: level = floor(sqrt(xp / 100)) + 1
  this.level = Math.floor(Math.sqrt(this.xp / 100)) + 1;
  return this.level;
};

// Add XP and recalculate level
userSchema.methods.addXP = async function(amount) {
  this.xp += amount;
  const oldLevel = this.level;
  this.calculateLevel();
  if (this.level > oldLevel) {
    this.skillPoints += (this.level - oldLevel) * 2;
    // Check level achievements
    const { checkAchievements } = require('../services/achievementEngine');
    checkAchievements(this._id, 'level_reached', this.level).catch(console.error);

    // Notify user of level up
    const { createNotification } = require('../controllers/notificationController');
    createNotification(
      this._id,
      'system',
      'Level Up! 🎉',
      `Congratulations! You have reached Level ${this.level}. You earned ${(this.level - oldLevel) * 2} Skill Points.`
    ).catch(console.error);
  }
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
