require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cron = require('node-cron');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const { apiLimiter, authLimiter, actionLimiter } = require('./middleware/rateLimiter');

// Services
const { weeklyReset } = require('./services/factionEngine');
const { updateEventStatuses, scheduleEventGeneration } = require('./services/eventEngine');

const app = express();

// Security middleware
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(requestLogger);

// Rate limiting
app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/economy/purchase', actionLimiter);
app.use('/api/ai/play-log', actionLimiter);
app.use('/api/factions/contribute', actionLimiter);

// Temporary Seed Endpoint
app.get('/api/admin/seed', async (req, res) => {
  try {
    const seed = require('./seeds/seed');
    await seed();
    res.send('<h1>✅ Database Successfully Seeded!</h1><p>You can now go to <a href="https://agos-start-up.vercel.app">AGOS App</a> and login with <b>demo@agos.gg / demo123</b></p>');
  } catch (err) {
    res.status(500).send(`<h1>❌ Seeding Failed</h1><pre>${err.message}</pre>`);
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/factions', require('./routes/factions'));
app.use('/api/economy', require('./routes/economy'));
app.use('/api/events', require('./routes/events'));
app.use('/api/games', require('./routes/games'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    name: 'AGOS API',
    version: '1.0.0',
    uptime: Math.floor(process.uptime())
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Cron jobs
cron.schedule('0 0 * * 1', async () => {
  console.log('⏰ Running weekly faction reset...');
  await weeklyReset();
});

cron.schedule('*/30 * * * *', async () => {
  await updateEventStatuses();
  await scheduleEventGeneration();
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 AGOS API v1.0.0 running on http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔒 Helmet: enabled | Rate limiting: enabled`);
    console.log(`📊 Request logging: enabled\n`);
  });
});
