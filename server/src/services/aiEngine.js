/**
 * AI Engine Service — AGOS Core Intelligence
 * 
 * Provides mood-based recommendations, gamer archetype generation,
 * playstyle classification, and adaptive recommendation algorithms.
 */

// Genre-mood mapping with weighted scores
const MOOD_GENRE_MAP = {
  excited:    { Action: 9, Shooter: 8, Racing: 8, Sports: 7, Fighting: 7, Platformer: 6 },
  relaxed:    { Puzzle: 9, Simulation: 8, Casual: 8, Card: 7, Board: 7, Idle: 8 },
  competitive:{ Shooter: 9, Sports: 8, Racing: 7, Strategy: 8, Fighting: 8, '.io': 7 },
  creative:   { Building: 9, Simulation: 8, Puzzle: 7, Sandbox: 9, RPG: 6, Casual: 5 },
  adventurous:{ RPG: 9, Adventure: 9, Survival: 8, Horror: 6, Platformer: 7, Action: 7 },
  social:     { Multiplayer: 9, '.io': 8, Sports: 7, Board: 7, Card: 6, Casual: 6 },
  focused:    { Strategy: 9, Puzzle: 8, RPG: 7, Card: 7, Board: 6, Idle: 5 },
  bored:      { Action: 7, Arcade: 8, Casual: 7, '.io': 7, Shooter: 6, Racing: 6 }
};

// Energy level modifiers
const ENERGY_MODIFIERS = {
  low:    { Idle: 1.5, Casual: 1.3, Puzzle: 1.2, Card: 1.2, Action: 0.6, Shooter: 0.5 },
  medium: { /* neutral, no modifiers */ },
  high:   { Action: 1.4, Shooter: 1.3, Racing: 1.3, Sports: 1.2, Idle: 0.5, Casual: 0.7 }
};

// Archetype definitions
const ARCHETYPES = {
  Explorer:   { exploration: 0.4, social: 0.1, competitive: 0.1, creative: 0.2, aggression: 0.1 },
  Achiever:   { exploration: 0.2, social: 0.1, competitive: 0.3, creative: 0.1, aggression: 0.2 },
  Socializer: { exploration: 0.1, social: 0.4, competitive: 0.1, creative: 0.2, aggression: 0.05 },
  Killer:     { exploration: 0.1, social: 0.1, competitive: 0.3, creative: 0.05, aggression: 0.4 },
  Strategist: { exploration: 0.2, social: 0.15, competitive: 0.3, creative: 0.15, aggression: 0.15 },
  Creator:    { exploration: 0.2, social: 0.15, competitive: 0.05, creative: 0.5, aggression: 0.05 },
  Casual:     { exploration: 0.2, social: 0.2, competitive: 0.1, creative: 0.2, aggression: 0.1 },
  Hardcore:   { exploration: 0.15, social: 0.1, competitive: 0.35, creative: 0.1, aggression: 0.3 }
};

/**
 * Get genre recommendations based on mood + energy + user history
 */
function getMoodRecommendations(mood, energy = 'medium', genrePreferences = {}) {
  const moodScores = MOOD_GENRE_MAP[mood] || MOOD_GENRE_MAP.bored;
  const energyMods = ENERGY_MODIFIERS[energy] || {};
  const scores = {};

  // Apply mood-based scores
  for (const [genre, score] of Object.entries(moodScores)) {
    scores[genre] = score;
  }

  // Apply energy modifiers
  for (const [genre, mod] of Object.entries(energyMods)) {
    if (scores[genre]) {
      scores[genre] *= mod;
    }
  }

  // Apply user preference boosts (history-based)
  for (const [genre, weight] of Object.entries(genrePreferences)) {
    if (scores[genre]) {
      scores[genre] *= (1 + weight * 0.1); // slight boost
    } else {
      scores[genre] = weight * 2;
    }
  }

  // Sort by score and return top genres
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([genre, score]) => ({ genre, score: Math.round(score * 100) / 100 }));

  return sorted.slice(0, 6);
}

/**
 * Generate gamer archetype from playstyle metrics
 */
function generateArchetype(playstyle) {
  let bestMatch = 'Explorer';
  let bestScore = -1;

  for (const [archetype, weights] of Object.entries(ARCHETYPES)) {
    let score = 0;
    for (const [trait, weight] of Object.entries(weights)) {
      const userValue = (playstyle[trait] || 50) / 100;
      score += userValue * weight;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = archetype;
    }
  }

  return {
    archetype: bestMatch,
    confidence: Math.round(bestScore * 100),
    description: getArchetypeDescription(bestMatch)
  };
}

/**
 * Classify playstyle from play history
 */
function classifyPlaystyle(playHistory = []) {
  const genreCounts = {};
  let totalPlays = playHistory.length || 1;

  for (const entry of playHistory) {
    const genre = entry.genre || 'Action';
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  }

  // Map genres to playstyle dimensions
  const genreToTraits = {
    Action: { aggression: 3, competitive: 2 },
    Shooter: { aggression: 4, competitive: 3 },
    RPG: { exploration: 4, creative: 2 },
    Adventure: { exploration: 4, social: 1 },
    Strategy: { competitive: 3, exploration: 2 },
    Puzzle: { creative: 3, exploration: 1 },
    Simulation: { creative: 3, social: 2 },
    Multiplayer: { social: 4, competitive: 2 },
    Sports: { competitive: 3, social: 2 },
    Casual: { social: 2, creative: 2 },
    Building: { creative: 4, exploration: 2 },
    Survival: { aggression: 2, exploration: 3 },
    Horror: { exploration: 3, aggression: 1 },
    Racing: { competitive: 3, aggression: 2 },
    Idle: { creative: 1, exploration: 1 }
  };

  const traits = { aggression: 0, exploration: 0, social: 0, competitive: 0, creative: 0 };

  for (const [genre, count] of Object.entries(genreCounts)) {
    const mapping = genreToTraits[genre];
    if (mapping) {
      const weight = count / totalPlays;
      for (const [trait, value] of Object.entries(mapping)) {
        traits[trait] += value * weight * 25;
      }
    }
  }

  // Normalize to 0-100
  for (const trait of Object.keys(traits)) {
    traits[trait] = Math.min(100, Math.max(0, Math.round(traits[trait])));
  }

  return traits;
}

/**
 * Adaptive recommendation: combines mood, history, and profile
 */
function getAdaptiveRecommendations(profile, mood, energy, allGames) {
  const moodRecs = getMoodRecommendations(mood, energy, Object.fromEntries(profile.genrePreferences || new Map()));
  const topGenres = moodRecs.map(r => r.genre);

  // Score each game
  const scored = allGames.map(game => {
    let score = 0;

    // Genre match with mood
    for (const genre of (game.genres || [])) {
      const moodEntry = moodRecs.find(r => r.genre === genre);
      if (moodEntry) score += moodEntry.score * 10;
    }

    // Check not recently played
    const recentlyPlayed = profile.playHistory
      ?.slice(-20)
      ?.some(h => h.gameId === game.id);
    if (recentlyPlayed) score *= 0.3;

    // Rating boost
    score += (game.rating || 3.5) * 2;

    // Popularity boost
    score += Math.log(game.players || 100) * 0.5;

    return { ...game, recommendationScore: Math.round(score * 100) / 100 };
  });

  return scored
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 12);
}

function getArchetypeDescription(archetype) {
  const descriptions = {
    Explorer: 'You thrive on discovery. New worlds, hidden secrets, and uncharted territories call to you.',
    Achiever: 'Completion is your middle name. Every achievement, every collectible — you want them all.',
    Socializer: 'Gaming is about people. You shine in co-op, guilds, and community events.',
    Killer: 'PvP is where you live. Competition fuels your fire and victory is the only option.',
    Strategist: 'Every move is calculated. You see the board 10 steps ahead.',
    Creator: 'You build worlds, not just play in them. Sandbox and creative modes are your playground.',
    Casual: 'Gaming is your way to unwind. No pressure, just pure enjoyment.',
    Hardcore: 'Difficulty is a feature, not a bug. You seek the ultimate challenge.'
  };
  return descriptions[archetype] || 'A unique gamer with a diverse playstyle.';
}

module.exports = {
  getMoodRecommendations,
  generateArchetype,
  classifyPlaystyle,
  getAdaptiveRecommendations,
  MOOD_GENRE_MAP,
  ARCHETYPES
};
