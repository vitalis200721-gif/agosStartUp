const MarketItem = require('../models/MarketItem');
const User = require('../models/User');

/**
 * Dynamic pricing: adjusts price based on demand
 * Price increases when demand is high, decreases when low
 */
function calculateDynamicPrice(item) {
  const salesRate = item.totalSold / Math.max(1, daysSinceCreation(item));
  let multiplier = 1.0;

  if (salesRate > 10) multiplier = 1.3;       // hot item
  else if (salesRate > 5) multiplier = 1.15;   // popular
  else if (salesRate < 1) multiplier = 0.85;   // slow seller
  else if (salesRate < 0.5) multiplier = 0.7;  // discount

  // Rarity multiplier
  const rarityMult = { common: 1, uncommon: 1.2, rare: 1.5, epic: 2, legendary: 3 };
  multiplier *= (rarityMult[item.rarity] || 1);

  // Stock scarcity
  if (item.stock > 0 && item.stock < 10) {
    multiplier *= 1.2;
  }

  const newPrice = Math.round(item.basePrice * multiplier);
  return Math.max(1, newPrice);
}

function daysSinceCreation(item) {
  return Math.max(1, Math.floor((Date.now() - new Date(item.createdAt).getTime()) / 86400000));
}

/**
 * Process a purchase
 */
async function purchaseItem(userId, itemId, quantity = 1) {
  const user = await User.findById(userId);
  const item = await MarketItem.findById(itemId);

  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  if (!item) throw Object.assign(new Error('Item not found'), { statusCode: 404 });
  if (!item.isActive) throw Object.assign(new Error('Item is not available'), { statusCode: 400 });
  if (item.stock > 0 && item.stock < quantity) {
    throw Object.assign(new Error('Insufficient stock'), { statusCode: 400 });
  }

  const totalCost = item.currentPrice * quantity;
  if (user.coins < totalCost) {
    throw Object.assign(new Error('Insufficient coins'), { statusCode: 400 });
  }

  // Deduct coins
  user.coins -= totalCost;

  // Add to inventory
  const existingItem = user.inventory.find(i => i.itemId?.toString() === itemId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.inventory.push({ itemId, quantity });
  }

  await user.save();

  // Update item stats
  if (item.stock > 0) item.stock -= quantity;
  item.totalSold += quantity;
  item.currentPrice = calculateDynamicPrice(item);
  item.lastPriceUpdate = new Date();
  await item.save();

  return { user, item, totalCost };
}

/**
 * Get marketplace with dynamic prices refreshed
 */
async function getMarketplace(filters = {}) {
  const query = { isActive: true };
  if (filters.category) query.category = filters.category;
  if (filters.rarity) query.rarity = filters.rarity;

  const items = await MarketItem.find(query).sort({ currentPrice: 1 }).lean();

  return items.map(item => ({
    ...item,
    isLimited: item.stock > 0,
    stockRemaining: item.stock
  }));
}

module.exports = { calculateDynamicPrice, purchaseItem, getMarketplace };
