const GAMES = require('../data/games');

exports.getAll = async (req, res, next) => {
  try {
    let games = [...GAMES];
    const { genre, search, sort } = req.query;

    if (genre) {
      games = games.filter(g => g.genres.includes(genre));
    }
    if (search) {
      const q = search.toLowerCase();
      games = games.filter(g => g.title.toLowerCase().includes(q));
    }
    if (sort === 'rating') games.sort((a, b) => b.rating - a.rating);
    else if (sort === 'players') games.sort((a, b) => b.players - a.players);
    else if (sort === 'az') games.sort((a, b) => a.title.localeCompare(b.title));

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 24;
    const start = (page - 1) * limit;
    const paged = games.slice(start, start + limit);

    res.json({
      games: paged,
      total: games.length,
      page,
      totalPages: Math.ceil(games.length / limit),
      genres: [...new Set(GAMES.flatMap(g => g.genres))].sort()
    });
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const game = GAMES.find(g => g.id === req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json({ game });
  } catch (err) { next(err); }
};

exports.getGenreClusters = async (req, res, next) => {
  try {
    const clusters = {};
    for (const game of GAMES) {
      for (const genre of game.genres) {
        if (!clusters[genre]) clusters[genre] = { genre, count: 0, games: [] };
        clusters[genre].count++;
        if (clusters[genre].games.length < 6) clusters[genre].games.push(game);
      }
    }
    res.json({ clusters: Object.values(clusters).sort((a, b) => b.count - a.count) });
  } catch (err) { next(err); }
};
