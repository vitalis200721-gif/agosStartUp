const User = require('../models/User');
const GameProfile = require('../models/GameProfile');
const { generateToken } = require('../middleware/auth');

exports.register = async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password || !displayName) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const user = await User.create({ email, password, displayName });
    await GameProfile.create({ user: user._id });
    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, displayName: user.displayName, role: user.role, coins: user.coins, xp: user.xp, level: user.level }
    });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    user.lastLogin = new Date();
    await user.save();
    const token = generateToken(user._id);
    res.json({
      token,
      user: { id: user._id, email: user.email, displayName: user.displayName, role: user.role, coins: user.coins, xp: user.xp, level: user.level }
    });
  } catch (err) { next(err); }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('faction', 'name icon color slug')
      .populate('achievements');
    res.json({ user });
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { displayName, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...(displayName && { displayName }), ...(avatar && { avatar }) },
      { new: true }
    );
    res.json({ user });
  } catch (err) { next(err); }
};

exports.allocateSkillPoint = async (req, res, next) => {
  try {
    const { skill } = req.body;
    const validSkills = ['exploration', 'combat', 'strategy', 'social', 'creativity'];
    if (!validSkills.includes(skill)) {
      return res.status(400).json({ error: 'Invalid skill' });
    }
    const user = req.user;
    if (user.skillPoints < 1) {
      return res.status(400).json({ error: 'No skill points available' });
    }
    if (user.skills[skill] >= 10) {
      return res.status(400).json({ error: 'Skill already at max level' });
    }
    user.skills[skill] += 1;
    user.skillPoints -= 1;
    await user.save();
    res.json({ user });
  } catch (err) { next(err); }
};
