const Event = require('../models/Event');

exports.getAll = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const events = await Event.find(query).sort({ startDate: -1 }).lean();
    res.json({
      events: events.map(e => ({
        ...e,
        participantCount: e.participants?.length || 0,
        timeRemaining: e.endDate > new Date() ? e.endDate - new Date() : 0
      }))
    });
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    const myParticipation = event.participants.find(p => p.user.toString() === req.user._id.toString());
    res.json({ event, myParticipation: myParticipation || null });
  } catch (err) { next(err); }
};

exports.join = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.status !== 'active') return res.status(400).json({ error: 'Event is not active' });
    const already = event.participants.some(p => p.user.toString() === req.user._id.toString());
    if (already) return res.status(400).json({ error: 'Already participating' });
    if (event.maxParticipants > 0 && event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ error: 'Event is full' });
    }
    event.participants.push({ user: req.user._id });
    await event.save();
    res.json({ message: 'Joined event!', event });
  } catch (err) { next(err); }
};

exports.updateProgress = async (req, res, next) => {
  try {
    const { challengeIndex, progress } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    const participation = event.participants.find(p => p.user.toString() === req.user._id.toString());
    if (!participation) return res.status(400).json({ error: 'Not participating' });
    participation.progress.set(String(challengeIndex), progress);

    // Check if all challenges completed
    const allDone = event.challenges.every((c, i) => {
      const p = participation.progress.get(String(i)) || 0;
      return p >= c.target;
    });
    if (allDone) participation.completed = true;

    await event.save();
    res.json({ participation, completed: allDone });
  } catch (err) { next(err); }
};
