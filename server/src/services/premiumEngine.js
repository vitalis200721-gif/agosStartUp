const User = require('../models/User');

/**
 * Premium Coin Packages
 * In production, these would be linked to Stripe Price IDs
 */
const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Pack',
    coins: 500,
    bonusCoins: 0,
    price: 1.99,
    icon: '🪙',
    popular: false,
    color: 'cyan'
  },
  {
    id: 'adventurer',
    name: 'Adventurer Pack',
    coins: 1500,
    bonusCoins: 200,
    price: 4.99,
    icon: '💎',
    popular: true,
    color: 'accent'
  },
  {
    id: 'elite',
    name: 'Elite Pack',
    coins: 5000,
    bonusCoins: 1000,
    price: 14.99,
    icon: '👑',
    popular: false,
    color: 'amber'
  },
  {
    id: 'legendary',
    name: 'Legendary Pack',
    coins: 15000,
    bonusCoins: 5000,
    price: 39.99,
    icon: '🌟',
    popular: false,
    color: 'pink'
  }
];

/**
 * Simulate a premium purchase (demo mode)
 * In production, this would verify a Stripe payment intent
 */
async function processPremiumPurchase(userId, packageId) {
  const pkg = PACKAGES.find(p => p.id === packageId);
  if (!pkg) throw Object.assign(new Error('Package not found'), { statusCode: 404 });

  const user = await User.findById(userId);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });

  const totalCoins = pkg.coins + pkg.bonusCoins;
  user.coins += totalCoins;
  await user.save();

  // Also give XP for supporting the platform
  await user.addXP(Math.floor(totalCoins * 0.1));

  return {
    package: pkg.name,
    coinsAdded: totalCoins,
    totalCoins: user.coins,
    xpGained: Math.floor(totalCoins * 0.1),
    message: `Thank you! ${totalCoins.toLocaleString()} coins added to your account!`
  };
}

module.exports = { PACKAGES, processPremiumPurchase };
