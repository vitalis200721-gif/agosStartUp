const { purchaseItem, getMarketplace } = require('../services/economyEngine');

exports.getMarketplace = async (req, res, next) => {
  try {
    const items = await getMarketplace(req.query);
    res.json({ items });
  } catch (err) { next(err); }
};

exports.purchase = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const result = await purchaseItem(req.user._id, req.params.itemId, quantity || 1);
    res.json({
      message: 'Purchase successful!',
      item: result.item.name,
      spent: result.totalCost,
      remainingCoins: result.user.coins
    });
  } catch (err) { next(err); }
};

exports.getInventory = async (req, res, next) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user._id).populate('inventory.itemId');
    res.json({ inventory: user.inventory, coins: user.coins });
  } catch (err) { next(err); }
};

exports.getBalance = async (req, res, next) => {
  try {
    res.json({ coins: req.user.coins });
  } catch (err) { next(err); }
};
