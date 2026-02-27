const GameProfile = require('../models/GameProfile');
const { getMoodRecommendations, generateArchetype, classifyPlaystyle, getAdaptiveRecommendations } = require('../services/aiEngine');

// Game data (in production, this would come from DB)
const GAMES_DATA = require('../data/games');

// Auto-create profile if missing
async function getOrCreateProfile(userId) {
  let profile = await GameProfile.findOne({ user: userId });
  if (!profile) {
    profile = await GameProfile.create({
      user: userId,
      gamerArchetype: 'Explorer',
      playstyle: { aggression: 50, exploration: 50, social: 50, competitive: 50, creative: 50 },
      favoriteGenres: [],
      genrePreferences: new Map()
    });
  }
  return profile;
}

exports.submitMood = async (req, res, next) => {
  try {
    const { mood, energy } = req.body;
    if (!mood) return res.status(400).json({ error: 'Mood is required' });

    const profile = await getOrCreateProfile(req.user._id);

    const preferences = Object.fromEntries(profile.genrePreferences || new Map());
    const recommendations = getMoodRecommendations(mood, energy || 'medium', preferences);

    // Save mood to history
    profile.moodHistory.push({
      mood,
      energy: energy || 'medium',
      recommendedGenres: recommendations.map(r => r.genre)
    });
    if (profile.moodHistory.length > 50) profile.moodHistory = profile.moodHistory.slice(-50);
    await profile.save();

    // Get game recommendations
    const gameRecs = getAdaptiveRecommendations(profile, mood, energy || 'medium', GAMES_DATA);

    res.json({ genres: recommendations, games: gameRecs });
  } catch (err) { next(err); }
};

exports.getRecommendations = async (req, res, next) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);

    const lastMood = profile.moodHistory[profile.moodHistory.length - 1];
    const mood = lastMood?.mood || 'bored';
    const energy = lastMood?.energy || 'medium';
    const gameRecs = getAdaptiveRecommendations(profile, mood, energy, GAMES_DATA);

    res.json({ recommendations: gameRecs, basedOn: { mood, energy } });
  } catch (err) { next(err); }
};

exports.getProfileAnalysis = async (req, res, next) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);

    const playstyle = classifyPlaystyle(profile.playHistory);
    const archetype = generateArchetype(playstyle);

    // Update profile
    profile.playstyle = playstyle;
    profile.gamerArchetype = archetype.archetype;
    await profile.save();

    res.json({
      archetype,
      playstyle,
      stats: {
        totalGamesPlayed: profile.playHistory.length,
        favoriteGenres: profile.favoriteGenres,
        moodCount: profile.moodHistory.length
      }
    });
  } catch (err) { next(err); }
};

exports.logGamePlay = async (req, res, next) => {
  try {
    const { gameId, gameTitle, genre, duration, rating } = req.body;
    const profile = await getOrCreateProfile(req.user._id);

    profile.playHistory.push({ gameId, gameTitle, genre, duration, rating });

    // Update genre preferences
    const currentWeight = profile.genrePreferences.get(genre) || 0;
    profile.genrePreferences.set(genre, currentWeight + 1);

    // Update favorite genres
    const sorted = [...profile.genrePreferences.entries()].sort((a, b) => b[1] - a[1]);
    profile.favoriteGenres = sorted.slice(0, 5).map(([g]) => g);

    await profile.save();

    // Update user stats
    const user = req.user;
    user.gamesPlayed += 1;
    user.totalPlaytime += (duration || 0);
    await user.addXP(10 + Math.floor((duration || 0) / 5));

    res.json({ profile, user: { xp: user.xp, level: user.level, gamesPlayed: user.gamesPlayed } });
  } catch (err) { next(err); }
};
