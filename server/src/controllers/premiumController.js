const { PACKAGES, processPremiumPurchase } = require('../services/premiumEngine');

exports.getPackages = async (req, res) => {
  res.json({ packages: PACKAGES });
};

exports.purchase = async (req, res, next) => {
  try {
    const { packageId } = req.body;
    const result = await processPremiumPurchase(req.user._id, packageId);
    res.json(result);
  } catch (err) { next(err); }
};
