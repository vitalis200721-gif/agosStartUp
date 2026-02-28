const User = require('../models/User');
const GameProfile = require('../models/GameProfile');
const Faction = require('../models/Faction');
const Achievement = require('../models/Achievement');
const { generateToken } = require('../middleware/auth');
const { sendWelcomeEmail } = require('../services/emailService');

// Google OAuth: redirect user to Google
exports.googleAuth = (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent'
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};

// Google OAuth callback: exchange code for tokens
exports.googleCallback = async (req, res, next) => {
  const CLIENT = process.env.CLIENT_URL || 'https://agos-start-up-zcd0.vercel.app';

  // Helper: send HTML page that redirects (bypasses helmet header issues)
  const htmlRedirect = (url) => {
    res.setHeader('Content-Type', 'text/html');
    return res.send(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${url}"><script>window.location.href="${url}";</script></head><body>Redirecting...</body></html>`);
  };

  try {
    const { code } = req.query;
    if (!code) return htmlRedirect(`${CLIENT}/login?error=no_code`);

    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL || 'https://agosstartup.onrender.com/api/auth/google/callback',
        grant_type: 'authorization_code'
      })
    });
    const tokens = await tokenRes.json();
    console.log('Google tokens:', tokens.access_token ? 'OK' : 'FAIL', tokens.error || '');
    if (!tokens.access_token) return htmlRedirect(`${CLIENT}/login?error=token_failed`);

    // Get user info from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
    const gUser = await userRes.json();
    console.log('Google user:', gUser.email);
    if (!gUser.email) return htmlRedirect(`${CLIENT}/login?error=no_email`);

    // Find or create user
    let user = await User.findOne({ email: gUser.email });
    if (!user) {
      user = await User.create({
        email: gUser.email,
        password: `google_${Date.now()}_${Math.random().toString(36)}`,
        displayName: gUser.name || gUser.email.split('@')[0],
        googleId: gUser.id,
        avatar: gUser.picture
      });
      await GameProfile.create({ user: user._id });
      // Send welcome email asynchronously so we don't block the redirect
      sendWelcomeEmail(user.email, user.displayName).catch(console.error);
    } else if (!user.googleId) {
      user.googleId = gUser.id;
      if (gUser.picture && !user.avatar) user.avatar = gUser.picture;
      await user.save();
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    console.log('Google OAuth success for:', gUser.email);
    return htmlRedirect(`${CLIENT}/login?token=${token}`);
  } catch (err) {
    console.error('Google OAuth error:', err);
    return htmlRedirect(`${CLIENT}/login?error=server_error`);
  }
};

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
    
    // Send welcome email asynchronously
    sendWelcomeEmail(user.email, user.displayName).catch(console.error);

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
