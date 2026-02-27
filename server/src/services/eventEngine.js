const Event = require('../models/Event');

// Event templates for generation
const EVENT_TEMPLATES = [
  { title: 'Speed Demon Challenge', type: 'challenge', desc: 'Play 10 racing games in record time', challenges: [{ title: 'Race 10 games', challengeType: 'play_games', target: 10, reward: { xp: 200, coins: 100 } }] },
  { title: 'Puzzle Master', type: 'challenge', desc: 'Complete 15 puzzle games', challenges: [{ title: 'Solve 15 puzzles', challengeType: 'play_games', target: 15, reward: { xp: 300, coins: 150 } }] },
  { title: 'Social Butterfly', type: 'community', desc: 'Play 5 multiplayer games', challenges: [{ title: 'Play 5 multiplayer games', challengeType: 'play_games', target: 5, reward: { xp: 150, coins: 80 } }] },
  { title: 'XP Rush', type: 'flash', desc: 'Earn 500 XP in 24 hours', challenges: [{ title: 'Earn 500 XP', challengeType: 'earn_xp', target: 500, reward: { xp: 250, coins: 200 } }] },
  { title: 'Battle Royale', type: 'tournament', desc: 'Compete in action games', challenges: [{ title: 'Win 5 matches', challengeType: 'win_matches', target: 5, reward: { xp: 500, coins: 300 } }] },
  { title: 'Cosmic Exploration', type: 'seasonal', desc: 'Discover 20 new games', challenges: [{ title: 'Play 20 unique games', challengeType: 'play_games', target: 20, reward: { xp: 400, coins: 250 } }] },
  { title: 'Faction Wars', type: 'tournament', desc: 'Factions compete for territory', challenges: [{ title: 'Earn 1000 faction XP', challengeType: 'earn_xp', target: 1000, reward: { xp: 600, coins: 400 } }] },
  { title: 'Weekend Warrior', type: 'flash', desc: 'Play any 8 games this weekend', challenges: [{ title: 'Play 8 games', challengeType: 'play_games', target: 8, reward: { xp: 180, coins: 120 } }] },
];

/**
 * Generate a random event
 */
function generateEvent(durationHours = 48) {
  const template = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
  const now = new Date();
  const end = new Date(now.getTime() + durationHours * 3600000);

  return {
    title: template.title,
    description: template.desc,
    type: template.type,
    status: 'active',
    startDate: now,
    endDate: end,
    rewards: {
      xp: template.challenges.reduce((s, c) => s + c.reward.xp, 0),
      coins: template.challenges.reduce((s, c) => s + c.reward.coins, 0)
    },
    challenges: template.challenges.map(c => ({
      title: c.title,
      description: c.title,
      target: c.target,
      challengeType: c.challengeType,
      reward: c.reward
    }))
  };
}

/**
 * Check and update event statuses
 */
async function updateEventStatuses() {
  const now = new Date();
  await Event.updateMany(
    { status: 'upcoming', startDate: { $lte: now } },
    { status: 'active' }
  );
  await Event.updateMany(
    { status: 'active', endDate: { $lte: now } },
    { status: 'ended' }
  );
}

/**
 * Distribute rewards to completed participants
 */
async function distributeRewards(eventId) {
  const event = await Event.findById(eventId).populate('participants.user');
  if (!event || event.status !== 'ended') return;

  const User = require('../models/User');
  for (const participant of event.participants) {
    if (participant.completed) {
      const user = await User.findById(participant.user);
      if (user) {
        user.coins += event.rewards.coins;
        await user.addXP(event.rewards.xp);
      }
    }
  }
}

/**
 * Auto-generate periodic events
 */
async function scheduleEventGeneration() {
  const activeCount = await Event.countDocuments({ status: 'active' });
  if (activeCount < 3) {
    const eventData = generateEvent(48 + Math.random() * 120);
    await Event.create(eventData);
    console.log(`🌟 Auto-generated event: ${eventData.title}`);
  }
}

module.exports = { generateEvent, updateEventStatuses, distributeRewards, scheduleEventGeneration, EVENT_TEMPLATES };
