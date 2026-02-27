const mongoose = require('mongoose');

const marketItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '📦' },
  category: { type: String, enum: ['avatar', 'badge', 'theme', 'boost', 'cosmetic', 'special'], required: true },
  rarity: { type: String, enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'], default: 'common' },

  // Pricing
  basePrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  currency: { type: String, enum: ['coins', 'premium'], default: 'coins' },

  // Stock
  stock: { type: Number, default: -1 }, // -1 = unlimited
  totalSold: { type: Number, default: 0 },

  // Dynamic pricing factors
  demandMultiplier: { type: Number, default: 1.0 },
  lastPriceUpdate: { type: Date, default: Date.now },

  // Availability
  isActive: { type: Boolean, default: true },
  availableFrom: { type: Date, default: null },
  availableUntil: { type: Date, default: null },

  // Effects
  effects: {
    xpBoost: { type: Number, default: 0 }, // percentage
    coinBoost: { type: Number, default: 0 },
    duration: { type: Number, default: 0 } // minutes, 0 = permanent
  }
}, { timestamps: true });

module.exports = mongoose.model('MarketItem', marketItemSchema);
