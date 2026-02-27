const mongoose = require('mongoose');

const gameProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

  // AI-generated archetype
  gamerArchetype: {
    type: String,
    enum: ['Explorer', 'Achiever', 'Socializer', 'Killer', 'Strategist', 'Creator', 'Casual', 'Hardcore'],
    default: 'Explorer'
  },

  // Playstyle classification
  playstyle: {
    aggression: { type: Number, default: 50, min: 0, max: 100 },
    exploration: { type: Number, default: 50, min: 0, max: 100 },
    social: { type: Number, default: 50, min: 0, max: 100 },
    competitive: { type: Number, default: 50, min: 0, max: 100 },
    creative: { type: Number, default: 50, min: 0, max: 100 }
  },

  // Mood history for recommendations
  moodHistory: [{
    mood: { type: String, required: true },
    energy: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    timestamp: { type: Date, default: Date.now },
    recommendedGenres: [String]
  }],

  // Play history
  playHistory: [{
    gameId: String,
    gameTitle: String,
    genre: String,
    playedAt: { type: Date, default: Date.now },
    duration: { type: Number, default: 0 }, // minutes
    rating: { type: Number, min: 1, max: 5 }
  }],

  // Genre preferences (weighted)
  genrePreferences: {
    type: Map,
    of: Number,
    default: {}
  },

  // Favorite genres (derived)
  favoriteGenres: [String]
}, { timestamps: true });

module.exports = mongoose.model('GameProfile', gameProfileSchema);
